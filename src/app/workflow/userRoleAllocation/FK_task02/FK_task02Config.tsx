import { lazy } from "react";

import { WorkflowFormConfigType } from "../../../core/types/WorkflowFormConfigType";

const FK_task02Config: WorkflowFormConfigType = {
  component: lazy(() => import("./index")),
  idProcess: "userRoleAllocationFlow",
  keyForm: "FK_task02",
};

export default FK_task02Config;
