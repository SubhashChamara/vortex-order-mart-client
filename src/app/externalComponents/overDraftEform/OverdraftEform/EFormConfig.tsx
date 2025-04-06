import { lazy } from "react";

import { ExternalComponentConfigType } from "../../../core/types/ExternalComponentConfigType";

const EFormConfig: ExternalComponentConfigType = {
  component: lazy(() => import("./index")),
  idPath: "/external/eform",
};

export default EFormConfig;
