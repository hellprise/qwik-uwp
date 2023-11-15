import { component$, type QwikIntrinsicElements } from "@builder.io/qwik";

export const IconClip = component$((props: QwikIntrinsicElements["svg"]) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 28 28"
      fill="none"
      {...props}
    >
      <path
        d="M15.2381 21.8375C15.2381 21.8375 21.8378 15.2378 23.4877 13.5879C25.1376 11.938 25.9625 7.81317 23.0752 4.92585C20.1878 2.03849 16.0631 2.86345 14.4131 4.51337C12.7632 6.16327 4.10115 14.8254 3.27619 15.6503C2.45123 16.4753 1.2138 19.3626 3.68867 21.8375C6.16354 24.3123 9.05092 23.0749 9.87587 22.25C10.7008 21.425 19.7753 12.3505 20.6003 11.5255C21.4253 10.7006 21.8378 8.63818 20.6003 7.4007C19.3629 6.16327 17.3005 6.57575 16.4755 7.4007C15.6506 8.22571 8.63844 15.2378 8.63844 15.2378"
        stroke="#A8A8A8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
});
