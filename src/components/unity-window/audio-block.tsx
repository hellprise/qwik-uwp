import { component$, useVisibleTask$ } from "@builder.io/qwik";
import { useMediaRecorder } from "~/hooks/useMediaRecorder";
import { MediaButton } from "../audio-recorder/button";
import { BtnMicrophone } from "../buttons";

export const AudioBlock = component$<TMessageBlock>(() => {
  const {
    startRecording,
    stopRecording,
    statusRecording,
    clearRecording,
    audioBlob,
    formattedDuration,
    analyser,
    transcript,
  } = useMediaRecorder({ transcipt: { enable: true }, enableAnalyser: true });

  useVisibleTask$(({ track, cleanup }) => {
    const blob = track(() => audioBlob.value);

    console.log("audioBlob :>> ", blob);

    cleanup(() => clearRecording());
  });

  useVisibleTask$(({ track }) => {
    const text = track(() => transcript.value);

    console.log("text :>> ", text);
  });

  return (
    <div class="text-white">
      <div class="mx-auto w-fit">
        <BtnMicrophone />
      </div>

      <MediaButton
        status={statusRecording}
        analyser={analyser}
        onStart={startRecording}
        onStop={stopRecording}
        formattedDuration={formattedDuration}
      />
    </div>
  );
});
