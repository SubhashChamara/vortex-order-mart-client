import { lazy } from "react";
import { ReportConfigType } from "../../../../core/types/ReportConfigType";

const BundleCCPLConfig: ReportConfigType = {
    component: lazy(() => import("./index")),
    idPath: "bundled-cc-pl-report",
    keyForm: "bundled"
};

export default BundleCCPLConfig;
