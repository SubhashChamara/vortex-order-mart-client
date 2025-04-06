import { UserInfo } from "../../../workflow/createNewUser/@types/UserInfo";
import { UserRoleInfo } from "./UserRoleInfo";

export interface UserRoleAllocationProcessInfo {
  user: UserInfo;
  userRoleInfo: UserRoleInfo[];
}
