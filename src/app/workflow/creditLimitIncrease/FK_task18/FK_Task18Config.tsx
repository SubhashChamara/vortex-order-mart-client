import { lazy } from "react";

import { WorkflowFormConfigType } from "../../../core/types/WorkflowFormConfigType";

const FK_Task18Config: WorkflowFormConfigType = {
  component: lazy(() => import("./index")),
  idProcess: "creditLimitIncrease",
  keyForm: "FK_task18",
};

export default FK_Task18Config;
