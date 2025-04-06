import { Button } from "@mui/material";
import dayjs, { Dayjs } from "dayjs";
import React, { useEffect, useState } from "react";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import Ve3StepWizard from "../../../../@core/ui/Ve3StepWizard";
import AttachmentsForm from "../components/Attachments/AttachmentsForm";
import CustomerDetailsForm from "../components/CustomerDetailsForm/CustomerDetailsForm";
import EFormView from "../components/EFormView/EFormView";
import FacilityAndCollateralInformation from "../components/FacilityAndCollateralDetailsForm/FacilityAndCollateralInformation";
import NewCollateralDetailsView from "../components/NewCollateralDetailsView/NewCollateralDetailsView";
import NewCollateralTableView from "../components/NewCollateralTableForm/NewCollateralTableForm";
import OverDraftForm from "../components/OverDraftForm/OverDraftForm";

import { toast } from "react-toastify";
import EdgeSvgIcon from "../../../../@core/ui/EdgeSvgIcon";
import Logger from "../../../../@helpers/Logger";
import { EncodeUrlPath } from "../../../../@helpers/RetriveFiles";
import { Api } from "../../../../api/Api";
import { Pageable } from "../../../../api/types/Pageable";
import { DocumentListParams } from "../../../../api/types/params/DocumentListParams";
import { ChecklistInfo } from "../../../core/types/ChecklistInfo";
import { DocumentInfo } from "../../../core/types/DocumentInfo";
import { DropDownItem } from "../../../core/types/DropDown";
import { TaskDetailInfo } from "../../../core/types/TaskDetailInfo";
import { EFormInfo } from "../../../externalComponents/overDraftEform/OverdraftEform/@types/eFormInfo";
import { odCollateralInfo } from "../../../externalComponents/overDraftEform/OverdraftEform/@types/odCollateralInfo";
import { odInfo } from "../../../externalComponents/overDraftEform/OverdraftEform/@types/odInfo";
import { formatCurrency } from "../../bundle/@helpers/Common";
import { OdProcessRequest } from "../@types/odProcessRequest";
import { UWUser } from "../@types/UWUser";
import CribDetailForm from "../components/CribDetailForm/CribDetailForm";
import DataEntryForm from "../components/DataEntryForm/DataEntryForm";
import DocumentDetailForm from "../components/DocumentDetailForm/DocumentDetailForm";
import JointCustomerDetailsForm from "../components/JointCustomerDetailsForm/JointCustomerDetailsForm";
import JointCustomerTable from "../components/JointCustomerTable/JointCustomerTable";
import OverDraftCategories from "../components/OverDraftCategories/OverDraftCategories";
import UnderwriterChecklist from "../components/UnderwriterChecklist/UnderwriterChecklist";

interface OverDraftFlowProps {
  task: TaskDetailInfo;
}

type FormType = {
  currentStep: number;
  // customer details
  title: DropDownItem | null;
  customerName: string;
  customerEmail: string;
  customerOccupation: string;
  customerMobile: string;
  customerResTel: string;
  customerNicPP: string;
  customerDob: Dayjs | null;
  customerResAdd1: string;
  customerResAdd2: string;
  customerResAdd3: string;
  customerFixedIncome: string;
  residentStatus: string;
  masterNumber: string;
  customerNationality: string;

  // joint customer details
  JointCustomerTitle: DropDownItem | null;
  jointCustomerName: string;
  jointCustomerOccupation: string;
  jointCustomerNicPP: string;
  jointCustomerDob: Dayjs | null;
  jointCustomerNationality: string;
  jointResidentStatus: string;
  jointCustomerEmail: string;
  jointCustomerMobile: string;
  jointCustomerResTel: string;
  jointCustomerResAdd1: string;
  jointCustomerResAdd2: string;
  jointCustomerResAdd3: string;
  jointCustomerFixedIncome: string;
  jointMasterNumber: string;
  jointRelationshipWithPrimary: string;

  //   facility and collateral details
  date: Dayjs | null;
  customerMaster: string;
  branch: DropDownItem | null;
  branchCode: string;
  armCode: string;
  segmentCode: string;

  //   overdraft facility details
  renewAnnually: boolean;
  odFacilityAccount: string;
  odCurrency: DropDownItem | null;
  odFacilityExpDate: Dayjs | null;
  odRateOfInterest: string;
  odRateOfInterestStandard: string;
  odFacilityAmountInFigures: string;
  odFacilityAmountInWords: string;
  odPurposeOfFacility: string;

  //   term loan details
  tlFacilityAccount: string;
  tlCurrency: DropDownItem | null;
  tlRateOfInterest: string;
  tlRepaymentPeriod: DropDownItem | null;
  tlFacilityRepayPeriodOther?: string | null;
  tlRepaymentAccount: string;
  tlRepaymentCurrency: DropDownItem | null;
  tlFacilityAmountInFigures: string;
  tlFacilityAmountInWords: string;
  tlFacilityExpDate: Dayjs | null;
  tlFacilityCreditingAccount: string;
  tlCurrency2: DropDownItem | null;
  tlPurposeOfFacility: string;

  // lien account number
  lienAccountNum: string;
  ncCurrency: DropDownItem | null;
  ncName: string;
  ncInterest: string;
  ncMaturityDate: Dayjs | null;
  ncCurrentBalance: string;
  ncLienAmount: string;
  ncApplicableLtv: string;
  ncApplicableAmountKeptAsCollateral: string;

  // total applicable limit
  totalApplicableLimit: string;

  // eform
  eFormUpload: File | null;

  // od draft type
  isNewOdAmend: boolean;
  isOdCancellation: boolean;
  isRateChangeOrFacilityRenew: boolean;

  // document detail
  isDocRetainedAtBranch: boolean;

  // crib detail
  isNoCribHistory: boolean;
  cribUpload: File | null;

  // overdraft categories
  isFCYBackedOD: boolean;
  isTBillBackedOD: boolean;
  isODforAverageCustomer: boolean;

  // data entry values
  productLoanType: DropDownItem | null;
  approvedLevelAndUser: UWUser | null;
  approvedLevel: string;
  approvedLevelUser: string;
  approvedAmount: string;
  l2l3Cap: string;
};

