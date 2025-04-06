export interface UserDetailDto {
  uuid: string;
  from: string;
  role: string;
  loginRedirectUrl: string;
  data: Data;

}

interface Data {
  displayName: string;
  fullName: string;
  photoURL: string;
  email: string;
  settings: Settings;
  firstName: string;
  lastName: string;
  designation: string;
  telephone: string;
  userName: string;
}

interface Settings {
  layout: Layout;
  theme: Theme;
}

interface Layout { }

interface Theme { }
