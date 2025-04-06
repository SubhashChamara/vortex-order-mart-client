import { FC } from "react";
import List from "@mui/material/List";
import { styled } from "@mui/material/styles";

import EdgeNavLinkItem from "./EdgeNavLinkItem";
import { border, borderRadius, display, width } from "@mui/system";
import { alignProperty } from "@mui/material/styles/cssUtils";
import { VortexTheme } from "../../theme/VortexTheme";

const navigation = [
  {
    id: "dashboard",
    title: "Dashboard",
    icon: "feather:monitor",
    url: "/",
    disabled: false,
  },
  {
    id: "inventory",
    title: "Inventory",
    icon: "feather:package",
    url: "/task-pad",
    disabled: false,
  },
  {
    id: "order-track",
    title: "Order Track",
    icon: "feather:search",
    url: "/ordertrack",
    disabled: false,
  },
  {
    id: "sales",
    title: "Sales",
    icon: "feather:sidebar",
    url: "/sales",
    disabled: false,
  },
  {
    id: "my-reports",
    title: "Reports",
    icon: "feather:trello",
    url: "/my-reports",
    disabled: false,
  },
  // {
  //   id: "support",
  //   title: "Support",
  //   // icon: "material-solid:contact_support",
  //   icon: "heroicons-solid:chat-alt-2",
  //   url: "/support",
  //   disabled: false,
  // },
  {
    id: "admin-tools",
    title: "Admin Tools",
    icon: "feather:tool",
    url: "/admin-tools",
    disabled: false,
  },
];

const StyledList = styled(List)(({ theme }) => ({
  "& .fuse-list-item": {
    "&:hover:not(.active)": {
      backgroundColor:
        theme.palette.mode === "dark"
          ? "rgba(255, 255, 255, 0.05)"
          : "rgba(0,0,0,.04)",
    },
    "&:focus:not(.active)": {
      backgroundColor:
        theme.palette.mode === "dark"
          ? "rgba(255, 255, 255, 0.06)"
          : "rgba(0,0,0,.05)",
    },
    padding: "8px 12px 8px 12px",
    border:'1px solid black',
    borderRadius:'8px',
    display:"flex",
    width:'150px',
    height: 40,
    minHeight: 40,
    "&.level-0": {
      minHeight: 44,
      minminHeight: 44,
    },
    "& .fuse-list-item-text": {
      padding: "0 0 0 8px",
    },
  },
  "&.active-square-list": {
    "& .fuse-list-item": {
      borderRadius: "0",
    },
  },
}));

type EdgeNavLinkMenuProps = {
  layout: "vertical" | "horizontal";
};

/**
 * EdgeNavLinkMenu is a react component used for building and
 * rendering horizontal navigation menus, using the Material UI List component.
 */
const EdgeNavLinkMenu: FC<EdgeNavLinkMenuProps> = (props) => {
  const { layout } = props;
  return (
    <StyledList
      className={`flex ${layout === "vertical" ? "flex-col gap-6" : "gap-3"}`}
    >
      {navigation.map((_item) => (
        <EdgeNavLinkItem key={_item.id} item={_item} />
      ))}
    </StyledList>
  );
};

export default EdgeNavLinkMenu;
