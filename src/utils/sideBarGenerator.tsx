import { TPath, TSidebarItem } from "@/types/route&Sidebar";

export const sidebarItemsGenerator = (items: TPath[], role: string) => {
  const sidebarItems = items.reduce((acc: TSidebarItem[], item) => {
    if (item.path && item.name) {
      acc.push({
        key: item.name,
        label: { to: `/${role}/${item.path}`, name: item.name },
      });
    }

    if (item.children) {
      acc.push({
        key: item.name as string,
        label: { to: `/${role}/${item.path}`, name: item.name as string },
        children: item.children.map((child) => {
          if (child.name) {
            return {
              key: child.name,
              label: { to: `/${role}/${child.path}`, name: child.name },
            };
          }
        }),
      });
    }

    return acc;
  }, []);

  return sidebarItems;
};
