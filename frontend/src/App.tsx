import { CssBaseline, ThemeProvider } from "@mui/material";
import { Outlet } from "react-router-dom";

import "./App.css";

import { StoreContextProvider } from "./context/StoreContext.tsx";
import { appTheme } from "./core/theme.ts";

export const App = () => {
  return (
    <StoreContextProvider>
      <ThemeProvider theme={appTheme}>
        <CssBaseline>
          <Outlet />
        </CssBaseline>
      </ThemeProvider>
    </StoreContextProvider>
  );
};
