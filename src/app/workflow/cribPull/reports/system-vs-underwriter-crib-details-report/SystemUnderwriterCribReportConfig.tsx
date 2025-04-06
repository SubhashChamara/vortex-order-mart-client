import { lazy } from "react";
import { ReportConfigType } from "../../../../core/types/ReportConfigType";

const SystemUnderwriterCribReportConfig: ReportConfigType = {
  component: lazy(() => import("./index")),
  idPath: "system-vs-underwriter-crib-details-report",
  keyForm: "cribPull",
};

export default SystemUnderwriterCribReportConfig;
