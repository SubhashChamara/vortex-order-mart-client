import { lazy } from "react";
import { ReportConfigType } from "../../../../core/types/ReportConfigType";

const OdEODConfig: ReportConfigType = {
    component: lazy(() => import("./index")),
    idPath: "od-eod-report",
    keyForm: "overDraft"
};

export default OdEODConfig;
