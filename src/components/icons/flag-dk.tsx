import { component$, type QwikIntrinsicElements } from "@builder.io/qwik";

export const FlagDK = component$((props: QwikIntrinsicElements["svg"]) => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" {...props}>
      <rect width={32} height={32} fill="white" />
      <path
        d="M-4.44488 0C-5.42672 0 -6.22266 0.795939 -6.22266 1.77778V12.8H6.47576V0H-4.44488ZM12.825 0V12.8H38.2218V1.77778C38.2218 0.795938 37.4258 0 36.444 0H12.825ZM38.2218 19.2H12.825V32H36.444C37.4259 32 38.2218 31.2041 38.2218 30.2222V19.2ZM6.47576 32V19.2H-6.22266V30.2222C-6.22266 31.2041 -5.42672 32 -4.44488 32H6.47576Z"
        fill="#EF264D"
      />
    </svg>
  );
});
