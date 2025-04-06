import { lazy } from "react";

import { ExternalFormConfigType } from "../../../core/types/ExternalFormConfigType";

const FrmExpertOpinionConfig: ExternalFormConfigType = {
  component: lazy(() => import("./index")),
  idProcess: "fRMExpertOpinion",
};

export default FrmExpertOpinionConfig;
