import { component$, type QwikIntrinsicElements } from "@builder.io/qwik";

export const IconCustomer = component$(
  (props: QwikIntrinsicElements["svg"]) => {
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 25 25"
        {...props}
      >
        <g>
          <rect
            width="23"
            height="23"
            x="1.023"
            y="0.886"
            fill="#323232"
            rx="11.5"
          ></rect>
          <rect
            width="23"
            height="23"
            x="1.023"
            y="0.886"
            stroke="url(#paint0_linear_2063_6914)"
            rx="11.5"
          ></rect>
          <path
            stroke="url(#paint1_linear_2063_6914)"
            strokeLinecap="round"
            d="M12.523 13.886a3.75 3.75 0 100-7.5 3.75 3.75 0 000 7.5zm0 0c-3.313 0-6 2.014-6 4.5m6-4.5c3.314 0 6 2.014 6 4.5"
          ></path>
          <defs>
            <linearGradient
              id="paint0_linear_2063_6914"
              x1="12.523"
              x2="12.523"
              y1="0.386"
              y2="24.386"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#fff"></stop>
              <stop offset="1" stopColor="#fff" stopOpacity="0.2"></stop>
            </linearGradient>
            <linearGradient
              id="paint1_linear_2063_6914"
              x1="12.523"
              x2="12.523"
              y1="6.386"
              y2="18.386"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#fff"></stop>
              <stop offset="1" stopColor="#fff" stopOpacity="0.2"></stop>
            </linearGradient>
          </defs>
        </g>
      </svg>
    );
  },
);
