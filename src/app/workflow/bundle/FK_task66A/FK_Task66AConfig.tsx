import { lazy } from "react";

import { WorkflowFormConfigType } from "../../../core/types/WorkflowFormConfigType";

const FK_Task66AConfig: WorkflowFormConfigType = {
  component: lazy(() => import("./index")),
  idProcess: "bundled",
  keyForm: "FK_task66A",
};

export default FK_Task66AConfig;
