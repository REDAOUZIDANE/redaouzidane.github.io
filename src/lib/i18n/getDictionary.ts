import type { Locale } from "./config";
import type { Dictionary } from "./types";
import en from "./en";
import fr from "./fr";

const dictionaries: Record<Locale, Dictionary> = { en, fr };

export function getDictionary(locale: Locale): Dictionary {
  return dictionaries[locale];
}
