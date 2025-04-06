export interface CliInfo {
  //request initialte fields
  id: number;
  processInstance: string;
  oldNicNumber: string;
  newNicNumber: string;
  passport: string;
  title: string;
  firstName: string;
  lastName: string;
  addressLine1: string;
  addressLine2: string;
  addressLine3: string;
  city: string;
  country: string;
  accountNumber: string;
  cardNumber: string;
  presentLimit: string;
  newLimit: string;
  reasonForEnhancement: string;
  cardType: string;
  enhancementType: string;
  isUpgradeRequired: boolean;
  upgradeTo: string | null;
  modeType: string;
  isCribJustificationAttached: boolean;
  //end of request initialte fields

  isCribAttached:boolean;

  //Verification fields
  cribNicNumber: string;
  contactNumber: string;
  cribAccountNumber: string;
  customer: string;
  employment: string;
  cardSinceYear: number;
  cardSinceMonth: number;
  relationshipDuration: string;
  //end of Verification fields

  //under-writer fields
  enhancementTypeUW: string;
  enhancementFee: string;
  category:  string;
  grossIncome: string;
  evaluatedOn: string;
  approvedLimit: string;
  newCardTypeUW: string;
  dbr: string;
  mueOnUs: string;
  mueOffUs: string;
  tmpStartDate:  string;
  tmpEndDate: string;
  approvedLevel:  string;
  cap: string;
  isGenerateLetter:boolean;
  //end of under-writer fields fields

  //doc check fields
  customerCategory:boolean;
  daHoldersApproval:boolean;
  isCustomersRequested:boolean;
  //end of doc check fields
}
