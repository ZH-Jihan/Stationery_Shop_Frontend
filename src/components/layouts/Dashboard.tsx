import { userRole } from "@/constants/route&Sideber";
import { TUser, useCurrentToken } from "@/redux/features/auth/authSlice";
import { useAppSelector } from "@/redux/hooks";
import { adminPaths } from "@/routes/admin.routes";
import { userPath } from "@/routes/user.routes";
import { DashboardMenuGen } from "@/utils/dashbordMenuGen";
import { verifyToken } from "@/utils/verifyToken";
import { Chip, Stack, Tooltip, Typography } from "@mui/material";
import { extendTheme } from "@mui/material/styles";
import { AppProvider, Router } from "@toolpad/core/AppProvider";
import { DashboardLayout } from "@toolpad/core/DashboardLayout";
import { PageContainer } from "@toolpad/core/PageContainer";
import { CheckCircleIcon } from "lucide-react";
import * as React from "react";
import { Navigate, Outlet } from "react-router-dom";

const demoTheme = extendTheme({
  colorSchemes: { light: true, dark: true },
  colorSchemeSelector: "class",
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 600,
      lg: 1200,
      xl: 1536,
    },
  },
});

function useDemoRouter(initialPath: string): Router {
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

interface DashboardProps {
  children: React.ReactNode;
}
function CustomAppTitle() {
  return (
    <Stack direction="row" alignItems="center" spacing={2}>
      <Typography variant="h6">My App</Typography>
      <Chip size="small" label="BETA" color="info" />
      <Tooltip title="Connected to production">
        <CheckCircleIcon color="success" fontSize="small" />
      </Tooltip>
    </Stack>
  );
}

const Dashboard: React.FC<DashboardProps> = () => {
  const token = useAppSelector(useCurrentToken);
  const router = useDemoRouter("/dashboard");
  let user;
  if (token) {
    user = verifyToken(token) as TUser;
  }

  let sideMenuItems;

  if (user?.role) {
    switch (user.role) {
      case userRole.ADMIN:
        sideMenuItems = DashboardMenuGen(adminPaths, user?.role);
        break;
      case userRole.USER:
        sideMenuItems = DashboardMenuGen(userPath, user?.role);
        break;

      default:
        break;
    }
    return (
      <AppProvider navigation={sideMenuItems} router={router} theme={demoTheme}>
        <DashboardLayout slots={{ appTitle: CustomAppTitle }}>
          <PageContainer>
            <Outlet />
          </PageContainer>
        </DashboardLayout>
      </AppProvider>
    );
  } else {
    return <Navigate to="/login" replace={true} />;
  }
};

export default Dashboard;
