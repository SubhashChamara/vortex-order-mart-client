import { lazy } from "react";
import { ReportConfigType } from "../../../../core/types/ReportConfigType";

const BundleDepartmentTatReportConfig: ReportConfigType = {
    component: lazy(() => import("./index")),
    idPath: "department-wise-tat-report",
    keyForm: "bundled"
};

export default BundleDepartmentTatReportConfig;
