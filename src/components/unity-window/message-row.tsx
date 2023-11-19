import { type Signal, component$ } from "@builder.io/qwik";
import { type TMessage } from "~/types";

import { AudioPlayer } from "../audio-player/audio-player";
import { IconCustomer } from "../icons";
import ImageUnity from "~/components/img/unity.png?jsx";

type Props = TMessage & { ref?: Signal<Element | undefined> };

export const MessageRow = component$<Props>(
  ({ from, content, base64AudioData }) => {
    return from === "customer" ? (
      <div class="flex gap-2 self-end text-sm text-[#DEDEDE]">
        <span>{content}</span>

        <div class="h-6 w-6 shrink-0 rounded-full outline outline-1">
          <IconCustomer />
        </div>

        {base64AudioData && (
          <AudioPlayer isCustomer base64AudioData={base64AudioData} />
        )}
      </div>
    ) : (
      <div class="flex gap-2 text-sm text-[#BD9FFE]">
        <ImageUnity class="row-span-2 h-6 w-6 shrink-0" />

        <div class="flex flex-col gap-2">
          <span>{content}</span>

          {base64AudioData && <AudioPlayer base64AudioData={base64AudioData} />}
        </div>
      </div>
    );
  },
);

