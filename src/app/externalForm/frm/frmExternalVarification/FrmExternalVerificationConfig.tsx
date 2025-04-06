import { lazy } from "react";
import { ExternalFormConfigType } from "../../../core/types/ExternalFormConfigType";


const FrmExternalVerificationConfig: ExternalFormConfigType = {
  component: lazy(() => import("./index")),
  idProcess: "fRMExternalVerification",
};

export default FrmExternalVerificationConfig;
