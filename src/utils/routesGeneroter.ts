import { TPath, TRoute } from "@/types/route&Sidebar";
import { Router } from "@toolpad/core/AppProvider";
import React from "react";

export const routeGenarator = (itemslist: TPath[]) => {
  const routes = itemslist.reduce((acc: TRoute[], item) => {
    if (item.path && item.element) {
      acc.push({
        path: item.path,
        element: item.element,
      });
    }

    if (item.children) {
      item.children.forEach((child) =>
        acc.push({
          path: child.path as string,
          element: child.element,
        })
      );
    }
    return acc;
  }, []);
  return routes;
};

export function useDemoRouter(initialPath: string): Router {
  const [pathname, setPathname] = React.useState(initialPath);

  const router = React.useMemo(() => {
    return {
      pathname,
      searchParams: new URLSearchParams(),
      navigate: (path: string | URL) => setPathname(String(path)),
    };
  }, [pathname]);

  return router;
}