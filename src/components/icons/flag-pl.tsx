import { component$, type QwikIntrinsicElements } from "@builder.io/qwik";

export const FlagPL = component$((props: QwikIntrinsicElements["svg"]) => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" {...props}>
      <rect width={32} height={32} fill="white" />
      <path d="M-8 32.8888H40V14.874H-8V32.8888Z" fill="#EB2A50" />
    </svg>
  );
});
