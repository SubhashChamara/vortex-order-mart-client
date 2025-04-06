import { lazy } from "react";

import { WorkflowFormConfigType } from "../../../core/types/WorkflowFormConfigType";

const FK_Task07Config: WorkflowFormConfigType = {
  component: lazy(() => import("./index")),
  idProcess: "orderProcess",
  keyForm: "FK_Task07",
};

export default FK_Task07Config;
