import { lazy } from "react";

import { WorkflowFormConfigType } from "../../../core/types/WorkflowFormConfigType";

const FK_Task05AConfig: WorkflowFormConfigType = {
  component: lazy(() => import("./index")),
  // idProcess: "helloVe3",
  // keyForm: "FK_task01",
  idProcess: "bundled",
  keyForm: "FK_task05A",
};

export default FK_Task05AConfig;
