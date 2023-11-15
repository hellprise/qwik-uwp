import { type QRL, component$ } from "@builder.io/qwik";
import { IconSend } from "../icons";

interface BtnOpenWindowProps {
  action$?: QRL<() => boolean>;
  disabled?: boolean;
}

export const BtnSend = component$<BtnOpenWindowProps>(
  ({ disabled, action$ }) => {
    return (
      <button
        class="flex-center h-11 w-[46px] rounded-[10px] border border-[#9363FD] bg-[#323232]"
        disabled={disabled}
        onClick$={action$}
      >
        <IconSend />
      </button>
    );
  },
);
