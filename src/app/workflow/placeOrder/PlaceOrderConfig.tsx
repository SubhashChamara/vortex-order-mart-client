import { WorkflowFormConfigType } from "../../core/types/WorkflowFormConfigType";

import FK_Task01Config from "./FK_task01/FK_Task01Config";
import FK_Task02Config from "./FK_task02/FK_Task02Config";
import FK_Task03Config from "./FK_task03/FK_Task03Config";
import FK_Task04Config from "./FK_task04/FK_Task04Config";
import FK_Task05Config from "./FK_task05/FK_Task05Config";
import FK_Task06Config from "./FK_task06/FK_Task06Config";
import FK_Task07Config from "./FK_task07/FK_Task07Config";
import FK_Task08Config from "./FK_task08/FK_Task08Config";

const PlaceOrderConfig: WorkflowFormConfigType[] = [
  FK_Task01Config,
  FK_Task02Config,
  FK_Task03Config,
  FK_Task04Config,
  FK_Task05Config,
  FK_Task06Config,
  FK_Task07Config,
  FK_Task08Config,
];

export default PlaceOrderConfig;
