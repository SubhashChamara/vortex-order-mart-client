import { lazy } from "react";

import { WorkflowFormConfigType } from "../../../core/types/WorkflowFormConfigType";

const FK_Task05Config: WorkflowFormConfigType = {
  component: lazy(() => import("./index")),
  idProcess: "overDraft",
  keyForm: "FK_task05",
};

export default FK_Task05Config;
