import { Form, type DocumentHead } from "@builder.io/qwik-city";
import {
  component$,
  useSignal,
  useStore,
  useTask$,
  useVisibleTask$,
} from "@builder.io/qwik";

import { useTextToTextApi } from "~/routes/actions";

import MessageRow from "./message-row";
import * as btns from "../buttons";
import * as icons from "../icons";

import type { TLangCode, TMessage } from "~/types";

interface UnityWindowProps {}

export default component$<UnityWindowProps>(() => {
  const action = useTextToTextApi();
  const messages = useStore<{ data: TMessage[] }>({ data: [] });
  const inputtedText = useSignal<string>();
  const chatRef = useSignal<Element>();
  const voiceActivated = useSignal(true);
  const windowOpened = useSignal(true);
  const currentLang = useSignal<TLangCode>("en_GB");

  useTask$(({ track }) => {
    const isRunning = track(() => action.isRunning);
    const values = track(() => action.value);

    if (isRunning) {
      const content = inputtedText.value;
      content && messages.data.push({ from: "customer", content });
    } else if (values?.success) {
      const content = action.value?.result?.content;
      content && messages.data.push({ from: "agent", content });
    } else if (values?.failed) {
      const content = action.value?.message;
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
                selectLang$={(langCode: TLangCode) => (currentLang.value = langCode)}
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
            <div class="h-5 w-5">{action.isRunning && <icons.Loader />}</div>d
          </div>

          <div class="mx-auto w-fit">
            <btns.BtnMicrophone />
          </div>

          <Form
            action={action}
            class="flex h-12 rounded-bl-[calc(24px-1px)] border-t border-[#abcdef]"
            onSubmit$={() => {
              inputtedText.value = "";
            }}
          >
            <input
              autoComplete="off"
              name="message"
              class="h-full w-full rounded-bl-[calc(24px-1px)] p-2 outline-0"
              placeholder={
                action.isRunning ? "Wait for the AI reply" : "Type a message"
              }
              bind:value={inputtedText}
              disabled={action.isRunning}
            />

            <button
              class={`${
                !inputtedText.value || action.isRunning
                  ? "bg-gray-700"
                  : "bg-[#123456]"
              } w-20 rounded-br-[calc(24px-1px)] text-white`}
              type="submit"
              disabled={!inputtedText.value || action.isRunning}
            >
              Send
            </button>
          </Form>
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
