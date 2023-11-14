import { component$, type QwikIntrinsicElements } from "@builder.io/qwik";

export const FlagDE = component$((props: QwikIntrinsicElements["svg"]) => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" {...props}>
      <path d="M-8 10.3703H40V-0.888916H-8V10.3703Z" fill="#262626" />
      <path d="M-8 21.6299H40V10.3706H-8V21.6299Z" fill="#F01515" />
      <path d="M-8 32.8887H40V21.6294H-8V32.8887Z" fill="#FFD521" />
    </svg>
  );
});
