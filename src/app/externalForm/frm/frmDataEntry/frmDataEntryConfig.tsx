import { lazy } from "react";
import { ExternalFormConfigType } from "../../../core/types/ExternalFormConfigType";


const FrmDataEntryConfig: ExternalFormConfigType = {
  component: lazy(() => import("./index")),
  idProcess: "fRMDataEntry",
};

export default FrmDataEntryConfig;
