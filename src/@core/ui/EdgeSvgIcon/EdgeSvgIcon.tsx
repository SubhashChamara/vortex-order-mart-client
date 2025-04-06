import { forwardRef } from "react";
import clsx from "clsx";
import { styled } from "@mui/material/styles";
import { Box, BoxProps } from "@mui/system";
import { Icon } from "@mui/material";

type EdgeSvgIconProps = BoxProps & {
  fill?: string;
  xmlns?: string;
  viewBox?: string;
  size?: number | string;
  color?:
    | "inherit"
    | "disabled"
    | "primary"
    | "secondary"
    | "action"
    | "error"
    | "info"
    | "success"
    | "warning";
};

const Root = styled(Box)<EdgeSvgIconProps>(
  ({ theme, size = 24, color = "inherit" }) => ({
    width: size,
    height: size,
    minWidth: size,
    minHeight: size,
    fontSize: size,
    lineHeight: size,
    color: {
      primary: theme.palette.primary.main,
      secondary: theme.palette.secondary.main,
      info: theme.palette.info.main,
      success: theme.palette.success.main,
      warning: theme.palette.warning.main,
      action: theme.palette.action.active,
      error: theme.palette.error.main,
      disabled: theme.palette.action.disabled,
      inherit: "currentColor",
    }[color] as string,
  })
);

const EdgeSvgIcon = forwardRef<SVGSVGElement, EdgeSvgIconProps>(
  (props, ref) => {
    const { children, className = "", color = "inherit" } = props;

    if (typeof children !== "string") {
      return null;
    }

    if (!children.includes(":")) {
      return <Box component={Icon} ref={ref} {...props} />;
    }

    const iconPath = children.replace(":", ".svg#");

    return (
      <Root
        {...props}
        component="svg"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 100 100"
        className={clsx("shrink-0 fill-current", className)}
        ref={ref}
        color={color}
      >
        <use xlinkHref={`assets/icons/${iconPath}`} />
      </Root>
    );
  }
);

export default EdgeSvgIcon;
