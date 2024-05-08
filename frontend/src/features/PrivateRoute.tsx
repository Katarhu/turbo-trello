import { PropsWithChildren } from "react";
import { Navigate } from "react-router-dom";

import { useStore } from "../context/StoreContext.tsx";

interface PrivateRouteProps {
  redirectOnUnauthorized: string;
}

export const PrivateRoute = ({ children, redirectOnUnauthorized }: PropsWithChildren<PrivateRouteProps>) => {
  const { userStore } = useStore();

  if (userStore.accessToken) return children;

  return <Navigate to={redirectOnUnauthorized} />;
};
