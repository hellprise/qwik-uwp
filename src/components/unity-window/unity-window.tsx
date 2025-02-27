import { component$, useVisibleTask$ } from "@builder.io/qwik";
import { $, useSignal, useStore } from "@builder.io/qwik";
import { type DocumentHead } from "@builder.io/qwik-city";

import { textToSpeechApi, textToTextApi } from "~/utils/api";
import { speechToSpeechApi, speechToTextApi } from "~/utils/api";

import { AudioBlock } from "../audio-block";
import { TextBlock } from "./text-block";
import { MessageRow } from "./message-row";
import * as btns from "../buttons";
import * as icons from "../icons";

export default component$(() => {
  const messages = useStore<{ data: TMessage[] }>({ data: [] });
  const chatRef = useSignal<Element>();
  const isSoundEnabled = useSignal(true);
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

    const [resTextMessage, resBase64AudioData] = await Promise.all([
      textToTextApi(toFetchData),
      textToSpeechApi(toFetchData),
    ]);

    const messageData: TMessage = {
      from: "unity",
      content: resTextMessage
        ? resTextMessage.content
        : "Something's gone wrong ...",
      base64AudioData: resBase64AudioData && resBase64AudioData.content,
    };

    messages.data.push(messageData);

    isFetching.value = false;
  });

  const sendAudioMessage = $(async (base64AudioData: string) => {
    isFetching.value = true;
    const toFetchData = {
      content: base64AudioData,
      language_code: currentLang.value,
    };

    const [resTextMessage, resBase64AudioData] = await Promise.all([
      speechToTextApi(toFetchData),
      speechToSpeechApi(toFetchData),
    ]);

    const messageData: TMessage = {
      from: "customer",
      content: resTextMessage
        ? resTextMessage.content
        : "Something's gone wrong ...",
      base64AudioData: resBase64AudioData && resBase64AudioData.content,
    };

    messages.data.push(messageData);

    // messages.data.push({ from: "customer", content: message });

    // const audioData = await textToSpeechApi({
    //   content: base64AudioData,
    //   language_code: currentLang.value,
    // });
    // // console.log(audioData);

    // const content = audioData
    //   ? "data:audio/wav;base64," + audioData.content
    //   : "Network error !";
    // messages.data.push({ from: "agent", content, typeAudio: !!audioData });
    isFetching.value = false;
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
      <div class="gradient-bd-purple-bg-dark mx-1 w-full max-w-lg overflow-hidden rounded-3xl shadow-2xl">
        <div class="relative mx-[5px] mt-[5px] flex h-20 items-center justify-evenly rounded-[calc(24px-1px)] bg-neutral-900 text-white">
          <btns.BtnSound isSoundEnabled={isSoundEnabled} />
          <btns.BtnUnity />

          <div class="relative h-9 w-[84px]">
            <btns.BtnLanguage class="absolute" currentLang={currentLang} />

            <btns.BtnOpenWindow
              class="absolute right-0"
              isWindowOpened={isWindowOpened}
            />
          </div>
        </div>

        <div
          class="flex h-[360px] flex-col justify-end gap-4 overflow-y-auto px-5 py-3 transition-all"
          ref={chatRef}
        >
          {messages.data.map((el, i) => (
            <MessageRow {...el} key={i} />
          ))}

          {isFetching.value && <icons.IconLoader />}
        </div>

        <div
          class={`flex-center mx-[9.5px] mb-[9px] transition-all ${
            isSoundEnabled.value ? "h-28" : "h-16"
          }`}
        >
          {isSoundEnabled.value ? (
            <div class="mx-auto w-11/12">
              <AudioBlock
                sendMessage={sendAudioMessage}
                isFetching={isFetching}
              />
            </div>
          ) : (
            <div class="mx-auto max-w-[365px]">
              <TextBlock
                sendMessage={sendTextMessage}
                isFetching={isFetching}
              />
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
