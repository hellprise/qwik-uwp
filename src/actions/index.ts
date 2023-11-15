import { $ } from "@builder.io/qwik";
import {
  speechToSpeechApiUrl,
  speechToTextApiUrl,
  textToSpeechApiUrl,
  textToTextApiUrl,
} from "~/config";

interface fetchData {
  content: string;
  language_code: string;
}

export const textToTextApi = $(async (data: fetchData) => {
  const res = await fetch(textToTextApiUrl, {
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

export const textToSpeechApi = $(async (data: fetchData) => {
  const res = await fetch(textToSpeechApiUrl, {
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

export const speechToTextApi = $(async (data: fetchData) => {
  const res = await fetch(speechToTextApiUrl, {
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

export const speechToSpeechApi = $(async (data: fetchData) => {
  const res = await fetch(speechToSpeechApiUrl, {
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
