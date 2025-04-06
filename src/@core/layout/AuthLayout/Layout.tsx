import { FC, memo, ReactNode } from "react";
import { styled } from "@mui/material/styles";

import useThemeMediaQuery from "../../../@hooks/useThemeMediaQuery";
import EdgeNavBar from "../../ui/EdgeNavBar/EdgeNavBar";
import EdgeAppBarConfig from "../../ui/EdgeAppBar/EdgeAppBarConfig";
import EdgeAppBar from "../../ui/EdgeAppBar/EdgeAppBar";

const Root = styled("div")(
  ({ config }: { config: LayoutConfigDefaultsType }) => ({
    ...(config.mode === "boxed" && {
      clipPath: "inset(0)",
      maxWidth: `${config.containerWidth}px`,
      margin: "0 auto",
      boxShadow:
        "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
    }),
    ...(config.mode === "container" && {
      "& .container": {
        maxWidth: `${config.containerWidth}px`,
        width: "100%",
        margin: "0 auto",
      },
    }),
  })
);

type LayoutProps = {
  children?: ReactNode;
};

type LayoutConfigDefaultsType = {
  mode: "boxed" | "container";
  containerWidth: number;
};

const defaultConfig: LayoutConfigDefaultsType = {
  mode: "container",
  containerWidth: 1920,
};

const Layout: FC<LayoutProps> = (props) => {
  const { children } = props;

  const isMobile = useThemeMediaQuery((theme) => theme.breakpoints.down("lg"));

  return (
    <Root id="fuse-layout" config={defaultConfig} className="flex w-full">
      <div />

      <div className="flex min-w-0 flex-auto">
        {EdgeAppBarConfig.navbar.display &&
          isMobile &&
          EdgeAppBarConfig.navbar.position === "left" && <EdgeNavBar />}

        <main
          id="fuse-main"
          className="relative z-10 flex min-h-full min-w-0 flex-auto flex-col"
        >
          {EdgeAppBarConfig.display && <EdgeAppBar />}

          <div className="relative z-10 flex min-h-0 flex-auto flex-col">
            {children}
          </div>
        </main>

        {EdgeAppBarConfig.navbar.display &&
          isMobile &&
          EdgeAppBarConfig.navbar.position === "right" && <EdgeNavBar />}
      </div>

      <div />
    </Root>
  );
};

export default memo(Layout);
