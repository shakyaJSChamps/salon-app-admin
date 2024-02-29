import React, { useEffect } from "react";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import NotificationsNoneOutlinedIcon from "@mui/icons-material/NotificationsNoneOutlined";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Typography from "@mui/material/Typography";
import Tooltip from "@mui/material/Tooltip";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { removeToken } from "../features/authInfo";
import { fetchUser, selectUserData } from "../features/userInfoSlice";

const settings = ["Profile", "Account", "Dashboard", "Logout"];

const Profile = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userInfo = useSelector((state) => state.authInfo.userInfo);
  const {email} = JSON.parse(userInfo);
  console.log("UserInfo ::", email.charAt(0).toUpperCase());

  const [anchorElUser, setAnchorElUser] = React.useState(null);

  useEffect(() => {
    dispatch(fetchUser());
  }, [dispatch]);

  const handleLogout = () => {
    dispatch(removeToken());
    navigate("/login");
    setAnchorElUser(null);
  };

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <div
      className="profile-box"
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "revert",
          alignItems: "center",
          margin: "auto",
          gap: "8px",
        }}
      >
        <Tooltip title="Open settings">
          <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
            {userInfo ? (
              <Avatar>{email.charAt(0).toUpperCase()}</Avatar>
            ) : (
              <Avatar
                alt="User Avatar"
                src="https://example.com/path/to/your/image.jpg"
              />
            )}
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
        >
          {settings.map((setting) => (
            <MenuItem
              key={setting}
              onClick={
                setting === "Logout" ? handleLogout : handleCloseUserMenu
              }
            >
              <Typography textAlign="center">{setting}</Typography>
            </MenuItem>
          ))}
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
