import { lazy } from "react";

import { WorkflowFormConfigType } from "../../../core/types/WorkflowFormConfigType";

const FK_Task05Config: WorkflowFormConfigType = {
  component: lazy(() => import("./index")),
  idProcess: "orderProcess",
  keyForm: "FK_Task05",
};

export default FK_Task05Config;
