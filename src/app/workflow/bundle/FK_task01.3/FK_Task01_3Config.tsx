import { lazy } from "react";

import { WorkflowFormConfigType } from "../../../core/types/WorkflowFormConfigType";

const FK_Task01_3Config: WorkflowFormConfigType = {
  component: lazy(() => import("./index")),
  idProcess: "bundled",
  keyForm: "FK_task01.3",
};

export default FK_Task01_3Config;
