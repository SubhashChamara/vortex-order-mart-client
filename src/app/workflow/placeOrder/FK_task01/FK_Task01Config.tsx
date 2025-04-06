import { lazy } from "react";

import { WorkflowFormConfigType } from "../../../core/types/WorkflowFormConfigType";

const FK_Task01Config: WorkflowFormConfigType = {
  component: lazy(() => import("./index")),
  idProcess: "orderProcess",
  keyForm: "FK_Task01",
};

export default FK_Task01Config;
