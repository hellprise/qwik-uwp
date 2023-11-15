import { type DocumentHead } from "@builder.io/qwik-city";
import {
  component$,
  useSignal,
  useStore,
  useTask$,
  useVisibleTask$,
} from "@builder.io/qwik";

import { useTextToTextApi } from "~/actions/useTextToTextApi";

import { TextInputField } from "./input-field";
import { MessageRow } from "./message-row";
import * as btns from "../buttons";
import * as icons from "../icons";

import type { TLangCode, TMessage } from "~/types";

interface UnityWindowProps {}

export default component$<UnityWindowProps>(() => {
  const actTextToText = useTextToTextApi();
  const messages = useStore<{ data: TMessage[] }>({ data: [] });
  const inputtedText = useSignal<string>();
  const chatRef = useSignal<Element>();
  const voiceActivated = useSignal(true);
  const windowOpened = useSignal(true);
  const currentLang = useSignal<TLangCode>("en_GB");
  
  
  
  useTask$(({ track }) => {
    const isRunning = track(() => actTextToText.isRunning);
    const values = track(() => actTextToText.value);

    if (isRunning) {
      const content = inputtedText.value;
      content && messages.data.push({ from: "customer", content });
    } else if (values?.success) {
      const content = actTextToText.value?.result?.content;
      content && messages.data.push({ from: "agent", content });
    } else if (values?.failed) {
      const content = actTextToText.value?.message;
      content && messages.data.push({ from: "agent", content });
    }
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
      <div class="mx-1 w-full max-w-lg rounded-3xl bg-gradient-to-b from-violet-400 to-neutral-900 shadow-2xl">
        <div class="m-px rounded-3xl bg-gradient-to-b from-black to-neutral-900 p-[5px]">
          <div class="grounded-radiants relative flex h-24 items-center justify-evenly rounded-[calc(24px-1px)] bg-neutral-900 text-white">
            <btns.BtnSound
              activated={voiceActivated.value}
              onClick$={() => (voiceActivated.value = !voiceActivated.value)}
            />
            <btns.BtnUnity />

            <div class="relative h-9 w-[84px]">
              <btns.BtnLanguage
                class="absolute"
                selectLang$={(langCode: TLangCode) =>
                  (currentLang.value = langCode)
                }
                currentLang={currentLang.value}
              />

              <div class="absolute right-0">
                <btns.BtnOpenWindow
                  onClick$={() => (windowOpened.value = !windowOpened.value)}
                  open={windowOpened.value}
                />
              </div>
            </div>
          </div>

          <div
            class="flex h-96 flex-col gap-3 overflow-y-auto px-2 py-3"
            ref={chatRef}
          >
            {messages.data.map((el, i) => (
              <MessageRow {...el} key={i} />
            ))}

            {actTextToText.isRunning && <icons.Loader />}
          </div>

          {false && (
            <div class="mx-auto w-fit">
              <btns.BtnMicrophone />
            </div>
          )}

          <div class="mx-[9.5px] mb-[9px]">
            <div class="mx-auto max-w-[365px]">
              <TextInputField {...{ inputtedText, actTextToText }} />
            </div>
          </div>
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
