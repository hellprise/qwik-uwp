import type { NoSerialize, Signal } from "@builder.io/qwik";
import { noSerialize, useSignal, useVisibleTask$ } from "@builder.io/qwik";

export const useAudioCtx = (audioRef: Signal<HTMLAudioElement | undefined>) => {
  const audioCtx = useSignal<NoSerialize<AudioContext>>();
  const analyser = useSignal<NoSerialize<AnalyserNode>>();
  const freqArray = useSignal<NoSerialize<Uint8Array>>();

  useVisibleTask$(({ track }) => {
    track(() => audioRef.value);
    if (!audioRef.value) return;

    audioCtx.value = noSerialize(new AudioContext());
    if (!audioCtx.value) return;

    analyser.value = noSerialize(audioCtx.value.createAnalyser());
    if (!analyser.value) return;

    analyser.value.fftSize = 64;
    const source = audioCtx.value.createMediaElementSource(audioRef.value);
    source.connect(analyser.value as AnalyserNode);
    analyser.value.connect(audioCtx.value.destination);
    const uint8Array = new Uint8Array(analyser.value.frequencyBinCount);
    freqArray.value = noSerialize(uint8Array);
  });

  return { audioCtx, analyser, freqArray };
};
