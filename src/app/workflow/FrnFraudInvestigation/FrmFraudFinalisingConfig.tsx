import { WorkflowFormConfigType } from "../../core/types/WorkflowFormConfigType";

import FK_Task01Config from "./FK_task01/FK_Task01Config";
import FK_Task02Config from "./FK_task02/FK_Task02Config";
import FK_Task03Config from "./FK_task03/FK_Task03Config";

const FrmFraudFinalisingConfig: WorkflowFormConfigType[] = [
  FK_Task01Config,
  FK_Task02Config,
  FK_Task03Config
];

export default FrmFraudFinalisingConfig;