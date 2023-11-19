import { component$, type QRL } from "@builder.io/qwik";
import { IconPlay, IconPause } from "../icons";

interface BtnProps {
  isAudioPlaying: boolean;
  action$: QRL<() => void>;
}

export const BtnPlayPause = component$<BtnProps>(
  ({ isAudioPlaying, action$ }) => {
    return (
      <button
        class="gradient-bd-white-bg-dark max-w-8 h-full max-h-8 w-full rounded-full"
        onClick$={action$}
      >
        {!isAudioPlaying ? <IconPlay /> : <IconPause />}
      </button>
    );
  },
);
