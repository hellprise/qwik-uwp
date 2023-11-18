import { $ } from "@builder.io/qwik";

import {
  SPEECH_TO_SPEECH_URL,
  SPEECH_TO_TEXT_URL,
  TEXT_TO_SPEECH_URL,
  TEXT_TO_TEXT_URL,
} from "~/constants";
import { type TFetchData } from "~/types";

type TOptions = {
  method: "POST";
  headers: Record<string, string>;
  mode: "cors" | "no-cors";
  body: string;
};

const executeFetch = async (
  url: string,
  body: TFetchData,
): Promise<TFetchData | undefined> => {
  const requestOptions: TOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    mode: "cors",
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

export const textToTextApi = $(async (data: TFetchData) => {
  return await executeFetch(TEXT_TO_TEXT_URL, data);
});

export const textToSpeechApi = $(async (data: TFetchData) => {
  return await executeFetch(TEXT_TO_SPEECH_URL, data);
});

export const speechToTextApi = $(async (data: TFetchData) => {
  return await executeFetch(SPEECH_TO_TEXT_URL, data);
});

export const speechToSpeechApi = $(async (data: TFetchData) => {
  return await executeFetch(SPEECH_TO_SPEECH_URL, data);
});
