import { lazy } from "react";
import { ReportConfigType } from "../../../../core/types/ReportConfigType";

const CliRejectedConfig: ReportConfigType = {
    component: lazy(() => import("./index")),
    idPath: "rejected-report",
    keyForm: "creditLimitIncrease"
};

export default CliRejectedConfig;
