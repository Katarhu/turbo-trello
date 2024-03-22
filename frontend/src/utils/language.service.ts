import i18next from "i18next";

import { AppLanguage } from "~constants/language.constants.ts";

export class LanguageService {
  constructor() {
    i18next.services.formatter?.add("lowercase", (value) => {
      return value.toLowerCase();
    });
  }
  static changeLanguage(currentLanguage: AppLanguage) {
    i18next.changeLanguage(currentLanguage);
  }
}
