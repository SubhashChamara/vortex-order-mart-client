import { lazy } from "react";
import { ReportConfigType } from "../../../../core/types/ReportConfigType";

const FrmInvestConfig: ReportConfigType = {
    component: lazy(() => import("./index")),
    idPath: "frm-invest-report",
    keyForm: "fRMInvestigation"
};

export default FrmInvestConfig;