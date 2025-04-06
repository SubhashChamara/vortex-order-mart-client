import { lazy } from "react";
import { WorkflowFormConfigType } from "../../../core/types/WorkflowFormConfigType";

const FK_Task02Config: WorkflowFormConfigType = {
    component: lazy(() => import("./index")),
    idProcess: "fRMQuestionnaire", 
    keyForm: "FK_task02",
  };
  
  export default FK_Task02Config;