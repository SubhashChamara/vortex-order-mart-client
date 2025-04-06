import { lazy } from "react";

import { ExternalFormConfigType } from "../../../core/types/ExternalFormConfigType";

const FrmVerificationConfig: ExternalFormConfigType = {
  component: lazy(() => import("./index")),
  idProcess: "fRMVerification",
};

export default FrmVerificationConfig;
