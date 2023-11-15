import { type Signal, component$ } from "@builder.io/qwik";
import { type TMessage } from "~/types";

type Props = TMessage & { ref?: Signal<Element | undefined> };

export const MessageRow = component$<Props>(({ from, content }) => {
  return (
    <span
      // ref={ref}
      class={`w-fit rounded-lg px-3 py-1.5
                ${
                  from === "customer"
                    ? "ml-10 self-end bg-[#2b5278] text-white"
                    : "mr-10 self-start bg-[#abcdef] text-black"
                }`}
    >
      {content}
    </span>
  );
});
