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
        class="flex-center h-9 w-9 rounded-full border bg-neutral-900"
        onClick$={onClick$}
      >
        <ArrowUp
          class={`transition-transform ${
            open ? "" : "rotate-180"
          }`}
        />
      </button>
    );
  },
);
