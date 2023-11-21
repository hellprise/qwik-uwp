import { $, useSignal, useComputed$ } from "@builder.io/qwik";
import { useVisibleTask$, noSerialize } from "@builder.io/qwik";

import type { NoSerialize } from "@builder.io/qwik";
import type {
  APHookReturn,
  APOptions,
  APRecordingStatus,
  APUnchangedStore,
} from "~/types/audio-processor-types";

declare global {
  interface Window {
    AudioContext: typeof AudioContext;
    webkitAudioContext: typeof AudioContext;
  }
}

export const useAudioProcessor = (options?: APOptions): APHookReturn => {
  const statusRecording = useSignal<APRecordingStatus>("ready");
  const store = useSignal<APUnchangedStore>({
    mediaRecorder: null,
    mediaStream: null,
    audioContext: null,
    sourceNode: null,
  });
  const audioUrl = useSignal<string>();
  const duration = useSignal(0);
  const audioBlob = useSignal<NoSerialize<Blob>>();
  const analyserNode = useSignal<NoSerialize<AnalyserNode>>();

  const formattedDuration = useComputed$(() => {
    const time = new Date();
    time.setHours(0, 0, 0, 0);
    time.setSeconds(time.getSeconds() + duration.value);
    return `${("0" + time.getMinutes()).slice(-2)}:${(
      "0" + time.getSeconds()
    ).slice(-2)}`;
  });

  const finishRecording = $(({ data }: { data: Blob }) => {
    // to del ?
    const url = URL.createObjectURL(data);
    audioUrl.value = url;
    audioBlob.value = noSerialize(data);
    statusRecording.value = "stopped";
  });

  const startRecording = $(async () => {
    console.log(`startRecording`);
    statusRecording.value = "ready";
    duration.value = 0;
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      store.value.mediaStream = noSerialize(stream);

      if (options?.enableAnalyser) {
        // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
        const ac = new (window.AudioContext || window.webkitAudioContext)();
        const source = ac.createMediaStreamSource(stream);
        const analyser = ac.createAnalyser();
        analyser.smoothingTimeConstant = 0.5;
        analyser.fftSize = 32;
        source.connect(analyser);
        analyserNode.value = noSerialize(analyser);
        store.value.sourceNode = noSerialize(source);
        store.value.audioContext = noSerialize(ac);
      }

      const recorder = new MediaRecorder(stream);
      recorder.start();
      recorder.ondataavailable = finishRecording;
      store.value.mediaRecorder = noSerialize(recorder);
      statusRecording.value = "recording";
    } catch (error) {
      statusRecording.value = "denied";
    }
  });

  const stopRecording = $(() => {
    if (!store.value.mediaRecorder) return;
    console.log(`stopRecording`);
    statusRecording.value = "stopped";
    store.value.mediaRecorder.stop();
    store.value.mediaStream?.getTracks().forEach((track) => track.stop());
    store.value.mediaStream = null;
    analyserNode.value = undefined;
  });

  const clearRecording = $(() => {
    console.log(`clearRecording`);
    statusRecording.value = "ready";
    duration.value = 0;
    audioUrl.value = undefined;
    store.value.mediaRecorder = null;
    store.value.mediaStream = null;
    analyserNode.value = undefined;
    store.value.sourceNode = null;
    store.value.audioContext = null;
  });

  useVisibleTask$(({ track, cleanup }) => {
    track(() => statusRecording.value);

    let timerId: number | undefined;
    // If the status is set to write and the counter is not started, start the counter
    if (statusRecording.value === "recording" && !timerId) {
      timerId = window.setInterval(() => duration.value++, 1000);
    } else {
      timerId && clearInterval(timerId);
    }

    cleanup(() => {
      timerId && clearInterval(timerId);
    });
  });

  useVisibleTask$(({ track }) => {
    track(() => statusRecording.value);
    track(() => duration.value);

    if (options?.timeLimit) {
      if (
        statusRecording.value === "recording" &&
        duration.value >= options.timeLimit
      ) {
        stopRecording();
      }
    }
  });

  useVisibleTask$(({ cleanup }) => {
    cleanup(() => clearRecording());
  });

  return {
    startRecording,
    stopRecording,
    clearRecording,
    statusRecording,
    duration,
    formattedDuration,
    audioBlob,
    analyser: analyserNode,
  };
};
