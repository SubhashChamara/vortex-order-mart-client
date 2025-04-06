import { ReportConfigType } from "../../core/types/ReportConfigType";
import CribPullEODReportConfig from "./reports/crp-eod-report/CribPullEODReportConfig";
import SystemUnderwriterCribReportConfig from "./reports/system-vs-underwriter-crib-details-report/SystemUnderwriterCribReportConfig";

const CribPullReportConfig: ReportConfigType[] = [
  CribPullEODReportConfig,
  SystemUnderwriterCribReportConfig,
];

export default CribPullReportConfig;
