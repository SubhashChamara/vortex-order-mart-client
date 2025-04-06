import { UserDetailDto } from "./UserDetailDto";

export interface SingInResponse {
  accessToken: string;
  refreshToken?: string;
  user: UserDetailDto;
}
