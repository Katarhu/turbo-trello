import { Box, Stack } from "@mui/material";
import { Outlet } from "react-router-dom";

import { MainSidebar } from "~features/MainSidebar.tsx";
import { PrivateHeader } from "~features/PrivateHeader.tsx";

export const PrivatePage = () => {
  return (
    <Box sx={{ height: "100%" }}>
      <PrivateHeader />
      <Stack direction="row" alignItems="stretch" sx={{ height: "100%" }}>
        <MainSidebar />
        <Outlet />
      </Stack>
    </Box>
  );
};
