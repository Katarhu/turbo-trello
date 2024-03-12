import { ThemeProvider } from "@mui/material";
import { Outlet } from "react-router-dom";

import "./App.css";

import { appTheme } from "./core/theme.ts";

export const App = () => {
  return (
    <ThemeProvider theme={appTheme}>
      <Outlet />
    </ThemeProvider>
  );
};
