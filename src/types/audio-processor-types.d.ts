import type { NoSerialize, QRL, Signal } from "@builder.io/qwik";

export type APRecordingStatus = "ready" | "recording" | "stopped" | "denied";

export type APHookReturn = {
  startRecording: QRL<() => Promise<void>>;
  stopRecording: QRL<() => void>;
  statusRecording: Signal<APRecordingStatus>;
  clearRecording: QRL<() => void>;
  duration: Signal<number>;
  formattedDuration: Readonly<Signal<string>>;
  analyser: Signal<NoSerialize<AnalyserNode> | null>;
  audioBlob: Signal<NoSerialize<Blob> | null>;
};

export type APOptions = {
  timeLimit?: number;
  enableAnalyser?: boolean;
};

export type APUnchangedStore = {
  mediaRecorder: NoSerialize<MediaRecorder> | null;
  mediaStream: NoSerialize<MediaStream> | null;
  audioContext: NoSerialize<AudioContext> | null;
  sourceNode: NoSerialize<MediaStreamAudioSourceNode> | null;
};
