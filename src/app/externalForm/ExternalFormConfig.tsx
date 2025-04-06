import { ExternalFormConfigType } from "../core/types/ExternalFormConfigType";
import CreateNewUserConfig from "./createNewUser/CreateNewUserConfig";
import CreditLimitIncreaseConfig from "./creditLimitIncrease/CreditLimitIncreaseConfig";
import CribPullConfig from "./cribPull/CribPullConfig";
import DeleteUserConfig from "./deleteUser/DeleteUserConfig";
import FrmDataEntryConfig from "./frm/frmDataEntry/frmDataEntryConfig";
import FrmExternalVerificationConfig from "./frm/frmExternalVarification/FrmExternalVerificationConfig";
import FrmInvestigationConfig from "./frm/frmInvestigation/FrmInvestigationConfig";
import FrmQuestionnaireConfig from "./frm/frmQuestionnaire/FrmQuestionnaireConfig";
import FrmExpertOpinionConfig from "./frm/frmExpertOpinion/FrmExpertOpinionConfig";
import FrmVerificationConfig from "./frm/frmVerification/FrmVerificationConfig";
import ModifyUserConfig from "./modifyUser/ModifyUserConfig";
import UserRoleAllocationConfig from "./userRoleAllocation/UserRoleAllocationConfig";
import UserRoleGroupAllocationConfig from "./userRoleGroupAllocation/UserRoleGroupAllocationConfig";
import FrmFraudFinalisingConfig from "./frm/frmFraudFinalization/FraudFinalizingConfig";
import BundledConfig from "./bundled/BundledConfig";
import OverDraftConfig from "./overDraft/OverDraftConfig";

const ExternalFormConfig: ExternalFormConfigType[] = [
  CreateNewUserConfig,
  CreditLimitIncreaseConfig,
  DeleteUserConfig,
  ModifyUserConfig,
  UserRoleGroupAllocationConfig,
  UserRoleAllocationConfig,
  FrmInvestigationConfig,
  FrmDataEntryConfig,
  FrmQuestionnaireConfig,
  FrmExternalVerificationConfig,
  FrmExpertOpinionConfig,
  FrmVerificationConfig,
  FrmFraudFinalisingConfig,
  CribPullConfig,
  BundledConfig,
  OverDraftConfig,
];

export default ExternalFormConfig;
