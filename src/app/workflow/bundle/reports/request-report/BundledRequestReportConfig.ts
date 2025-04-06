import { lazy } from "react";
import { ReportConfigType } from "../../../../core/types/ReportConfigType";

const BundledRequestReportConfig: ReportConfigType = {
    component: lazy(() => import("./index")),
    idPath: "bundled-request-report",
    keyForm: "bundled"
};

export default BundledRequestReportConfig;
