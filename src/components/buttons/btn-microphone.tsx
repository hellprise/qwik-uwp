import { component$ } from "@builder.io/qwik";
import { Microphone } from "../icons/microphone";

// interface BtnSoundProps {
//   enabled: boolean;
// }

export const BtnMicrophone = component$(() => {
  return (
    <button class="flex h-[60px] w-[60px] items-center justify-center rounded-full border">
      <Microphone />
    </button>
  );
});
