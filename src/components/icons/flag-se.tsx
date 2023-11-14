import { component$, type QwikIntrinsicElements } from "@builder.io/qwik";

export const FlagSE = component$((props: QwikIntrinsicElements["svg"]) => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" {...props}>
      <rect width={32} height={32} fill="#157CBB" />
      <path
        d="M-6.22266 19.2H6.47576V32H12.825V19.2H38.2218V12.8H12.825V0H6.47576V12.8H-6.22266V19.2Z"
        fill="#FFD34D"
      />
    </svg>
  );
});
