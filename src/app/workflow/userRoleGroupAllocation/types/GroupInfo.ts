export interface GroupInfo {
  id: string;
  name: string;
  createdDate: string;
  processInfo: {
    id: string;
    name: string;
    description: string;
    logo: string;
  };
  isNew:boolean
}
