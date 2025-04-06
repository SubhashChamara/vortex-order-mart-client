import { lazy } from "react";
import { ReportConfigType } from "../../../../core/types/ReportConfigType";

const UserWiseActivityTracker: ReportConfigType = {
    component: lazy(() => import("./index")),
    idPath: "user-wise-activity-tracker",
    keyForm: "bundled"
};

export default UserWiseActivityTracker;