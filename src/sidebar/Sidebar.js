import {
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
} from "@mui/material";
import _ from "lodash";
import React from "react";
import { Link } from "react-router-dom";
import { FaChartPie } from "react-icons/fa";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";

const Sidebar = (props) => {
  const { open } = props;

  const sideNavItems = [
    {
      label: "Dashboard",
      icon: <FaChartPie />,
      slug: "dashboard",
    },
    {
      label: "User Management",
    //   icon: <ClassIcon />,
      slug: "user-management",
    },
  ];
  return (
    <>
      <List>
          {_.map(sideNavItems,(item, index) => {
            console.log("SidenavItem ::>  ", item);
            return(

            <ListItem key={item.label} disablePadding sx={{ display: "block" }}>
              <ListItemButton
                sx={{
                  minHeight: 48,
                  justifyContent: open ? "initial" : "center",
                  px: 2.5,
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : "auto",
                    justifyContent: "center",
                  }}
                >
                  {item.icon}
                </ListItemIcon>
                <ListItemText primary={<Typography>{item.label}</Typography>} sx={{ opacity: open ? 1 : 0 }} />
              </ListItemButton>
            </ListItem>
            )
          })}
        </List>
    </>
  );
};

export default Sidebar;
