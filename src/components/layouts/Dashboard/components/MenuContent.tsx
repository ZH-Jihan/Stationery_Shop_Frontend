import { adminPaths } from "@/routes/admin.routes";
import { sidebarItemsGenerator } from "@/utils/sideBarGenerator";
// import AnalyticsRoundedIcon from "@mui/icons-material/AnalyticsRounded";
// import AssignmentRoundedIcon from "@mui/icons-material/AssignmentRounded";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import { Collapse } from "@mui/material";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import Stack from "@mui/material/Stack";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function MenuContent() {
  const navigate = useNavigate();
  const menu = sidebarItemsGenerator(adminPaths, "admin");
  console.log(menu);
  const [open, setOpen] = useState(true);

  const handleClick = () => {
    setOpen(!open);
  };

  return (
    <Stack sx={{ flexGrow: 1, p: 1, justifyContent: "space-between" }}>
      <List dense>
        {menu.map((item) => (
          <ListItem sx={{ display: "block" }}>
            {!item?.children ? (
              <ListItemButton
                onClick={() => navigate(item?.label?.to as string)}
              >
                {/* <ListItemIcon>{item?.key}</ListItemIcon> */}
                <ListItemText primary={item?.key} />
              </ListItemButton>
            ) : (
              <>
                <ListItemButton onClick={handleClick}>
                  <ListItemText primary={item.key} />
                  {open ? <ExpandLess /> : <ExpandMore />}
                </ListItemButton>
                <Collapse in={open} timeout="auto" unmountOnExit>
                  <List component="div" disablePadding>
                    {item.children.map((child) => (
                      <ListItemButton
                        sx={{ pl: 4 }}
                        onClick={() => navigate(child?.label?.to as string)}
                      >
                        <ListItemText primary={child?.key} />
                      </ListItemButton>
                    ))}
                  </List>
                </Collapse>
              </>
            )}
          </ListItem>
        ))}
      </List>
    </Stack>
  );
}
