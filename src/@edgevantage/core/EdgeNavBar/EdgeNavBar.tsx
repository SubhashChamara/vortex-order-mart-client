import { Theme } from "@mui/system/createTheme";
import { styled } from "@mui/material/styles";
import SwipeableDrawer from "@mui/material/SwipeableDrawer";

import { useThemeMediaQuery } from "../../hooks";
import {
  useNavbarDispatch,
  useNavbarState,
} from "../../../@context/NavbarProvider";
import EdgeAppBarConfig from "../../../@config/EdgeAppBarConfig";
import NavbarContent from "./NavbarContent";

const navbarWidth = 280;

type StyledNavBarProps = {
  theme?: Theme;
  open: boolean;
  position: string;
};

const StyledNavBar = styled("div")<StyledNavBarProps>(
  ({ theme, open, position }) => ({
    minWidth: navbarWidth,
    width: navbarWidth,
    maxWidth: navbarWidth,
    ...(!open && {
      transition: theme.transitions.create("margin", {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.leavingScreen,
      }),
      ...(position === "left" && {
        marginLeft: `-${navbarWidth}px`,
      }),
      ...(position === "right" && {
        marginRight: `-${navbarWidth}px`,
      }),
    }),
    ...(open && {
      transition: theme.transitions.create("margin", {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
    }),
  })
);

const StyledNavBarMobile = styled(SwipeableDrawer)(() => ({
  "& .MuiDrawer-paper": {
    minWidth: navbarWidth,
    width: navbarWidth,
    maxWidth: navbarWidth,
  },
}));

const EdgeNavBar = () => {
  const isMobile = useThemeMediaQuery((theme) => theme.breakpoints.down("sm"));
  const { mobileOpen } = useNavbarState();
  const dispatch = useNavbarDispatch();

  return (
    <>
      {!isMobile ? (
        <StyledNavBar
          className="sticky top-0 z-20 h-screen flex-auto shrink-0 flex-col overflow-hidden shadow"
          open={mobileOpen}
          position={EdgeAppBarConfig.navbar.position}
        >
          <NavbarContent />
        </StyledNavBar>
      ) : (
        <StyledNavBarMobile
          classes={{
            paper: "flex-col flex-auto h-full",
          }}
          anchor={
            EdgeAppBarConfig.navbar.position as
              | "left"
              | "top"
              | "right"
              | "bottom"
          }
          variant="temporary"
          open={mobileOpen}
          onClose={() => dispatch({ type: "NAVBAR_TOGGLE_MOBILE" })}
          onOpen={() => {}}
          disableSwipeToOpen
          ModalProps={{
            keepMounted: true,
          }}
        >
          <NavbarContent />
        </StyledNavBarMobile>
      )}
    </>
  );
};

export default EdgeNavBar;
