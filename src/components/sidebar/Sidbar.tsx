import * as React from "react";
import { styled, useTheme, Theme, CSSObject } from "@mui/material/styles";
import Box from "@mui/material/Box";
import MuiDrawer from "@mui/material/Drawer";
import MuiAppBar, { AppBarProps as MuiAppBarProps } from "@mui/material/AppBar";
import {
  Toolbar,
  List,
  ListItem,
  ListItemButton,
  Avatar,
  Typography,
  ListItemIcon,
  ListItemText,
  Tooltip,
} from "@mui/material";
import CssBaseline from "@mui/material/CssBaseline";
import IconButton from "@mui/material/IconButton";
// import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Divider } from "@mui/material";
import SpaceDashboardRoundedIcon from "@mui/icons-material/SpaceDashboardRounded";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import SecurityIcon from "@mui/icons-material/Security";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";

const drawerWidth = 180;

const openedMixin = (theme: Theme): CSSObject => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const closedMixin = (theme: Theme): CSSObject => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
}));

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})<AppBarProps>(({ theme, open }) => ({
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
  "& .MuiDrawer-paper": {
    background: "#880e4f",
    ...(open && {
      ...openedMixin(theme),
    }),
    ...(!open && {
      ...closedMixin(theme),
    }),
  },
}));

interface SideBarProps {}

const SideBar: React.FC<SideBarProps> = () => {
  const [open, setOpen] = React.useState(false);
  // const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const navigate = useNavigate();
  const theme = useTheme();
  const location = useLocation();

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  // const handleAvatarClick = (event: React.MouseEvent<HTMLElement>) => {
  //     setAnchorEl(event.currentTarget);
  // };

  // const handlePopoverClose = () => {
  //     setAnchorEl(null);
  // };

  const handleLogout = () => {
    // localStorage.removeItem("userData");
    navigate("/");
  };

  // const openPopover = Boolean(anchorEl);
  // const id = openPopover ? "avatar-popover" : undefined;

  const userData = JSON.parse(localStorage.getItem("userData") || "{}");

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar position="fixed" open={open}>
        <Toolbar
          style={{ justifyContent: "space-between", background: "black" }}
        >
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{
              marginRight: 5,
              ...(open && { display: "none" }),
            }}
          >
            {/* <MenuIcon /> */}
            <Typography variant="h6" noWrap marginLeft={"30px"}>
              Digi Telescope
            </Typography>
          </IconButton>

          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Avatar style={{ marginRight: "10px", background: "#880e4f" }}>
              {userData.user.fname.charAt(0).toUpperCase() +
                userData.user.lname.charAt(0).toUpperCase()}
            </Avatar>
            {/* <Popover
                            id={id}
                            open={openPopover}
                            anchorEl={anchorEl}
                            onClose={handlePopoverClose}
                            anchorOrigin={{
                                vertical: "bottom",
                                horizontal: "left",
                            }}
                            transformOrigin={{
                                vertical: "top",
                                horizontal: "left",
                            }}
                        >
                            <List>
                                <ListItemButton component={Link} to="/profile" onClick={handlePopoverClose}>
                                    <ListItemText primary="profile" />
                                </ListItemButton>

                                <ListItemButton onClick={handleLogout}>
                                    <ListItemText primary="Logout" />
                                </ListItemButton>
                            </List>
                        </Popover> */}
            <Typography
              variant="subtitle1"
              sx={{ marginRight: 1, color: "white" }}
            >
              {userData.user.fname.charAt(0).toUpperCase() +
                userData.user.fname.slice(1)}{" "}
              {userData.user.lname.charAt(0).toUpperCase() +
                userData.user.lname.slice(1)}
            </Typography>
          </Box>
        </Toolbar>
      </AppBar>
      <Drawer variant="permanent" open={open}>
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === "rtl" ? (
              <ChevronRightIcon />
            ) : (
              <ChevronLeftIcon />
            )}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List>
          {[
            {
              text: "Dashboard",
              icon: <SpaceDashboardRoundedIcon sx={{ color: "white" }} />,
              link: "/dashboard",
            },
            {
              text: "Security",
              icon: <SecurityIcon sx={{ color: "white" }} />,
              link: "/security",
            },
            {
              text: "Profile",
              icon: <AccountCircleIcon sx={{ color: "white" }} />,
              link: "/profile",
            },
          ].map(({ text, icon, link }) => (
            <ListItem
              key={text}
              disablePadding
              sx={{ display: "flex", flex: 1 }}
            >
              <ListItemButton
                component={Link}
                to={link}
                title={text}
                sx={{
                  minHeight: 48,
                  justifyContent: open ? "initial" : "center",
                  px: 2.5,
                  background:
                    location.pathname === link ? "#4b2c52" : "transparent",
                  "&:hover": {
                    background: "#4b2c52",
                  },
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : "auto",
                    justifyContent: "center",
                  }}
                >
                  {icon}
                </ListItemIcon>
                <ListItemText
                  primary={text}
                  sx={{ opacity: open ? 1 : 0, color: "white" }}
                />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
        <Divider />
        <List>
          <ListItem disablePadding sx={{ display: "flex", flex: 1 }}>
            <Tooltip title="Logout" placement="right">
              <ListItemButton
                onClick={handleLogout}
                sx={{
                  minHeight: 48,
                  justifyContent: open ? "initial" : "center",
                  px: 2.5,
                  background: "transparent",
                  "&:hover": {
                    background: "#4b2c52",
                  },
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : "auto",
                    justifyContent: "center",
                  }}
                >
                  <ExitToAppIcon sx={{ color: "white" }} />
                </ListItemIcon>
                {open && (
                  <ListItemText
                    primary="Logout"
                    sx={{ opacity: 1, color: "white" }}
                  />
                )}
              </ListItemButton>
            </Tooltip>
          </ListItem>
        </List>
      </Drawer>
      <DrawerHeader />
    </Box>
  );
};

export default SideBar;
