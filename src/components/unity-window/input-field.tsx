import { component$, useSignal, $ } from "@builder.io/qwik";

import { BtnAddDocument, BtnSend } from "../buttons";
import { type TTextInputField } from "~/types";

export const TextInputField = component$<TTextInputField>(
  ({ sendMessage, isFetching }) => {
    const ref = useSignal<HTMLTextAreaElement>();
    const inputtedText = useSignal<string>();

    const handleInput = $((_: Event, el: HTMLTextAreaElement) => {
      inputtedText.value = el.value;
    });

    const handleResize = $((_: Event, el: HTMLTextAreaElement) => {
      const newHeight = el.scrollHeight + 2; // 2 is added because of the border;
      el.style.height = newHeight > 140 ? "140px" : newHeight + "px";
    });

    const handleReset = $(() => {
      inputtedText.value = "";
      if (ref.value) {
        ref.value.style.height = "44px";
      }
    });

    const handleSubmit = $(() => {
      sendMessage(inputtedText.value);
      handleReset();
    });

    return (
      <form
        preventdefault:submit
        class="flex items-center justify-between gap-3"
        onSubmit$={handleSubmit}
      >
        <div class="h-7 shrink-0">
          <BtnAddDocument />
        </div>

        <textarea
          ref={ref}
          autoComplete="off"
          class="h-11 grow resize-none rounded-[10px] border bg-[#323232] p-[10px] text-sm text-[#DEDEDE] outline-none disabled:border-slate-500"
          placeholder={
            isFetching.value ? "Wait for the AI reply" : "Type a message"
          }
          value={inputtedText.value}
          onInput$={[handleInput, handleResize]}
          disabled={isFetching.value}
        />

        <div class="shrink-0">
          <BtnSend disabled={!inputtedText.value || isFetching.value} />
        </div>
      </form>
    );
  },
);
