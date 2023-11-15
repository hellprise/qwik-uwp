import { component$, type QwikIntrinsicElements } from "@builder.io/qwik";

export const ArrowUp = component$((props: QwikIntrinsicElements["svg"]) => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 36 36" {...props}>
      <path d="M18 27L18 9M18 9L9 18M18 9L27 18" stroke="#767676" />
    </svg>
  );
});
