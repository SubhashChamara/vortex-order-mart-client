import { lazy } from "react";

import { WorkflowFormConfigType } from "../../../core/types/WorkflowFormConfigType";

const FK_Task13Config: WorkflowFormConfigType = {
  component: lazy(() => import("./index")),
  idProcess: "overDraft",
  keyForm: "FK_task13",
};

export default FK_Task13Config;
