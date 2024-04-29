import React from "react";
import { lazy } from "react";

const SpendingTrend = lazy(() => import("./components/SpendingTrend"));

const useCustomRoutes = () => {
  const routes = [
    {
      path: "/",
      element: <SpendingTrend />,
    },
  ];

  return routes;
};

export default useCustomRoutes;
