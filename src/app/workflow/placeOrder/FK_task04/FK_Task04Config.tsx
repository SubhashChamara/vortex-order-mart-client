import { lazy } from "react";

import { WorkflowFormConfigType } from "../../../core/types/WorkflowFormConfigType";

const FK_Task04Config: WorkflowFormConfigType = {
  component: lazy(() => import("./index")),
  idProcess: "orderProcess",
  keyForm: "FK_Task04",
};

export default FK_Task04Config;
