import { component$, type QwikIntrinsicElements } from "@builder.io/qwik";

export const FlagNL = component$((props: QwikIntrinsicElements["svg"]) => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" {...props}>
      <rect width={32} height={32} fill="white" />
      <path
        d="M-6.22266 10.6667H38.2218V0H-6.22266V10.6667Z"
        fill="#CA2B39"
      />
      <path
        d="M-6.22266 31.9999H38.2218V21.3333H-6.22266V31.9999Z"
        fill="#2C56A2"
      />
    </svg>
  );
});
