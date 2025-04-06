import dayjs, { Dayjs } from "dayjs";

export interface CliRequest {
  processInstance: string;
  oldNicNumber: string | null;
  newNicNumber: string | null;
  passport: string | null;
  title: string;
  firstName: string;
  lastName: string;
  addressLine1: string;
  addressLine2: string;
  addressLine3: string;
  city: string;
  country: string;
  accountNumber: string | null;
  cardNumber: string;
  presentLimit: number;
  newLimit: number;
  reasonForEnhancement: string;
  cardType: string;
  enhancementType: string;
  isUpgradeRequired: boolean;
  upgradeTo: string | null;
  modeType: string;
  isCribJustificationAttached: boolean;

  isCribAttached: boolean;

  //Verification fields
  cribNicNumber: string | null;
  contactNumber: string | null;
  cribAccountNumber: string | null;
  customer: string;
  employment: string | null;
  cardSinceYear: number | null;
  cardSinceMonth: number | null;
  relationshipDuration: string | null;
  //end of Verification fields

  //under-writer fields
  enhancementTypeUW: string;
  enhancementFee: number;
  category: string | null;
  grossIncome: number;
  evaluatedOn: string | null;
  approvedLimit: number;
  newCardTypeUW: string | null;
  dbr: number;
  mueOnUs: number;
  mueOffUs: number;
  tmpStartDate: Dayjs | null;
  tmpEndDate: Dayjs | null;
  approvedLevel: string | null;
  cap: number;
  isGenerateLetter: boolean;
  //end of under-writer fields fields

  //doc check fields
  customerCategory: boolean;
  daHoldersApproval: boolean;
  isCustomersRequested: boolean;
  //end of doc check fields
}
