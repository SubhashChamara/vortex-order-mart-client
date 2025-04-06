import { ReportConfigType } from "../../core/types/ReportConfigType";
import ChBBAccountEodConfig from "./reports/ChBBAccountEodReport/ChBBAccountEodConfig";
import CliApprovalConfig from "./reports/cli-approval-report/CliApprovalConfig";
import CliRejectedConfig from "./reports/cli-rejected-report/CliRejectedConfig";
import CliEODConfig from "./reports/eod-report/CliEODConfig";

const CreditLimitIncreaseReportsConfig: ReportConfigType[] = [
  CliApprovalConfig,
  CliRejectedConfig,
  CliEODConfig,
  ChBBAccountEodConfig,
];

export default CreditLimitIncreaseReportsConfig;
