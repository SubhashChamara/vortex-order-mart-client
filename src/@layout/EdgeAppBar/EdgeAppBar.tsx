import { AppBar, Toolbar } from "@mui/material";

import { useThemeMediaQuery } from "../../@edgevantage/hooks";
import EdgeAppBarConfig from "../../@config/EdgeAppBarConfig";
import NavbarToggleButton from "../../@edgevantage/core/EdgeNavbarToggleButton/EdgeNavbarToggleButton";
import { useNavbarState } from "../../@context/NavbarProvider";
import EdgeUserMenu from "../../@edgevantage/core/EdgeUserMenu/EdgeUserMenu";
import { memo } from "react";
import EdgeNavLinkMenu from "../../@edgevantage/core/EdgeNavLinkMenu/EdgeNavLinkMenu";

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
      <Toolbar className="min-h-48 p-0 md:min-h-64">
        {EdgeAppBarConfig.navbar.position === "left" &&
          isMobile &&
          !mobileOpen && (
            <NavbarToggleButton className="mx-0 h-40 w-40 p-0 sm:mx-8" />
          )}
        {/* logo */}
        <img className="h-32" src="/assets/logo/ordermart.png" alt="logo" />

        <div className="flex h-full items-center w-full justify-end overflow-x-auto px-8">
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
