import "~core/translations.ts";
import { Box, Paper, Typography, TextField, Stack } from "@mui/material";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

import { Routes } from "../router/constants.ts";
import smileyFaceImage from "~assets/images/auth_smiley.png";
import { AppPasswordTextField } from "~components/AppPasswordTextField.tsx";
import { AppPrimaryButton } from "~components/AppPrimaryButton.tsx";
import { createSxStyles } from "~utils/createSxStyles.ts";

export const LoginPage = () => {
  const { t } = useTranslation();

  return (
    <Stack gap="3rem" alignItems="center" sx={componentSx.pageContainer}>
      <Paper sx={componentSx.formContainer} elevation={0} variant="outlined">
        <Stack component="form" gap="2rem" alignItems="center" onSubmit={() => console.log("hello")}>
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
            <TextField label={t("INPUT.EMAIL_ADDRESS_LABEL")} fullWidth />

            <AppPasswordTextField label={t("INPUT.PASSWORD_LABEL")} fullWidth />
          </Stack>

          <AppPrimaryButton type="submit" text={t("LOGIN.CONFIRM_BUTTON")} fullWidth />
        </Stack>
      </Paper>

      <Typography>@ Trello Turbo team</Typography>
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
