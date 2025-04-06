import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  Avatar,
  Button,
  ListItemIcon,
  ListItemText,
  MenuItem,
  Popover,
  Typography,
} from "@mui/material";
import { darken } from "@mui/material/styles";

import EdgeSvgIcon from "../EdgeSvgIcon";
import { useAuthContext } from "../../../@context/AuthContext";
import RetriveFile from "../../../@helpers/RetriveFiles";

const EdgeUserMenu = () => {
  const { isAuthenticated, user, signout } = useAuthContext();

  const [userMenu, setUserMenu] = useState<HTMLElement | null>(null);

  const userMenuClick = (event: React.MouseEvent<HTMLElement>) => {
    setUserMenu(event.currentTarget);
  };

  const [greeting, setGreeting] = useState("");

  useEffect(() => {
    const hour = new Date().getHours();
    if (hour < 12) {
      setGreeting("Good morning");
    } else if (hour < 18) {
      setGreeting("Good afternoon");
    } else {
      setGreeting("Good evening");
    }
  }, []);

  const userMenuClose = () => {
    setUserMenu(null);
  };

  if (!isAuthenticated) {
    return null;
  }

  return (
    <>
      <Button
        className="min-h-30 min-w-40 p-0 md:px-6 md:py-4"
        onClick={userMenuClick}
        color="inherit"
        sx={{
          backgroundColor: "transparent",
          color: "inherit",
          borderRadius: 8,
          "&:hover": {
            backgroundColor: "rgba(0, 0, 0, 0.04)",
          },
          "&:focus": {
            backgroundColor: "rgba(0, 0, 0, 0.08)",
            outline: "none",
            boxShadow: "none",
          },
          "&:disabled": {
            backgroundColor: "rgba(0, 0, 0, 0.12)",
          },
        }}
      >
        {user?.data.photoURL ? (
          <Avatar
            sx={{
              background: (theme) => theme.palette.background.default,
              color: (theme) => theme.palette.text.secondary,
            }}
            className="md:mx-4"
            alt="user photo"
            src={RetriveFile(user?.data.photoURL)}
          />
        ) : (
          <Avatar
            sx={{
              background: (theme) =>
                darken(theme.palette.background.default, 0.05),
              color: (theme) => theme.palette.text.secondary,
            }}
            className="md:mx-4"
          >
            {user?.data.displayName?.[0]}
          </Avatar>
        )}

        <div className="mx-4 hidden flex-col items-start md:flex">
          <Typography
            sx={{ fontWeight: "600", fontSize: 14 }}
            component="span"
            className="flex text-grey-800 normal-case "
          >
            {greeting}, {user?.data.displayName}
          </Typography>
          <Typography
            className="text-11 font-medium capitalize"
            color="text.secondary"
            sx={{ fontSize: 12 }}
          >
            {user?.role}
          </Typography>
        </div>
      </Button>

      <Popover
        open={Boolean(userMenu)}
        anchorEl={userMenu}
        onClose={userMenuClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
        classes={{
          paper: "py-8",
        }}
      >
        <MenuItem
          component={Link}
          to="/apps/profile"
          onClick={userMenuClose}
          role="button"
        >
          <ListItemIcon className="min-w-40">
            <EdgeSvgIcon>heroicons-outline:user-circle</EdgeSvgIcon>
          </ListItemIcon>
          <ListItemText primary="My Profile" />
        </MenuItem>
        <MenuItem
          component={Link}
          to="/external/eform"
          onClick={userMenuClose}
          role="button"
        >
          <ListItemIcon className="min-w-40">
            <EdgeSvgIcon>feather:external-link</EdgeSvgIcon>
          </ListItemIcon>
          <ListItemText primary="E Form" />
        </MenuItem>
        <MenuItem
          onClick={() => {
            signout();
          }}
        >
          <ListItemIcon className="min-w-40">
            <EdgeSvgIcon>heroicons-outline:logout</EdgeSvgIcon>
          </ListItemIcon>
          <ListItemText primary="Sign out" />
        </MenuItem>
      </Popover>
    </>
  );
};

export default EdgeUserMenu;
