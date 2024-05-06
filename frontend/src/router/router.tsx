import { createBrowserRouter } from "react-router-dom";

import { App } from "../App.tsx";
import { LoginPage } from "~pages/Auth/LoginPage.tsx";
import { RegisterPage } from "~pages/Auth/RegisterPage.tsx";
import { ErrorPage } from "~pages/ErrorPage.tsx";
import { PublicPage } from "~pages/PublicPage.tsx";

import { Routes } from "./constants.ts";

export const appRouter = createBrowserRouter([
  {
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: Routes.INDEX,
        element: <PublicPage />,
        children: [
          {
            path: Routes.LOGIN,
            element: <LoginPage />,
          },
          {
            path: Routes.REGISTER,
            element: <RegisterPage />,
          },
        ],
      },
    ],
  },
]);
