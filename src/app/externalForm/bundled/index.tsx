import { Alert, Button } from "@mui/material";
import dayjs, { Dayjs } from "dayjs";
import React, { useEffect, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";

import { ScoreBoardProcess } from "../../core/types/ScoreBoardProcess";
import { Api } from "../../../api/Api";
import EdgeSvgIcon from "../../../@core/ui/EdgeSvgIcon";
import Ve3StepWizard from "../../../@core/ui/Ve3StepWizard";
import { ChecklistInfo } from "../../core/types/ChecklistInfo";
import { DBRUser } from "../../core/types/DBRUser";
import {
  formatCurrency,
  formatCardNumber,
} from "../../workflow/bundle/@helpers/Common";
import { BundleCribpullInfo } from "../../workflow/bundle/@types/BundleCribpullInfo";
import { BundleCribScoreInfo } from "../../workflow/bundle/@types/BundleCribScore";
import { BundleUWLevelInfo } from "../../workflow/bundle/@types/BundleUWLevelInfo";
import { CCDataEntryInfo } from "../../workflow/bundle/@types/CCDataEntryInfo";
import { ClientInformation } from "../../workflow/bundle/@types/ClientInfromation";
import { CreditInformation } from "../../workflow/bundle/@types/CreditInfromation";
import { ExtendedVerificationInfo } from "../../workflow/bundle/@types/ExtendedVerificationInfo";
import { FrmCheckInfo } from "../../workflow/bundle/@types/FrmCheckInfo";
import { SalesInfromation } from "../../workflow/bundle/@types/SalesInfromation";
import { VerificationInfromation } from "../../workflow/bundle/@types/VerificationInfromation";
import AccountOpening from "./components/AccountOpening/AccountOpening";
import ALPLApprovalDetails from "./components/ALPLApprovalDetails/ALPLApprovalDetails";
import ALPLCheckpointsAllFields from "./components/ALPLCheckpointsAllFields/ALPLCheckpointsAllFields";
import CASACheckpoints from "./components/CASACheckpoints/CASACheckpoints";
import CCUnderwriterChecklist from "./components/CCApprovalDetails/CCApproval";
import CCCheckpointsAllFields from "./components/CCCheckpointsAllFields/CCCheckpointsAllFields";
import CCDataEntry from "./components/CCDataEntry/CCDataEntry";
import CCMetrics from "./components/CCMetrics/CCMetrics";
import CellErrorsList from "./components/CellErrorsList/CellErrorsList";
import ClientBasicInformation from "./components/ClientBasicInformation/ClientBasicInformation";
import CreditCardInformation from "./components/CreditCardInformation/CreditCardInformation";
import CribCreditFacilities from "./components/CribCreditFacilities/CribCreditFacilities";
import CribDetails from "./components/CribDetails/CribDetails";
import CribDocumentView from "./components/CribDocumentView/CribDocumentView";
import CribScore from "./components/CribScore/CribScore";
import EyeBallingPreCheckView from "./components/EyeBallingPreCheckView/EyeBallingPreCheckView";
import FinalChecks from "./components/FinalChecks/FinalChecks";
import FraudScreeningChecklist from "./components/FraudScreeningChecklist/FraudScreeningChecklist";
import NonNationalChecks from "./components/NonNationalChecks/NonNationalChecks";
import SalesInfo from "./components/SalesInfo/SalesInfo";
import SendToCell from "./components/SendToCell/SendToCell";
import UnderwriterPendReasons from "./components/UnderwriterPendReasons/UnderwriterPendReasons";
import UnderwriterRejectReasons from "./components/UnderwriterRejectReasons/UnderwriterRejectReasons";
import VerificationChecks from "./components/VerificationChecks/VerificationChecks";
import { DropDownItem } from "../../core/types/DropDown";
import LoanPersonalInformation from "./components/LoanPersonalInformation/LoanPersonalInformation";
import LoanApplicationInformation from "./components/LoanApplicationInformation/LoanApplicationInformation";
import { LoanDataEntryInfo } from "../../workflow/bundle/@types/LoanDataEntryInfo";

type BundledFlowExternalFormProps = {
  process: ScoreBoardProcess;
};

type FormType = {
  currentStep: number | null;

  // credit information
  isCC: boolean;
  isALPL: boolean;
  isAccountOpening: boolean;
  isCCReconsiled: boolean;
  isALPLReconsiled: boolean;
  isCASAReconsiled: boolean;
  reqLoanAmount: string;
  reqType: "PL NEW" | "PL TOPUP" | "24hr PL" | null;
  isCASADefinite: boolean;
  isCASABBAccount: boolean;
  etbNtb: "ETB" | "NTB";
  relationshipId: string;

  //   User Information
  isGroupSale: boolean;
  groupReference: string;
  sourceType: DropDownItem | null;
  creditCardType: DropDownItem | null;
  applicantTitle: DropDownItem | null;
  applicantFirstName: string;
  applicantLastName: string;
  applicantNic: string;
  isApplicantNicPrimary: boolean;
  applicantEic: string;
  isApplicantEicPrimary: boolean;
  applicantAdditionalNic: string;
  isApplicantAdditionalNicPrimary: boolean;
  applicantAdditionalEic: string;
  isApplicantAdditionalEicPrimary: boolean;
  applicantPassportNumber: string;
  applicantDateOfBirth: Dayjs | null;
  applicantResAddress1: string;
  applicantResAddress2: string;
  applicantResAddress3: string;
  applicantResAddressCity: string;
  residentialTelephoneNumber: string;
  mobileNumber: string;
  email: string;
  applicationDate: Dayjs | null;

  //   Workplace information
  companyName: DropDownItem | null;
  companyAddressNo: string;
  companyAddressStreet1: string;
  companyAddressStreet2: string;
  companyAddressCity: string;
  companyTelephone: string;
  basicSalary: string;

  //   Referee information
  refereeName: string;
  refereeTelephone: string;
  refereeMobile: string;

  //   Verification Checks
  customerDueDiligence: "EDD" | "SDD" | null;
  isExistingCustomer: boolean;
  isAddressConfirmationDocProvided: boolean;
  scbAccountNumber: string;
  existingCardNumber: string;
  isApplicantAddressSameAsIdentification: boolean;
  isClearCopyOfNicDlPpProvided: boolean;
  isMothersMaidenNameMentioned: boolean;
  isCustomerAttestationAndOriginalSeenConfirmed: boolean;
  isResidenceTelephoneMatchingAddress: boolean;
  applicantAge: number | null;
  isSignatureOnAllFivePanels: boolean;
  isAmendmentCounterSignedByApplicant: boolean;
  isAnnualFeeWaived: boolean;
  isJoiningFeeWaived: boolean;

  //   Non national checks
  isNonNational: boolean;
  hasMinimumMonthlySalary: boolean;
  hasDepartureLetter: boolean;
  hasEmailConfirmationTop5CorporateExecutive: boolean;

  //   Sales info
  salesAgentOrPfcName: string;
  staffCode: DBRUser | null;
  bdmOrManagerName: DBRUser | null;
  branch: DropDownItem | null;
  armCode: string;
  salesComments: string;

  // Final Checklist
  isNICNotClearWithSecondaryProof: boolean;
  nicNotClearComment: string;
  isRelationshipIdentifiedByCBO: boolean;
  cboRelationshipComment: string;

  // CASA Send to cell
  isApplicationIncomplete: boolean;
  isSupportingDocumentIllegible: boolean;
  isNotCompliantWithExchangeControlRegulations: boolean;
  isAdditionalDocumentsRequiredForDataCapturing: boolean;

  // Comment box (error)
  isError: boolean;
  isErrorCASA: boolean;
  isErrorCard: boolean;
  isErrorLoan: boolean;
  errorComment: string;

  // fraud screening
  isDocFraudScreenAttached: boolean;
  fraudScreenComments: string;

  // cc data entry
  ecapRef: string;
  supRef: string;

  // cc approval
  ccApprovalStatus: boolean | null;
  ccApproverLevel: DropDownItem | null;
  ccApprovalCap: string;
  ccApprovalLimit: string;

  ccDsr: string;
  ccDti: string;
  ccGrossIncome: string;

  // loan approval
  loanApprovalStatus: boolean | null;
  loanApproverLevel: DropDownItem | null;
  loanApprovalCap: string;
  loanRequestAmount: string;
  loanApprovalLimit: string;
  loanNetAmount: string;
  isLoanApprovalAttached: boolean;

  // loan data entry
  loanApplicantNIC: string;
  loanApplicantName: string;
  loanApplicantDesignation: string;
  loanApplicantResAddress1: string;
  loanApplicantResAddress2: string;
  loanApplicantResAddress3: string;
  loanApplicantMobile: string;
  loanApplicantResTel: string;
  loanApplicantCompany: string;
  loanApplicantNatureOfBusiness: string;
  loanApplicantSalesChannel: string;

  loanApplicationCount: string;
  loanApplicationDate: string;
  loanApplicationMonth: string;
  loanApplicationReceivedDate: string;
  loanApplicationTime: string;
  loanApplicationPWIDSC: string;
  loanApplicationType: DropDownItem | null;
  loanApplicationTotalValue: string;
  loanApplicationInterestRate: string;
  loanApplicationTenor: string;
  loanApplicationMasterNo: string;
  loanApplicationRepaymentMode: string;
  loanApplicationGrossIncome: string;
  loanApplicationNetIncome: string;
  loanApplicationDBR: string;
};

const defaultValues: FormType = {
  currentStep: null,

  // credit information
  isCC: false,
  isALPL: false,
  isAccountOpening: false,
  isCCReconsiled: false,
  isALPLReconsiled: false,
  isCASAReconsiled: false,
  reqLoanAmount: "",
  reqType: "PL NEW",
  isCASADefinite: false,
  isCASABBAccount: false,
  etbNtb: "ETB",
  relationshipId: "",

  //   user information
  isGroupSale: false,
  groupReference: "",
  sourceType: null,
  creditCardType: null,
  applicantTitle: null,
  applicantFirstName: "",
  applicantLastName: "",
  applicantNic: "",
  isApplicantNicPrimary: false,
  applicantEic: "",
  isApplicantEicPrimary: false,
  applicantAdditionalNic: "",
  isApplicantAdditionalNicPrimary: false,
  applicantAdditionalEic: "",
  isApplicantAdditionalEicPrimary: false,
  applicantPassportNumber: "",
  applicantDateOfBirth: null,
  applicantResAddress1: "",
  applicantResAddress2: "",
  applicantResAddress3: "",
  applicantResAddressCity: "",
  residentialTelephoneNumber: "",
  mobileNumber: "",
  email: "",
  applicationDate: null,

  //   company values
  companyName: null,
  companyAddressNo: "",
  companyAddressStreet1: "",
  companyAddressStreet2: "",
  companyAddressCity: "",
  companyTelephone: "",
  basicSalary: "",

  //   Referee information
  refereeName: "",
  refereeTelephone: "",
  refereeMobile: "",
  customerDueDiligence: "EDD",
  isExistingCustomer: false,
  isAddressConfirmationDocProvided: false,
  scbAccountNumber: "",
  existingCardNumber: "",
  isApplicantAddressSameAsIdentification: false,
  isClearCopyOfNicDlPpProvided: false,
  isMothersMaidenNameMentioned: false,
  isCustomerAttestationAndOriginalSeenConfirmed: false,
  isResidenceTelephoneMatchingAddress: false,
  applicantAge: 0,
  isSignatureOnAllFivePanels: false,
  isAmendmentCounterSignedByApplicant: false,
  isAnnualFeeWaived: false,
  isJoiningFeeWaived: false,

  // Non national checks
  isNonNational: false,
  hasMinimumMonthlySalary: false,
  hasDepartureLetter: false,
  hasEmailConfirmationTop5CorporateExecutive: false,
  salesAgentOrPfcName: "",
  staffCode: null,
  bdmOrManagerName: null,
  branch: null,
  armCode: "",
  salesComments: "",

  // Final Checklist
  isNICNotClearWithSecondaryProof: false,
  nicNotClearComment: "",
  isRelationshipIdentifiedByCBO: false,
  cboRelationshipComment: "",

  // send to cell checklist
  isApplicationIncomplete: false,
  isSupportingDocumentIllegible: false,
  isNotCompliantWithExchangeControlRegulations: false,
  isAdditionalDocumentsRequiredForDataCapturing: false,

  // Comment box (error)
  isError: false,
  isErrorCASA: false,
  isErrorCard: false,
  isErrorLoan: false,
  errorComment: "",

  // fraud screening
  isDocFraudScreenAttached: false,
  fraudScreenComments: "",

  // cc data entry
  ecapRef: "",
  supRef: "",

  // cc approval
  ccApprovalStatus: null,
  ccApproverLevel: null,
  ccApprovalCap: "",
  ccApprovalLimit: "",

  ccDsr: "",
  ccDti: "",
  ccGrossIncome: "",

  // loan approval
  loanApprovalStatus: null,
  loanApproverLevel: null,
  loanApprovalCap: "",
  loanRequestAmount: "",
  loanApprovalLimit: "",
  loanNetAmount: "",
  isLoanApprovalAttached: false,

  // loan data entry
  loanApplicantNIC: "",
  loanApplicantName: "",
  loanApplicantDesignation: "",
  loanApplicantResAddress1: "",
  loanApplicantResAddress2: "",
  loanApplicantResAddress3: "",
  loanApplicantMobile: "",
  loanApplicantResTel: "",
  loanApplicantCompany: "",
  loanApplicantNatureOfBusiness: "",
  loanApplicantSalesChannel: "",
  loanApplicationCount: "",
  loanApplicationDate: "",
  loanApplicationMonth: "",
  loanApplicationReceivedDate: "",
  loanApplicationTime: "",
  loanApplicationPWIDSC: "",
  loanApplicationType: null,
  loanApplicationTotalValue: "",
  loanApplicationInterestRate: "",
  loanApplicationTenor: "",
  loanApplicationMasterNo: "",
  loanApplicationRepaymentMode: "",
  loanApplicationGrossIncome: "",
  loanApplicationNetIncome: "",
  loanApplicationDBR: "",
};

const BundleForm: React.FC<BundledFlowExternalFormProps> = ({ process }) => {
  // dropdowns
  const [sourceTypeDropdowns, setSourceTypeDropdowns] = useState<
    DropDownItem[]
  >([]);
  const [cardTypeDropdowns, setCardTypeDropdowns] = useState<DropDownItem[]>(
    []
  );
  const [titleTypeDropdowns, setTitleTypeDropdowns] = useState<DropDownItem[]>(
    []
  );
  const [branchDropdowns, setBranchDropdowns] = useState<DropDownItem[]>([]);
  const [companyDropdowns, setCompanyDropdowns] = useState<DropDownItem[]>([]);

  const [dbrUserDropdowns, setDBRUserDropdowns] = useState<DBRUser[]>([]);

  const [branchManagersDropdowns, setBranchManagersDropdowns] = useState<
    DBRUser[]
  >([]);

  const [uwLevelDropdowns, setUWLevelDropdowns] = useState<DropDownItem[]>([]);

  const [loanTypeDropdowns, setLoanTypeDropdowns] = useState<DropDownItem[]>(
    []
  );

  // check lists
  const [casaChecklist, setCasaChecklist] = useState<ChecklistInfo[]>([]);
  const [sendToCellChecklist, setSendToCellChecklist] = useState<
    ChecklistInfo[]
  >([]);
  const [accountOpenChecklist, setAccountOpenChecklist] = useState<
    ChecklistInfo[]
  >([]);
  const [ccChecklist, setCCChecklist] = useState<ChecklistInfo[]>([]);
  const [pendReasonsChecklist, setPendReasonsChecklist] = useState<
    ChecklistInfo[]
  >([]);
  const [rejectReasonsChecklist, setRejectReasonsChecklist] = useState<
    ChecklistInfo[]
  >([]);

  const [cellErrorChecklist, setCellErrorChecklist] = useState<ChecklistInfo[]>(
    []
  );

  const [alplChecklist, setALPLChecklist] = useState<ChecklistInfo[]>([]);

  // information
  const [creditInformation, setCreditInformation] =
    useState<CreditInformation | null>(null);

  const [clientInformation, setClientInformation] =
    useState<ClientInformation | null>(null);

  const [verificationInformation, setVerificationInformation] =
    useState<VerificationInfromation | null>(null);

  const [salesInformation, setSalesInformation] =
    useState<SalesInfromation | null>(null);

  const [extendedVerificationInfo, setExtendedVerificationInfo] =
    useState<ExtendedVerificationInfo | null>(null);

  const [cribPullInformation, setCribPullInformation] =
    useState<BundleCribpullInfo | null>(null);

  const [fraudScreenInfo, setFraudScreenInfo] = useState<FrmCheckInfo | null>(
    null
  );

  const [cribCreditFacilitiesInfo, setCribCreditFacilitiesInfo] = useState<
    string[][]
  >([]);

  const [ccDataEntryInfo, setCCDataEntryInfo] =
    useState<CCDataEntryInfo | null>(null);

  const [cribScoreInformation, setCribScoreInformation] =
    useState<BundleCribScoreInfo | null>(null);

  const [uwLevelInformation, setUWLevelInformation] =
    useState<BundleUWLevelInfo | null>(null);

  const [loanDataEntryInfo, setLoanDataEntryInfo] =
    useState<LoanDataEntryInfo | null>(null);

  const methods = useForm<FormType>({
    mode: "onChange",
    defaultValues,
    // resolver: zodResolver(creditInformationSchema),
  });

  const { watch, setValue, handleSubmit } = methods;

  const isAlpl = watch("isALPL");
  const isAccountOpening = watch("isAccountOpening");
  const isCC = watch("isCC");
  const currentStep = watch("currentStep");
  const sourceType = watch("sourceType");

  // get credit information on load
  const getCreditInformation = async () => {
    const { data, err } = await Api.performRequest((r) =>
      r.creditCard.getCreditInformation(process.processInstance)
    );

    if (data !== null) {
      setCreditInformation(data);
    } else {
      console.log(err);
    }
  };

  // get credit information on load
  const getClientInformation = async () => {
    const { data, err } = await Api.performRequest((r) =>
      r.creditCard.getClientInformation(process.processInstance)
    );

    if (data !== null) {
      setClientInformation(data);
    } else {
      console.log(err);
    }
  };

  // get verification information on load
  const getVerificationInformation = async () => {
    const { data, err } = await Api.performRequest((r) =>
      r.creditCard.getVerificationInformation(process.processInstance)
    );

    if (data !== null) {
      console.log(data);
      setVerificationInformation(data);
    } else {
      console.log(err);
    }
  };

  // get sales information on load
  const getSalesInformation = async () => {
    const { data, err } = await Api.performRequest((r) =>
      r.creditCard.getSalesInformation(process.processInstance)
    );

    if (data !== null) {
      console.log(data);
      setSalesInformation(data);
    } else {
      console.log(err);
    }
  };

  // get DBR Users
  const getDBRUsers = async () => {
    const { data, err } = await Api.performRequest((r) =>
      r.creditCard.getDBRUsers()
    );

    if (data !== null) {
      setDBRUserDropdowns(data);
    } else {
      console.log(err?.msg);
    }
  };

  // get branch managers
  const getBranchManagers = async () => {
    const { data, err } = await Api.performRequest((r) =>
      r.creditCard.getBranchManagers(process.processInstance)
    );
    if (data !== null) {
      setBranchManagersDropdowns(data);
    } else {
      console.log(err);
    }
  };

  // Common method for fetching dropdown data
  const getDropdownData = async (
    dropdownType: string,
    setState: React.Dispatch<React.SetStateAction<DropDownItem[]>>
  ) => {
    const { data, err } = await Api.performRequest((r) =>
      r.creditCard.getBundledDropdownData(dropdownType)
    );

    if (data !== null) {
      setState(data);
    } else {
      console.log(err);
    }
  };

  // get casa checklist items
  const getCasaChecklistValues = async () => {
    const { data, err } = await Api.performRequest((r) =>
      r.creditCard.getCasaChecklistItems(
        process.processInstance,
        process.processDefinitionKey,
        "DOC_CHECKER"
      )
    );

    if (data !== null) {
      setCasaChecklist(data);
    } else {
      console.log(err?.msg);
    }
  };

  // get send to cell checklist items
  const getSendToCellChecklistValues = async () => {
    const { data, err } = await Api.performRequest((r) =>
      r.creditCard.getCasaChecklistItems(
        process.processInstance,
        process.processDefinitionKey,
        "CBO_CHECKER"
      )
    );

    if (data !== null) {
      setSendToCellChecklist(data);
    } else {
      console.log(err?.msg);
    }
  };

  // get account opening checklist items
  const getAccountOpeningChecklistValues = async () => {
    const { data, err } = await Api.performRequest((r) =>
      r.creditCard.getCasaChecklistItems(
        process.processInstance,
        process.processDefinitionKey,
        "ACC_OPEN"
      )
    );

    if (data !== null) {
      setAccountOpenChecklist(data);
    } else {
      console.log(err);
    }
  };

  // get cribpull information
  const getCribpullInformation = async () => {
    const { data, err } = await Api.performRequest((r) =>
      r.creditCard.getBundleCribPullInfo(process.processInstance)
    );

    if (data !== null) {
      setCribPullInformation(data);
    } else {
      console.log(err);
    }
  };

  // get cc checklist
  const getCCChecklist = async () => {
    if (!sourceType) {
      return;
    }

    const { data, err } = await Api.performRequest((r) =>
      r.creditCard.getCCChecklist(
        process.processInstance,
        sourceType.code || ""
      )
    );

    if (data !== null) {
      setCCChecklist(data);
    } else {
      console.log(err);
    }
  };

  // get reference codes
  const getReferenceCodes = async () => {
    const { data, err } = await Api.performRequest((r) =>
      r.creditCard.getReferenceCodes(process.processInstance)
    );

    if (data !== null) {
      setCCDataEntryInfo(data);
    } else {
      console.log(err);
    }
  };

  // get frm check values
  const getFrmCheck = async () => {
    const { data, err } = await Api.performRequest((r) =>
      r.creditCard.getFrmCheck(process.processInstance)
    );

    if (data !== null) {
      setFraudScreenInfo(data);
    } else {
      console.log(err);
    }
  };

  // get cell error checklist
  const getCellErrorChecklist = async () => {
    const { data, err } = await Api.performRequest((r) =>
      r.creditCard.getBundledChecklistItems(
        process.processInstance,
        process.processDefinitionKey,
        "EYE_BALLING_CELL_ERROR"
      )
    );
    if (data !== null) {
      setCellErrorChecklist(data);
    } else {
      console.log(err);
    }
  };

  // get crib score
  const getCribScore = async () => {
    const { data, err } = await Api.performRequest((r) =>
      r.creditCard.getBundleCribScore(process.processInstance)
    );

    if (data !== null) {
      setCribScoreInformation(data);
    } else {
      console.log(err);
    }

    console.log(data);
  };

  // get uw level
  const getUWLevelBundledRequest = async () => {
    const { data, err } = await Api.performRequest((r) =>
      r.creditCard.getUWLevelBundledRequest(process.processInstance)
    );

    if (data !== null) {
      setUWLevelInformation(data);
    } else {
      console.log(err);
    }
  };

  // get pend reasons checklist
  const getPendReasonsChecklist = async () => {
    const { data, err } = await Api.performRequest((r) =>
      r.creditCard.getBundledChecklistItems(
        process.processInstance,
        process.processDefinitionKey,
        "PEND_REASON"
      )
    );

    if (data !== null) {
      setPendReasonsChecklist(data);
    } else {
      console.log(err);
    }
  };

  // get reject reasons checklist
  const getRejectReasonsChecklist = async () => {
    const { data, err } = await Api.performRequest((r) =>
      r.creditCard.getBundledChecklistItems(
        process.processInstance,
        process.processDefinitionKey,
        "REJECT_REASON"
      )
    );

    if (data !== null) {
      setRejectReasonsChecklist(data);
    } else {
      console.log(err);
    }
  };

  // get crib credit facilities info
  const getCribFacilityDetails = async () => {
    const { data, err } = await Api.performRequest((r) =>
      r.creditCard.getCribFacilityDetails(process.processInstance)
    );

    if (data !== null) {
      setCribCreditFacilitiesInfo(data);
    } else {
      console.log(err);
    }
  };

  // get alpl checklist
  const getALPLChecklist = async () => {
    const { data, err } = await Api.performRequest((r) =>
      r.creditCard.getCCChecklist(process.processInstance, "ALPL")
    );

    if (data !== null) {
      setALPLChecklist(data);
    } else {
      console.log(err);
    }
  };

  // get loan data entry data
  const getLoanDataEntryInfo = async () => {
    const { data, err } = await Api.performRequest((r) =>
      r.creditCard.getLoanDataEntryInfo(process.processInstance)
    );

    if (data !== null) {
      setLoanDataEntryInfo(data);
    } else {
      console.log(err);
    }
  };

  useEffect(() => {
    getDropdownData("customer-source-type", setSourceTypeDropdowns);
    getDropdownData("card-type", setCardTypeDropdowns);
    getDropdownData("branch", setBranchDropdowns);
    getDropdownData("company", setCompanyDropdowns);
    getDropdownData("applicant-title", setTitleTypeDropdowns);
    getDropdownData("uw-level", setUWLevelDropdowns);
    getDropdownData("pl-loan-type", setLoanTypeDropdowns);

    getDBRUsers();
    getBranchManagers();

    getCreditInformation();
    getClientInformation();
    getVerificationInformation();
    getSalesInformation();
    getCasaChecklistValues();
    getSendToCellChecklistValues();
    getAccountOpeningChecklistValues();
    getCribpullInformation();
    getFrmCheck();

    getCellErrorChecklist();
    getReferenceCodes();
    getCribScore();
    getUWLevelBundledRequest();

    // getPendReasonsChecklist();
    // getRejectReasonsChecklist();
    getCribFacilityDetails();
    getALPLChecklist();
    getLoanDataEntryInfo();
  }, []);

  useEffect(() => {
    getCCChecklist();
  }, [sourceType]);

  // page load side effects
  useEffect(() => {
    if (creditInformation) {
      setValue("isCC", creditInformation.isCard);
      setValue("isALPL", creditInformation.isLoan);
      setValue("isAccountOpening", creditInformation.isCasa);
      setValue("isCASAReconsiled", creditInformation.casaReconciled);
      setValue("isCCReconsiled", creditInformation.cardReconciled);
      setValue("isALPLReconsiled", creditInformation.alplReconciled);
      setValue(
        "reqLoanAmount",
        creditInformation.requestAmount
          ? formatCurrency(creditInformation.requestAmount.toString())
          : ""
      );
      setValue(
        "reqType",
        creditInformation.loanRequestType === "PL_TOP_UP"
          ? "PL TOPUP"
          : creditInformation.loanRequestType === "PL_NEW"
          ? "PL NEW"
          : creditInformation.loanRequestType === "PL_24_HOURS"
          ? "24hr PL"
          : null
      );
      setValue("isCASADefinite", creditInformation.casaDefined);
      setValue("isCASABBAccount", creditInformation.casaBBAccount);
      setValue(
        "etbNtb",
        creditInformation.relationShipType === "ETB" ? "ETB" : "NTB"
      );
      setValue("relationshipId", creditInformation.relationShipId);
    }
  }, [creditInformation]);

  useEffect(() => {
    if (clientInformation) {
      //set applicant informations
      setValue(
        "isGroupSale",
        clientInformation.groupSale ? clientInformation.groupSale : false
      );
      setValue(
        "groupReference",
        clientInformation.groupReference ? clientInformation.groupReference : ""
      );

      const matchingSourceType = sourceTypeDropdowns.find(
        (item) => item.id === clientInformation.customerSourceTypeId
      );
      setValue("sourceType", matchingSourceType || null);

      const matchingCardType = cardTypeDropdowns.find(
        (item) => item.id === clientInformation.cardTypeId
      );
      setValue("creditCardType", matchingCardType || null);

      const matchingTitle = titleTypeDropdowns.find(
        (item) => item.id.toString() === clientInformation.title
      );
      setValue("applicantTitle", matchingTitle || null);
      setValue("applicantFirstName", clientInformation.applicantName || "");
      setValue("applicantLastName", clientInformation.applicantLastName || "");
      setValue("applicantDateOfBirth", dayjs(clientInformation.dob));
      setValue("applicantResAddress1", clientInformation.resAddress1 || "");
      setValue("applicantResAddress1", clientInformation.resAddress1 || "");
      setValue("applicantResAddress3", clientInformation.resAddress3 || "");
      setValue("applicantResAddressCity", clientInformation.resAddress4 || "");
      setValue(
        "residentialTelephoneNumber",
        clientInformation.teleResident || ""
      );
      setValue("mobileNumber", clientInformation.teleMobile || "");
      setValue("email", clientInformation.email || "");
      setValue("applicationDate", dayjs(clientInformation.requestedDateTime));

      //set applicant identity
      setValue("applicantNic", clientInformation.applicantNIC || "");
      setValue("applicantEic", clientInformation.applicantNewNIC || "");
      setValue(
        "applicantAdditionalNic",
        clientInformation.applicantPassport || ""
      );

      //set company information
      const matchingCompany = companyDropdowns.find(
        (item) => item.id === clientInformation.companyId
      );
      setValue("companyName", matchingCompany || null);
      setValue("companyAddressNo", clientInformation.companyAddressNo || "");
      setValue(
        "companyAddressStreet1",
        clientInformation.companyAddress1 || ""
      );
      setValue(
        "companyAddressStreet2",
        clientInformation.companyAddress2 || ""
      );
      setValue(
        "companyAddressCity",
        clientInformation.companyAddressArea || ""
      );
      setValue("companyTelephone", clientInformation.companyTelephone || "");
      setValue(
        "basicSalary",
        formatCurrency(clientInformation.basicSalary?.toString() || "")
      );
    }
  }, [clientInformation]);

  useEffect(() => {
    if (verificationInformation) {
      //set verification checks
      setValue("refereeName", verificationInformation.refereeName || "");
      setValue(
        "refereeTelephone",
        verificationInformation.refereeTeleRes || ""
      );
      setValue(
        "refereeMobile",
        verificationInformation.refereeTeleMobile || ""
      );
      setValue(
        "customerDueDiligence",
        verificationInformation.customerDueDiligence === "EDD"
          ? "EDD"
          : "SDD" || null
      );
      setValue(
        "isExistingCustomer",
        verificationInformation.existCustomer || false
      );
      setValue(
        "isAddressConfirmationDocProvided",
        verificationInformation.addressConfirmation || false
      );
      setValue("scbAccountNumber", verificationInformation.scbAC || "");
      setValue(
        "existingCardNumber",
        (verificationInformation.existingCard &&
          formatCardNumber(verificationInformation.existingCard)) ||
          ""
      );
      setValue("applicantAge", verificationInformation.age || null);

      //set application verification checks
      setValue(
        "isApplicantAddressSameAsIdentification",
        verificationInformation.addressConfirmation || false
      );

      setValue(
        "isClearCopyOfNicDlPpProvided",
        verificationInformation.clearCopyOfID || false
      );
      setValue(
        "isMothersMaidenNameMentioned",
        verificationInformation.mothersMaidenName || false
      );
      setValue(
        "isCustomerAttestationAndOriginalSeenConfirmed",
        verificationInformation.customerAttestation || false
      );
      setValue(
        "isResidenceTelephoneMatchingAddress",
        verificationInformation.addressConfirmation || false
      );
      setValue(
        "isSignatureOnAllFivePanels",
        verificationInformation.signatureOnFivePanels || false
      );
      setValue(
        "isAmendmentCounterSignedByApplicant",
        verificationInformation.amendmentsSigned || false
      );
      setValue("isAnnualFeeWaived", verificationInformation.annualFee || false);
      setValue(
        "isJoiningFeeWaived",
        verificationInformation.joiningFee || false
      );

      // set non-national fields
      setValue("isNonNational", verificationInformation.nonNational || false);
      setValue(
        "hasMinimumMonthlySalary",
        verificationInformation.minimumPerMonthSal || false
      );
      setValue(
        "hasDepartureLetter",
        verificationInformation.departureLetter || false
      );
      setValue(
        "hasEmailConfirmationTop5CorporateExecutive",
        verificationInformation.emailConfirmation || false
      );
    }
  }, [verificationInformation]);

  useEffect(() => {
    if (salesInformation) {
      setValue("salesAgentOrPfcName", salesInformation.nameOfSalesAgent || "");

      const matchingDsrUser = dbrUserDropdowns.find(
        (item) => item.id === salesInformation.dsrUserId
      );
      setValue("staffCode", matchingDsrUser || null);

      const matchingManager = branchManagersDropdowns.find(
        (item) => item.id === salesInformation.teamLeaderId
      );
      setValue("bdmOrManagerName", matchingManager || null);

      const matchingBranch = branchDropdowns.find(
        (item) => item.id === salesInformation.branchId
      );
      setValue("branch", matchingBranch || null);
      setValue("armCode", salesInformation.armNumber || "");
      setValue("salesComments", salesInformation.salesComments || "");
    }
  }, [salesInformation]);

  useEffect(() => {
    if (extendedVerificationInfo) {
      setValue(
        "isNICNotClearWithSecondaryProof",
        extendedVerificationInfo.nicNotClear || false
      );
      setValue(
        "nicNotClearComment",
        extendedVerificationInfo.nicNotClearComment || ""
      );
      setValue(
        "isRelationshipIdentifiedByCBO",
        extendedVerificationInfo.relationshipIdentified || false
      );
      setValue(
        "cboRelationshipComment",
        extendedVerificationInfo.relationshipIdentifiedComment || ""
      );
    }
  }, [extendedVerificationInfo]);

  useEffect(() => {
    if (fraudScreenInfo) {
      setValue(
        "isDocFraudScreenAttached",
        fraudScreenInfo.cribCheckOverrideMandatory || false
      );
      setValue(
        "fraudScreenComments",
        fraudScreenInfo.cribCheckOverrideMandatoryReason || ""
      );
    }
  }, [fraudScreenInfo]);

  useEffect(() => {
    if (ccDataEntryInfo) {
      setValue("ecapRef", ccDataEntryInfo.ecapsRef || "");
      setValue("supRef", ccDataEntryInfo.supRef || "");
    }
  }, [ccDataEntryInfo]);

  useEffect(() => {
    if (uwLevelInformation) {
      const matchingUWApprover = uwLevelDropdowns.find(
        (item) => item.id.toString() === uwLevelInformation.approverLevelCard
      );
      const matchingLoanUWApprover = uwLevelDropdowns.find(
        (item) => item.id.toString() === uwLevelInformation.approverLevelLoan
      );

      setValue(
        "ccApprovalStatus",
        uwLevelInformation.cardRejected === true
          ? false
          : uwLevelInformation.cardRejected === false
          ? true
          : null
      );
      setValue("ccApproverLevel", matchingUWApprover || null);
      setValue(
        "ccApprovalCap",
        (uwLevelInformation.underwriterCapCard &&
          formatCurrency(uwLevelInformation.underwriterCapCard?.toString())) ||
          ""
      );
      setValue(
        "ccApprovalLimit",
        (uwLevelInformation.underWriterLimit &&
          formatCurrency(uwLevelInformation.underWriterLimit.toString())) ||
          ""
      );
      setValue(
        "ccDsr",
        (uwLevelInformation.underWriterDBR &&
          uwLevelInformation.underWriterDBR?.toString()) ||
          ""
      );
      setValue(
        "ccDti",
        (uwLevelInformation.underWriterOnUsExposure &&
          formatCurrency(
            uwLevelInformation.underWriterOnUsExposure?.toString()
          )) ||
          ""
      );
      setValue(
        "ccGrossIncome",
        (uwLevelInformation.underWriterGrossIncome &&
          formatCurrency(
            uwLevelInformation.underWriterGrossIncome?.toString()
          )) ||
          ""
      );
      setValue(
        "loanApprovalStatus",
        uwLevelInformation.loanRejected === true
          ? false
          : uwLevelInformation.loanRejected === false
          ? true
          : null
      );
      setValue("loanApproverLevel", matchingLoanUWApprover || null);
      setValue(
        "loanApprovalCap",
        formatCurrency(
          uwLevelInformation.underwriterCapLoan?.toString() || ""
        ) || ""
      );
      setValue(
        "loanRequestAmount",
        formatCurrency(uwLevelInformation.requestAmount?.toString() || "") || ""
      );
      setValue(
        "loanApprovalLimit",
        formatCurrency(uwLevelInformation.approvedAmount?.toString() || "") ||
          ""
      );
      setValue(
        "loanNetAmount",
        formatCurrency(uwLevelInformation.netAmountALPL?.toString() || "") || ""
      );
      setValue(
        "isLoanApprovalAttached",
        uwLevelInformation.approvalAttached === true ? true : false
      );
    }
  }, [uwLevelInformation, uwLevelDropdowns]);

  // loan data entry set data
  useEffect(() => {
    if (loanDataEntryInfo) {
      const matchingLoanType = loanTypeDropdowns.find(
        (item) => item.id.toString() === loanDataEntryInfo.plLoanType
      );

      setValue("loanApplicantNIC", loanDataEntryInfo.applicantNIC || "");
      setValue("loanApplicantName", loanDataEntryInfo.applicantName || "");
      setValue("loanApplicantDesignation", loanDataEntryInfo.designation || "");
      setValue("loanApplicantResAddress1", loanDataEntryInfo.resAddress1 || "");
      setValue("loanApplicantResAddress2", loanDataEntryInfo.resAddress2 || "");
      setValue("loanApplicantResAddress3", loanDataEntryInfo.resAddress3 || "");
      setValue("loanApplicantMobile", loanDataEntryInfo.teleMobile || "");
      setValue("loanApplicantResTel", loanDataEntryInfo.teleResident || "");
      setValue("loanApplicantCompany", loanDataEntryInfo.companyName || "");
      setValue(
        "loanApplicantNatureOfBusiness",
        loanDataEntryInfo.natureOfBusiness || ""
      );
      setValue(
        "loanApplicantSalesChannel",
        loanDataEntryInfo.salesChannel || ""
      );
      setValue("loanApplicationCount", loanDataEntryInfo.id?.toString() || "");
      setValue("loanApplicationType", matchingLoanType || null);
      setValue(
        "loanApplicationDate",
        dayjs(loanDataEntryInfo.requestedDateTime).format("YYYY-MM-DD HH:mm")
      );
      setValue(
        "loanApplicationReceivedDate",
        dayjs(loanDataEntryInfo.createdDate).format("YYYY-MM-DD HH:mm")
      );
      setValue(
        "loanApplicationMonth",
        (loanDataEntryInfo.requestedDateTime &&
          dayjs(loanDataEntryInfo.requestedDateTime).format("MMMM")) ||
          ""
      );
      setValue("loanApplicationPWIDSC", loanDataEntryInfo.pwidSourceCode || "");
      // setValue("loanApplicationType")
      setValue(
        "loanApplicationTotalValue",
        (loanDataEntryInfo.requestAmount &&
          formatCurrency(loanDataEntryInfo.requestAmount.toString())) ||
          ""
      );
      setValue(
        "loanApplicationInterestRate",
        (loanDataEntryInfo.interestRate &&
          loanDataEntryInfo.interestRate.toFixed(2).toString()) ||
          ""
      );
      setValue("loanApplicationTenor", loanDataEntryInfo.tenor || "");
      setValue("loanApplicationMasterNo", loanDataEntryInfo.masterNo || "");
      setValue(
        "loanApplicationRepaymentMode",
        loanDataEntryInfo.loanRepaymentMode || ""
      );
      setValue(
        "loanApplicationGrossIncome",
        (loanDataEntryInfo.grossIncome &&
          formatCurrency(loanDataEntryInfo.grossIncome.toString())) ||
          ""
      );
      setValue(
        "loanApplicationNetIncome",
        (loanDataEntryInfo.netIncome &&
          formatCurrency(loanDataEntryInfo.netIncome.toString())) ||
          ""
      );
      setValue(
        "loanApplicationDBR",
        (loanDataEntryInfo.dbr &&
          formatCurrency(loanDataEntryInfo.dbr.toString())) ||
          ""
      );
    }
  }, [loanDataEntryInfo, loanTypeDropdowns]);

  const steps = [
    {
      label: "Client Request",
      content: <CreditCardInformation editable={false} />,
    },
    {
      label: "Client Information",
      content: <ClientBasicInformation editable={false} />,
    },
    {
      label: "Verification Steps",
      content: (
        <div className="flex flex-col gap-9">
          <VerificationChecks editable={false} />
          <NonNationalChecks editable={false} />
        </div>
      ),
    },
    {
      label: "Sales Info",
      content: <SalesInfo editable={false} />,
    },
    ...(isAccountOpening
      ? [
          {
            label: "CASA Checklist",
            content: (
              <form>
                <div className="grid grid-cols-1 gap-12">
                  <CASACheckpoints
                    editable={false}
                    casaChecklist={casaChecklist}
                    setCasaChecklist={setCasaChecklist}
                  />
                  <FinalChecks editable={false} />
                </div>
              </form>
            ),
          },
        ]
      : []),
    {
      label: "Send to Cell",
      content: (
        <form>
          <SendToCell
            editable={false}
            sendToCellChecklist={sendToCellChecklist}
            setSendToCellChecklist={setSendToCellChecklist}
          />
        </form>
      ),
    },
    ...(isAlpl
      ? [
          {
            label: "ALPL Checkpoints",
            content: (
              <ALPLCheckpointsAllFields
                alplChecklist={alplChecklist}
                setALPLChecklist={setALPLChecklist}
                salesEditable={false}
                operationEditable={false}
                creditEditable={false}
              />
            ),
          },
        ]
      : []),
    ...(isCC
      ? [
          {
            label: "CC Checkpoints",
            content: (
              <form className="flex flex-col gap-12">
                <CCCheckpointsAllFields
                  ccChecklist={ccChecklist}
                  setCCChecklist={setCCChecklist}
                  isSalesEditable={false}
                  isOperationsEditable={false}
                  isCreditEditable={false}
                />
              </form>
            ),
          },
          {
            label: "CRIB Details",
            content: (
              <div className="grid grid-cols-2 gap-12">
                <CribDetails cribPullInformation={cribPullInformation} />
                <CribDocumentView
                  nicPath={cribPullInformation?.nicPDFCribDocPath}
                  eicPath={cribPullInformation?.eicPDFCribDocIdPath}
                  ppPath={cribPullInformation?.passportPDFCribDocIdPath}
                />
              </div>
            ),
          },
          {
            label: "Crib Score",
            content: (
              <div className="grid grid-cols-2 gap-12">
                <CribScore cribScore={cribScoreInformation} />
              </div>
            ),
          },
        ]
      : []),
    ...(isAccountOpening
      ? [
          {
            label: "Account Opening",
            content: (
              <form>
                <AccountOpening
                  editable={false}
                  accountOpenChecklist={accountOpenChecklist}
                  setAccountOpenChecklist={setAccountOpenChecklist}
                />
              </form>
            ),
          },
        ]
      : []),
    {
      label: "Eye Balling Pre Check",
      content: (
        <div className="grid grid-cols-1 gap-12">
          <EyeBallingPreCheckView process={process} />
          <FraudScreeningChecklist editable={false} />
        </div>
      ),
    },
    {
      label: "Credit Card Data Entry",
      content: (
        <form className="flex flex-col gap-12">
          <div className="grid grid-cols-2 gap-12">
            <CCDataEntry
              cardTypeDropdowns={cardTypeDropdowns}
              editable={false}
            />
          </div>
        </form>
      ),
    },
    ...(isAlpl
      ? [
          {
            label: "Loan Data Entry",
            content: (
              <div className="grid grid-cols-3 gap-12">
                <div className="col-span-1">
                  <LoanPersonalInformation editable={false} />
                </div>
                <div className="col-span-2 flex flex-col gap-12">
                  <LoanApplicationInformation
                    loanTypeDropdowns={loanTypeDropdowns}
                    editable={false}
                  />
                </div>
              </div>
            ),
          },
        ]
      : []),
    {
      label: "Cell Errors",
      content: (
        <form className="flex flex-col gap-12">
          <CellErrorsList
            editable={false}
            cellErrorChecklist={cellErrorChecklist}
            setCellErrorChecklist={setCellErrorChecklist}
          />
        </form>
      ),
    },
    {
      label: "Underwriter Checklist",
      content: (
        <form className="flex flex-col gap-12">
          <div className="grid grid-cols-3 gap-12">
            {isCC && (
              <div className="col-span-1">
                <CCUnderwriterChecklist
                  ccStatusEditable={false}
                  editable={false}
                  uwLevelDropdowns={uwLevelDropdowns}
                />
              </div>
            )}
            {isAlpl && (
              <div className="col-span-1">
                <ALPLApprovalDetails
                  editable={false}
                  uwLevelDropdowns={uwLevelDropdowns}
                />
              </div>
            )}
            <div className="col-span-1">
              <CCMetrics editable={false} />
            </div>
          </div>
        </form>
      ),
    },
    {
      label: "CRIB Credit Facilities",
      content: (
        <CribCreditFacilities cribCreditFacilities={cribCreditFacilitiesInfo} />
      ),
    },
  ];

  return (
    <FormProvider {...methods}>
      {cribPullInformation &&
        typeof cribPullInformation.isCribPassed === "boolean" && (
          <Alert
            variant="standard"
            color={
              cribPullInformation.isCribPassed === true ? "success" : "error"
            }
            className="mb-12"
            icon={false}
            sx={{
              justifyContent: "center",
              textAlign: "center",
              fontWeight: "bold",
              border: "0.5px solid",
              borderColor:
                cribPullInformation.isCribPassed === true
                  ? "success.main"
                  : "error.main",
              borderRadius: "4px",
            }}
          >
            {cribPullInformation.isCribPassed === true
              ? "CRIB PASSED"
              : "CRIB FAILED"}
          </Alert>
        )}
      <div className="flex flex-col gap-12 p-3">
        <Ve3StepWizard
          selectStep={0}
          // currentSteps={steps
          //   .slice(
          //     steps.findIndex((step) => step.label === "Underwriter Checklist")
          //   )
          //   .map(
          //     (_, index) =>
          //       steps.findIndex(
          //         (step) => step.label === "Underwriter Checklist"
          //       ) + index
          //   )}
          completedSteps={Array.from(
            {
              length: steps.length,
            },
            (_, index) => index
          )}
          steps={steps}
        />
      </div>
    </FormProvider>
  );
};

export default BundleForm;
