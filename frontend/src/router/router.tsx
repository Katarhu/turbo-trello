import { createBrowserRouter } from "react-router-dom";

import { App } from "../App.tsx";
import { ErrorPage } from "~pages/Error/Error.page.tsx";
import { LoginPage } from "~pages/Login/Login.page.tsx";

import { Routes } from "./constants.ts";

export const appRouter = createBrowserRouter([
  {
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: Routes.LOGIN,
        element: <LoginPage />,
      },
    ],
  },
]);
