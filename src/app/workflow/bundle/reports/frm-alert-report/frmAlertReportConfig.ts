import { lazy } from "react";
import { ReportConfigType } from "../../../../core/types/ReportConfigType";

const FrmAlertReportConfig: ReportConfigType = {
    component: lazy(() => import("./index")),
    idPath: "bundled-frm-alert-report",
    keyForm: "bundled"
};

export default FrmAlertReportConfig;
