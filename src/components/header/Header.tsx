import React, { useState } from "react";
import { Avatar, Box, IconButton, Menu, MenuItem, Toolbar, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import logo from "../../assets/digitelescope_logo.jpeg";
import { LogoImage, StyledAppBar } from "./headerStyle";
import { useAuth } from "../../hooks/AuthProvider";

const Header: React.FC = () => {
  const navigate = useNavigate();
  const { userData } = useAuth();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  let fullName = '';
  let avatarInitials = '';
  if (userData) {
    const { fname, lname } = userData.user;
    const firstNameInitial = fname.charAt(0).toUpperCase();
    const lastNameInitial = lname.charAt(0).toUpperCase();
    avatarInitials = `${firstNameInitial}${lastNameInitial}`;
    fullName = `${firstNameInitial}${fname.slice(1)} ${lastNameInitial}${lname.slice(1)}`;
  }

  const handleAvatarClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleViewProfile = () => {
    handleClose();
    navigate('/profile');
  };

  const handleLogout = () => {
    localStorage.removeItem('userData');
    handleClose();
    navigate('/');
  };

  return (
    <StyledAppBar>
      <Toolbar style={{ background: "white" }}>
        <Box sx={{ display: "flex", alignItems: "center", width: "100%" }}>
          <Box sx={{ flexGrow: 1 }}>
            <LogoImage src={logo} alt="Logo" />
          </Box>
          <IconButton onClick={handleAvatarClick}>
            {userData ? (
              <Avatar>{avatarInitials}</Avatar>
            ) : (
              <Avatar />
            )}
          </IconButton>
          {userData && (
            <Box sx={{ ml: 1 }} >
              <Typography variant="body1">
                {fullName}
              </Typography>
            </Box>
          )}
        </Box>
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleClose}
        >
          <MenuItem onClick={handleViewProfile}>View Profile</MenuItem>
          <MenuItem onClick={handleLogout}>Logout</MenuItem>
        </Menu>
      </Toolbar>
    </StyledAppBar>
  );
};

export default Header;
