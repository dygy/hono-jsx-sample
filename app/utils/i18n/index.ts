export type Language = "en" | "ar";

import en from "./dict/en.json" assert { type: "JSON" };
import ar from "./dict/ar.json" assert { type: "JSON" };

const dictionaries = { en, ar };

export const getDictionary = (locale: Language) => {
  const usedLocale = dictionaries[locale] ? locale : "en";

  return dictionaries[usedLocale];
};

export type Dictionary = ReturnType<typeof getDictionary>;
