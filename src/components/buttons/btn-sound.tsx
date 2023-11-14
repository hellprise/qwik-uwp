import { type QRL, component$ } from "@builder.io/qwik";
import { SoundOn, SoundOff } from "../icons";

interface BtnSoundProps {
  activated: boolean;
  onClick$: QRL<() => boolean>;
}

export const BtnSound = component$<BtnSoundProps>(({ activated, onClick$ }) => {
  return (
    <button
      class="flex w-[84px] items-center justify-between rounded-full border bg-neutral-900 px-[15px] py-[7px]"
      onClick$={onClick$}
    >
      <div class="h-[22px] w-[22px]">
        {activated ? <SoundOn /> : <SoundOff />}
      </div>

      <span class="text-sm uppercase leading-5 text-white">
        {activated ? "ON" : "OFF"}
      </span>
    </button>
  );
});
