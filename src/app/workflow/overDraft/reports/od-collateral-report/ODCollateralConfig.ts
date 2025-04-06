import { lazy } from "react";
import { ReportConfigType } from "../../../../core/types/ReportConfigType";

const OdCollateralConfig: ReportConfigType = {
    component: lazy(() => import("./index")),
    idPath: "collateral-report",
    keyForm: "overDraft"
};

export default OdCollateralConfig;
