import { Outlet } from "react-router-dom";

import { PrivateHeader } from "~features/PrivateHeader.tsx";

export const PrivatePage = () => {
  return (
    <>
      <PrivateHeader />
      <Outlet />
    </>
  );
};
