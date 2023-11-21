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
    <div class="flex">
      <span class="text-sm leading-5 text-white">
        {formattedDuration.value}
      </span>

      <div class="mx-auto w-fit">
        <BtnMicrophone
          {...{
            startRecording,
            stopRecording,
            statusRecording,
          }}
        />
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
