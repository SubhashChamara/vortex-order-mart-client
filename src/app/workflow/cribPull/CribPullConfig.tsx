import { WorkflowFormConfigType } from "../../core/types/WorkflowFormConfigType";
import FK_task01Config from "./FK_task01/FK_Task01Config";
import FK_task02Config from "./FK_task02/FK_Task02Config";
import FK_Task03Config from "./FK_task03/FK_Task03Config";

const CribPullProcessConfig: WorkflowFormConfigType[] = [
  FK_task01Config,
  FK_task02Config,
  FK_Task03Config,
];

export default CribPullProcessConfig;
