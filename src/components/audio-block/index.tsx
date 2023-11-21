import { component$, useVisibleTask$ } from "@builder.io/qwik";
import { useAudioProcessor } from "~/hooks/use-audio-processor";

import { BtnMicrophone } from "../buttons";

export const AudioBlock = component$<TMessageBlock>(() => {
  const {
    startRecording,
    stopRecording,
    statusRecording,
    clearRecording,
    audioBlob,
    formattedDuration,
    // analyser,
  } = useAudioProcessor({ enableAnalyser: true });

  useVisibleTask$(({ track, cleanup }) => {
    const blob = track(() => audioBlob.value);

    console.log("audioBlob :>> ", blob);

    cleanup(() => clearRecording());
  });

  return (
    <div class="text-white">
      <div class="mx-auto w-fit">
        <BtnMicrophone {...{ startRecording, stopRecording, statusRecording, formattedDuration }} />
      </div>

      {/* <MediaButton
        status={statusRecording}
        analyser={analyser}
        onStart={startRecording}
        onStop={stopRecording}
        formattedDuration={formattedDuration}
      /> */}
    </div>
  );
});
