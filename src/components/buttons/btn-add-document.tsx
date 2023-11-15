import { component$ } from "@builder.io/qwik";
import { IconClip } from "../icons";

interface Props {}

export const BtnAddDocument = component$<Props>(() => {
  return (
    <button class="h-7 w-7">
      <IconClip />
    </button>
  );
});
