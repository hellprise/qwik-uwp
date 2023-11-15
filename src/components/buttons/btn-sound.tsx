import { type QRL, component$ } from "@builder.io/qwik";
import { SoundOn, SoundOff } from "../icons";

interface BtnSoundProps {
  activated: boolean;
  onClick$: QRL<() => boolean>;
}

export const BtnSound = component$<BtnSoundProps>(({ activated, onClick$ }) => {
  return (
    <button
      class="flex-center h-9 w-[84px] gap-2 rounded-full border bg-neutral-900"
      onClick$={onClick$}
    >
      <div class="h-[22px] w-[22px] shrink-0">
        {activated ? <SoundOn /> : <SoundOff />}
      </div>

      <span class="text-sm uppercase leading-5 text-white">
        {activated ? "ON" : "OFF"}
      </span>
    </button>
  );
});
