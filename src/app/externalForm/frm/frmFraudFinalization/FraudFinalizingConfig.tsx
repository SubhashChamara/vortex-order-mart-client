import { lazy } from "react";
import { ExternalFormConfigType } from "../../../core/types/ExternalFormConfigType";


const FrmFraudFinalisingConfig: ExternalFormConfigType = {
  component: lazy(() => import("./index")),
  idProcess: "frmFraudFinalising",
};

export default FrmFraudFinalisingConfig;
