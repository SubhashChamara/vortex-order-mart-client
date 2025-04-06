import { lazy } from "react";

import { WorkflowFormConfigType } from "../../../core/types/WorkflowFormConfigType";

const FK_Task08Config: WorkflowFormConfigType = {
  component: lazy(() => import("./index")),
  idProcess: "orderProcess",
  keyForm: "FK_Task08",
};

export default FK_Task08Config;