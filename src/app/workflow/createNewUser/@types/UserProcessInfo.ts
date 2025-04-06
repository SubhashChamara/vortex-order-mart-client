import { DocumentInfo } from "../../../core/types/DocumentInfo";
// import { UserRoleInfo } from "../../../core/types/UserRoleInfo";
import { UserInfo } from "./UserInfo";

export interface UserProcessInfo {
  id: number;
  username: string;
  firstName: string;
  lastName: string;
  email: string;
  designation: string;
  telephone: string;
  profile: DocumentInfo;
  // userRole: UserRoleInfo;
  user: UserInfo
}
