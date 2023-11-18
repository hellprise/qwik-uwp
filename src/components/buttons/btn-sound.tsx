import { component$, type Signal } from "@builder.io/qwik";
import { SoundOn, SoundOff } from "../icons";

interface BtnSoundProps {
  isSoundActive: Signal<boolean>;
}

export const BtnSound = component$<BtnSoundProps>(({ isSoundActive }) => {
  return (
    <button
      class="flex-center gradient-bd-white-bg-dark h-9 w-[84px] gap-2 rounded-full"
      onClick$={() => (isSoundActive.value = !isSoundActive.value)}
    >
      <div class="h-[22px] w-[22px] shrink-0">
        {isSoundActive.value ? <SoundOn /> : <SoundOff />}
      </div>

      <span class="text-sm uppercase leading-5 text-white">
        {isSoundActive.value ? "ON" : "OFF"}
      </span>
    </button>
  );
});
