import { component$, type QwikIntrinsicElements } from "@builder.io/qwik";

export const FlagES = component$((props: QwikIntrinsicElements["svg"]) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 32 32"
      fill="none"
      {...props}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M-2.66797 8.53333H41.7765V0H-2.66797V8.53333Z"
        fill="#DD172C"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M-2.66797 32.0004H41.7765V23.467H-2.66797V32.0004Z"
        fill="#DD172C"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M-2.66797 23.4663H41.7765V8.53296H-2.66797V23.4663Z"
        fill="#FFD133"
      />
      <path
        d="M6.67449 14.4832C6.66021 14.3105 6.79651 14.1625 6.96978 14.1625H10.9736C11.1468 14.1625 11.2831 14.3105 11.2689 14.4832L10.8827 19.1543C10.8446 19.6152 10.4594 19.9699 9.99683 19.9699H7.94652C7.48399 19.9699 7.09876 19.6152 7.06065 19.1543L6.67449 14.4832Z"
        stroke="#A41517"
        strokeWidth={0.592593}
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M6.85547 16H11.0883V17.0667H10.0301L8.97187 19.2L7.91367 17.0667H6.85547V16Z"
        fill="#A41517"
      />
      <rect
        x={3.68164}
        y={12.8003}
        width={2.1164}
        height={7.46667}
        rx={0.592593}
        fill="#A41517"
      />
      <rect
        x={12.1465}
        y={12.8003}
        width={2.1164}
        height={7.46667}
        rx={0.592593}
        fill="#A41517"
      />
      <path
        d="M6.85547 11.8519C6.85547 11.1974 7.38609 10.6667 8.04065 10.6667H9.90309C10.5576 10.6667 11.0883 11.1974 11.0883 11.8519V12.5038C11.0883 12.6674 10.9556 12.8001 10.792 12.8001H7.15177C6.98813 12.8001 6.85547 12.6674 6.85547 12.5038V11.8519Z"
        fill="#A41517"
      />
    </svg>
  );
});
