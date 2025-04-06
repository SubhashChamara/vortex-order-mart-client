import { lazy } from "react";

import { WorkflowFormConfigType } from "../../../core/types/WorkflowFormConfigType";

const FK_Task10Config: WorkflowFormConfigType = {
  component: lazy(() => import("./index")),
  idProcess: "creditLimitIncrease",
  keyForm: "FK_task10",
};

export default FK_Task10Config;
