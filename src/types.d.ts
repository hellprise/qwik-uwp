import { type Signal } from "@builder.io/qwik";
// import { type ActionStore } from "@builder.io/qwik-city";

export type TMessage = {
  from: "agent" | "customer";
  content: string;
};

export type TFetchData = {
  content: string;
  language_code: string;
};

export type TLangCode =
  | "en_GB"
  | "es_ES"
  | "sv_SE"
  | "uk_UA"
  | "nl_NL"
  | "da_DK"
  | "de_DE"
  | "pl_PL"
  | "ru_RU";

export type TTextInputField = {
  isFetching: Signal<boolean>;
  sendMessage: QRL<() => Promise<void>>;
};
