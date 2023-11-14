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
