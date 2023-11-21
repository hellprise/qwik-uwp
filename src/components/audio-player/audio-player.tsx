import { component$, $, useSignal } from "@builder.io/qwik";
import { useAudioCtx } from "~/hooks/use-audio-ctx";
import { formatTime } from "~/utils/utils";

import { BtnPlayPause } from "../buttons/btn-play-pause";
import { ProgressBar } from "./progress-bar";

type Props = {
  base64AudioData: string;
  isCustomer?: true;
};

export const AudioPlayer = component$<Props>(
  ({ base64AudioData, isCustomer }) => {
    const audioRef = useSignal<HTMLAudioElement>();
    const isAudioPlaying = useSignal(false);
    const duration = useSignal<number>();
    const remainTime = useSignal<string>();
    const { audioCtx, analyser, freqArray } = useAudioCtx(audioRef);

    const showRemainTime = $((_: Event, e: HTMLAudioElement) => {
      const duration = e.duration;
      const currTime = e.currentTime;
      const showedTime = currTime === duration ? duration : duration - currTime;
      remainTime.value = formatTime(showedTime);
    });

    const handlePlayPause = $(() => {
      if (isAudioPlaying.value) {
        audioRef.value?.pause();
        audioCtx.value?.suspend(); // TODO: to refactor
      } else {
        audioRef.value?.play();
        audioCtx.value?.resume(); // TODO: to refactor
      }
    });

    const Btn = (
      <div class="h-6 w-6 shrink-0 lg:h-8 lg:w-8">
        <BtnPlayPause
          isAudioPlaying={isAudioPlaying.value}
          action$={handlePlayPause}
        />
      </div>
    );

    const Bar = (
      <div class="ml-4 mr-2 h-2 w-[70px] lg:h-3 lg:w-[88px]">
        <ProgressBar
          duration={duration.value}
          isAudioPlaying={isAudioPlaying.value}
          {...{ audioRef, freqArray, analyser }}
        />
      </div>
    );

    const Time = (
      <span class="text-[8px] font-light leading-3 tracking-tighter text-[#DEDEDE] md:text-[10px]">
        {remainTime.value}
      </span>
    );

    return (
      <div
        class={`flex h-6 w-36 items-center rounded-full bg-neutral-900 lg:h-8 lg:w-44 ${
          isCustomer ? "justify-end" : ""
        }`}
      >
        <audio
          ref={audioRef}
          src={"data:audio/wav;base64," + base64AudioData}
          onTimeUpdate$={showRemainTime}
          onPause$={() => (isAudioPlaying.value = false)}
          onPlaying$={() => (isAudioPlaying.value = true)}
          onCanPlay$={(_, e) => {
            duration.value = e.duration;
            remainTime.value = formatTime(e.duration);
          }}
        >
          Your browser does not support the audio element.
        </audio>

        {isCustomer ? [Time, Bar, Btn] : [Btn, Bar, Time]}
      </div>
    );
  },
);
