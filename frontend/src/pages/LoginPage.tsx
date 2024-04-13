import "~core/translations.ts";
import { Box, Paper, Typography, Stack, FormControl, InputLabel, OutlinedInput, FormHelperText } from "@mui/material";
import { FieldError, useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

import { Routes } from "../router/constants.ts";
import smileyFaceImage from "~assets/images/auth_smiley.png";
import { AppPasswordTextField } from "~components/AppPasswordTextField.tsx";
import { AppPrimaryButton } from "~components/AppPrimaryButton.tsx";
import { ValidationConstants, validationKeys } from "~constants/ValidationConstants.ts";
import { LoginPageFunctions } from "~pages/AuthFunctions.ts";
import { LoginForm } from "~pages/LoginPageTypes.ts";
import { createSxStyles } from "~utils/createSxStyles.ts";

export const LoginPage = () => {
  const { t } = useTranslation();
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<LoginForm>();

  const emailFormControl = register("email", {
    required: {
      value: true,
      message: validationKeys.REQUIRED,
    },
    pattern: {
      value: ValidationConstants.EMAIL_REGEXP_PATTERN,
      message: validationKeys.EMAIL,
    },
  });
  const passwordFormControl = register("password", {
    required: {
      value: true,
      message: validationKeys.REQUIRED,
    },
    minLength: {
      value: ValidationConstants.MIN_PASSWORD_LENGTH,
      message: validationKeys.MIN_LENGTH,
    },
    maxLength: {
      value: ValidationConstants.MAX_PASSWORD_LENGTH,
      message: validationKeys.MAX_LENGTH,
    },
  });

  const translateValidationError = (error: FieldError | undefined) => {
    if (error === undefined) return;

    if (error.message === undefined) return;

    const translationParams = LoginPageFunctions.getTranslationParams(error.message);

    if (!translationParams) return;

    return t(...translationParams);
  };

  const onSubmit = (data: LoginForm) => {
    console.log(data);
  };

  return (
    <Stack gap="3rem" alignItems="center" sx={componentSx.pageContainer}>
      <Paper sx={componentSx.formContainer} elevation={0} variant="outlined">
        <Stack component="form" gap="2rem" alignItems="center" onSubmit={handleSubmit(onSubmit)}>
          <Box sx={componentSx.imageContainer}>
            <Box component="img" sx={componentSx.image} src={smileyFaceImage} alt="Smiley face" />
          </Box>

          <Stack gap="0.75rem" textAlign="center">
            <Typography variant="h2">{t("LOGIN.SIGN_IN_TO")} Trello Turbo</Typography>
            <Typography>
              {t("LOGIN.DONT_HAVE_ACCOUNT")}{" "}
              <Typography
                component={Link}
                variant="body2"
                to={Routes.REGISTER}
                sx={{ textDecoration: "none", whiteSpace: "nowrap" }}
              >
                {t("LOGIN.REGISTER_LINK")}
              </Typography>
            </Typography>
          </Stack>

          <Stack gap="2rem" width="100%">
            <FormControl fullWidth error={!!errors.email}>
              <InputLabel htmlFor="email_input">{t("INPUT.EMAIL_ADDRESS_LABEL")}</InputLabel>
              <OutlinedInput id="email_input" label={t("INPUT.EMAIL_ADDRESS_LABEL")} {...emailFormControl} />
              <FormHelperText>{translateValidationError(errors.email)}</FormHelperText>
            </FormControl>

            <FormControl fullWidth error={!!errors.password}>
              <InputLabel htmlFor="password_input">{t("INPUT.PASSWORD_LABEL")}</InputLabel>
              <AppPasswordTextField id="password_input" label={t("INPUT.PASSWORD_LABEL")} {...passwordFormControl} />
              <FormHelperText>{translateValidationError(errors.password)}</FormHelperText>
            </FormControl>
          </Stack>

          <AppPrimaryButton type="submit" disabled={!isValid} text={t("LOGIN.CONFIRM_BUTTON")} fullWidth />
        </Stack>
      </Paper>

      <Typography>@Trello Turbo team</Typography>
    </Stack>
  );
};

const componentSx = createSxStyles({
  pageContainer: {
    paddingBlock: "2rem",
  },
  formContainer: {
    width: "100%",
    maxWidth: "28rem",
    paddingBlock: "2.5rem",
    paddingInline: "2rem",
  },
  imageContainer: {
    maxWidth: "8rem",
    maxHeight: "8rem",
  },
  image: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
  },
});
