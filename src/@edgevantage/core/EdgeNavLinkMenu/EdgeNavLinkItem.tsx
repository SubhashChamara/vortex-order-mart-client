import clsx from "clsx";
import { memo, useMemo } from "react";
import {
  ListItemButton,
  ListItemButtonProps,
  ListItemText,
} from "@mui/material";
import { styled } from "@mui/material/styles";

import NavLinkAdapter from "../NavLinkAdapter";
import EdgeSvgIcon from "../EdgeSvgIcon";

const Root = styled(ListItemButton)<ListItemButtonProps>(({ theme }) => ({
  color: theme.palette.text.primary,
  textDecoration: "none!important",
  minHeight: 48,
  "&.active": {
    color: `#FF0000 !important`,
    pointerEvents: "none",
    "& .fuse-list-item-text-primary": {
      color: "inherit",
    },
    "& .fuse-list-item-icon": {
      color: "inherit",
    },
  },
  "& .fuse-list-item-icon": {},
  "& .fuse-list-item-text": {
    padding: "0 0 0 16px",
  },
}));

type EdgeNavLinkItemProps = {
  item: any;
};

const EdgeNavLinkItem = (props: EdgeNavLinkItemProps) => {
  const { item } = props;

  let itemProps = {
    disabled: item.disabled,
    to: item.url,
    role: "button",
  };

  return useMemo(
    () => (
      <Root
        component={NavLinkAdapter}
        className={clsx("fuse-list-item", item.active && "active")}
        sx={item.sx}
        {...itemProps}
      >
        {item.icon && (
          <EdgeSvgIcon
            className={clsx("fuse-list-item-icon shrink-0", item.iconClass)}
            color="action"
          >
            {item.icon}
          </EdgeSvgIcon>
        )}

        <ListItemText
          className="fuse-list-item-text"
          primary={item.title}
          sx={{
            "& .MuiTypography-root": {
              fontWeight: 600,
              fontSize: 14,
              padding: 0,
            },
          }}
        />
      </Root>
    ),
    [item.badge, item.exact, item.icon, item.iconClass, item.title, item.url]
  );
};

export default memo(EdgeNavLinkItem);
