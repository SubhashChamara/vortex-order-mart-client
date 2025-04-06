export interface UserRequest {
  username: string;
  firstName: string;
  lastName: string;
  email: string;
  designation?: string;
  telephone?: string;
  // idUserRole: string;
  password?: string | null;
  processInstance: string;
  profile?: string;
}
