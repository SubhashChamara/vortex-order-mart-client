import { lazy } from "react";

import { WorkflowFormConfigType } from "../../../core/types/WorkflowFormConfigType";

const FK_Task01_2Config: WorkflowFormConfigType = {
  component: lazy(() => import("./index")),
  idProcess: "bundled",
  keyForm: "FK_task01.2",
};

export default FK_Task01_2Config;
