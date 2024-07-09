import React, { useState } from "react";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Typography from "@mui/material/Typography";
import Tooltip from "@mui/material/Tooltip";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { removeToken } from "../features/authInfo";
import { FaRegUser } from "react-icons/fa";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import NotificationsNoneOutlinedIcon from "@mui/icons-material/NotificationsNoneOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";

const settings = ["Profile", "Sign Out"];

const Profile = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userInfo = useSelector((state) => state.authInfo.userInfo);
  const { email } = JSON.parse(userInfo);

  const [anchorElUser, setAnchorElUser] = useState(null);

  const handleLogout = () => {
    navigate("/account/login");    //Firstly navigate to login page
    dispatch(removeToken());       // remove uerInfo from store
    setAnchorElUser(null);
  };

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <div className="profile-box">
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          gap: "8px",
          color: "#fff",
        }}
      >
        <Tooltip title="Open settings">
          <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
            <Avatar>{email.charAt(0).toUpperCase()}</Avatar>
          </IconButton>
        </Tooltip>
        <Menu
          id="menu-appbar"
          anchorEl={anchorElUser}
          anchorOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
          keepMounted
          transformOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
          open={Boolean(anchorElUser)}
          onClose={handleCloseUserMenu}
          PaperProps={{
            className: "menu-paper",
          }}
        >
          <MenuItem
            key="Profile"
            onClick={handleCloseUserMenu}
            className="menu-item"
            style={{ borderBottom: "2px solid white" }}
          >
            <FaRegUser className="menu-icon" />
            <Typography textAlign="center">Profile</Typography>
          </MenuItem>
          <MenuItem
            key="Sign Out"
            onClick={handleLogout}
            className="menu-item"
          >
            <ExitToAppIcon className="menu-icon" />
            <Typography textAlign="center">Sign Out</Typography>
          </MenuItem>
        </Menu>
        <div className="profile-icon">
          <NotificationsNoneOutlinedIcon />
          <SettingsOutlinedIcon />
        </div>
      </Box>
    </div>
  );
};

export default Profile;
