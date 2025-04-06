export interface GroupInfo {
  id: string;
  name: string;
  createdUserFullName: string;
  createdDate: string;
  processInfo: {
    id: string;
    name: string;
    description: string;
    logo: string;
    defKey: string;
  };
  isActive: boolean;
  isDisabled: boolean;
}
