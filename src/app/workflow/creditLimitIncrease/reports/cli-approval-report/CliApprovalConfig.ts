import { lazy } from "react";
import { ReportConfigType } from "../../../../core/types/ReportConfigType";

const CliApprovalConfig: ReportConfigType = {
    component: lazy(() => import("./index")),
    idPath: "approval-report",
    keyForm: "creditLimitIncrease"
};

export default CliApprovalConfig;
