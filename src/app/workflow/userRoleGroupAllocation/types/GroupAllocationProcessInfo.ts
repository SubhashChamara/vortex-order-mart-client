import { GroupInfo } from "../../../core/types/GroupInfo";
import { UserRoleInfo } from "../../../core/types/UserRoleInfo";

export interface GroupAllocationProcessInfo {
  userRole:UserRoleInfo;
  groupInfoList:GroupInfo[];
}
