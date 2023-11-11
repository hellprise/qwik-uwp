import type { QwikIntrinsicElements } from "@builder.io/qwik";

export const SoundOn = (props: QwikIntrinsicElements["svg"], key: string) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={23}
      height={22}
      viewBox="0 0 23 22"
      fill="none"
      {...props}
      key={key}
    >
      <path
        d="M11.5622 2.75V19.25C8.35384 19.25 5.96982 15.0513 5.96982 15.0513H3.31217C2.80591 15.0513 2.39551 14.6409 2.39551 14.1346V7.79662C2.39551 7.29034 2.80591 6.87995 3.31217 6.87995H5.96982C5.96982 6.87995 8.35384 2.75 11.5622 2.75Z"
        fill="#9463FE"
        stroke="#9463FE"
        strokeLinejoin="round"
      />
      <path
        d="M15.2295 6.875C15.5151 7.13006 15.774 7.4157 16.0014 7.72695C16.6681 8.63977 17.0628 9.77272 17.0628 11C17.0628 12.2166 16.6748 13.3406 16.0187 14.2493C15.7872 14.5697 15.5224 14.8634 15.2295 15.125"
        stroke="#9463FE"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M16.2539 18.8768C18.9341 17.277 20.7291 14.3481 20.7291 11C20.7291 7.70389 18.9894 4.8141 16.3782 3.19873"
        stroke="#9463FE"
        strokeLinecap="round"
      />
    </svg>
  );
};
