import { lazy } from "react";

import { WorkflowFormConfigType } from "../../../core/types/WorkflowFormConfigType";

const FK_Task15Config: WorkflowFormConfigType = {
  component: lazy(() => import("./index")),
  idProcess: "overDraft",
  keyForm: "FK_task15",
};

export default FK_Task15Config;
