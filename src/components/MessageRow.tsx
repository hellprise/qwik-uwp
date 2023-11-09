import { component$ } from "@builder.io/qwik";
import { type Message } from "../types";

export default component$<Message>(({ from, content }) => {
  return (
    <div
      class={`w-fit rounded-lg px-3 py-1.5
                ${
                  from === "customer"
                    ? "ml-10 self-end bg-[#2b5278] text-white"
                    : "mr-10 self-start bg-[#abcdef] text-black"
                }`}
    >
      {content}
    </div>
  );
});
