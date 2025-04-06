import { lazy } from "react";
import { ReportConfigType } from "../../../../core/types/ReportConfigType";

const BundleEODConfig: ReportConfigType = {
    component: lazy(() => import("./index")),
    idPath: "bundled-eod-report",
    keyForm: "bundled"
};

export default BundleEODConfig;
