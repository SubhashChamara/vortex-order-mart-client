import { lazy } from "react";
import { ReportConfigType } from "../../../../core/types/ReportConfigType";

const MasterIndustryCityRiskPanelConfig: ReportConfigType = {
  component: lazy(() => import("./index")),
  idPath: "master-industry-professions-cityRisk-panel",
  keyForm: "bundled",
};

export default MasterIndustryCityRiskPanelConfig;
