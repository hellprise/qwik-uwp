import type { QwikIntrinsicElements } from "@builder.io/qwik";

export const SoundOff = (props: QwikIntrinsicElements["svg"], key: string) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={22}
      height={23}
      viewBox="0 0 22 23"
      fill="none"
      {...props}
      key={key}
    >
      <path
        d="M10.9997 3.44287V19.9429C7.79134 19.9429 5.40732 15.7441 5.40732 15.7441H2.74967C2.24341 15.7441 1.83301 15.3337 1.83301 14.8275V8.48949C1.83301 7.98321 2.24341 7.57282 2.74967 7.57282H5.40732C5.40732 7.57282 7.79134 3.44287 10.9997 3.44287Z"
        fill="#474747"
        stroke="#474747"
        strokeLinejoin="round"
      />
      <path d="M14 8.69287L19 15.6929" stroke="#474747" strokeLinecap="round" />
      <path d="M19 8.69287L14 15.6929" stroke="#474747" strokeLinecap="round" />
    </svg>
  );
};
