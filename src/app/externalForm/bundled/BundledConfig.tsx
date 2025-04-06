import { lazy } from "react";

import { ExternalFormConfigType } from "../../core/types/ExternalFormConfigType";

const BundledConfig: ExternalFormConfigType = {
  component: lazy(() => import("./index")),
  idProcess: "bundled",
};

export default BundledConfig;
