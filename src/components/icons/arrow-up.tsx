import { component$, type QwikIntrinsicElements } from "@builder.io/qwik";

export const ArrowUp = component$((props: QwikIntrinsicElements["svg"]) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="1em"
      height="1em"
      viewBox="0 0 24 24"
      {...props}
    >
      <path
        fill="currentColor"
        d="M11.5 19V6.921l-5.792 5.792L5 12l7-7l7 7l-.708.713L12.5 6.921V19h-1Z"
      ></path>
    </svg>
  );
});
