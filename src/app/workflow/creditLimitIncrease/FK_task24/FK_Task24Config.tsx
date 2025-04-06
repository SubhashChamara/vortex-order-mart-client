import { lazy } from "react";

import { WorkflowFormConfigType } from "../../../core/types/WorkflowFormConfigType";

const FK_Task24Config: WorkflowFormConfigType = {
  component: lazy(() => import("./index")),
  idProcess: "creditLimitIncrease",
  keyForm: "FK_task24",
};

export default FK_Task24Config;
