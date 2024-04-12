import { Outlet } from "react-router-dom";

import { PublicHeader } from "~components/PublicHeader.tsx";

export const PublicPage = () => {
  return (
    <>
      <PublicHeader />
      <Outlet />
    </>
  );
};
