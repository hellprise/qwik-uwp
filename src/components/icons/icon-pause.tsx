import { component$, type QwikIntrinsicElements } from "@builder.io/qwik";

export const IconPause = component$((props: QwikIntrinsicElements["svg"]) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 30 30"
      fill="none"
      {...props}
    >
      {/* <path
      d="M29.5 15C29.5 23.0081 23.0081 29.5 15 29.5C6.99187 29.5 0.5 23.0081 0.5 15C0.5 6.99187 6.99187 0.5 15 0.5C23.0081 0.5 29.5 6.99187 29.5 15Z"
      stroke="url(#paint0_linear_2063_3716)"
    /> */}
      <path
        d="M12.8705 20.2534L11.8701 20.2534L11.8701 10.1304L12.8705 10.1304L12.8705 20.2534ZM18.2536 20.2534L17.2532 20.2534L17.2532 10.1304L18.2536 10.1304L18.2536 20.2534Z"
        fill="#A8A8A8"
      />
      {/* <defs>
      <linearGradient
        id="paint0_linear_2063_3716"
        x1={15}
        y1={0}
        x2={15}
        y2={30}
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="white" />
        <stop offset={1} stopColor="white" stopOpacity={0.2} />
      </linearGradient>
    </defs> */}
    </svg>
  );
});
