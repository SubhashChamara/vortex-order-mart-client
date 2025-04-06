import { lazy } from "react";
import { ReportConfigType } from "../../../../core/types/ReportConfigType";

const BundleCDConfig: ReportConfigType = {
    component: lazy(() => import("./index")),
    idPath: "bundled-cd-report",
    keyForm: "bundled"
};

export default BundleCDConfig;
