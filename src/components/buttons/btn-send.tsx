import { component$ } from "@builder.io/qwik";
import { IconSend } from "../icons";

interface BtnOpenWindowProps {
  disabled?: boolean;
}

export const BtnSend = component$<BtnOpenWindowProps>(({ disabled }) => {
  return (
    <button
      type="submit"
      class="flex-center gradient-bd-purple-bg-gray disabled:gradient-bd-white-bg-gray h-11 w-[46px] rounded-[10px] text-[#9363FD] disabled:text-[#DEDEDE]"
      disabled={disabled}
    >
      <IconSend />
    </button>
  );
});
