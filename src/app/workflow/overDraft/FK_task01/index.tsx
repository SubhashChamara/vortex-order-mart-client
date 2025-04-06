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
import { DocumentInfo } from "../../../core/types/DocumentInfo";
import { DropDownItem } from "../../../core/types/DropDown";
import { TaskDetailInfo } from "../../../core/types/TaskDetailInfo";
import { EFormInfo } from "../../../externalComponents/overDraftEform/OverdraftEform/@types/eFormInfo";
import { odCollateralInfo } from "../../../externalComponents/overDraftEform/OverdraftEform/@types/odCollateralInfo";
import { odCollateralRequest } from "../../../externalComponents/overDraftEform/OverdraftEform/@types/odCollateralRequest";
import { odFacilityRequest } from "../../../externalComponents/overDraftEform/OverdraftEform/@types/odFacilityRequest";
import { odInfo } from "../../../externalComponents/overDraftEform/OverdraftEform/@types/odInfo";
import { odRequest } from "../../../externalComponents/overDraftEform/OverdraftEform/@types/odRequest";
import { tlFacilityRequest } from "../../../externalComponents/overDraftEform/OverdraftEform/@types/tlFacilityRequest";
import { formatCurrency } from "../../bundle/@helpers/Common";
import { OdProcessRequest } from "../@types/odProcessRequest";
import JointCustomerDetailsForm from "../components/JointCustomerDetailsForm/JointCustomerDetailsForm";
import JointCustomerTable from "../components/JointCustomerTable/JointCustomerTable";
import { zodResolver } from "@hookform/resolvers/zod";
import { getFormSchema } from "../schema/Schema";

interface OverDraftFlowProps {
  task: TaskDetailInfo;
}

type FormType = {
  applicationType: string;
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
  renewAnnually: boolean | null;
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
};

const defaultValues: FormType = {
  applicationType: "",
  currentStep: 0,
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
  renewAnnually: null,
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
};

