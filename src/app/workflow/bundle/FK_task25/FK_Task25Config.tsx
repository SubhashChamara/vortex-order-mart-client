import { lazy } from "react";

import { WorkflowFormConfigType } from "../../../core/types/WorkflowFormConfigType";

const FK_Task25Config: WorkflowFormConfigType = {
  component: lazy(() => import("./index")),
  idProcess: "bundled",
  keyForm: "FK_task25",
};

export default FK_Task25Config;
