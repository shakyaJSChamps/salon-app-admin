import * as React from "react";
import { styled, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import MuiDrawer from "@mui/material/Drawer";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";
import Dlogo from "../assets/image/d-logo.png";
import Profile from "../page/Profile";
import { Link, Outlet } from "react-router-dom";
import Sidebar from "../sidebar/Sidebar";
import { FaChartPie } from "react-icons/fa";
import _ from "lodash";
import { Typography } from "@mui/material";
import { FaUserFriends } from "react-icons/fa";


const sideNavItem =[
  {
      label: "Dashboard",
      icon: <FaChartPie />,
      slug: "dashboard",
    },
    {
      label: "User Management",
      icon: <FaUserFriends />,
      slug: "user-management",
    },
    {
      label: "Salon Management",
      icon: <FaUserFriends />,
      slug: "salon-management",
    },
];

const drawerWidth = 240;
const openedMixin = (theme) => ({
  width: drawerWidth,
  border: "none",
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});
const closedMixin = (theme) => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
  border: "none",
});
const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  borderLeft:"none",
}));
const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));
const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
}));
function Dashboard() {
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const [showImage, setShowImage] = React.useState(true);
  const handleDrawerOpen = () => {
    setOpen(true);
    setShowImage(false);
  };
  const handleDrawerClose = () => {
    setOpen(false);
    setShowImage(true);
  };
  return (
    <Box sx={{ display: "flex", }}>
      <CssBaseline />
      <AppBar position="fixed" open={open}>
        <Toolbar>
          <div className="logo">
            {showImage && <img src={Dlogo} alt="dlogo.png" />}
          </div>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{
              marginLeft: 3,
              color: "black",
              ...(open && { display: "none" }),
            }}
          >
            <MenuIcon />
          </IconButton>
          <span style={{color:"black"}} id="rightCornerSpan"><Profile /></span>
        </Toolbar>
      </AppBar>
      <Drawer variant="permanent" open={open}>
        <DrawerHeader>
          <div className="logo">
            <img src={Dlogo} alt="dlogo.png" />
          </div>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === "rtl" ? <ChevronRightIcon /> : <MenuIcon />}
          </IconButton>
        </DrawerHeader>
        <Divider />
        {/* <Sidebar /> */}
        <List>
          {_.map(sideNavItem,(item, index) => {
            console.log("SidenavItem ::>  ", item);
            return(

            <ListItem key={item.label} disablePadding sx={{ display: "block" }}>
              <Link to={`/${item.slug}`} key={index} style={{textDecoration: "none"}}>
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
                    width:"40px",
                    height:"40px",
                    borderRadius:"50%",
                    backgroundColor:"black",
                    color:"white",
                    display:"flex",
                    justifyContent:"center",
                    alignItems:"center",
                  }}
                >
                  {item.icon}
                </ListItemIcon>
                <ListItemText primary={<Typography>{item.label}</Typography>} sx={{ opacity: open ? 1 : 0  , backgroundColor:"black", color:"white", 
                    height:"35px", borderRadius:"5px", display:"flex",
                    justifyContent:"center",
                    alignItems:"center",}} />
              </ListItemButton>
              </Link>
            </ListItem>
            )
          })}
        </List>
        <Divider />
        {/* <List>
          {["All mail", "Trash", "Spam"].map((text, index) => (
            <ListItem key={text} disablePadding sx={{ display: "block" }}>
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
                  {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                </ListItemIcon>
                <ListItemText primary={text} sx={{ opacity: open ? 1 : 0 }} />
              </ListItemButton>
            </ListItem>
          ))}
        </List> */}
      </Drawer>
      <Box component="main" sx={{ flexGrow: 1, p: 3, }}>
        <DrawerHeader />
        <div className="box-component">
          <Outlet />
        </div>
      </Box>
    </Box>
  );
}
export default Dashboard;