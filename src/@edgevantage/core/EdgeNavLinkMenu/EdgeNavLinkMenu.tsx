import List from "@mui/material/List";
import { styled } from "@mui/material/styles";

import EdgeNavLinkItem from "./EdgeNavLinkItem";
import { FC } from "react";

const navigation = [
  {
    id: "home",
    title: "Home",
    icon: "heroicons-solid:home",
    url: "/home",
    disabled: false,
  },
  {
    id: "task-pad",
    title: "Task Pad",
    icon: "material-solid:task",
    url: "/task-pad",
    disabled: false,
  },
  {
    id: "scoreboard",
    title: "Scoreboard",
    icon: "material-solid:leaderboard",
    url: "/scoreboard",
    disabled: false,
  },
  {
    id: "knowledge-portal",
    title: "Document Portal",
    icon: "heroicons-solid:light-bulb",
    url: "/knowledge-portal",
    disabled: false,
  },
  {
    id: "my-reports",
    title: "My Reports",
    icon: "heroicons-solid:document-report",
    url: "/my-reports",
    disabled: false,
  },
  // {
  //   id: "support",
  //   title: "Support",
  //   icon: "material-solid:contact_support",
  //   url: "/support",
  //   disabled: false,
  // },
  {
    id: "admin-tools",
    title: "Admin Tools",
    icon: "material-solid:admin_panel_settings",
    url: "/admin-tools",
    disabled: false,
  },
];

const StyledList = styled(List)(({ theme }) => ({
  "& .fuse-list-item": {
    "&:hover": {
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
