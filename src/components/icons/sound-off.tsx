import { component$, type QwikIntrinsicElements } from "@builder.io/qwik";

export const SoundOff = component$((props: QwikIntrinsicElements["svg"]) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 22 22"
      fill="none"
      stroke="#474747"
      {...props}
    >
      <path
        d="M11.0007 2.75V19.25C7.79232 19.25 5.4083 15.0513 5.4083 15.0513H2.75065C2.24439 15.0513 1.83398 14.6409 1.83398 14.1346V7.79662C1.83398 7.29034 2.24439 6.87995 2.75065 6.87995H5.4083C5.4083 6.87995 7.79232 2.75 11.0007 2.75Z"
        fill="#474747"
      />
      <path d="M14 8L19 15" />
      <path d="M19 8L14 15" />
    </svg>
  );
});
