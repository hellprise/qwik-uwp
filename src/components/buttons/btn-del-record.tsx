import { component$ } from "@builder.io/qwik";
import { IconDelRecord } from "../icons";

interface Props {}

export const BtnDelRecord = component$<Props>(() => {
  return (
    <button disabled class="h-[22px] w-[22px">
      <IconDelRecord />
    </button>
  );
});
