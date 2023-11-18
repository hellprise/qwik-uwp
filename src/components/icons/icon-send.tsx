import { component$, type QwikIntrinsicElements } from "@builder.io/qwik";

export const IconSend = component$((props: QwikIntrinsicElements["svg"]) => {
  return (
    <svg
      width={20}
      height={16}
      viewBox="0 0 20 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M5.5 1L1 5.66667M1 5.66667L5.5 10.3333M1 5.66667H17.3125C18.2445 5.66667 19 6.45014 19 7.41667V15"
        stroke="currentColor"
      />
    </svg>
  );
});
