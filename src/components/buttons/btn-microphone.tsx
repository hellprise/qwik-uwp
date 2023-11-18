import { component$ } from "@builder.io/qwik";
import { Microphone } from "../icons/microphone";

// interface BtnSoundProps {
//   enabled: boolean;
// }

export const BtnMicrophone = component$(() => {
  return (
    <div class="h-[60px] w-[60px] rounded-full bg-gradient-to-b from-[#9363FD] to-[#323232] p-px shadow-lg shadow-[#9363FD]/50">
      <button class="flex-center h-full w-full rounded-full bg-black/60 shadow-inner shadow-black">
        <Microphone />
      </button>
    </div>
  );
});
