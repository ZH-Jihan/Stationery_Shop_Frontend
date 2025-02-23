import { TDesboardPath } from "@/types/route&Sidebar";
import { NavigationItem } from "@toolpad/core/AppProvider";
import { useNavigate } from "react-router-dom";

export const DashboardMenuGen = (items: TDesboardPath[], role: string) => {
  const nevigate = useNavigate();
  const sidebarItems = items.reduce((acc: NavigationItem[], item) => {
    if (item.path && item.name && !item.children) {
      acc.push({
        segment: item.path,
        title: (
          <span onClick={() => nevigate(`/${role}/${item.path}`)}>
            {item.name}
          </span>
        ),
        icon: item.icon,
      });
    }
    if (item.kind) {
      if (item.kind && item.name) {
        acc.push({
          kind: item.kind,
          title: item.name,
        });
      }
      if (item.kind === "divider") {
        acc.push({
          kind: item.kind,
        });
      }
    }

    if (item.children) {
      acc.push({
        segment: item.path,
        title: item.name,
        icon: item.icon,
        children: item.children.map((child) => {
          if (child.name) {
            return {
              segment: child.path,
              title: (
                <span onClick={() => nevigate(`/${role}/${child.path}`)}>
                  {child.name}
                </span>
              ),
              icon: child.icon,
            };
          }
        }),
      });
    }

    return acc;
  }, []);

  return sidebarItems;
};
