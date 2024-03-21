import { Typography } from "@mui/material";
import { useTranslation } from "react-i18next";

import { AppLanguage } from "~constants/language.constants.ts";
import { LanguageService } from "~utils/language.service.ts";

import "../../core/translations.ts";

export const LoginPage = () => {
  const { t: translate } = useTranslation();

  return (
    <div>
      <Typography>{translate("polution")}</Typography>
      <Typography>{translate("login")}</Typography>
      <button onClick={() => LanguageService.changeLanguage(AppLanguage.UK)}>Українська</button>
      <button onClick={() => LanguageService.changeLanguage(AppLanguage.EN)}>English</button>
    </div>
  );
};
