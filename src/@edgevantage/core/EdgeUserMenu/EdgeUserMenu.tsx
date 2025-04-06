import { useState } from "react";
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
import { useUserDispatch, useUserState } from "../../../@context/UserProvider";

const EdgeUserMenu = () => {
  const { isAuthenticated, username, photo, role } = useUserState();
  const dispatch = useUserDispatch();

  const [userMenu, setUserMenu] = useState<HTMLElement | null>(null);

  const userMenuClick = (event: React.MouseEvent<HTMLElement>) => {
    setUserMenu(event.currentTarget);
  };

  const userMenuClose = () => {
    setUserMenu(null);
  };

  if (!isAuthenticated) {
    return null;
  }

  return (
    <>
      <Button
        className="min-h-40 min-w-40 p-0 md:px-16 md:py-6"
        onClick={userMenuClick}
        color="inherit"
      >
        {photo ? (
          <Avatar
            sx={{
              background: (theme) => theme.palette.background.default,
              color: (theme) => theme.palette.text.secondary,
            }}
            className="md:mx-4"
            alt="user photo"
            src={photo}
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
            {name?.[0]}
          </Avatar>
        )}

        <div className="mx-4 hidden flex-col items-start md:flex">
          <Typography
            sx={{ fontWeight: "600", fontSize: 14 }}
            component="span"
            className="flex text-grey-800"
          >
            {username}
          </Typography>
          <Typography
            className="text-11 font-medium capitalize"
            color="text.secondary"
            sx={{ fontSize: 12 }}
          >
            {role}
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
          onClick={() => {
            dispatch({ type: "LOGOUT" });
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
