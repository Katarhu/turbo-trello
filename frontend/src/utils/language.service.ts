import i18next from "i18next";

import { AppLanguage } from "~constants/language.constants.ts";

export class LanguageService {
  static changeLanguage(currentLanguage: AppLanguage) {
    i18next.changeLanguage(currentLanguage);
  }
}
