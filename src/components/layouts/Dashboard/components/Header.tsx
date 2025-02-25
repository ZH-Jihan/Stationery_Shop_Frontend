import Home from "@mui/icons-material/Home";
import NotificationsRoundedIcon from "@mui/icons-material/NotificationsRounded";
import { Button } from "@mui/material";
import Stack from "@mui/material/Stack";
import { useNavigate } from "react-router-dom";
import ColorModeIconDropdown from "../../../../theme/ColorModeIconDropdown";
import MenuButton from "./MenuButton";
import NavbarBreadcrumbs from "./NavbarBreadcrumbs";

// import Search from './Search';

export default function Header() {
  const navigate = useNavigate();
  return (
    <Stack
      direction="row"
      sx={{
        display: { xs: "none", md: "flex" },
        width: "100%",
        alignItems: { xs: "flex-start", md: "center" },
        justifyContent: "space-between",
        maxWidth: { sm: "100%", md: "1700px" },
        pt: 1.5,
      }}
      spacing={2}
    >
      <NavbarBreadcrumbs />
      <Stack direction="row" sx={{ gap: 1 }}>
        {/* <Search /> */}
        <Button
          onClick={() => navigate("/")}
          variant="text"
          color="info"
          size="small"
        >
          <Home />
          <span style={{ paddingLeft: 8 }}>Home</span>
        </Button>
        <MenuButton showBadge aria-label="Open notifications">
          <NotificationsRoundedIcon />
        </MenuButton>
        <ColorModeIconDropdown />
      </Stack>
    </Stack>
  );
}
