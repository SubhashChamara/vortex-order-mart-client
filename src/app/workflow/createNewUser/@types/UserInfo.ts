import { DocumentInfo } from "../../../core/types/DocumentInfo";
import { UserRoleInfo } from "../../../core/types/UserRoleInfo";

export interface UserInfo {
  id: string;
  username: string;
  firstName: string;
  lastName: string;
  email: string;
  designation: string;
  telephone: string;
  userRole: UserRoleInfo;
  profile: DocumentInfo;
}
