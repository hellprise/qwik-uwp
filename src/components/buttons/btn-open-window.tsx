import { component$, type Signal } from "@builder.io/qwik";
import { ArrowUp } from "../icons";

interface BtnOpenWindowProps {
  isWindowOpened: Signal<boolean>;
  class?: string;
}

export const BtnOpenWindow = component$<BtnOpenWindowProps>(
  ({ isWindowOpened, class: appendClass }) => {
    return (
      <button
        class={`flex-center gradient-bd-white-bg-dark h-9 w-9 rounded-full ${appendClass}`}
        onClick$={() => (isWindowOpened.value = !isWindowOpened.value)}
      >
        <ArrowUp
          class={`absolute transition-transform ${
            isWindowOpened.value ? "" : "rotate-180"
          }`}
        />
      </button>
    );
  },
);
