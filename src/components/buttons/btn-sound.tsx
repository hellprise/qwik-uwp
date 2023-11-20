import { component$, type Signal } from "@builder.io/qwik";
import { SoundOn, SoundOff } from "../icons";

interface BtnSoundProps {
  isSoundEnabled: Signal<boolean>;
}

export const BtnSound = component$<BtnSoundProps>(({ isSoundEnabled }) => {
  return (
    <button
      class="flex-center gradient-bd-white-bg-dark h-9 w-[84px] gap-2 rounded-full"
      onClick$={() => (isSoundEnabled.value = !isSoundEnabled.value)}
    >
      <div class="h-[22px] w-[22px] shrink-0">
        {isSoundEnabled.value ? <SoundOn /> : <SoundOff />}
      </div>

      <span class="text-sm uppercase leading-5 text-white">
        {isSoundEnabled.value ? "ON" : "OFF"}
      </span>
    </button>
  );
});
