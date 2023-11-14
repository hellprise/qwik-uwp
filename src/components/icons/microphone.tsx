import { component$, type QwikIntrinsicElements } from "@builder.io/qwik";

export const Microphone = component$((props: QwikIntrinsicElements["svg"]) => {
  return (
    <svg
      width={33}
      height={33}
      viewBox="0 0 33 33"
      fill="none"
      stroke="#9463FE"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M21.3125 7.5625C21.3125 4.90463 19.1579 2.75 16.5 2.75C13.8421 2.75 11.6875 4.90463 11.6875 7.5625V16.5C11.6875 19.1579 13.8421 21.3125 16.5 21.3125C19.1579 21.3125 21.3125 19.1579 21.3125 16.5V7.5625Z"
        fill="#9463FE"
      />
      <path d="M6.1875 15.8125C6.1875 21.508 10.8045 26.125 16.5 26.125C22.1955 26.125 26.8125 21.508 26.8125 15.8125" />
      <path d="M16.5 26.125V30.25" />
    </svg>
  );
});
