import { lazy } from "react";
import { ReportConfigType } from "../../../../core/types/ReportConfigType";

const TatByHourConfig: ReportConfigType = {
    component: lazy(() => import("./index")),
    idPath: "tat-app-received-by-hour-report",
    keyForm: "bundled"
};

export default TatByHourConfig;
