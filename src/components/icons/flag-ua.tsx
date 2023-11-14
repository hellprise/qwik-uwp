import { component$, type QwikIntrinsicElements } from "@builder.io/qwik";

export const FlagUA = component$((props: QwikIntrinsicElements["svg"]) => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" {...props}>
      <path
        d="M-6.22266 17.0667H38.2218V0H-6.22266V17.0667Z"
        fill="#156DD1"
      />
      <path
        d="M-6.22266 32.0002H38.2218V17.0669H-6.22266V32.0002Z"
        fill="#FFD948"
      />
    </svg>
  );
});
