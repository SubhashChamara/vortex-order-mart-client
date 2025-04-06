import { lazy } from "react";
import { ReportConfigType } from "../../../core/types/ReportConfigType";

const ReworkReportConfig: ReportConfigType = {
    component: lazy(() => import("./index")),
    idPath: "rework-report",
    keyForm: "bundled"
};

export default ReworkReportConfig;
