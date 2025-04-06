import { lazy } from "react";

import { ExternalFormConfigType } from "../../core/types/ExternalFormConfigType";

const CribPullConfig: ExternalFormConfigType = {
  component: lazy(() => import("./index")),
  idProcess: "cribPull",
};

export default CribPullConfig;
