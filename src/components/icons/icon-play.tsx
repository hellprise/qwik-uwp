import { component$, type QwikIntrinsicElements } from "@builder.io/qwik";

export const IconPlay = component$((props: QwikIntrinsicElements["svg"]) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 26 25"
      fill="none"
      {...props}
    >
      {/* <path
        d="M13 24.54C19.6274 24.54 25 19.374 25 13.0015C25 6.62888 19.6274 1.46289 13 1.46289C6.37258 1.46289 1 6.62888 1 13.0015C1 19.374 6.37258 24.54 13 24.54Z"
        stroke="url(#paint0_linear_2063_959)"
      /> */}
      <path
        d="M18.6575 12.5785C19.0268 12.7916 19.0268 13.3246 18.6575 13.5377L9.81903 18.6406C9.44981 18.8538 8.98828 18.5874 8.98828 18.161L8.98828 7.95519C8.98828 7.52885 9.44981 7.26239 9.81903 7.47556L18.6575 12.5785Z"
        fill="#A8A8A8"
      />
      {/* <defs>
        <linearGradient
          id="paint0_linear_2063_959"
          x1={13}
          y1={1.46289}
          x2={13}
          y2={24.54}
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="white" />
          <stop offset={1} stopColor="white" stopOpacity={0.2} />
        </linearGradient>
      </defs> */}
    </svg>
  );
});
