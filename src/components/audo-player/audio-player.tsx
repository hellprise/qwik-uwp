import type { NoSerialize } from "@builder.io/qwik";
import {
  component$,
  $,
  useSignal,
  useVisibleTask$,
  noSerialize,
} from "@builder.io/qwik";
import data from "./content.json";
import { BtnPlayPause } from "../buttons/btn-play-pause";
import { ProgressBar } from "./progress-bar";
import { useAudioCtx } from "~/hooks/use-audio-ctx";

type Props = {
  base64AudioData: string;
  audioBlob?: BlobPart;
};

const ProgressiveBar = ({ duration = 0 }: { duration?: number }) => {
  const bars = Array.from({ length: 36 }, () => Math.random() * 100);
  const barDuration = duration / bars.length; // Продолжительность каждой палочки

  const getBarWidth = (index: number) => {
    const progress = (index + 1) / bars.length;
    return progress * 100 + "%";
  };

  return (
    <div class="h-2 w-[72px]">
      {/* <progress value="70" max="100" class="absolute h-2 w-[72px] progress-audio"></progress> */}

      <div class="absolute flex h-2 items-end gap-x-px overflow-hidden">
        {bars.map((height, index) => (
          <div
            key={index}
            class="w-px shrink-0 bg-green-500"
            style={{
              height: `${height}%`,
              // width: getBarWidth(index),
              // background: `linear-gradient(90deg, transparent ${getBarWidth(
              //   index,
              // )}, #fff ${getBarWidth(index)})`,
              // transition: `width ${barDuration}s linear`, // Добавляем анимацию изменения ширины
            }}
          ></div>
        ))}
      </div>
    </div>
  );
};

export const AudioPlayer = component$<Props>(
  ({ audioBlob, base64AudioData }) => {
    const audioRef = useSignal<HTMLAudioElement>();
    const isAudioPlaying = useSignal(false);
    const currentTime = useSignal(0);
    const { audioCtx, analyser, freqArray } = useAudioCtx(audioRef);

    useVisibleTask$(({ track }) => {
      track(() => audioRef.value?.paused);

      // console.log(audioRef.value?.paused);
    });

    ////////

    const handlePlayPause = $(() => {
      if (isAudioPlaying.value) {
        audioRef.value?.pause();
        audioCtx.value?.suspend();
      } else {
        audioRef.value?.play();
        audioCtx.value?.resume();
      }
    });

    return (
      <div class="flex h-6 w-36 items-center gap-x-3 rounded-full bg-neutral-900">
        <audio
          onPause$={() => (isAudioPlaying.value = false)}
          onPlaying$={() => (isAudioPlaying.value = true)}
          onTimeUpdate$={(_, e) => (currentTime.value = e.currentTime)}
          ref={audioRef}
          src={"data:audio/wav;base64," + data.content}
        >
          Your browser does not support the audio element.
        </audio>

        <BtnPlayPause
          isAudioActive={!audioRef.value?.paused}
          action$={handlePlayPause}
        />

        <ProgressBar
          isAudioPlaying={isAudioPlaying.value}
          {...{ audioRef, freqArray, analyser }}
        />
      </div>
    );
  },
);
