import {  routeAction$ } from "@builder.io/qwik-city";
import { SPEECH_TO_SPEECH_URL } from "~/constants";

export const useTextToTextApi = routeAction$(async (data, { fail }) => {
 console.log("ddddddddddddddd");
 
  
  if (!data.message) return;

  try {
    const response = await fetch(SPEECH_TO_SPEECH_URL, {
      body: JSON.stringify({
        content: data.message,
        language_code: "uk_UA",
      }),
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      console.log("error >>", response.statusText);
      return fail(500, { message: "Network error !" });
    }

    const result: { content: string; language_code: string } =
      await response.json();

    return { success: true, result };
  } catch (error) {
    console.log("error >>", error);
    return fail(500, { message: "Network error !" });
  }
});
