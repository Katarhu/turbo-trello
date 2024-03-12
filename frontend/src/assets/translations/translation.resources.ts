import { AppLanguage } from "~constants/language.constants.ts";

import { enTranslations } from "./en.ts";
import { ukTranslations } from "./uk.ts";

export const resources = {
  [AppLanguage.EN]: enTranslations,
  [AppLanguage.UK]: ukTranslations,
};
