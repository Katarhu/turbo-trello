import { Box, Stack, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";

import { createSxStyles } from "~utils/createSxStyles.ts";

import { LanguageSwitcher } from "./LanguageSwitcher";

export const PrivateHeader = () => {
  const { t } = useTranslation();

  return (
    <Box component={"header"} sx={componentSx.header}>
      <Typography color="primary" fontWeight={600} fontSize="1.5rem">
        Trello Turbo
      </Typography>
      <Stack direction="row" gap="1rem">
        <LanguageSwitcher />
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
