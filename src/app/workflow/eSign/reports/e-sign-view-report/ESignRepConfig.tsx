import { lazy } from "react";
import { ReportConfigType } from "../../../../core/types/ReportConfigType";

const ESignRepConfig: ReportConfigType = {
    component: lazy(() => import("./index")),
    idPath: "e-sign-view-report",
    keyForm: "EsignFlow"
};

export default ESignRepConfig;