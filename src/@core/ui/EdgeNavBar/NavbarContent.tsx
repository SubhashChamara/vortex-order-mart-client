import { memo } from "react";
import clsx from "clsx";
import { styled } from "@mui/material/styles";

import NavbarToggleButton from "../EdgeNavbarToggleButton/EdgeNavbarToggleButton";
import EdgeNavLinkMenu from "../EdgeNavLinkMenu/EdgeNavLinkMenu";

const Root = styled("div")(({ theme }) => ({
  backgroundColor: theme.palette.background.default,
  color: theme.palette.text.primary,
  "& ::-webkit-scrollbar-thumb": {
    boxShadow: `inset 0 0 0 20px ${theme.palette.mode === "light"
        ? "rgba(0, 0, 0, 0.24)"
        : "rgba(255, 255, 255, 0.24)"
      }`,
  },
  "& ::-webkit-scrollbar-thumb:active": {
    boxShadow: `inset 0 0 0 20px ${theme.palette.mode === "light"
        ? "rgba(0, 0, 0, 0.37)"
        : "rgba(255, 255, 255, 0.37)"
      }`,
  },
}));

const StyledContent = styled("div")(() => ({
  overscrollBehavior: "contain",
  overflowX: "hidden",
  overflowY: "auto",
  WebkitOverflowScrolling: "touch",
  backgroundRepeat: "no-repeat",
  backgroundSize: "100% 40px, 100% 10px",
  backgroundAttachment: "local, scroll",
  minHeight: "100%",
}));

type NavbarContentProps = {
  className?: string;
};

/**
 * The navbar style 1 content.
 */
function NavbarContent(props: NavbarContentProps) {
  const { className = "" } = props;

  return (
    <Root
      className={clsx(
        "flex h-full flex-auto flex-col overflow-hidden",
        className
      )}
    >
      <div className="flex h-48 shrink-0 flex-row items-center px-20 md:h-72 bg-white">
        <div className="mx-4 flex flex-1">
          <img className="h-32" src="/assets/logo/ordermart.png" alt="logo" />
        </div>

        <NavbarToggleButton className="h-40 w-40 p-0" />
      </div>

      <StyledContent className="flex min-h-0 flex-1 flex-col">
        <EdgeNavLinkMenu layout="vertical" />
      </StyledContent>
    </Root>
  );
}

export default memo(NavbarContent);
