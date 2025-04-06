import { ReportConfigType } from "../../core/types/ReportConfigType";
import ReworkReportConfig from "../commonReports/rework-report/ReworkReportConfig";
import BundleCCPLConfig from "./reports/bundle-cc-pl-activity-report/BundleCCPLConfig";
import BundleCDConfig from "./reports/bundle-credit-duration-report/BundleCDReportConfig";
import BundleEODConfig from "./reports/bundle-eod-report/BundleEODConfig";
import BundleDepartmentTatReportConfig from "./reports/department-wise-tat-report/BundleDepartmentTatReportConfig";
import BundleRequestDownloadPanel from "./reports/bundle-request-download-panel/BundleRequestDownloadPanel";
import CreateNewsConfig from "./reports/create-news/CreateNewsConfig";
import FrmAlertReportConfig from "./reports/frm-alert-report/frmAlertReportConfig";
import MasterIndustryCityRiskPanelConfig from "./reports/master-industry-professional-cityRisk-panel/MasterIndustryCityRiskPanelConfig";
import BundledRequestReportConfig from "./reports/request-report/BundledRequestReportConfig";
import TatByHourConfig from "./reports/tat-by-hour-report/TatByHourConfig";
import UserWiseActivityTracker from "./reports/user-wise-activity-tracker-report/UserWiseActivityTracker";

const BundleProcessReportsConfig: ReportConfigType[] = [
  BundleEODConfig,
  BundleCDConfig,
  BundledRequestReportConfig,
  FrmAlertReportConfig,
  BundleCCPLConfig,
  UserWiseActivityTracker,
  BundleDepartmentTatReportConfig,
  UserWiseActivityTracker,
  BundleRequestDownloadPanel,
  ReworkReportConfig,
  MasterIndustryCityRiskPanelConfig,
  TatByHourConfig,
  CreateNewsConfig,
];

export default BundleProcessReportsConfig;