const defaultValues: FormType = {
  currentStep: 7,
  // customer details
  title: null,
  customerName: "",
  customerEmail: "",
  customerOccupation: "",
  customerMobile: "",
  customerResTel: "",
  customerNicPP: "",
  customerDob: null,
  customerResAdd1: "",
  customerResAdd2: "",
  customerResAdd3: "",
  customerFixedIncome: "",
  residentStatus: "",
  masterNumber: "",
  customerNationality: "",

  // joint customer
  JointCustomerTitle: null,
  jointCustomerName: "",
  jointCustomerOccupation: "",
  jointCustomerNicPP: "",
  jointCustomerDob: null,
  jointCustomerNationality: "",
  jointResidentStatus: "",
  jointCustomerEmail: "",
  jointCustomerMobile: "",
  jointCustomerResTel: "",
  jointCustomerResAdd1: "",
  jointCustomerResAdd2: "",
  jointCustomerResAdd3: "",
  jointCustomerFixedIncome: "",
  jointMasterNumber: "",
  jointRelationshipWithPrimary: "",

  //   facility and collateral details
  date: null,
  customerMaster: "",
  branch: null,
  branchCode: "",
  armCode: "",
  segmentCode: "",

  //   overdraft facility details
  renewAnnually: false,
  odFacilityAccount: "",
  odCurrency: null,
  odFacilityExpDate: null,
  odRateOfInterest: "",
  odRateOfInterestStandard: "",
  odFacilityAmountInFigures: "",
  odFacilityAmountInWords: "",
  odPurposeOfFacility: "",

  //   term loan details
  tlFacilityAccount: "",
  tlCurrency: null,
  tlRateOfInterest: "",
  tlRepaymentPeriod: null,
  tlFacilityRepayPeriodOther: "",
  tlRepaymentAccount: "",
  tlRepaymentCurrency: null,
  tlFacilityAmountInFigures: "",
  tlFacilityAmountInWords: "",
  tlFacilityExpDate: null,
  tlFacilityCreditingAccount: "",
  tlCurrency2: null,
  tlPurposeOfFacility: "",

  // lien account number
  lienAccountNum: "",
  ncCurrency: null,
  ncName: "",
  ncInterest: "",
  ncMaturityDate: null,
  ncCurrentBalance: "",
  ncLienAmount: "",
  ncApplicableLtv: "",
  ncApplicableAmountKeptAsCollateral: "",

  // total applicable limit
  totalApplicableLimit: "",

  // eform
  eFormUpload: null,

  // od draft type
  isNewOdAmend: false,
  isOdCancellation: false,
  isRateChangeOrFacilityRenew: false,

  // document detail
  isDocRetainedAtBranch: false,

  // crib detail
  isNoCribHistory: false,
  cribUpload: null,

  // overdraft categories
  isFCYBackedOD: false,
  isTBillBackedOD: false,
  isODforAverageCustomer: false,

  // data entry checks
  productLoanType: null,
  approvedLevelAndUser: null,
  approvedLevel: "",
  approvedLevelUser: "",
  approvedAmount: "",
  l2l3Cap: "",
};

