import {
  SPEECH_TO_SPEECH_URL,
  SPEECH_TO_TEXT_URL,
  TEXT_TO_SPEECH_URL,
  TEXT_TO_TEXT_URL,
} from "~/constants";

const headers = {
  Accept: "*/*",
  "User-Agent": "Thunder Client (https://www.thunderclient.com)",
  "Content-Type": "application/json",
};

const executeFetch = async (
  url: string,
  mode: "cors" | "no-cors",
  body: TFetchData,
): Promise<TFetchData | undefined> => {
  const requestOptions = {
    method: "POST",
    headers,
    mode,
    body: JSON.stringify(body),
  };

  try {
    const response = await fetch(url, requestOptions);
    if (!response.ok) {
      throw new Error(response.statusText);
    }
    return await response.json();
  } catch (error) {
    console.error(`Could not fetch from ${url}.\nReason: ${error}`);
  }
};

export const textToTextApi = async (data: TFetchData) => {
  return await executeFetch(TEXT_TO_TEXT_URL, "cors", data);
};

export const textToSpeechApi = async (data: TFetchData) => {
  return await executeFetch(TEXT_TO_SPEECH_URL, "cors", data);
};

export const speechToTextApi = async (data: TFetchData) => {
  return await executeFetch(SPEECH_TO_TEXT_URL, "no-cors", data);
};

export const speechToSpeechApi = async (data: TFetchData) => {
  return await executeFetch(SPEECH_TO_SPEECH_URL, "no-cors", data);
};
