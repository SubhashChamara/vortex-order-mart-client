import { lazy } from "react";

import { WorkflowFormConfigType } from "../../../core/types/WorkflowFormConfigType";

const FK_Task13BConfig: WorkflowFormConfigType = {
  component: lazy(() => import("./index")),
  idProcess: "bundled",
  keyForm: "FK_task13B",
};

export default FK_Task13BConfig;
