import { lazy } from "react";
import { ReportConfigType } from "../../../../core/types/ReportConfigType";

const CribPullEODReportConfig: ReportConfigType = {
    component: lazy(() => import("./index")),
    idPath: "cribpull-eod-report",
    keyForm: "cribPull"
};

export default CribPullEODReportConfig;