const OverDraftFlow: React.FC<OverDraftFlowProps> = ({ task }) => {
  const methods = useForm<FormType>({
    mode: "onChange",
    defaultValues: defaultValues,
    // resolver: zodResolver(Schema)
  });

  const { setValue, handleSubmit, watch } = methods;

  const currentStep = watch("currentStep");
  const cribUpload = watch("cribUpload");
  const approvedLevelAndUser = watch("approvedLevelAndUser");

  const [titleDropdowns, setTitleDropdowns] = useState<DropDownItem[]>([]);
  const [branchDropdowns, setBranchDropdowns] = useState<DropDownItem[]>([]);
  const [currencyDropdowns, setCurrencyDropdowns] = useState<DropDownItem[]>(
    []
  );
  const [repaymentTypeDropdowns, setRepaymentTypeDropdowns] = useState<
    DropDownItem[]
  >([]);
  const [loanTypeDropdowns, setLoanTypeDropdowns] = useState<DropDownItem[]>(
    []
  );

  const [processInfo, setProcessInfo] = useState<EFormInfo | null>(null);
  const [documentList, setDocumentList] =
    useState<Pageable<DocumentInfo> | null>(null);
  const [selectedDocument, setSelectedDocument] = useState<DocumentInfo | null>(
    null
  );
  const [page, setPage] = useState<number>(0);
  const [blobObj, setBlobObj] = useState<Blob | null>(null);
  const FileUrl = EncodeUrlPath(selectedDocument?.path);

  const [primaryUser, setPrimaryUser] = useState<odInfo | null>(null);
  const [jointCustomers, setJointCustomers] = useState<odInfo[]>([]);
  const [selectedJointCustomerToEdit, setSelectedJointCustomerToEdit] =
    useState<odInfo | null>(null);
  const [selectedJointCustomerToView, setSelectedJointCustomerToView] =
    useState<odInfo | null>(null);
  const [collateralTableData, setCollateralTableData] = useState<
    odCollateralInfo[]
  >([]);
  const [selectedLienItemToEdit, setSelectedLienItemToEdit] =
    useState<odCollateralInfo | null>(null);
  const [uploadData, setUploadData] = useState<DocumentInfo | null>(null);

  const [underwriterChecklist, setUnderwriterChecklist] = useState<
    ChecklistInfo[]
  >([]);
  const [uwUsers, setUWUsers] = useState<UWUser[]>([]);

  // Common method for fetching dropdown data
  const getDropdownData = async (
    dropdownType: string,
    setState: React.Dispatch<React.SetStateAction<DropDownItem[]>>,
    isEForm?: boolean
  ) => {
    const { data, err } = await Api.performRequest((r) =>
      r.creditCard.getOverDraftDropdownData(dropdownType, isEForm)
    );

    if (data !== null) {
      setState(data);
    } else {
      console.log(err);
    }
  };

  // get od process info with process instance key
  const getOverdraftProcessInformation = async () => {
    const { data, err } = await Api.performRequest((r) =>
      r.creditCard.getOverDraftProcessInfo(task.processInstanceId)
    );
    if (data !== null) {
      setProcessInfo(data);
    } else {
      console.log(err);
    }
  };

  // get primary customer
  const getPrimaryCustomerDetails = async () => {
    if (!processInfo) {
      return;
    }

    const { data, err } = await Api.performRequest((r) =>
      r.creditCard.getPrimaryCustomerDetails(processInfo?.id)
    );

    if (data !== null) {
      setPrimaryUser(data);
    } else {
      console.log(err);
    }
  };

  // get joint customer details
  const getJointCustomerData = async () => {
    if (!processInfo) {
      return;
    }
    const { data, err } = await Api.performRequest((r) =>
      r.creditCard.getSavedJointCustomers(processInfo.id)
    );

    if (data !== null) {
      setJointCustomers(data);
    } else {
      console.log(err);
    }
  };

  // get collateral table data

  const getCollateralTableData = async () => {
    if (!processInfo) {
      return;
    }
    const { data, err } = await Api.performRequest((r) =>
      r.creditCard.getCollateralDetails(processInfo.id)
    );

    if (data !== null) {
      setCollateralTableData(data);
    } else {
      console.log(err?.msg);
    }
  };

  // get od checklist items
  const getOdChecklistValues = async () => {
    // getChecklistItems

    const { data, err } = await Api.performRequest((r) =>
      r.creditCard.getChecklistItems(
        task.processInstanceId,
        task.processDefinitionKey,
        "OD_UNDERWRITER"
      )
    );

    if (data !== null) {
      setUnderwriterChecklist(data);
    } else {
      console.log(err?.msg);
    }
  };

  // get uw users
  const getUWUsers = async () => {
    const { data, err } = await Api.performRequest((r) =>
      r.creditCard.getUWUsers()
    );

    if (data !== null) {
      setUWUsers(data);
    } else {
      console.log(err?.msg);
    }
  };

  // const handleSaveFormSubmission = async (formData: FormType) => {
  //   const request: SaveDocRetainedRequest = {
  //     overdraftActionType:
  //       formData.isNewOdAmend === true
  //         ? "OD_AMEND_OR_NEW"
  //         : formData.isOdCancellation === true
  //         ? "OD_CANCEL"
  //         : "RATE_CHANGE",
  //     facilityType: processInfo?.facilityType || "",
  //     overDraftFacilityType:
  //       processInfo?.facilityType == "OVER_DRAFT"
  //         ? processInfo.overDraftFacilityType
  //         : null,
  //     termLoanFacilityType:
  //       processInfo?.facilityType == "TERM_LOAN"
  //         ? processInfo.termLoanFacilityType
  //         : null,
  //     docRetainStatus: formData.isDocRetainedAtBranch,
  //   };

  //   const { err } = await Api.performRequest((r) =>
  //     r.creditCard.saveDocRetained(request, task.processInstanceId)
  //   );

  //   if (!err) {
  //     toast.success("Form Saved Successfully!");
  //   } else {
  //     toast.error(err.msg);
  //   }
  // };

  // handle Eform upload
  const handleCribFileUpload = async () => {
    try {
      if (cribUpload !== null) {
        const formData = new FormData();
        formData.append("file", cribUpload);
        formData.append("processInstance", task.processInstanceId);
        formData.append("taskInstance", task?.taskInstance);

        try {
          const { data: fileUploadData, err: fileUploadErr } =
            await Api.performRequest((r) => r.document.upload(formData));

          Logger.debug(
            "(Doc Upload) => { DATA: " +
              JSON.stringify(fileUploadData) +
              " , ERROR: " +
              JSON.stringify(fileUploadErr) +
              " }"
          );

          if (fileUploadData) {
            toast.success("Successfully Uploaded File");
            setValue("cribUpload", null);
            setUploadData(fileUploadData);
          } else {
            toast.error(fileUploadErr?.msg);
            // setIsSubmitted(false);
            return;
          }
        } catch (err) {
          console.error("Error uploading file: ", err);
          toast.error("Failed to upload file");
          // setIsSubmitted(false);
          return;
        }
      }
    } catch (error) {
      Logger.error("Exception during file entry submission: " + error);
      toast.error("An error occurred during submission");
    } finally {
      handleFetchDocumentList();
    }
  };

  const handleUWDetailsSubmission = async (formData: FormType) => {
    const request: OdProcessRequest = {
      facilityType: processInfo?.facilityType || "",
      overDraftFacilityType:
        processInfo?.facilityType == "OVER_DRAFT"
          ? processInfo.overDraftFacilityType
          : null,
      termLoanFacilityType:
        processInfo?.facilityType == "TERM_LOAN"
          ? processInfo.termLoanFacilityType
          : null,
      collateralTotalLimit: parseFloat(formData.totalApplicableLimit),
      overdraftActionType: processInfo?.overdraftActionType,
      docRetainStatus: processInfo?.docRetainStatus,
      masterLoanTypeId: formData.productLoanType?.id,
      approvedAmount: parseFloat(
        formData.approvedAmount.replace(/[^0-9.]/g, "")
      ),
      l2L3Cap: formData.l2l3Cap,
      uwApprover: formData.approvedLevelAndUser,
    };
    const { err } = await Api.performRequest((r) =>
      r.creditCard.saveUWDetails(task.processInstanceId, request)
    );

    if (!err) {
      toast.success("Form saved successfully");
    } else {
      toast.error(err.msg);
    }
  };

  // fetch all documents
  const handleFetchDocumentList = async () => {
    if (task === null) {
      return;
    }
    const params: DocumentListParams = {
      processInstance: task?.processInstanceId,
      page: page,
      size: 3,
      sort: "createdDate,desc",
      endDate: null,
      startDate: null,
      idProcess: null,
      workflowLabel: null,
      processName: null,
    };
    const { data, err } = await Api.performRequest((r) =>
      r.document.list(params)
    );
    Logger.debug(
      "(Document List) => { DATA: " +
        JSON.stringify(data) +
        " , ERROR: " +
        JSON.stringify(err)
    );
    if (data !== null) {
      setDocumentList(data);
    }
  };

  // fetch selected file
  const fetchFile = async () => {
    if (!FileUrl) return;

    // setLoading(true);

    try {
      const response = await fetch(FileUrl, {
        method: "GET",
        headers: {
          "Content-Type": "application/pdf",
        },
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const blob = await response.blob();
      setBlobObj(blob);
    } catch (error) {
      console.error("There was a problem with the fetch operation:", error);
    } finally {
      // setLoading(false);
    }
  };

  useEffect(() => {
    fetchFile();
  }, [selectedDocument]);

  /**
   * ---- USE EFFECTS -----
   */

  // initially loading the dropdown masters
  useEffect(() => {
    getDropdownData("title", setTitleDropdowns);
    getDropdownData("branch", setBranchDropdowns);
    getDropdownData("currency", setCurrencyDropdowns);
    getDropdownData("re-payment-type", setRepaymentTypeDropdowns);
    getDropdownData("loan-type", setLoanTypeDropdowns, false);

    // data on reload
    getOverdraftProcessInformation();

    // get underwriter checklist
    getOdChecklistValues();

    // get uw Users
    getUWUsers();
  }, []);

  // get primary user if the process id is present
  useEffect(() => {
    if (!processInfo) {
      return;
    }
    getPrimaryCustomerDetails();
    getJointCustomerData();
  }, [processInfo]);

  // get collateral info table data
  useEffect(() => {
    getCollateralTableData();
  }, [processInfo]);

  useEffect(() => {
    handleFetchDocumentList();
  }, [page]);

  // set primary customer data
  useEffect(() => {
    if (primaryUser !== null) {
      const matchingTitle = titleDropdowns.find(
        (item) => item.id.toString() === primaryUser.title
      );
      setValue("title", matchingTitle ? matchingTitle : null);
      setValue("customerName", primaryUser.name);
      setValue("customerDob", dayjs(primaryUser.dob));
      setValue("customerNicPP", primaryUser.nic);
      setValue("customerNationality", primaryUser.nationality || "");
      setValue("customerEmail", primaryUser.email);
      setValue("customerMobile", primaryUser.mobileNo);
      setValue("customerResTel", primaryUser.resTel || "");
      setValue("customerOccupation", primaryUser.occupation || "");
      setValue("customerResAdd1", primaryUser.resAdd1 || "");
      setValue(
        "customerResAdd2",
        primaryUser.resAdd2 ? primaryUser.resAdd2 : ""
      );
      setValue(
        "customerResAdd3",
        primaryUser.resAdd3 ? primaryUser.resAdd3 : ""
      );
      setValue("residentStatus", primaryUser.resStatus || "");
      setValue(
        "customerFixedIncome",
        primaryUser.income ? formatCurrency(primaryUser.income.toString()) : ""
      );
      setValue("masterNumber", primaryUser.masterNo || "");
    }
    if (processInfo) {
      const matchingBranchId = branchDropdowns.find(
        (item) => item.id === processInfo.branchId
      );
      const odMatchingCurrency = currencyDropdowns.find(
        (item) => item.id === processInfo.currencyId
      );
      const tlMatchingCurrency = currencyDropdowns.find(
        (item) => item.id === processInfo.tlCurrencyId
      );
      const tlMatchingRepayPeriod = repaymentTypeDropdowns.find(
        (item) => item.id.toString() == processInfo.repaymentPeriod
      );
      const repayMatchingCurrency = currencyDropdowns.find(
        (item) => item.id === processInfo.tlReqCurrencyId
      );
      const creditMatchingCurrency = currencyDropdowns.find(
        (item) => item.id === processInfo.tlCreditCurrency
      );

      setValue("date", dayjs(processInfo?.facilityDate));
      setValue("customerMaster", processInfo?.customerMaster || "");
      setValue("branch", matchingBranchId || null);
      setValue("branchCode", processInfo.branchId.toString());
      setValue("armCode", processInfo.armCode || "");
      setValue("segmentCode", processInfo.segmentCode || "");
      setValue("renewAnnually", processInfo.odAnnuallyRenew || false);
      setValue("odFacilityAccount", processInfo.odAccount || "");
      setValue("odCurrency", odMatchingCurrency || null);
      setValue("odFacilityExpDate", dayjs(processInfo.odExDate));
      setValue("odRateOfInterest", processInfo.odRateInt?.toString() || "");
      setValue(
        "odRateOfInterestStandard",
        processInfo.odStandardRateInt?.toString() || ""
      );
      setValue(
        "odFacilityAmountInFigures",
        processInfo.odReqAmount?.toString() || ""
      );
      setValue("odFacilityAmountInWords", processInfo.odReqAmountInWords || "");
      setValue("odPurposeOfFacility", processInfo.odPurpose || "");

      setValue("tlFacilityAccount", processInfo.tlAccount || "");
      setValue("tlCurrency", tlMatchingCurrency || null);
      setValue("tlRateOfInterest", processInfo.tlRateInt?.toString() || "");
      setValue("tlRepaymentPeriod", tlMatchingRepayPeriod || null);
      setValue("tlFacilityRepayPeriodOther", processInfo.repaymentPeriodOther);
      setValue("tlRepaymentAccount", processInfo.repaymentAcc || "");
      setValue("tlRepaymentCurrency", repayMatchingCurrency || null);
      setValue(
        "tlFacilityAmountInFigures",
        processInfo.tlReqAmount?.toString() || ""
      );
      setValue("tlFacilityAmountInWords", processInfo.tlReqAmountWords || "");
      setValue("tlFacilityCreditingAccount", processInfo.tlCreditAcc || "");
      setValue("tlCurrency2", creditMatchingCurrency || null);
      setValue("tlFacilityExpDate", dayjs(processInfo.tlExDate));
      setValue("tlPurposeOfFacility", processInfo.tlPurpose || "");

      setValue("isNoCribHistory", processInfo.noCribHistory);
      setValue("isFCYBackedOD", processInfo.fcyBackedOd);
      setValue("isTBillBackedOD", processInfo.tbillBackedOd);
      setValue("isODforAverageCustomer", processInfo.odAvgCus);
    }

    if (processInfo?.overdraftActionType) {
      if (processInfo?.overdraftActionType === "OD_AMEND_OR_NEW") {
        setValue("isNewOdAmend", true);
      }
      if (processInfo?.overdraftActionType === "OD_CANCEL") {
        setValue("isOdCancellation", true);
      }
      if (processInfo?.overdraftActionType === "RATE_CHANGE") {
        setValue("isRateChangeOrFacilityRenew", true);
      }
    }

    if (processInfo?.docRetainStatus) {
      setValue("isDocRetainedAtBranch", processInfo.docRetainStatus);
    }

    if (processInfo?.masterLoanTypeId) {
      const matchingLoanTypeId = loanTypeDropdowns.find(
        (item) => item.id === processInfo.masterLoanTypeId
      );

      const matchingLevelAndUser = uwUsers.find(
        (item) =>
          item.underWriterLevel === processInfo.approveLevel &&
          item.userName === processInfo.approvalGroupUser
      );

      setValue(
        "productLoanType",
        matchingLoanTypeId ? matchingLoanTypeId : null
      );
      setValue(
        "approvedAmount",
        formatCurrency(processInfo.approvedAmount.toString())
      );
      setValue("approvedLevelAndUser", matchingLevelAndUser || null);
      setValue("approvedLevelUser", processInfo.approvalGroupUser);
      setValue("l2l3Cap", processInfo.l2L3Cap);
      setValue("approvedLevel", processInfo.approveLevel);
    }
  }, [primaryUser, processInfo]);

  // Handle joint table edit button click
  useEffect(() => {
    if (selectedJointCustomerToView) {
      const matchingTitle = titleDropdowns.find(
        (item) => item.id.toString() === selectedJointCustomerToView.title
      );
      setValue("JointCustomerTitle", matchingTitle ? matchingTitle : null);
      setValue("jointCustomerName", selectedJointCustomerToView.name);
      setValue("jointCustomerDob", dayjs(selectedJointCustomerToView.dob));
      setValue("jointCustomerNicPP", selectedJointCustomerToView.nic);
      setValue(
        "jointCustomerNationality",
        selectedJointCustomerToView.nationality || ""
      );
      setValue("jointCustomerEmail", selectedJointCustomerToView.email);
      setValue("jointCustomerMobile", selectedJointCustomerToView.mobileNo);
      setValue("jointCustomerResTel", selectedJointCustomerToView.resTel || "");
      setValue(
        "jointCustomerOccupation",
        selectedJointCustomerToView.occupation || ""
      );
      setValue(
        "jointCustomerResAdd1",
        selectedJointCustomerToView.resAdd1 || ""
      );
      setValue(
        "jointCustomerResAdd2",
        selectedJointCustomerToView.resAdd2
          ? selectedJointCustomerToView.resAdd2
          : ""
      );
      setValue(
        "jointCustomerResAdd3",
        selectedJointCustomerToView.resAdd3
          ? selectedJointCustomerToView.resAdd3
          : ""
      );
      setValue(
        "jointResidentStatus",
        selectedJointCustomerToView.resStatus || ""
      );
      setValue(
        "jointCustomerFixedIncome",
        selectedJointCustomerToView.income
          ? formatCurrency(selectedJointCustomerToView.income.toString())
          : ""
      );
      setValue("jointMasterNumber", selectedJointCustomerToView.masterNo || "");
      setValue(
        "jointRelationshipWithPrimary",
        selectedJointCustomerToView.relPrimaryApplicant
          ? selectedJointCustomerToView.relPrimaryApplicant
          : ""
      );
    }
  }, [selectedJointCustomerToView]);

  // set collateral table values
  // set collateral table values
  useEffect(() => {
    if (!selectedLienItemToEdit) {
      return;
    }

    const ncMatchingCurrency = currencyDropdowns.find(
      (item) => item.id === selectedLienItemToEdit?.currencyId
    );
    setValue("lienAccountNum", selectedLienItemToEdit?.accountNo);
    setValue("ncCurrency", ncMatchingCurrency || null);
    setValue("ncName", selectedLienItemToEdit.name || "");
    setValue(
      "ncInterest",
      selectedLienItemToEdit.interest
        ? formatCurrency(selectedLienItemToEdit.interest.toString())
        : ""
    );
    setValue(
      "ncMaturityDate",
      dayjs(selectedLienItemToEdit.maturityDate) || ""
    );
    setValue(
      "ncCurrentBalance",
      formatCurrency(
        selectedLienItemToEdit.currentBalance
          ? selectedLienItemToEdit.currentBalance.toString()
          : ""
      )
    );
    setValue(
      "ncLienAmount",
      formatCurrency(selectedLienItemToEdit.lienAmount.toString())
    );
    setValue(
      "ncApplicableLtv",
      selectedLienItemToEdit.applicableLTV.toString()
    );
    setValue(
      "ncApplicableAmountKeptAsCollateral",
      selectedLienItemToEdit.colApplicableAmount
        ? formatCurrency(selectedLienItemToEdit.colApplicableAmount.toString())
        : ""
    );
  }, [selectedLienItemToEdit]);

  // change dataentry vals
  useEffect(() => {
    setValue("approvedLevel", approvedLevelAndUser?.underWriterLevel || "");
    setValue("approvedLevelUser", approvedLevelAndUser?.userName || "");
  }, [approvedLevelAndUser]);

  const steps = [
    {
      label: "Customer Details",
      content: (
        <form className="grid grid-cols-2 gap-14">
          <CustomerDetailsForm
            titleDropdowns={titleDropdowns}
            editable={false}
            onClickUpdate={() => {}}
          />
          <AttachmentsForm
            documentList={documentList}
            selectedDocument={selectedDocument}
            setSelectedDocument={setSelectedDocument}
            blobObj={blobObj}
            page={page}
            setPage={setPage}
          />
          <div className="flex col-span-2 gap-14 justify-end items-end">
            <Button onClick={() => setValue("currentStep", 1)}>
              Next <EdgeSvgIcon>feather:chevron-right</EdgeSvgIcon>
            </Button>
          </div>
        </form>
      ),
    },
    {
      label: "Joint Customer Details",
      content: (
        <form>
          <div className="flex flex-col gap-14">
            <div className="grid grid-cols-2 gap-14">
              <JointCustomerDetailsForm
                titleDropdowns={titleDropdowns}
                editable={false}
                onClickUpdate={() => {}}
              />
              <AttachmentsForm
                documentList={documentList}
                selectedDocument={selectedDocument}
                setSelectedDocument={setSelectedDocument}
                blobObj={blobObj}
                page={page}
                setPage={setPage}
              />
            </div>
            <JointCustomerTable
              data={jointCustomers}
              setSelectedJointCustomerToEdit={setSelectedJointCustomerToEdit}
              setSelectedJointCustomerToView={setSelectedJointCustomerToView}
              editable={false}
            />

            <div className="flex gap-14 justify-end items-end">
              <Button
                onClick={() => setValue("currentStep", 0)}
                className="flex flex-row gap-3"
              >
                <EdgeSvgIcon>feather:chevron-left</EdgeSvgIcon> Previous
              </Button>
              <Button onClick={() => setValue("currentStep", 2)}>
                Next <EdgeSvgIcon>feather:chevron-right</EdgeSvgIcon>
              </Button>
            </div>
          </div>
        </form>
      ),
    },
    {
      label: "Facility & Collateral",
      content: (
        <form>
          <div className="grid grid-cols-2 gap-14">
            <FacilityAndCollateralInformation
              branchDropdowns={branchDropdowns}
              facilityType={processInfo?.facilityType}
              repaymentTypeDropdowns={repaymentTypeDropdowns}
              editable={false}
              onClickUpdate={() => {}}
              currencyDropdowns={currencyDropdowns}
            />
            <AttachmentsForm
              documentList={documentList}
              selectedDocument={selectedDocument}
              setSelectedDocument={setSelectedDocument}
              blobObj={blobObj}
              page={page}
              setPage={setPage}
            />
            <div className="flex col-span-2 gap-14 justify-end items-end">
              <Button
                onClick={() => setValue("currentStep", 1)}
                className="flex flex-row gap-3"
              >
                <EdgeSvgIcon>feather:chevron-left</EdgeSvgIcon> Previous
              </Button>
              <Button onClick={() => setValue("currentStep", 3)}>
                Next <EdgeSvgIcon>feather:chevron-right</EdgeSvgIcon>
              </Button>
            </div>
          </div>
        </form>
      ),
    },
    {
      label: "New Collateral",
      content: (
        <div className="grid grid-cols-2 gap-14">
          <div className="flex flex-col gap-14">
            <form>
              <NewCollateralDetailsView
                currencyDropdowns={currencyDropdowns}
                editable={false}
              />
            </form>
            <form>
              <NewCollateralTableView
                editable={false}
                collateralTableData={collateralTableData}
                setSelectedLienItemToEdit={setSelectedLienItemToEdit}
              />
            </form>
          </div>
          <AttachmentsForm
            documentList={documentList}
            selectedDocument={selectedDocument}
            setSelectedDocument={setSelectedDocument}
            blobObj={blobObj}
            page={page}
            setPage={setPage}
          />
          <div className="flex col-span-2 gap-14 justify-end items-end">
            <Button
              onClick={() => setValue("currentStep", 2)}
              className="flex flex-row gap-3"
            >
              <EdgeSvgIcon>feather:chevron-left</EdgeSvgIcon> Previous
            </Button>
            <Button onClick={() => setValue("currentStep", 4)}>
              Next <EdgeSvgIcon>feather:chevron-right</EdgeSvgIcon>
            </Button>
          </div>
        </div>
      ),
    },
    {
      label: "E Form",
      content: (
        <form>
          <div className="flex flex-col gap-9">
            <div className="grid grid-cols-2 gap-14">
              <div className="flex flex-col gap-14">
                <EFormView editable={false} onUploadButtonClick={() => {}} />
                <OverDraftForm editable={false} />
                <DocumentDetailForm editable={false} />
              </div>
              <AttachmentsForm
                documentList={documentList}
                selectedDocument={selectedDocument}
                setSelectedDocument={setSelectedDocument}
                blobObj={blobObj}
                page={page}
                setPage={setPage}
              />
            </div>
            <div className="flex gap-14 justify-end">
              <Button
                onClick={() => setValue("currentStep", 3)}
                className="flex flex-row gap-3"
              >
                <EdgeSvgIcon>feather:chevron-left</EdgeSvgIcon> Previous
              </Button>
              <Button onClick={() => setValue("currentStep", 5)}>
                Next <EdgeSvgIcon>feather:chevron-right</EdgeSvgIcon>
              </Button>
            </div>
          </div>
        </form>
      ),
    },
    {
      label: "Document Check",
      content: (
        <form className="flex flex-col gap-14">
          <div className="grid grid-cols-2 gap-14">
            <div className="flex flex-col gap-14">
              <CribDetailForm
                editable={false}
                onUploadButtonClick={handleCribFileUpload}
              />
              <OverDraftCategories editable={false} />
            </div>
            <AttachmentsForm
              documentList={documentList}
              selectedDocument={selectedDocument}
              setSelectedDocument={setSelectedDocument}
              blobObj={blobObj}
              page={page}
              setPage={setPage}
            />
          </div>
          <div className="flex gap-14 justify-end">
            <Button
              onClick={() => setValue("currentStep", 4)}
              className="flex flex-row gap-3"
            >
              <EdgeSvgIcon>feather:chevron-left</EdgeSvgIcon> Previous
            </Button>
            {/* <Button type="submit" className="flex flex-row gap-3">
              <EdgeSvgIcon>feather:save</EdgeSvgIcon>Save Form
            </Button> */}
            <Button onClick={() => setValue("currentStep", 6)}>
              Next <EdgeSvgIcon>feather:chevron-right</EdgeSvgIcon>
            </Button>
          </div>
        </form>
      ),
    },
    {
      label: "Underwriter Checklist",
      content: (
        <form
          // onSubmit={handleSubmit(handleUnderwriterChecklistSubmission)}
          className="flex flex-col gap-14"
        >
          <div className="grid grid-cols-2 gap-14">
            <UnderwriterChecklist
              editable={false}
              underwriterChecklist={underwriterChecklist}
              setUnderwriterChecklist={setUnderwriterChecklist}
            />
            <AttachmentsForm
              documentList={documentList}
              selectedDocument={selectedDocument}
              setSelectedDocument={setSelectedDocument}
              blobObj={blobObj}
              page={page}
              setPage={setPage}
            />
          </div>
          <div className="flex gap-14 justify-end">
            <Button
              onClick={() => setValue("currentStep", 5)}
              className="flex flex-row gap-3"
            >
              <EdgeSvgIcon>feather:chevron-left</EdgeSvgIcon> Previous
            </Button>
            <Button onClick={() => setValue("currentStep", 7)}>
              Next <EdgeSvgIcon>feather:chevron-right</EdgeSvgIcon>
            </Button>
          </div>
        </form>
      ),
    },
    {
      label: "Data Entry",
      content: (
        <form
          className="flex flex-col gap-14"
          onSubmit={handleSubmit(handleUWDetailsSubmission)}
        >
          <div className="grid grid-cols-2 gap-14">
            <DataEntryForm
              editable={false}
              loanTypeDropdowns={loanTypeDropdowns}
              uwUsers={uwUsers}
            />
            <AttachmentsForm
              documentList={documentList}
              selectedDocument={selectedDocument}
              setSelectedDocument={setSelectedDocument}
              blobObj={blobObj}
              page={page}
              setPage={setPage}
            />
          </div>

          <div className="flex gap-14 justify-end">
            <Button
              onClick={() => setValue("currentStep", 6)}
              className="flex flex-row gap-3"
            >
              <EdgeSvgIcon>feather:chevron-left</EdgeSvgIcon> Previous
            </Button>
            <Button type="submit" className="flex flex-row gap-3" disabled>
              <EdgeSvgIcon>feather:save</EdgeSvgIcon>Save Form
            </Button>
          </div>
        </form>
      ),
    },
  ];

  const onSubmit: SubmitHandler<FormType> = (data) => {
    console.log(data);
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit)}></form>
      <div>
        <Ve3StepWizard
          selectStep={currentStep}
          currentSteps={[]}
          completedSteps={[0, 1, 2, 3, 4, 5, 6, 7]}
          steps={steps}
        />
      </div>
    </FormProvider>
  );
};

export default OverDraftFlow;
