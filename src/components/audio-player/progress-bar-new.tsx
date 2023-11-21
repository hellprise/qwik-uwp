import { component$, useSignal, useVisibleTask$ } from "@builder.io/qwik";
import type { Signal, NoSerialize } from "@builder.io/qwik";

type DynamicIconProps = {
  analyser: Signal<NoSerialize<AnalyserNode> | null>;
};

export const ProgressBarNew = component$<DynamicIconProps>(({ analyser }) => {
  const ref = useSignal<SVGElement>();

  useVisibleTask$(({ cleanup }) => {
    if (!ref.value) return;
    if (!analyser.value) return;

    const dataMap: { [key: number]: number } = {
      0: 15,
      1: 10,
      2: 8,
      3: 9,
      4: 6,
      5: 5,
      6: 2,
      7: 1,
      8: 0,
      9: 4,
      10: 3,
      11: 7,
      12: 11,
      13: 12,
      14: 13,
      15: 14,
    };
    let raf: number;
    const bufferLength = analyser.value.frequencyBinCount;
    const dataArray = new Uint8Array(bufferLength);

    const draw = () => {
      if (!ref.value) return;
      if (!analyser.value) return;

      raf = requestAnimationFrame(draw);
      analyser.value.getByteFrequencyData(dataArray);

      const values = Object.values(dataArray);
      const bars = ref.value.querySelectorAll(".bar");

      for (let i = 0; i < bufferLength; i++) {
        const value = values[dataMap[i]] / 255;
        const bar = bars[dataMap[i]];
        bar.setAttribute("transform", `scale(1, ${value})`);
        // bar.setAttribute("opacity", `${Math.max(0.25, value)}`);
      }
    };

    draw();

    cleanup(() => {
      cancelAnimationFrame(raf);
    });
  });

 
  return (
    <svg ref={ref} class="w-full h-full">
      {[...Array(analyser.value?.frequencyBinCount)].map((_, i) => (
        <rect
          class="bar h-full"
          key={i}
          x={i * 10}
          width="8"
          fill="#BD9FFE"
        />
      ))}
    </svg>
  );
});
