import { lazy } from "react";
import { ExternalFormConfigType } from "../../../core/types/ExternalFormConfigType";


const FrmInvestigationConfig: ExternalFormConfigType = {
  component: lazy(() => import("./index")),
  idProcess: "fRMInvestigation",
};

export default FrmInvestigationConfig;
