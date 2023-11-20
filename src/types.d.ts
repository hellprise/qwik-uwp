type TMessage = {
  from: "agent" | "customer";
  content: string;
  base64AudioData?: string;
};

type TFetchData = {
  content: string;
  language_code: string;
};

type TLangCode =
  | "en_GB"
  | "es_ES"
  | "sv_SE"
  | "uk_UA"
  | "nl_NL"
  | "da_DK"
  | "de_DE"
  | "pl_PL"
  | "ru_RU";

  type TMessageBlock = {
    isFetching: Signal<boolean>;
    sendMessage: PropFunction<(message: string) => Promise<void>>;
  };