import { component$, type QRL } from "@builder.io/qwik";
import { IconPlay, IconPause } from "../icons";

interface BtnProps {
  isAudioActive?: boolean;
  action$: QRL<() => void>;
}

export const BtnPlayPause = component$<BtnProps>(
  ({ isAudioActive, action$ }) => {
    return (
      <button
        class="gradient-bd-white-bg-dark h-6 w-6 rounded-full"
        onClick$={action$}
      >
        {isAudioActive ? <IconPlay /> : <IconPause />}
      </button>
    );
  },
);
