import IconButton from "@mui/material/IconButton";
import EdgeSvgIcon from "../EdgeSvgIcon";
import { useThemeMediaQuery } from "../../hooks";
import { useNavbarDispatch } from "../../../@context/NavbarProvider";

type NavbarToggleButtonProps = {
  className?: string;
  children?: React.ReactNode;
};

/**
 * The navbar toggle button.
 */
const NavbarToggleButton = (props: NavbarToggleButtonProps) => {
  const {
    className = "",
    children = (
      <EdgeSvgIcon size={20} color="action">
        heroicons-outline:view-list
      </EdgeSvgIcon>
    ),
  } = props;

  const dispatch = useNavbarDispatch();
  const isMobile = useThemeMediaQuery((theme) => theme.breakpoints.down("lg"));

  return (
    <IconButton
      className={className}
      color="inherit"
      size="small"
      onClick={() => {
        if (isMobile) {
          dispatch({ type: "NAVBAR_TOGGLE_MOBILE" });
        } else {
          dispatch({ type: "NAVBAR_TOGGLE" });
        }
      }}
    >
      {children}
    </IconButton>
  );
};

export default NavbarToggleButton;
