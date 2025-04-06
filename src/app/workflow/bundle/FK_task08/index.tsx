import dayjs, { Dayjs } from "dayjs";
import React, { useEffect, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import Ve3StepWizard from "../../../../@core/ui/Ve3StepWizard";
import Logger from "../../../../@helpers/Logger";
import { Api } from "../../../../api/Api";
import { ChecklistInfo } from "../../../core/types/ChecklistInfo";
import { DBRUser } from "../../../core/types/DBRUser";
import { DropDownItem } from "../../../core/types/DropDown";
import { TaskDetailInfo } from "../../../core/types/TaskDetailInfo";
import { formatCardNumber, formatCurrency } from "../@helpers/Common";
import { ClientInformation } from "../@types/ClientInfromation";
import { CreditInformation } from "../@types/CreditInfromation";
import { ExtendedVerificationInfo } from "../@types/ExtendedVerificationInfo";
import { SalesInfromation } from "../@types/SalesInfromation";
import { VerificationInfromation } from "../@types/VerificationInfromation";
import CellUserCheckList from "../components/CellUserCheckList/CellUserCheckList";
import ClientBasicInformation from "../components/ClientBasicInformation/ClientBasicInformation";
import NonNationalChecks from "../components/NonNationalChecks/NonNationalChecks";
import SalesInfo from "../components/SalesInfo/SalesInfo";
import VerificationChecks from "../components/VerificationChecks/VerificationChecks";
import CreditCardInformation from "./components/CreditCardInformation";
import StaticDataChanges from "../components/EyeBalling/StaticDataChanges/StaticDataChanges";
import CCCheckpoints from "../components/CCCheckpoints/CCCheckpoints";
import SendToCell from "../components/SendToCell/SendToCell";
import EyeBallingPreCheckView from "../components/EyeBallingPreCheckView/EyeBallingPreCheckView";
import { Alert } from "@mui/material";
import { BundleCribpullInfo } from "../@types/BundleCribpullInfo";
import CCCheckpointsTwoFields from "../components/CCCheckpointsTwoFields/CCCheckpointsTwoFields";
import CCCheckpointsAllFields from "../components/CCCheckpointsAllFields/CCCheckpointsAllFields";
import ALPLCheckpointsAllFields from "../components/ALPLCheckpointsAllFields/ALPLCheckpointsAllFields";

interface BundledFlowProps {
  task: TaskDetailInfo;
}

type FormType = {
  currentStep: number;

  // credit information
  isCC: boolean;
  isALPL: boolean;
  isAccountOpening: boolean;
  isCCReconsiled: boolean;
  isALPLReconsiled: boolean;
  isCASAReconsiled: boolean;
  reqLoanAmount: string;
  reqType: "PL NEW" | "PL TOPUP" | "24hr PL";
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
  applicantAddressStreet1: string;
  applicantAddressStreet2: string;
  applicantAddressCity: string;
  applicantAddressProvince: string;
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

  // ALPL Checkpoints
  alplCheckpoints: {
    applicationFormChecks: {
      isSupportingDocumentsClear: boolean;
      isAgeValidForPRB: boolean;
      isSignatureCompleteInAllPanels: boolean;
      isNameMatchingIdentificationProof: boolean;
    };
    customerRelationshipWithSCB: {
      isExistingSCBCustomer: boolean;
      scbCasaAccountNumber: boolean;
      scbCreditCardAccountNumber: boolean;
    };
    identityProof: {
      isNicPassportDrivingLicenseClear: boolean;
      isNicInPassportOrDrivingLicense: boolean;
      isCustomerAttestationAndSalesConfirmationDone: boolean;
    };
    addressProof: {
      isUtilityBillRecent: boolean;
      isUtilityBillInValidName: boolean;
      isValidProofForThirdPartyUtilityBill: boolean;
      isSalesConfirmationOnUtilityBillDone: boolean;
    };
    salaryTransfer: {
      isEmployerUndertakingToRemitSalary: boolean;
      isEmployerUndertakingToNotifyAbsence: boolean;
      isOriginalLetterDulySigned: boolean;
      isEmploymentDetailsConfirmed: boolean;
      isSeparateLetterFromEmployerValid: boolean;
      isSignaturesVerifiedAgainstSpecimen: boolean;
      isCompanyEnrolledInLoanScheme: boolean;
    };
    retirementAgeConfirmation: {
      isRetirementAgeConfirmedByEmployer: boolean;
    };
    salaryVerificationChecklist: {
      isPaySlipOriginalOrCertified: boolean;
      isPaySlipCertifiedAndSigned: boolean;
      isSalaryBreakdownConfirmedByEmployer: boolean;
    };
    employmentContract: {
      isSalesPersonOriginalSeenConfirmed: boolean;
    };
    repaymentMode: {
      isSIFormCertifiedAsOriginalSighted: boolean;
    };
    bankStatement: {
      arePhysicalBankStatementsProvided: boolean;
      isDeclarationSignedIfNoAccount: boolean;
      areStatementCopiesCertifiedAsOriginal: boolean;
      arePrintedStatementsCertifiedIfEStatements: boolean;
    };
    takeOverLetter: {
      isCustomerLetterOriginalAndRecent: boolean;
      isFinancialInstituteLetterRecent: boolean;
    };
    facilityClosure: {
      areClosureConfirmationLettersSighted: boolean;
    };
    professionalQualificationCertificatesRows: {
      isCustomerAttestationDone: boolean;
    };
    vehicleDocuments: {
      isVehicleValuationReportProvided: boolean;
      isVehicleRegistrationCopyProvided: boolean;
      areOwnershipTransitionLettersProvided: boolean;
      isOriginalPurchaseInvoiceProvidedIfNew: boolean;
      isOriginalLetterFromSellerIfSecondHand: boolean;
    };
    waiverApproval: {
      isFeeWaiverApprovedByVCGM: boolean;
    };
    baselIIForm: {
      isFriendOrRelativeContactDeclared: boolean;
      isLoanAccountNumberCorrectlyFilled: boolean;
    };
    // Top up application
    topUpApplicationForm: {
      areAllFieldsCompleted: boolean;
      areSignaturesInAllPanelsProvided: boolean;
    };
    topUpPayslip: {
      isLatestPaySlipPhotocopyOrFaxProvided: boolean;
    };
    topUpExistingPayment: {
      isExistingRepaymentFormValid: boolean;
    };
    // topUpExistingLoanPerformanceRows: {
    //   isSatisfactoryPerformanceProofProvided: boolean;
    // };
    topUpSignatureVerification: {
      areSignaturesVerifiedAgainstSigcap: boolean;
    };
  };
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
};

const defaultValues: FormType = {
  currentStep: 5,

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
  applicantAddressStreet1: "",
  applicantAddressStreet2: "",
  applicantAddressCity: "",
  applicantAddressProvince: "",
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

  // ALPL Checkpoints
  alplCheckpoints: {
    applicationFormChecks: {
      isSupportingDocumentsClear: false,
      isAgeValidForPRB: false,
      isSignatureCompleteInAllPanels: false,
      isNameMatchingIdentificationProof: false,
    },
    customerRelationshipWithSCB: {
      isExistingSCBCustomer: false,
      scbCasaAccountNumber: false,
      scbCreditCardAccountNumber: false,
    },
    identityProof: {
      isNicPassportDrivingLicenseClear: false,
      isNicInPassportOrDrivingLicense: false,
      isCustomerAttestationAndSalesConfirmationDone: false,
    },
    addressProof: {
      isUtilityBillRecent: false,
      isUtilityBillInValidName: false,
      isValidProofForThirdPartyUtilityBill: false,
      isSalesConfirmationOnUtilityBillDone: false,
    },
    salaryTransfer: {
      isEmployerUndertakingToRemitSalary: false,
      isEmployerUndertakingToNotifyAbsence: false,
      isOriginalLetterDulySigned: false,
      isEmploymentDetailsConfirmed: false,
      isSeparateLetterFromEmployerValid: false,
      isSignaturesVerifiedAgainstSpecimen: false,
      isCompanyEnrolledInLoanScheme: false,
    },
    retirementAgeConfirmation: {
      isRetirementAgeConfirmedByEmployer: false,
    },
    salaryVerificationChecklist: {
      isPaySlipOriginalOrCertified: false,
      isPaySlipCertifiedAndSigned: false,
      isSalaryBreakdownConfirmedByEmployer: false,
    },
    employmentContract: {
      isSalesPersonOriginalSeenConfirmed: false,
    },
    repaymentMode: {
      isSIFormCertifiedAsOriginalSighted: false,
    },
    bankStatement: {
      arePhysicalBankStatementsProvided: false,
      isDeclarationSignedIfNoAccount: false,
      areStatementCopiesCertifiedAsOriginal: false,
      arePrintedStatementsCertifiedIfEStatements: false,
    },
    takeOverLetter: {
      isCustomerLetterOriginalAndRecent: false,
      isFinancialInstituteLetterRecent: false,
    },
    facilityClosure: {
      areClosureConfirmationLettersSighted: false,
    },
    professionalQualificationCertificatesRows: {
      isCustomerAttestationDone: false,
    },
    vehicleDocuments: {
      isVehicleValuationReportProvided: false,
      isVehicleRegistrationCopyProvided: false,
      areOwnershipTransitionLettersProvided: false,
      isOriginalPurchaseInvoiceProvidedIfNew: false,
      isOriginalLetterFromSellerIfSecondHand: false,
    },
    waiverApproval: {
      isFeeWaiverApprovedByVCGM: false,
    },
    baselIIForm: {
      isFriendOrRelativeContactDeclared: false,
      isLoanAccountNumberCorrectlyFilled: false,
    },
    topUpApplicationForm: {
      areAllFieldsCompleted: false,
      areSignaturesInAllPanelsProvided: false,
    },
    topUpPayslip: {
      isLatestPaySlipPhotocopyOrFaxProvided: false,
    },
    topUpExistingPayment: {
      isExistingRepaymentFormValid: false,
    },
    // topUpExistingLoanPerformanceRows: {
    //   isSatisfactoryPerformanceProofProvided: false,
    // },
    topUpSignatureVerification: {
      areSignaturesVerifiedAgainstSigcap: false,
    },
  },
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
};

const BundleForm: React.FC<BundledFlowProps> = ({ task }) => {
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
  const [ccChecklist, setCCChecklist] = useState<ChecklistInfo[]>([]);

  const [creditInformation, setCreditInformation] =
    useState<CreditInformation | null>(null);

  const [clientInformation, setClientInformation] =
    useState<ClientInformation | null>(null);

  const [verificationInformation, setVerificationInformation] =
    useState<VerificationInfromation | null>(null);

  const [salesInformation, setSalesInformation] =
    useState<SalesInfromation | null>(null);

  const [casaChecklist, setCasaChecklist] = useState<ChecklistInfo[]>([]);

  const [sendToCellChecklist, setSendToCellChecklist] = useState<
    ChecklistInfo[]
  >([]);

  const [cellUserCheckList, setCellUserChecklist] = useState<ChecklistInfo[]>(
    []
  );

  const [alplChecklist, setALPLChecklist] = useState<ChecklistInfo[]>([]);

  const [extendedVerificationInfo, setExtendedVerificationInfo] =
    useState<ExtendedVerificationInfo | null>(null);

  const [cribPullInformation, setCribPullInformation] =
    useState<BundleCribpullInfo | null>(null);

  // get cribpull information
  const getCribpullInformation = async () => {
    const { data, err } = await Api.performRequest((r) =>
      r.creditCard.getBundleCribPullInfo(task.processInstanceId)
    );

    if (data !== null) {
      setCribPullInformation(data);
    } else {
      console.log(err);
    }
  };

  const methods = useForm<FormType>({
    mode: "onChange",
    defaultValues,
    // resolver: zodResolver(creditInformationSchema),
  });

  const { watch, setValue, handleSubmit } = methods;

  // get credit information on load
  const getCreditInformation = async () => {
    const { data, err } = await Api.performRequest((r) =>
      r.creditCard.getCreditInformation(task.processInstanceId)
    );

    if (data !== null) {
      console.log(data);
      setCreditInformation(data);
    } else {
      console.log(err);
    }
  };

  // get credit information on load
  const getClientInformation = async () => {
    const { data, err } = await Api.performRequest((r) =>
      r.creditCard.getClientInformation(task.processInstanceId)
    );

    if (data !== null) {
      console.log(data);
      setClientInformation(data);
    } else {
      console.log(err);
    }
  };

  // get verification information on load
  const getVerificationInformation = async () => {
    const { data, err } = await Api.performRequest((r) =>
      r.creditCard.getVerificationInformation(task.processInstanceId)
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
      r.creditCard.getSalesInformation(task.processInstanceId)
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
      r.creditCard.getBranchManagers(task.processInstanceId)
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
        task.processInstanceId,
        task.processDefinitionKey,
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
        task.processInstanceId,
        task.processDefinitionKey,
        "CBO_CHECKER"
      )
    );

    if (data !== null) {
      setSendToCellChecklist(data);
    } else {
      console.log(err?.msg);
    }
  };

  // get cell user checklist items -> chaneg when api implemented
  const getCellUserChecklistValues = async () => {
    const { data, err } = await Api.performRequest((r) =>
      r.creditCard.getCasaChecklistItems(
        task.processInstanceId,
        task.processDefinitionKey,
        "CELL_USER"
      )
    );

    if (data !== null) {
      setCellUserChecklist(data);
      Logger.debug("Cell User Checklist: " + data);
    } else {
      console.log(err?.msg);
    }
  };

  // get extended verification info
  const getExtendedVerificationInformation = async () => {
    const { data, err } = await Api.performRequest((r) =>
      r.creditCard.getExtendedVerificationInformation(task.processInstanceId)
    );

    if (data !== null) {
      setExtendedVerificationInfo(data);
    } else {
      console.log(err);
    }
  };

  // get alpl checklist
  const getALPLChecklist = async () => {
    const { data, err } = await Api.performRequest((r) =>
      r.creditCard.getCCChecklist(task.processInstanceId, "ALPL")
    );

    if (data !== null) {
      setALPLChecklist(data);
    } else {
      console.log(err);
    }
  };

  // handle method --> cell user checklist submission
  const handleCellUserChecklistSubmission = async () => {
    const { err } = await Api.performRequest((r) =>
      r.creditCard.saveBundleChecklist(
        sendToCellChecklist,
        task.processInstanceId,
        task.taskInstance
      )
    );
    if (!err) {
      toast.success("Cell User checklist saved");
      setValue("currentStep", 6);
    } else {
      toast.error(err.msg);
    }
  };

  useEffect(() => {
    getDropdownData("customer-source-type", setSourceTypeDropdowns);
    getDropdownData("card-type", setCardTypeDropdowns);
    getDropdownData("branch", setBranchDropdowns);
    getDropdownData("company", setCompanyDropdowns);
    getDropdownData("applicant-title", setTitleTypeDropdowns);

    getDBRUsers();
    getBranchManagers();

    getCreditInformation();
    getClientInformation();
    getVerificationInformation();
    getSalesInformation();
    getCasaChecklistValues();
    getSendToCellChecklistValues();
    getCellUserChecklistValues();
    getExtendedVerificationInformation();
    getCribpullInformation();
    getALPLChecklist();
  }, []);

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
          : "24hr PL"
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

  const sourceType = watch("sourceType");
  const isAlpl = watch("isALPL");
  const isCC = watch("isCC");
  const isAccountOpening = watch("isAccountOpening");
  const currentStep = watch("currentStep");

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
      setValue("applicantAddressStreet1", clientInformation.resAddress1 || "");
      setValue("applicantAddressStreet1", clientInformation.resAddress1 || "");
      setValue("applicantAddressCity", clientInformation.resAddress3 || "");
      setValue("applicantAddressProvince", clientInformation.resAddress4 || "");
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
        verificationInformation.customerDueDiligence === "EDD" ? "EDD" : "SDD"
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

  // get cc checklist
  const getCCChecklist = async () => {
    if (!sourceType) {
      return;
    }

    const { data, err } = await Api.performRequest((r) =>
      r.creditCard.getCCChecklist(task.processInstanceId, sourceType.code || "")
    );

    if (data !== null) {
      setCCChecklist(data);
    } else {
      console.log(err);
    }
  };

  useEffect(() => {
    getCCChecklist();
  }, [sourceType]);

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

  const steps = [
    {
      label: "Eye Balling Pre Check",
      content: <EyeBallingPreCheckView task={task} />,
    },
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
    ...(isCC && task.taskId !== "archiveProcessLoan"
      ? [
          {
            label: "CC Checkpoints",
            content: (
              // <CCCheckpoints
              //   ccChecklist={ccChecklist}
              //   editable={false}
              //   setCCChecklist={setCCChecklist}
              // />
              <CCCheckpointsAllFields
                ccChecklist={ccChecklist}
                isSalesEditable={false}
                isOperationsEditable={false}
                isCreditEditable={false}
                setCCChecklist={setCCChecklist}
              />
            ),
          },
        ]
      : []),
    ...(isAlpl && task.taskId !== "archiveProcessCard"
      ? [
          {
            label: "ALPL Checkpoints",
            content: (
              <ALPLCheckpointsAllFields
                alplChecklist={alplChecklist}
                setALPLChecklist={setALPLChecklist}
                salesEditable={false}
                creditEditable={false}
                operationEditable={false}
              />
            ),
          },
        ]
      : []),
    {
      label: "Send to Cell",
      content: (
        <SendToCell
          editable={false}
          sendToCellChecklist={sendToCellChecklist}
          setSendToCellChecklist={setSendToCellChecklist}
        />
      ),
    },
    {
      label: "Static Data Changes",
      content: (
        <div className="col-span-1">
          <StaticDataChanges editable={false} />
        </div>
      ),
    },
    // ...(isAccountOpening
    //   ? [
    {
      label: "Cell User Checklist",
      content: (
        <CellUserCheckList
          editable={false}
          cellUserChecklist={cellUserCheckList}
          setCellUserChecklist={setCellUserChecklist}
        />
      ),
    },
    // ]
    // : []),
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
      <div className="flex flex-col gap-12">
        <Ve3StepWizard
          selectStep={steps.findIndex(
            (step) => step.label === "Cell User Checklist"
          )}
          currentSteps={steps
            .slice(
              steps.findIndex((step) => step.label === "Cell User Checklist")
            )
            .map(
              (_, index) =>
                steps.findIndex(
                  (step) => step.label === "Cell User Checklist"
                ) + index
            )}
          completedSteps={Array.from(
            {
              length: steps.findIndex(
                (step) => step.label === "Cell User Checklist"
              ),
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
