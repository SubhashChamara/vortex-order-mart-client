import { ValidationType } from "../ValidationType";

/**
 * This declaration is used to manage CLI process check list items.
 */
export interface CLIProcessCheckListInfo {
  id:number;
  wfStage: string;
  category: string;
  itemHeading: string;
  itemName: string;
  itemCheckValue: boolean|null;
  itemTxtValue: string;
  itemReCheckValue: boolean;
  itemReTxtValue: string;
  itemHeadingSequence: number;
  itemSequence: number;
  itemType: string;

  validationType:ValidationType;
}
