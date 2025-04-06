import { lazy } from "react";
import { ReportConfigType } from "../../../../core/types/ReportConfigType";

const FrmMisReportConfig: ReportConfigType = {
    component: lazy(() => import("./index")),
    idPath: "frm-mis-report",
    keyForm: "fRMInvestigation"
};

export default FrmMisReportConfig;