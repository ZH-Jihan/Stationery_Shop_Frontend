import {
  logOut,
  TUser,
  useCurrentToken,
} from "@/redux/features/auth/authSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { verifyToken } from "@/utils/verifyToken";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import DashboardIcon from "@mui/icons-material/Dashboard";
import Home from "@mui/icons-material/Home";
import Logout from "@mui/icons-material/LogoutOutlined";
import MenuIcon from "@mui/icons-material/Menu";
import Product from "@mui/icons-material/ProductionQuantityLimitsRounded";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import MenuItem from "@mui/material/MenuItem";
import { alpha, styled } from "@mui/material/styles";
import Toolbar from "@mui/material/Toolbar";
import * as React from "react";
import { useNavigate } from "react-router-dom";
import ColorModeIconDropdown from ".././theme/ColorModeIconDropdown";
import Sitemark from "./SitemarkIcon";

const StyledToolbar = styled(Toolbar)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  flexShrink: 0,
  borderRadius: `calc(${theme.shape.borderRadius}px + 8px)`,
  backdropFilter: "blur(24px)",
  border: "1px solid",
  borderColor: (theme.vars || theme).palette.divider,
  backgroundColor: theme.vars
    ? `rgba(${theme.vars.palette.background.defaultChannel} / 0.4)`
    : alpha(theme.palette.background.default, 0.4),
  boxShadow: (theme.vars || theme).shadows[1],
  padding: "8px 12px",
}));

const AppAppBar: React.FC = () => {
  const [open, setOpen] = React.useState(false);
  const navigate = useNavigate();
  const token = useAppSelector(useCurrentToken);
  let user: TUser | null = null;
  if (token) {
    user = verifyToken(token) as TUser;
  }

  const dispatch = useAppDispatch();
  const menuItems = [
    { label: "Home", path: "/", icon: <Home /> },
    { label: "All Products", path: "/all-products", icon: <Product /> },
  ];
  const toggleDrawer = (newOpen: boolean) => () => {
    setOpen(newOpen);
  };

  return (
    <AppBar
      position="fixed"
      enableColorOnDark
      sx={{
        boxShadow: 0,
        bgcolor: "transparent",
        backgroundImage: "none",
        mt: "calc(var(--template-frame-height, 0px) + 2px)",
      }}
    >
      <Container maxWidth="lg">
        <StyledToolbar variant="dense" disableGutters>
          <Box
            sx={{ flexGrow: 1, display: "flex", alignItems: "center", px: 0 }}
          >
            <Sitemark />
            <Box sx={{ display: { xs: "none", md: "flex" } }}>
              {menuItems.map((item) => (
                <Button
                  onClick={() => navigate(item.path)}
                  variant="text"
                  color="info"
                  size="small"
                >
                  {item?.icon}
                  <span style={{ paddingLeft: 8 }}>{item?.label}</span>
                </Button>
              ))}
              {user?.role && (
                <Button
                  onClick={() => navigate(`/${user?.role}/profile`)}
                  variant="text"
                  color="info"
                  size="small"
                >
                  <DashboardIcon />
                  <span style={{ paddingLeft: 8 }}>Dashboard</span>
                </Button>
              )}
            </Box>
          </Box>
          {!user?.role ? (
            <Box
              sx={{
                display: { xs: "none", md: "flex" },
                gap: 1,
                alignItems: "center",
              }}
            >
              <Button
                onClick={() => navigate("/login")}
                color="primary"
                variant="text"
                size="small"
              >
                Sign in
              </Button>
              <Button
                onClick={() => navigate("/singup")}
                color="primary"
                variant="contained"
                size="small"
              >
                Sign up
              </Button>
              <ColorModeIconDropdown />
            </Box>
          ) : (
            <Box
              sx={{
                display: { xs: "none", md: "flex" },
                gap: 1,
                alignItems: "center",
              }}
            >
              <Button
                onClick={() => dispatch(logOut())}
                variant="text"
                color="info"
                size="small"
              >
                <Logout />
                LogOut
              </Button>
              <ColorModeIconDropdown />
            </Box>
          )}

          <Box sx={{ display: { xs: "flex", md: "none" }, gap: 1 }}>
            <ColorModeIconDropdown size="medium" />
            <IconButton aria-label="Menu button" onClick={toggleDrawer(true)}>
              <MenuIcon />
            </IconButton>
            <Drawer
              anchor="top"
              open={open}
              onClose={toggleDrawer(false)}
              PaperProps={{
                sx: {
                  top: "var(--template-frame-height, 0px)",
                },
              }}
            >
              <Box sx={{ p: 2, backgroundColor: "background.default" }}>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "flex-end",
                  }}
                >
                  <IconButton onClick={toggleDrawer(false)}>
                    <CloseRoundedIcon />
                  </IconButton>
                </Box>
                {menuItems.map((item) => (
                  <MenuItem onClick={() => navigate(item.path)}>
                    {item.label}
                  </MenuItem>
                ))}
                <Divider sx={{ my: 3 }} />
                {!user?.role ? (
                  <>
                    <MenuItem>
                      <Button
                        color="primary"
                        onClick={() => navigate("/singup")}
                        variant="contained"
                        fullWidth
                      >
                        Sign up
                      </Button>
                    </MenuItem>
                    <MenuItem>
                      <Button
                        color="primary"
                        onClick={() => navigate("/login")}
                        variant="outlined"
                        fullWidth
                      >
                        Sign in
                      </Button>
                    </MenuItem>
                  </>
                ) : (
                  <Button
                    onClick={() => dispatch(logOut())}
                    variant="text"
                    color="info"
                    size="small"
                  >
                    <Logout />
                    LogOut
                  </Button>
                )}
              </Box>
            </Drawer>
          </Box>
        </StyledToolbar>
      </Container>
    </AppBar>
  );
};

export default AppAppBar;
