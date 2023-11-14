import { type QRL, component$ } from "@builder.io/qwik";
import { ArrowUp } from "../icons/arrow-up";

interface BtnOpenWindowProps {
  open: boolean;
  onClick$: QRL<() => boolean>;
}

export const BtnOpenWindow = component$<BtnOpenWindowProps>(
  ({ open, onClick$ }) => {
    return (
      <button
        class="h-9 w-9 rounded-full border bg-neutral-900 p-[7px]"
        onClick$={onClick$}
      >
        <ArrowUp
          class={`h-[22px] w-[22px] transition-transform ${
            open ? "" : "rotate-180"
          }`}
        />
      </button>
    );
  },
);
