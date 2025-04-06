import { WorkflowFormConfigType } from "../core/types/WorkflowFormConfigType";
import PlaceOrderConfig from "./placeOrder/PlaceOrderConfig";
import UserRoleAllocationConfig from "./userRoleAllocation/UserRoleAllocationConfig";
import UserRoleGroupAllocationConfig from "./userRoleGroupAllocation/UserRoleGroupAllocationConfig";

const WorkflowConfig: WorkflowFormConfigType[] = [
  ...UserRoleAllocationConfig,
  ...UserRoleGroupAllocationConfig,
  ...PlaceOrderConfig,
];

export default WorkflowConfig;
