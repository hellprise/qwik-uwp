import { component$, type QwikIntrinsicElements } from "@builder.io/qwik";

export const FlagRU = component$((props: QwikIntrinsicElements["svg"]) => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" {...props}>
      <rect width={32} height={32} fill="white" />
      <path
        d="M-6.22266 21.3334H38.2218V10.6667H-6.22266V21.3334Z"
        fill="#0C47B7"
      />
      <path
        d="M-6.22266 31.9999H38.2218V21.3333H-6.22266V31.9999Z"
        fill="#E53B35"
      />
    </svg>
  );
});
