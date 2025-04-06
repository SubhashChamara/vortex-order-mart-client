import { WorkflowFormConfigType } from "../../../core/types/WorkflowFormConfigType";
import { lazy } from "react";

const FK_Task02Config: WorkflowFormConfigType = {
    component: lazy(() => import("./index")),
    idProcess: "EsignFlow",
    keyForm: "FK_task02",
  };
  
  export default FK_Task02Config;