const OverDraftFlow: React.FC<OverDraftFlowProps> = ({ task }) => {
  const [step, setCurrentStep] = useState<number>(0);
  const [processInfo, setProcessInfo] = useState<EFormInfo | null>(null);

  const methods = useForm<FormType>({
    mode: "onChange",
    defaultValues: defaultValues,
    resolver: zodResolver(
      getFormSchema(step, processInfo ? processInfo?.facilityType : "")
    ),
  });

  const { setValue, handleSubmit, resetField, watch } = methods;

  const currentStep = watch("currentStep");

  const [titleDropdowns, setTitleDropdowns] = useState<DropDownItem[]>([]);
  const [branchDropdowns, setBranchDropdowns] = useState<DropDownItem[]>([]);
  const [currencyDropdowns, setCurrencyDropdowns] = useState<DropDownItem[]>(
    []
  );
  const [repaymentTypeDropdowns, setRepaymentTypeDropdowns] = useState<
    DropDownItem[]
  >([]);

  const [uploadData, setUploadData] = useState<DocumentInfo | null>(null);
  const eFormUpload = watch("eFormUpload");
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
  const [collateralTableData, setCollateralTableData] = useState<
    odCollateralInfo[]
  >([]);
  const [selectedLienItemToEdit, setSelectedLienItemToEdit] =
    useState<odCollateralInfo | null>(null);

  // triggers
  const [triggerLienTable, setTriggerLienTable] = useState<boolean>(false);

  // Common method for fetching dropdown data
  const getDropdownData = async (
    dropdownType: string,
    setState: React.Dispatch<React.SetStateAction<DropDownItem[]>>
  ) => {
    const { data, err } = await Api.performRequest((r) =>
      r.creditCard.getOverDraftDropdownData(dropdownType)
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

  // handle primary customer update
  const handlePrimaryCustomerUpdate = async (formData: FormType) => {
    if (!processInfo) {
      return;
    }
    const request: odRequest = {
      id: primaryUser ? primaryUser.id : null,
      title: formData.title ? formData.title?.id.toString() : "",
      name: formData.customerName,
      email: formData.customerEmail,
      occupation:
        formData.customerOccupation === "" ? null : formData.customerOccupation,
      mobileNo: formData.customerMobile,
      resTel: formData.customerResTel === "" ? null : formData.customerResTel,
      nic: formData.customerNicPP,
      dob: formData.customerDob
        ? dayjs(formData.customerDob).format("YYYY-MM-DD")
        : "",
      resAdd1:
        formData.customerResAdd1 === "" ? null : formData.customerResAdd1,
      resAdd2:
        formData.customerResAdd2 === "" ? null : formData.customerResAdd2,
      resAdd3:
        formData.customerResAdd3 === "" ? null : formData.customerResAdd3,
      income:
        formData.customerFixedIncome === ""
          ? null
          : formData.customerFixedIncome
            ? parseFloat(formData.customerFixedIncome.replace(/[^0-9.]/g, ""))
            : null,
      resStatus:
        formData.residentStatus === "" ? null : formData.residentStatus,
      masterNo: formData.masterNumber === "" ? null : formData.masterNumber,
      nationality:
        formData.customerNationality === ""
          ? null
          : formData.customerNationality,
      overDraftProcess: {
        id: processInfo.id,
        facilityType: processInfo.facilityType,
        overDraftFacilityType:
          processInfo.facilityType == "OVER_DRAFT"
            ? processInfo.overDraftFacilityType
            : null,
        termLoanFacilityType:
          processInfo.facilityType == "TERM_LOAN"
            ? processInfo.termLoanFacilityType
            : null,
      },
    };

    const { err } = await Api.performRequest((r) =>
      r.creditCard.saveOverdraftPrimaryCustomer(request)
    );
    // if (data !== null) {
    //   setOdProcessInfo(data);
    // }
    if (!err) {
      toast.success("Primary customer updated successfully");
      // if (isMoreThanOneApplicant() === true) {
      //   setValue("currentStep", 1);
      // } else {
      //   setValue("currentStep", 2);
      // }
    } else {
      toast.error(err.msg);
    }
  };

  const handleJointCustomerUpdate = async (formData: FormType) => {
    const request: odRequest = {
      id: selectedJointCustomerToEdit ? selectedJointCustomerToEdit.id : null,
      title: formData.JointCustomerTitle
        ? formData.JointCustomerTitle?.id.toString()
        : "",
      name: formData.jointCustomerName,
      email: formData.jointCustomerEmail,
      occupation:
        formData.jointCustomerOccupation === ""
          ? null
          : formData.jointCustomerOccupation,
      mobileNo: formData.jointCustomerMobile,
      resTel:
        formData.jointCustomerResTel === ""
          ? null
          : formData.jointCustomerResTel,
      nic: formData.jointCustomerNicPP,
      dob: formData.jointCustomerDob
        ? dayjs(formData.jointCustomerDob).format("YYYY-MM-DD")
        : "",
      resAdd1:
        formData.jointCustomerResAdd1 === ""
          ? null
          : formData.jointCustomerResAdd1,
      resAdd2:
        formData.jointCustomerResAdd2 === ""
          ? null
          : formData.jointCustomerResAdd2,
      resAdd3:
        formData.jointCustomerResAdd3 === ""
          ? null
          : formData.jointCustomerResAdd3,
      income: formData.jointCustomerFixedIncome
        ? parseFloat(formData.jointCustomerFixedIncome.replace(/[^0-9.]/g, ""))
        : null,
      resStatus:
        formData.jointResidentStatus === ""
          ? null
          : formData.jointResidentStatus,
      masterNo:
        formData.jointMasterNumber === "" ? null : formData.jointMasterNumber,
      nationality:
        formData.jointCustomerNationality === ""
          ? null
          : formData.jointCustomerNationality,
      relPrimaryApplicant: formData.jointRelationshipWithPrimary,
    };

    if (selectedJointCustomerToEdit !== null) {
      try {
        const { err } = await Api.performRequest((r) =>
          r.creditCard.updateOverdraftJointCustomer(request)
        );

        if (!err) {
          toast.success("Joint customer updated successfully");
        } else {
          toast.error(err.msg);
        }
      } catch (err) {
        console.log(err);
      } finally {
        setSelectedJointCustomerToEdit(null);
        getJointCustomerData();
      }
    }
  };

  const handleFacilityInfoUpdate = async (formData: FormType) => {
    if (!processInfo) {
      return;
    }

    const requestOverDraft: odFacilityRequest = {
      id: processInfo?.id,
      facilityDate: dayjs(formData.date).format("YYYY-MM-DD"),
      customerMaster:
        formData.customerMaster === "" ? null : formData.customerMaster,
      branchId: (formData.branch && formData.branch.id) || 1,
      armCode: formData.armCode,
      segmentCode: formData.segmentCode,
      odAnnuallyRenew: formData.renewAnnually
        ? formData.renewAnnually.toString() == "true"
          ? true
          : false
        : false,
      odAccount: formData.odFacilityAccount,
      currencyId: formData.odCurrency ? formData.odCurrency?.id : 0,
      odExDate: dayjs(formData.odFacilityExpDate).format("YYYY-MM-DD"),
      odRateInt: Number(parseFloat(formData.odRateOfInterest).toFixed(2)),
      odStandardRateInt: Number(
        parseFloat(formData.odRateOfInterestStandard).toFixed(2)
      ),
      odReqAmount: Number(formData.odFacilityAmountInFigures),
      odReqAmountInWords: formData.odFacilityAmountInWords,
      odPurpose: formData.odPurposeOfFacility,
    };

    const requestTermLoan: tlFacilityRequest = {
      id: processInfo?.id,
      facilityDate: dayjs(formData.date).format("YYYY-MM-DD"),
      customerMaster: formData.customerMaster,
      branchId: formData.branch ? formData.branch?.id : 1,
      armCode: formData.armCode,
      segmentCode: formData.segmentCode,

      tlAccount: formData.tlFacilityAccount,
      tlCurrency: formData.tlCurrency?.id,
      tlRateInt: parseFloat(formData.tlRateOfInterest),
      repaymentPeriod: formData.tlRepaymentPeriod?.id.toString(),
      repaymentPeriodOther:
        formData.tlRepaymentPeriod?.id.toString() == "OTHER"
          ? formData.tlFacilityRepayPeriodOther
          : null,
      repaymentAcc: formData.tlRepaymentAccount,
      tlReqCurrencyId: formData.tlRepaymentCurrency?.id,
      tlReqAmount: parseInt(formData.tlFacilityAmountInFigures),
      tlReqAmountWords: formData.tlFacilityAmountInWords,
      tlExDate: dayjs(formData.tlFacilityExpDate).format("YYYY-MM-DD"),
      tlCreditAcc: formData.tlFacilityCreditingAccount,
      tlCreditCurrencyId: formData.tlCurrency2?.id,
      tlPurpose: formData.tlPurposeOfFacility,
    };

    const { err } = await Api.performRequest((r) =>
      r.creditCard.saveFacilityDetails(
        processInfo.facilityType === "OVER_DRAFT"
          ? requestOverDraft
          : requestTermLoan,
        processInfo.id
      )
    );

    if (!err) {
      toast.success("Facility details added successfully");
      setValue("currentStep", 3);
    } else {
      toast.error(err.msg);
    }
  };

  // add or update collateral information
  const handleCollateralInfoSubmit = async (formData: FormType) => {
    const request: odCollateralRequest = {
      id: selectedLienItemToEdit?.id || null,
      accountNo: formData.lienAccountNum,
      currencyId: formData.ncCurrency?.id || 0,
      name: formData.ncName,
      interest: parseFloat(formData.ncInterest),
      maturityDate: dayjs(formData.ncMaturityDate).format("YYYY-MM-DD"),
      currentBalance: parseFloat(
        formData.ncCurrentBalance.replace(/[^0-9.]/g, "")
      ),
      lienAmount: parseFloat(formData.ncLienAmount.replace(/[^0-9.]/g, "")),
      applicableLTV: parseFloat(formData.ncApplicableLtv),
    };

    try {
      if (selectedLienItemToEdit) {
        const { err } = await Api.performRequest((r) =>
          r.creditCard.updateCollateralInfo(request)
        );
        if (!err) {
          toast.success("Collateral information updated successfully");
          setSelectedLienItemToEdit(null);
        } else {
          toast.error(err.msg);
        }
      } else {
        if (!processInfo) {
          return;
        }
        const { err } = await Api.performRequest((r) =>
          r.creditCard.saveCollateralDetails(request, processInfo?.id)
        );
        if (!err) {
          toast.success("Collateral information added");
        }
      }
    } catch (err) {
      console.log(err);
    } finally {
      resetLienFields();
      setTriggerLienTable(!triggerLienTable);
    }
  };

  // handle Eform upload
  const handleEFormUpload = async () => {
    console.log("Eform upload called");

    try {
      if (eFormUpload !== null) {
        const formData = new FormData();
        formData.append("file", eFormUpload);
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
            setValue("eFormUpload", null);
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

  const handleSaveFormSubmission = async (formData: FormType) => {
    const request: OdProcessRequest = {
      eformDocumentId: uploadData?.id || processInfo?.eformDocumentId || "",
      overdraftActionType:
        formData.isNewOdAmend === true
          ? "OD_AMEND_OR_NEW"
          : formData.isOdCancellation === true
            ? "OD_CANCEL"
            : "RATE_CHANGE",
      facilityType: processInfo?.facilityType || "",
      overDraftFacilityType:
        processInfo?.facilityType == "OVER_DRAFT"
          ? processInfo.overDraftFacilityType
          : null,
      termLoanFacilityType:
        processInfo?.facilityType == "TERM_LOAN"
          ? processInfo.termLoanFacilityType
          : null,
    };

    const { err } = await Api.performRequest((r) =>
      r.creditCard.uploadEForm(request, task.processInstanceId)
    );

    if (!err) {
      toast.success("Form Saved Successfully!");
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

  // watch the step for zod
  useEffect(() => {
    setCurrentStep(currentStep);
  }, [currentStep]);

  // initially loading the dropdown masters
  useEffect(() => {
    getDropdownData("title", setTitleDropdowns);
    getDropdownData("branch", setBranchDropdowns);
    getDropdownData("currency", setCurrencyDropdowns);
    getDropdownData("re-payment-type", setRepaymentTypeDropdowns);

    // data on reload
    getOverdraftProcessInformation();
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
  }, [processInfo, triggerLienTable]);

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

      setValue("applicationType", processInfo.facilityType);

      setValue("date", dayjs(processInfo?.facilityDate));
      setValue("customerMaster", processInfo?.customerMaster || "");
      setValue("branch", matchingBranchId || null);
      setValue("branchCode", processInfo.branchId.toString());
      setValue("armCode", processInfo.armCode || "");
      setValue("segmentCode", processInfo.segmentCode || "");
      setValue("renewAnnually", processInfo.odAnnuallyRenew || null);
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
  }, [primaryUser, processInfo]);

  // Handle joint table edit button click
  useEffect(() => {
    if (selectedJointCustomerToEdit) {
      const matchingTitle = titleDropdowns.find(
        (item) => item.id.toString() === selectedJointCustomerToEdit.title
      );
      // setValue("jointTitle", selectedJointCustomerToEdit.title);
      setValue("JointCustomerTitle", matchingTitle ? matchingTitle : null);
      setValue("jointCustomerName", selectedJointCustomerToEdit.name);
      setValue("jointCustomerDob", dayjs(selectedJointCustomerToEdit.dob));
      setValue("jointCustomerNicPP", selectedJointCustomerToEdit.nic);
      setValue(
        "jointCustomerNationality",
        selectedJointCustomerToEdit.nationality || ""
      );
      setValue("jointCustomerEmail", selectedJointCustomerToEdit.email);
      setValue("jointCustomerMobile", selectedJointCustomerToEdit.mobileNo);
      setValue("jointCustomerResTel", selectedJointCustomerToEdit.resTel || "");
      setValue(
        "jointCustomerOccupation",
        selectedJointCustomerToEdit.occupation || ""
      );
      setValue(
        "jointCustomerResAdd1",
        selectedJointCustomerToEdit.resAdd1 || ""
      );
      setValue(
        "jointCustomerResAdd2",
        selectedJointCustomerToEdit.resAdd2
          ? selectedJointCustomerToEdit.resAdd2
          : ""
      );
      setValue(
        "jointCustomerResAdd3",
        selectedJointCustomerToEdit.resAdd3
          ? selectedJointCustomerToEdit.resAdd3
          : ""
      );
      setValue(
        "jointResidentStatus",
        selectedJointCustomerToEdit.resStatus || ""
      );
      setValue(
        "jointCustomerFixedIncome",
        selectedJointCustomerToEdit.income
          ? formatCurrency(selectedJointCustomerToEdit.income.toString())
          : ""
      );
      setValue("jointMasterNumber", selectedJointCustomerToEdit.masterNo || "");
      setValue(
        "jointRelationshipWithPrimary",
        selectedJointCustomerToEdit.relPrimaryApplicant
          ? selectedJointCustomerToEdit.relPrimaryApplicant
          : ""
      );
    }
  }, [selectedJointCustomerToEdit]);

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

  // reset fields
  const resetLienFields = () => {
    resetField("lienAccountNum");
    resetField("ncCurrency");
    resetField("ncCurrentBalance");
    resetField("ncName");
    resetField("ncInterest");
    resetField("ncLienAmount");
    resetField("ncApplicableLtv");
    resetField("ncApplicableAmountKeptAsCollateral");
  };

  const steps = [
    {
      label: "Customer Details",
      content: (
        <form
          onSubmit={handleSubmit(handlePrimaryCustomerUpdate)}
          className="grid grid-cols-2 gap-14"
        >
          <CustomerDetailsForm
            titleDropdowns={titleDropdowns}
            editable={true}
            onClickUpdate={() => { }}
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
        <form onSubmit={handleSubmit(handleJointCustomerUpdate)}>
          <div className="flex flex-col gap-14">
            <div className="grid grid-cols-2 gap-14">
              <JointCustomerDetailsForm
                titleDropdowns={titleDropdowns}
                editable={selectedJointCustomerToEdit ? true : false}
                onClickUpdate={() => { }}
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
        <form onSubmit={handleSubmit(handleFacilityInfoUpdate)}>
          <div className="grid grid-cols-2 gap-14">
            <FacilityAndCollateralInformation
              branchDropdowns={branchDropdowns}
              facilityType={processInfo?.facilityType}
              repaymentTypeDropdowns={repaymentTypeDropdowns}
              editable={true}
              onClickUpdate={() => { }}
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
            <form onSubmit={handleSubmit(handleCollateralInfoSubmit)}>
              <NewCollateralDetailsView
                currencyDropdowns={currencyDropdowns}
                editable={true}
              />
            </form>
            <form>
              <NewCollateralTableView
                editable={true}
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
        <form onSubmit={handleSubmit(handleSaveFormSubmission)}>
          <div className="flex flex-col gap-9">
            <div className="grid grid-cols-2 gap-14">
              <div className="flex flex-col gap-14">
                <EFormView
                  editable={true}
                  onUploadButtonClick={() => handleEFormUpload()}
                />
                <OverDraftForm editable={true} />
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
              <Button type="submit" className="flex flex-row gap-3">
                <EdgeSvgIcon>feather:save</EdgeSvgIcon>Save Form
              </Button>
            </div>
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
        {/* <CustomerDetailsForm editable={true} /> */}
        <Ve3StepWizard
          selectStep={currentStep}
          currentSteps={[0, 1, 2, 3, 4, 5, 6]}
          // completedSteps={[0, 1]}
          steps={steps}
        />
      </div>
    </FormProvider>
  );
};

export default OverDraftFlow;
