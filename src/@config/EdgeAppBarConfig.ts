export type EdgeAppBarConfigType = {
  display: boolean;
  style: "fixed" | "scroll";
  navbar: {
    display: boolean;
    position: "left" | "right";
  };
};

/**
 * APP BAR CONFIG
 */
const EdgeAppBarConfig: EdgeAppBarConfigType = {
  display: true,
  style: "fixed",
  navbar: {
    display: true,
    position: "left",
  },
};

export default EdgeAppBarConfig;
