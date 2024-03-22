import { ThemeProvider } from "@mui/material";
import { Outlet } from "react-router-dom";

import "./App.css";

import { appTheme } from "./core/theme.ts";

import "~core/translations.ts";

export const App = () => {
  return (
    <ThemeProvider theme={appTheme}>
      <Outlet />
    </ThemeProvider>
  );
};
