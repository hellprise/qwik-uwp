import { component$, useSignal, $, useVisibleTask$ } from "@builder.io/qwik";
import { type QwikKeyboardEvent } from "@builder.io/qwik";
import { type TTextInputField } from "~/types";

import { BtnAddDocument, BtnSend } from "../buttons";

export const TextInputField = component$<TTextInputField>(
  ({ sendMessage, isFetching }) => {
    const ref = useSignal<HTMLTextAreaElement>();
    const inputtedText = useSignal<string>();

    const handleSubmit = $(() => {
      sendMessage(inputtedText.value);
      inputtedText.value = "";
    });

    const handleKeyDown = $((e: QwikKeyboardEvent<HTMLFormElement>) => {
      if (e.ctrlKey && e.key === "Enter") {
        handleSubmit();
      }
    });

    useVisibleTask$(({ track }) => {
      track(() => inputtedText.value);

      if (!ref.value) return;
      const height = ref.value.scrollHeight;

      if (height > 42 && height < 44) return;

      if (!inputtedText.value) {
        ref.value.style.height = "44px";
        return;
      }

      const newHeight = height + 2; // 2 is added because of the border;
      ref.value.style.height = newHeight > 140 ? "140px" : newHeight + "px";
    });

    useVisibleTask$(({ track }) => {
      track(() => isFetching.value);
      if (ref.value && !isFetching.value) {
        ref.value.focus();
      }
    });

    return (
      <form
        preventdefault:submit
        class="flex items-center justify-between gap-3"
        onSubmit$={handleSubmit}
        onKeyDown$={handleKeyDown}
      >
        <div class="h-7 shrink-0">
          <BtnAddDocument />
        </div>

        <textarea
          ref={ref}
          autoComplete="off"
          class="gradient-bd-white-bg-gray h-11 w-full grow resize-none overflow-hidden rounded-[10px] p-[10px] text-sm text-[#DEDEDE] outline-none transition-transform"
          placeholder={
            isFetching.value ? "Wait for the AI reply" : "Type a message"
          }
          bind:value={inputtedText}
          disabled={isFetching.value}
        />

        <div class="shrink-0">
          <BtnSend disabled={!inputtedText.value || isFetching.value} />
        </div>
      </form>
    );
  },
);
