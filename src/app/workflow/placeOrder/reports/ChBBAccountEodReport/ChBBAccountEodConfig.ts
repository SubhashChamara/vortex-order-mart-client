import { lazy } from "react";
import { ReportConfigType } from "../../../../core/types/ReportConfigType";

const ChBBAccountEodConfig: ReportConfigType = {
    component: lazy(() => import("./index")),
    idPath: "ch-bb-acc-eod-report",
    keyForm: "bundled"
};

export default ChBBAccountEodConfig;
