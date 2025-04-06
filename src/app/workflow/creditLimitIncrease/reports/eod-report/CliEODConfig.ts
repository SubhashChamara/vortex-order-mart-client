import { lazy } from "react";
import { ReportConfigType } from "../../../../core/types/ReportConfigType";

const CliEODConfig: ReportConfigType = {
    component: lazy(() => import("./index")),
    idPath: "eod-report",
    keyForm: "creditLimitIncrease"
};

export default CliEODConfig;
