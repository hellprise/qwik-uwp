import type { NoSerialize } from "@builder.io/qwik";
import { component$, useSignal, $, noSerialize } from "@builder.io/qwik";

export const AudioRecorder = component$(() => {
  const mediaRecorderRef = useSignal<NoSerialize<MediaRecorder | null>>();
  const chunks = useSignal<NoSerialize<Blob[]>>();

  const handleStartRecording = $(async () => {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    const mediaRecorder = new MediaRecorder(stream);

    mediaRecorder.ondataavailable = (e) => {
      if (e.data.size > 0) {
        const newChunks = chunks.value ? [...chunks.value, e.data] : [e.data];
        chunks.value = noSerialize(newChunks);
      }
    };

    mediaRecorder.onstop = () => {
      const audioBlob = new Blob(chunks.value, { type: "audio/wav" });
      const audioUrl = URL.createObjectURL(audioBlob);
      console.log(audioUrl);
      
      // audioUrl теперь содержит URL для воспроизведения записанного аудио
    };

    mediaRecorderRef.value = noSerialize(mediaRecorder);
    mediaRecorder.start();
  });

  const handleStopRecording = $(() => {
    const mediaRecorder = mediaRecorderRef.value;
    if (mediaRecorder && mediaRecorder.state === "recording") {
      mediaRecorder.stop();
    }
  });

  return (
    <div class="flex items-center h-9 w-9 border">
      <button onClick$={handleStartRecording}>Start Recording</button>
      <button onClick$={handleStopRecording}>Stop Recording</button>
    </div>
  );
});
