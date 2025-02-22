import { userRole } from "@/constants/route&Sideber";
import { TUser, useCurrentToken } from "@/redux/features/auth/authSlice";
import { useAppSelector } from "@/redux/hooks";
import { adminPaths } from "@/routes/admin.routes";
import { facultyPaths } from "@/routes/faculty.routes";
import { userPath } from "@/routes/user.routes";
import { sidebarItemsGenerator } from "@/utils/sideBarGenerator";
import { verifyToken } from "@/utils/verifyToken";
import { Layout, Menu } from "antd";
import { Navigate } from "react-router-dom";

const Sideber = () => {
  const { Sider } = Layout;
  let sidebarlist;
  const token = useAppSelector(useCurrentToken);

  let user;
  if (token) {
    user = verifyToken(token) as TUser;
  }

  if (user?.role) {
    switch (user?.role) {
      case userRole.ADMIN:
        sidebarlist = sidebarItemsGenerator(adminPaths, userRole.ADMIN);
        break;
      case userRole.FACULTY:
        sidebarlist = sidebarItemsGenerator(facultyPaths, userRole.FACULTY);
        break;
      case userRole.USER:
        sidebarlist = sidebarItemsGenerator(userPath, userRole.USER);
        break;
      case userRole.STUDENT:
        sidebarlist = sidebarItemsGenerator(adminPaths, userRole.STUDENT);
        break;

      default:
        break;
    }
    const itemslist = sidebarlist?.filter((item) => item !== undefined);
    return (
      <Sider
        breakpoint="lg"
        collapsedWidth="0"
        onBreakpoint={(broken) => {
          console.log(broken);
        }}
        onCollapse={(collapsed, type) => {
          console.log(collapsed, type);
        }}
      >
        <div className="demo-logo-vertical"></div>
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={["4"]}
          items={itemslist}
        />
      </Sider>
    );
  } else {
    Navigate({ to: "/login", replace: true });
  }
};

export default Sideber;
