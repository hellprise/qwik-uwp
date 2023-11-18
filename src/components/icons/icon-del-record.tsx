import { component$, type QwikIntrinsicElements } from "@builder.io/qwik";

export const IconDelRecord = component$(
  (props: QwikIntrinsicElements["svg"]) => {
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 14 18"
        fill="#B74545"
        {...props}
      >
        <path d="M13.346 5.94328C13.509 6.11639 13.5996 6.34439 13.5996 6.58123L13.5996 16.9652C13.5996 17.4816 13.1775 17.9002 12.6568 17.9002L1.34247 17.9002C0.821727 17.9002 0.39961 17.4816 0.39961 16.9652L0.39961 6.58123C0.39961 6.34439 0.490218 6.11639 0.653191 5.94327L5.54321 0.747624C6.33288 -0.0914052 7.66634 -0.0914055 8.45601 0.747624L13.346 5.94328Z" />
      </svg>
    );
  },
);
