import { $, component$ } from "@builder.io/qwik";
import { Microphone } from "../icons/microphone";

import type { PropFunction, Signal } from "@builder.io/qwik";
import type { APRecordingStatus } from "~/types/audio-processor-types";

type MediaButtonProps = {
  statusRecording: Signal<APRecordingStatus>;
  startRecording: PropFunction<() => void>;
  stopRecording: PropFunction<() => void>;
  formattedDuration: Readonly<Signal<string>>;
};

export const BtnMicrophone = component$<MediaButtonProps>((props) => {
  const { statusRecording, startRecording, stopRecording, formattedDuration } =
    props;

  const handlePlayPause = $(() => {
    if (
      statusRecording.value === "ready" ||
      statusRecording.value === "stopped"
    ) {
      startRecording();
    } else if (statusRecording.value === "recording") {
      stopRecording();
    }
  });

  return (
    <div class="h-[60px] w-[60px] rounded-full bg-gradient-to-b from-[#9363FD] to-[#323232] p-px shadow-lg shadow-[#9363FD]/50">
      <button
        disabled={statusRecording.value === "denied"}
        onClick$={handlePlayPause}
        onKeyPress$={(e) => console.log(e)}
        class="flex-center relative h-full w-full rounded-full bg-black/60 shadow-inner shadow-black"
      >
        <span class="absolute -top-8">{formattedDuration.value}</span>
        <Microphone />
      </button>
    </div>
  );
});
