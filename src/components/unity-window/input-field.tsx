import { component$, useSignal, $ } from "@builder.io/qwik";
import { Form } from "@builder.io/qwik-city";
import { type TTextInputField } from "~/types";
import { BtnAddDocument, BtnSend } from "../buttons";
// import { type TMessage } from "~/types";

export const TextInputField = component$<TTextInputField>(
  ({ inputtedText, actTextToText }) => {
    const ref = useSignal<HTMLTextAreaElement>();

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

    return (
      <Form
        action={actTextToText}
        class="flex items-center justify-between gap-3"
        onSubmit$={handleReset}
        onSubmitCompleted$={handleReset}
      >
        <div class="h-7 shrink-0">
          <BtnAddDocument />
        </div>

        <textarea
          ref={ref}
          autoComplete="off"
          name="message"
          class="h-11 grow rounded-[10px] border bg-[#323232] p-[10px] text-sm text-[#DEDEDE] outline-none"
          placeholder={
            actTextToText.isRunning ? "Wait for the AI reply" : "Type a message"
          }
          value={inputtedText.value}
          onInput$={[handleInput, handleResize]}
          disabled={actTextToText.isRunning}
        />

        <div class="shrink-0">
          <BtnSend disabled={!inputtedText.value || actTextToText.isRunning} />
        </div>
      </Form>
    );
  },
);
