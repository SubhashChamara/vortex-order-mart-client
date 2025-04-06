import { ReportConfigType } from "../../core/types/ReportConfigType";
import OdCollateralConfig from "./reports/od-collateral-report/ODCollateralConfig";
import OdEODConfig from "./reports/od-eod-report/OdEODConfig";

const OverDraftReportConfig: ReportConfigType[] = [
  OdCollateralConfig,
  OdEODConfig,
];

export default OverDraftReportConfig;
