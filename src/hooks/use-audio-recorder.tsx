import type { NoSerialize } from "@builder.io/qwik";
import {
  $,
  noSerialize,
  useComputed$,
  useSignal,
  useVisibleTask$,
} from "@builder.io/qwik";

const requestRecorder = async () => {
  const constraints = { audio: true, video: false };
  const stream = await navigator.mediaDevices.getUserMedia(constraints);

  return new MediaRecorder(stream);
};

/**
 * React hook to use browser's recorder.
 *
 * @example
 * import { useRecorder } from 'react-hook-recorder';
 * const [audioURL, isRecording, startRecording, stopRecording] = useRecorder();
 *
 * @example
 * // use audioURL
 * <audio controls src={audioURL} />
 *
 * @example
 * // use startRecording
 * startRecording()
 *
 * @example
 * // use stopRecording
 * stopRecording()
 *
 * @param no
 */

export const useRecorder = () => {
  const audioURL = useSignal<string>();
  const isRecording = useSignal(false);
  const recorder = useSignal<NoSerialize<MediaRecorder>>();

  useComputed$(() => {
    console.log(audioURL.value);
  });

  useVisibleTask$(({ track }) => {
    track(() => recorder.value);
    track(() => isRecording.value);

    if (!recorder.value) {
      if (isRecording.value) {
        requestRecorder().then(
          (mr) => (recorder.value = noSerialize(mr)),
          console.error,
        );
      }
      return;
    }

    if (isRecording.value) {
      recorder.value.start();
    } else {
      recorder.value.stop();
    }

    const handleData = (ev: BlobEvent) => {
      console.log(ev.data);

      if (!ev.data.size) return;
      audioURL.value = URL.createObjectURL(ev.data);
    };

    recorder.value.ondataavailable = (ev) => handleData(ev);
  });

  const startRecording = $(() => {
    isRecording.value = true;
  });

  const stopRecording = $(() => {
    isRecording.value = false;
  });

  return { audioURL, isRecording, startRecording, stopRecording };
};
