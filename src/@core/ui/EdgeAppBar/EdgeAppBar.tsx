import { AppBar, Toolbar } from "@mui/material";
import { memo } from "react";
import useThemeMediaQuery from "../../../@hooks/useThemeMediaQuery";
import { useNavbarState } from "../../../@context/NavbarProvider";
import EdgeAppBarConfig from "./EdgeAppBarConfig";
import NavbarToggleButton from "../EdgeNavbarToggleButton/EdgeNavbarToggleButton";
import EdgeNavLinkMenu from "../EdgeNavLinkMenu/EdgeNavLinkMenu";
import EdgeUserMenu from "../EdgeUserMenu/EdgeUserMenu";

const EdgeAppBar = () => {
  const isMobile = useThemeMediaQuery((theme) => theme.breakpoints.down("lg"));
  const { mobileOpen } = useNavbarState();

  return (
    <AppBar
      id="edge-toolbar"
      className="relative z-50 flex shadow"
      position="fixed"
      elevation={0}
      sx={{ backgroundColor: "white" }}
    >
      <Toolbar className="min-h-40 p-0 md:min-h-48 px-16">
        {EdgeAppBarConfig.navbar.position === "left" &&
          isMobile &&
          !mobileOpen && (
            <NavbarToggleButton className="mx-0 h-40 w-40 p-0 sm:mx-8" />
          )}
        {/* logo */}
        <img className="h-32" src="/assets/logo/ordermart.png" alt="logo" />

        <div className="flex items-center w-full justify-end overflow-x-auto px-8">
          {!isMobile && <EdgeNavLinkMenu layout="horizontal" />}
          <EdgeUserMenu />
        </div>

        {EdgeAppBarConfig.navbar.position === "right" &&
          isMobile &&
          !mobileOpen && (
            <NavbarToggleButton className="mx-0 h-40 w-40 p-0 sm:mx-8" />
          )}
      </Toolbar>
    </AppBar>
  );
};

export default memo(EdgeAppBar);
