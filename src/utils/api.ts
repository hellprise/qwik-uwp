import { $ } from "@builder.io/qwik";

import {
  SPEECH_TO_SPEECH_URL,
  SPEECH_TO_TEXT_URL,
  TEXT_TO_SPEECH_URL,
  TEXT_TO_TEXT_URL,
} from "~/constants";
import { type TFetchData } from "~/types";

export const textToTextApi = async (data: TFetchData) => {
  return await executeFetch<TFetchData>(TEXT_TO_TEXT_URL, data);
};

export const textToSpeechApi = $(async (data: TFetchData) => {
  const res = await fetch(TEXT_TO_SPEECH_URL, {
    body: JSON.stringify(data),
    method: "POST",
    mode: "cors",
    headers: {
      "Content-Type": "application/json",
    },
  });
  console.log("res", res);

  return await res.json();
});

export const speechToTextApi = $(async (data: TFetchData) => {
  const res = await fetch(SPEECH_TO_TEXT_URL, {
    body: JSON.stringify(data),
    method: "POST",
    mode: "cors",
    headers: {
      "Content-Type": "application/json",
    },
  });
  console.log("res", res);

  return await res.json();
});

export const speechToSpeechApi = $(async (data: TFetchData) => {
  const res = await fetch(SPEECH_TO_SPEECH_URL, {
    body: JSON.stringify(data),
    method: "POST",
    mode: "cors",
    headers: {
      "Content-Type": "application/json",
    },
  });
  console.log("res", res);

  return await res.json();
});

export const executeFetch = async <R>(
  url: string,
  body: TFetchData,
): Promise<R | undefined> => {
  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    // mode: "cors",
    body: JSON.stringify(body),
  };

  try {
    const response = await fetch(url, requestOptions);
    if (response.status !== 200) {
      throw new Error(response.statusText);
    }
    return await response.json();
  } catch (error) {
    console.error(`Could not fetch from ${url}.\nReason: ${error}`);
  }
};
