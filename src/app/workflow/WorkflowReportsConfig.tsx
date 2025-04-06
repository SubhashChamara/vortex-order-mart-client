import { ReportConfigType } from "../core/types/ReportConfigType";
import BundleProcessReportsConfig from "./bundle/BundleProcessReports";
import CommonReportsConfig from "./commonReports/CommonReportsConfig";
import CreditLimitIncreaseReportsConfig from "./creditLimitIncrease/CreditLimitIncreaseReportsConfig";
import CribPullReportConfig from "./cribPull/CribPullReportsConfig";
import ESignReportConfig from "./eSign/ESignReportConfig";
import FRMInvestigationReportsConfig from "./FrmInvestigation/FRMInvestigationReportsConfig";
import OverDraftReportConfig from "./overDraft/OverDraftReportConfig";

const WorkflowReportsConfig: ReportConfigType[] = [
  ...CreditLimitIncreaseReportsConfig,
  ...OverDraftReportConfig,
  ...BundleProcessReportsConfig,
  ...CribPullReportConfig,
  ...FRMInvestigationReportsConfig,
  ...ESignReportConfig,
  ...CommonReportsConfig
];

export default WorkflowReportsConfig;
