import { component$, useSignal, useStore, useTask$ } from "@builder.io/qwik";
import { Form, type DocumentHead, routeAction$ } from "@builder.io/qwik-city";
import Loader from "~/components/Loader";
import MessageRow from "~/components/MessageRow";
import type { Message } from "~/types";
import { isBrowser } from "@builder.io/qwik/build";

export const useTextToText = routeAction$(async (data, { fail }) => {
  const url = "https://api.uwpai.net/api/assistant/text-to-text";
  try {
    const response = await fetch(url, {
      body: JSON.stringify({
        content: data.message,
        language_code: "uk_UA",
      }),
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      console.log("error >>", response.statusText);
      return fail(500, { message: "Network error !" });
    }

    const result: { content: string; language_code: string } =
      await response.json();

    return { success: true, result };
  } catch (error) {
    console.log("error >>", error);
    return fail(500, { message: "Network error !" });
  }
});

export default component$(() => {
  const action = useTextToText();
  const messages = useStore<{ data: Message[] }>({ data: [] });
  const chatRef = useSignal<Element>();

  useTask$(({ track }) => {
    const isRunning = track(() => action.isRunning);
    if (isRunning) {
      const content = action.formData?.get("message") as string;
      content && messages.data.push({ from: "customer", content });
    }

    const isSuccess = track(() => action.value?.success);
    if (isSuccess) {
      const content = action.value?.result?.content;
      content && messages.data.push({ from: "agent", content });
    }

    const isFailed = track(() => action.value?.failed);
    if (isFailed) {
      const content = action.value?.message;
      content && messages.data.push({ from: "agent", content });
    }
  });

  useTask$(({ track }) => {
    track(() => messages.data.length);

    if (isBrowser) {
      chatRef.value?.scrollIntoView({ behavior: "smooth", block: "end" });
    }
  });

  return (
    <main class={"flex h-screen w-screen items-center justify-center"}>
      <div class="mx-5 w-full max-w-[670px] rounded-xl shadow-2xl">
        <div class="flex h-16 w-full items-center rounded-t-xl bg-[#123456] px-10 text-xl tracking-wide">
          <h4 class={"font-bold text-white"}>How can I help?</h4>
        </div>

        <div
          class="flex h-96 flex-col gap-3 overflow-y-auto px-2 py-3"
          ref={chatRef}
        >
          {messages.data.map((el, i) => (
            <MessageRow {...el} key={i} />
          ))}
          <div class={"h-5 w-5 snap-y"}>{action.isRunning && <Loader />}</div>
        </div>

        <Form
          action={action}
          class="flex h-[46px] rounded-bl-xl  border-t-[1px] border-[#abcdef]"
          spaReset
        >
          <input
            autoComplete="off"
            name="message"
            class="h-full w-full rounded-bl-xl px-2 pb-1.5 outline-0 "
            placeholder={
              action.isRunning ? "Wait for the AI reply" : "Type a message"
            }
            disabled={action.isRunning}
          />

          <button
            class={`${
              action.isRunning ? "bg-gray-700" : "bg-[#123456]"
            }  w-16 rounded-br-xl px-2.5 text-white`}
            type={"submit"}
            disabled={action.isRunning}
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
