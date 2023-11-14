import { component$ } from "@builder.io/qwik";
import Image from "~/components/img/unity.png?jsx";

 interface BtnUnityProps {}

export const BtnUnity = component$<BtnUnityProps>((props) => {
  {
    props;
  }

  return (
    <button class="h-16 w-16 rounded-full border">
      <Image />
    </button>
  );
});
