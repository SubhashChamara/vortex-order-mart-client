import { lazy } from "react";

import { WorkflowFormConfigType } from "../../../core/types/WorkflowFormConfigType";

const FK_task01Config: WorkflowFormConfigType = {
  component: lazy(() => import("./index")),
  idProcess: "userRoleAllocationFlow",
  keyForm: "FK_task01",
};

export default FK_task01Config;
