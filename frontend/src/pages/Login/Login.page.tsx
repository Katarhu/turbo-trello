import { Visibility, VisibilityOff } from "@mui/icons-material";
import { Box, Button, InputAdornment, Typography } from "@mui/material";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";

import { InlineLink } from "~components/ui/InLineLink/InlineLink.tsx";
import { ValidatedInputField } from "~components/ui/ValidateInputField/ValidateInputField.tsx";
import { AppLanguage } from "~constants/language.constants.ts";
import { ValidationMsg } from "~constants/validation.constanse";
import { LoginUserDto } from "~models/dto/loginUser.dto.ts";
import { LanguageService } from "~utils/language.service.ts";

export const LoginPage = () => {
  const [visiblePassword, setVisiblePassword] = useState<boolean>(false);
  const { t: translate } = useTranslation();
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm<LoginUserDto>({
    shouldFocusError: false,
  });

  const handleLogin = () => {
    reset();
  };

  const handleVisibility = () => {
    setVisiblePassword(!visiblePassword);
  };

  return (
    <div>
      <form onSubmit={handleSubmit(handleLogin)} autoComplete="off">
        <Box
          sx={{
            width: "30.5rem",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            margin: "3.125rem auto",
            padding: "2.25rem ",
            borderRadius: "1rem",
            boxShadow: "rgba(99, 99, 99, 0.2) 0 2px 8px 0",
          }}
        >
          <Typography sx={{ fontSize: "1.6rem", margin: "0 0 4.2rem 0" }}>{translate("loginForm.header")}</Typography>
          <ValidatedInputField
            label={translate("email")}
            register={register("email", {
              required: ValidationMsg.EMPTYFIELD,
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: ValidationMsg.INVALIDEMAIL,
              },
            })}
            error={errors.email}
            sx={{ margin: "0 0 2.6rem 0" }}
            fullWidth
          />
          <ValidatedInputField
            label={translate("password")}
            register={register("password", {
              required: ValidationMsg.EMPTYFIELD,
            })}
            error={errors.password}
            type={visiblePassword ? "text" : "password"}
            autoComplete="current-password"
            InputProps={{
              endAdornment: (
                <InputAdornment variant="standard" position="end" sx={{ cursor: "pointer" }} onClick={handleVisibility}>
                  {visiblePassword ? <Visibility /> : <VisibilityOff />}
                </InputAdornment>
              ),
            }}
            sx={{ margin: "0 0 3rem 0" }}
            fullWidth
          />
          <Button variant="contained" type="submit" sx={{ margin: "0 0 1.8rem 0" }} fullWidth>
            {translate("loginForm.submit")}
          </Button>
          <Box sx={{ alignSelf: "flex-start" }}>
            <InlineLink to="#" sx={{ display: "block" }}>
              {translate("loginForm.noAccount")}
            </InlineLink>
            <InlineLink to="#" sx={{ display: "block" }}>
              {translate("loginForm.forgotPassword")}
            </InlineLink>
          </Box>
        </Box>
      </form>
      <button onClick={() => LanguageService.changeLanguage(AppLanguage.UK)}>Українська</button>
      <button onClick={() => LanguageService.changeLanguage(AppLanguage.EN)}>English</button>
    </div>
  );
};
