export interface BundleCD {
  workFlowId: string;
  eCapsRef: string;
  subRef: string;
  applicantNIC: string;
  applicantName: string;
  customerSourceType: string;
  createdBy: string;
  verificatorUsername: string;
  initDate: string;
  approvedSecondFullName: string;
  duration : string;
}

export interface BundleCDSearchData {
  [key: string]: {
    label: string;
    "1 Day": number;
    "2 Day": number;
    "3 Day": number;
    "More than 3 Days": number;
  };
}