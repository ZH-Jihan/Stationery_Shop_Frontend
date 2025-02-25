import { TPath, TRoute } from "@/types/route&Sidebar";

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
