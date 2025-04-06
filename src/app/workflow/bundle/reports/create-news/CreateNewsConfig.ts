import { lazy } from "react";
import { ReportConfigType } from "../../../../core/types/ReportConfigType";

const CreateNewsConfig: ReportConfigType = {
    component: lazy(() => import("./index")),
    idPath: "create-news",
    keyForm: "bundled"
};

export default CreateNewsConfig;