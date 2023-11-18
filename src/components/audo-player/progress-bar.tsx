import type { NoSerialize, Signal } from "@builder.io/qwik";
import { component$, useSignal, useVisibleTask$ } from "@builder.io/qwik";

export interface Props {
  audioRef: Signal<HTMLAudioElement | undefined>;
  analyser: Signal<NoSerialize<AnalyserNode>>;
  freqArray: Signal<NoSerialize<Uint8Array>>;
  isAudioPlaying: boolean;
}

const numberOfBars = 32;

export const ProgressBar = component$<Props>(
  ({ audioRef, analyser, freqArray, isAudioPlaying }) => {
    const canvasRef = useSignal<HTMLCanvasElement>();
    const animationId = useSignal<number>();

    useVisibleTask$(({ track, cleanup }) => {
      track(() => isAudioPlaying);
      if (!canvasRef.value) return;

      const ctx = canvasRef.value.getContext("2d");
      const duration = audioRef.value?.duration;
      const isEndAudio = audioRef.value?.currentTime === duration;

      if (!ctx || !duration) return;

      const W = ctx.canvas.width;
      const H = ctx.canvas.height;

      const barWidth = Math.floor(W / numberOfBars / 2);
      const barTime = duration / numberOfBars;

      let barColor: string;

      const drawBar = () => {
        ctx.clearRect(0, 0, W, H);

        for (let i = 0; i < numberOfBars; i++) {
          if (!animationId.value) {
            barColor = "#dedede";
          } else if (animationId.value && isEndAudio) {
            barColor = "#9363fd";
          } else {
            barColor =
              (audioRef.value?.currentTime || 0) > (i + 1) * barTime
                ? "#9363fd"
                : "#dedede";
          }

          const barHeight = freqArray.value
            ? (freqArray.value[i] / 255) * H * 0.8
            : 0;
          const barHeightWithMin = ((!isEndAudio && barHeight) || 0) + H * 0.2;

          const x = i * (barWidth * 2);

          ctx.beginPath();
          ctx.fillStyle = barColor;
          ctx.fillRect(x, H, barWidth, -barHeightWithMin);
        }
      };

      const startAnimation = () => {
        if (!analyser.value || !freqArray.value) return;

        analyser.value.getByteFrequencyData(freqArray.value);
        drawBar();

        if (isAudioPlaying) {
          animationId.value = requestAnimationFrame(startAnimation);
        }
      };

      if (!isAudioPlaying) {
        animationId.value && cancelAnimationFrame(animationId.value);
        drawBar();
        animationId.value = undefined;
      } else {
        animationId.value = requestAnimationFrame(startAnimation);
      }

      cleanup(() => {
        animationId.value && cancelAnimationFrame(animationId.value);
      });
    });

    return <canvas ref={canvasRef} width={72} height={10} />;
  },
);
