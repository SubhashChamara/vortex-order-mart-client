import { ReportConfigType } from "../../core/types/ReportConfigType";
import FrmInvestConfig from "./reports/frm-invest-report/FrmInvestConfig";
import FrmMisReportConfig from "./reports/frm-mis-report/FrmMisReportConfig";


const FRMInvestigationReportsConfig: ReportConfigType[] = [
    FrmInvestConfig,
    FrmMisReportConfig
];

export default FRMInvestigationReportsConfig;
