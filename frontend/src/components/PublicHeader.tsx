import { Box, Stack, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";

import { LanguageSwitcher } from "../features/LanguageSwitcher.tsx";
import { AppPrimaryButton } from "~components/AppPrimaryButton.tsx";
import { createSxStyles } from "~utils/createSxStyles.ts";

export const PublicHeader = () => {
  const { t } = useTranslation();

  return (
    <Box component={"header"} sx={componentSx.header}>
      <Typography color="primary" fontWeight={600} fontSize="1.5rem">
        Trello Turbo
      </Typography>
      <Stack direction="row" gap="1rem">
        <LanguageSwitcher />
        <AppPrimaryButton text={t("PUBLIC_HEADER.GET_STARTED")} />
      </Stack>
    </Box>
  );
};

const componentSx = createSxStyles({
  header: {
    display: "flex",
    justifyContent: "space-between",
    paddingBlock: "1.5rem",
    paddingInline: "2.5rem",
  },
});
