import { Form, type DocumentHead } from "@builder.io/qwik-city";
import {
  component$,
  useSignal,
  useStore,
  useTask$,
  useVisibleTask$,
} from "@builder.io/qwik";

import Loader from "../icons/Loader";
import MessageRow from "./message-row";
import type { Message } from "~/types";
import { useTextToTextApi } from "~/routes/actions";

export interface UnityWindowProps {

}

export default component$<UnityWindowProps>(() => {
  const action = useTextToTextApi();
  const messages = useStore<{ data: Message[] }>({ data: [] });
  const inputtedText = useSignal<string>();
  const chatRef = useSignal<Element>();

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
    <main class="flex h-screen w-screen items-center justify-center">
      <div class="mx-1 w-full max-w-lg rounded-xl shadow-2xl">
        <div class="flex h-16 w-full items-center rounded-t-xl bg-[#123456] px-10 text-xl tracking-wide">
          <h4 class="font-bold text-white">How can I help?</h4>
        </div>

        <div
          class="flex h-96 flex-col gap-3 overflow-y-auto px-2 py-3"
          ref={chatRef}
        >
          {messages.data.map((el, i) => (
            <MessageRow {...el} key={i} />
          ))}
          <div class="h-5 w-5">{action.isRunning && <Loader />}</div>
        </div>

        <Form
          action={action}
          class="flex h-12 rounded-bl-xl border-t border-[#abcdef]"
          onSubmit$={() => {
            inputtedText.value = "";
          }}
        >
          <input
            autoComplete="off"
            name="message"
            class="h-full w-full rounded-bl-xl p-2 outline-0"
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
            } w-20 rounded-br-xl text-white`}
            type="submit"
            disabled={!inputtedText.value || action.isRunning}
          >
            Send
          </button>
        </Form>
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
