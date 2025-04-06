import { lazy } from "react";

import { WorkflowFormConfigType } from "../../../core/types/WorkflowFormConfigType";

const PleaseAmendUserDetailsConfig: WorkflowFormConfigType = {
  component: lazy(() => import("./index")),
  idProcess: "deleteUser",
  keyForm: "FK_task01",
};

export default PleaseAmendUserDetailsConfig;
