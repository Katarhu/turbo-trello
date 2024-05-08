import { PropsWithChildren } from "react";
import { Navigate } from "react-router-dom";

import { useStore } from "../context/StoreContext.tsx";

interface PublicRouteProps {
  redirectOnAuthorized: string;
}

export const PublicRoute = ({ children, redirectOnAuthorized }: PropsWithChildren<PublicRouteProps>) => {
  const { userStore } = useStore();

  if (!userStore.accessToken) return children;

  return <Navigate to={redirectOnAuthorized} />;
};
