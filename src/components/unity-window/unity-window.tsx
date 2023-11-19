import { type DocumentHead } from "@builder.io/qwik-city";
import {
  $,
  component$,
  useSignal,
  useStore,
  useVisibleTask$,
} from "@builder.io/qwik";

// import { useTextToTextApi } from "~/routes/plugin";

import { TextInputField } from "./input-field";
import { MessageRow } from "./message-row";
import * as btns from "../buttons";
import * as icons from "../icons";

import type { TLangCode, TMessage } from "~/types";
import { textToSpeechApi, textToTextApi } from "~/utils/api";
import { AudioPlayer } from "../audio-player/audio-player";

interface UnityWindowProps {}

export default component$<UnityWindowProps>(() => {
  // const actTextToText = useTextToTextApi();
  const messages = useStore<{ data: TMessage[] }>({ data: [] });
  const chatRef = useSignal<Element>();
  const isSoundActive = useSignal(false);
  const isWindowOpened = useSignal(true);
  const isFetching = useSignal(false);
  const currentLang = useSignal<TLangCode>("en_GB");

  const sendTextMessage = $(async (message: string) => {
    isFetching.value = true;
    const toFetchData = {
      content: message,
      language_code: currentLang.value,
    };

    messages.data.push({ from: "customer", content: message });

    const [textMessage, audioData] = await Promise.all([
      textToTextApi(toFetchData),
      textToSpeechApi(toFetchData),
    ]);

    const messageData: TMessage = {
      from: "agent",
      content: textMessage ? textMessage.content : "Something's gone wrong ...",
      base64AudioData: audioData && audioData.content,
    };

    messages.data.push(messageData);

    isFetching.value = false;
  });

  // const sendAudioMessage = $(async (message: string) => {
  //   isFetching.value = true;
  //   const audioData = await textToSpeechApi({
  //     content: message,
  //     language_code: currentLang.value,
  //   });
  //   // console.log(audioData);

  //   const content = audioData
  //     ? "data:audio/wav;base64," + audioData.content
  //     : "Network error !";
  //   messages.data.push({ from: "agent", content, typeAudio: !!audioData });
  //   isFetching.value = false;
  // });

  const sendMessage = $((message: string) => {
    sendTextMessage(message);
    // sendAudioMessage(message);
  });

  useVisibleTask$(({ track }) => {
    track(() => messages.data.length);

    chatRef.value?.scrollTo({
      top: chatRef.value.scrollHeight,
      behavior: "smooth",
    });
  });

  return (
    <main class="flex h-screen w-screen items-center justify-center bg-neutral-700">
      <div class="gradient-bd-purple-bg-dark mx-1 w-full max-w-lg overflow-hidden rounded-3xl p-[5px] shadow-2xl">
        <div class="relative flex h-20 items-center justify-evenly rounded-[calc(24px-1px)] bg-neutral-900 text-white">
          <btns.BtnSound {...{ isSoundActive }} />
          <btns.BtnUnity />

          <div class="relative h-9 w-[84px]">
            <btns.BtnLanguage class="absolute" {...{ currentLang }} />

            <btns.BtnOpenWindow
              class="absolute right-0"
              {...{ isWindowOpened }}
            />
          </div>
        </div>

        <div
          class="flex h-[360px] flex-col gap-4 overflow-y-auto px-5 py-3"
          ref={chatRef}
        >
          {/* <AudioPlayer /> */}
          {messages.data.map((el, i) => (
            <MessageRow {...el} key={i} />
          ))}

          {isFetching.value && <icons.IconLoader />}
        </div>

        <div class="mx-[9.5px] mb-[9px]">
          {isSoundActive.value ? (
            <div class="mx-auto w-fit">
              <btns.BtnMicrophone />
            </div>
          ) : (
            <div class="mx-auto max-w-[365px]">
              <TextInputField {...{ sendMessage, isFetching }} />
            </div>
          )}
        </div>
      </div>
    </main>
  );
});

export const head: DocumentHead = {
  title: "Welcome to ChatAI",
  meta: [
    {
      name: "description",
      content: "ChatAI description",
    },
  ],
};
