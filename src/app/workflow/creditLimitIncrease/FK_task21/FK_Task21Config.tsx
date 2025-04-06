import { lazy } from "react";

import { WorkflowFormConfigType } from "../../../core/types/WorkflowFormConfigType";

const FK_Task21Config: WorkflowFormConfigType = {
  component: lazy(() => import("./index")),
  idProcess: "creditLimitIncrease",
  keyForm: "FK_task21",
};

export default FK_Task21Config;
