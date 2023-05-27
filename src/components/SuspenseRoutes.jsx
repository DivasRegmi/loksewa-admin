import { Suspense } from "react";
import Loading from "./Loading";
import { Outlet } from "react-router-dom";

const SuspenseRoutes = () => {
  return (
    <Suspense fallback={<Loading />}>
      <Outlet />
    </Suspense>
  );
};

export default SuspenseRoutes;
