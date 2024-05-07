import { CssBaseline, ThemeProvider } from "@mui/material";
import { Outlet } from "react-router-dom";

import "./App.css";

import { NotificationContextProvider } from "./context/NotificationContext.tsx";
import { StoreContextProvider } from "./context/StoreContext.tsx";
import { appTheme } from "./core/theme.ts";

export const App = () => {
  return (
    <StoreContextProvider>
      <ThemeProvider theme={appTheme}>
        <CssBaseline>
          <NotificationContextProvider>
            <Outlet />
          </NotificationContextProvider>
        </CssBaseline>
      </ThemeProvider>
    </StoreContextProvider>
  );
};
