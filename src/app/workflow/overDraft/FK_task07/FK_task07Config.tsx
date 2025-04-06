import { lazy } from "react";

import { WorkflowFormConfigType } from "../../../core/types/WorkflowFormConfigType";

const FK_Task07Config: WorkflowFormConfigType = {
  component: lazy(() => import("./index")),
  idProcess: "overDraft",
  keyForm: "FK_task07",
};

export default FK_Task07Config;
