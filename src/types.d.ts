import { type Signal } from "@builder.io/qwik";
import { type ActionStore } from "@builder.io/qwik-city";

export type TMessage = {
  from: "agent" | "customer";
  content: string;
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
  inputtedText: Signal<string | undefined>;
  actTextToText: ActionStore<
    | {
        message: string;
        failed: true;
        success?: undefined;
        result?: undefined;
      }
    | {
        success: boolean;
        result: {
          content: string;
          language_code: string;
        };
        message?: undefined;
        failed?: undefined;
      },
    Record<string, any>,
    true
  >;
};
