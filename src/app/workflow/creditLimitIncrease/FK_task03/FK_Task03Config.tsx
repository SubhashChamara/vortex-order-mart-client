import { lazy } from "react";

import { WorkflowFormConfigType } from "../../../core/types/WorkflowFormConfigType";

const FK_Task03Config: WorkflowFormConfigType = {
  component: lazy(() => import("./index")),
  idProcess: "creditLimitIncrease",
  keyForm: "FK_task03",
};

export default FK_Task03Config;
