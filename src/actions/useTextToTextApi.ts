import { globalAction$ } from "@builder.io/qwik-city";
import { textToTextApiUrl } from "~/config";

export const useTextToTextApi = globalAction$(async (data, { fail }) => {
 console.log("ddddddddddddddd");
 
  
  if (!data.message) return;

  try {
    const response = await fetch(textToTextApiUrl, {
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
