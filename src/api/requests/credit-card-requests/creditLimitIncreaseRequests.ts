import { ChecklistInfo } from "../../../app/core/types/ChecklistInfo";
import { DropDownItem } from "../../../app/core/types/DropDown";
import { CLIProcessCheckListInfo } from "../../../app/core/types/creditlimitIincreaseProcess/CLIProcessCheckListInfo";
import { EFormInfo } from "../../../app/externalComponents/overDraftEform/OverdraftEform/@types/eFormInfo";
import { odCollateralInfo } from "../../../app/externalComponents/overDraftEform/OverdraftEform/@types/odCollateralInfo";
import { odCollateralRequest } from "../../../app/externalComponents/overDraftEform/OverdraftEform/@types/odCollateralRequest";
import { odFacilityRequest } from "../../../app/externalComponents/overDraftEform/OverdraftEform/@types/odFacilityRequest";
import { odInfo } from "../../../app/externalComponents/overDraftEform/OverdraftEform/@types/odInfo";
import { odProcessInfo } from "../../../app/externalComponents/overDraftEform/OverdraftEform/@types/odProcessInfo";
import { odRequest } from "../../../app/externalComponents/overDraftEform/OverdraftEform/@types/odRequest";
import { tlFacilityRequest } from "../../../app/externalComponents/overDraftEform/OverdraftEform/@types/tlFacilityRequest";
import { FemInvsProcessInfi } from "../../../app/workflow/FrmInvestigation/@types/FemInvsProcessInfi";
import { FemlnvsRequest } from "../../../app/workflow/FrmInvestigation/@types/FemlnvsRequest";
import { ActionPointRequest } from "../../../app/workflow/FrmInvestigation/FK_task02/@types/ActionPointRequest";

import { FrmDataEntryRequest } from "../../../app/workflow/FrmDataEntry/@types/FrmDataEntryRequest";
import { FrmActionPointRequest } from "../../../app/workflow/FrmDataEntry/@types/FrmActionPointResponse";
import { FrmVerificationResponse } from "../../../app/workflow/FrmDataEntry/@types/FrmVerificationResponse";
import { FemVerificForm } from "../../../app/workflow/frmVerification/components/FemVerificForm";
import { FemVerificFormList } from "../../../app/workflow/frmVerification/components/FemVerificFormList";
import { FrmExternVerifResponse } from "../../../app/workflow/FrmDataEntry/@types/FrmExternVerifResponse";
import { FrmQuestionnaire } from "../../../app/workflow/FrmDataEntry/@types/FrmQuestionnaire";
import { FemExternVerifForm } from "../../../app/workflow/frmExternalVerification/components/FemExternVerifForm";
import { ExpertOpinion } from "../../../app/workflow/frmExternalVerification/components/ExpertOpinion";
import { CLICheckListCategory } from "../../../app/workflow/creditLimitIncrease/types/CLICheckListCategory";
import { CLICheckListHeading } from "../../../app/workflow/creditLimitIncrease/types/CLICheckListHeading";
import { CliInfo } from "../../../app/workflow/creditLimitIncrease/types/CliInfo";
import { CliRequest } from "../../../app/workflow/creditLimitIncrease/types/CliRequest";
import {
  FrmExpertOpinionActionPointResponse,
  FrmExpertOpinionDataEntryResponse,
  FrmExpertOpinionExternalVerificationResponse,
  FrmExpertOpinionInvestigationProcessResponse,
  FrmExpertOpinionQuestionnaireResponse,
  FrmExpertOpinionResponse,
  FrmExpertOpinionVerificationResponse,
} from "../../../app/workflow/frmExpertOpinion/@types/frmExpertOpinionRequest";
import { FrmExpertOpinionRequest } from "../../../app/workflow/frmExpertOpinion/@types/frmExpertOpinionResponse";
import {
  FrmQActionPointResponse,
  FrmQDataEntryResponse,
  FrmQExpertOpinionResponse,
  FrmQExternalVerificationResponse,
  FrmQInvestigationResponse,
  FrmQuestionnaireResponse,
  FrmQVerificationResponse,
} from "../../../app/workflow/frmQuestionnaire/@types/FrmQuestionnaireResponse";
import { FrmQuestionnaireRequest } from "../../../app/workflow/frmQuestionnaire/@types/frmQuestionnaireRequest";
import { CustomerVerificationInfo } from "../../../app/workflow/overDraft/@types/CustomerVerificationInfo";
import { CustomerVerificationRequest } from "../../../app/workflow/overDraft/@types/CustomerVerificationRequest";
import { UWUser } from "../../../app/workflow/overDraft/@types/UWUser";
import { OdProcessRequest } from "../../../app/workflow/overDraft/@types/odProcessRequest";
import { Request } from "../../api/Request";
import { ActionDetailsInf } from "../../../app/workflow/FrmInvestigation/reports/frm-invest-report/models/ActionDetailsInf";
import { CreditRequest } from "../../../app/workflow/bundle/@types/CreditRequest";
import { CreditInformation } from "../../../app/workflow/bundle/@types/CreditInfromation";
import { BundleClientRequest } from "../../../app/workflow/bundle/@types/BundleClientRequest";
import { BundleVerificationRequest } from "../../../app/workflow/bundle/@types/BundleVerificationRequest";
import { BundleSalesInfoRequest } from "../../../app/workflow/bundle/@types/BundleSalesInfoRequest";
import { DBRUser } from "../../../app/core/types/DBRUser";
import { ClientInformation } from "../../../app/workflow/bundle/@types/ClientInfromation";
import { VerificationInfromation } from "../../../app/workflow/bundle/@types/VerificationInfromation";
import { SalesInfromation } from "../../../app/workflow/bundle/@types/SalesInfromation";
import { ExtendedVerificationRequest } from "../../../app/workflow/bundle/@types/ExtendedVerificationRequest";
import { ErrorCommentRequest } from "../../../app/workflow/bundle/@types/ErrorCommentRequest";
import { ExtendedVerificationInfo } from "../../../app/workflow/bundle/@types/ExtendedVerificationInfo";
import { ChequeBookRequest } from "../../../app/workflow/bundle/@types/ChequeBookRequest";
import { ChequeBookInfo } from "../../../app/workflow/bundle/@types/ChequeBookInfo";
import { IBankingRequest } from "../../../app/workflow/bundle/@types/IBankingRequest";
import { IBankingInfo } from "../../../app/workflow/bundle/@types/IBankingInfo";
import { BundleCribpullInfo } from "../../../app/workflow/bundle/@types/BundleCribpullInfo";
import { BundleCribScoreInfo } from "../../../app/workflow/bundle/@types/BundleCribScore";
import { EyeballingDataEntryDataInfo } from "../../../app/workflow/bundle/@types/EyeballingDataEntryDataInfo";
import { EyeballingRequest } from "../../../app/workflow/bundle/@types/EyeballingRequest";
import { EyeballingInfo } from "../../../app/workflow/bundle/@types/EyeballingInfo";
import { EyeballingPrecheckInfo } from "../../../app/workflow/bundle/@types/EyeballingPrecheckInfo";
import { RelationshipProcessInfo } from "../../../app/workflow/bundle/@types/RelationshipProcessInfo";
import { RelationshipFraudInfo } from "../../../app/workflow/bundle/@types/RelationshipFraudInfo";
import { RelationshipCribInfo } from "../../../app/workflow/bundle/@types/RelationshipCribInfo";
import { RelationshipHistoryInfo } from "../../../app/workflow/bundle/@types/RelationshipHistoryInfo";
import { RelationshipVerificationAlertInfo } from "../../../app/workflow/bundle/@types/RelationshipVerificationAlertInfo";
import { RelationshipRecommendationInfo } from "../../../app/workflow/bundle/@types/RelationshipRecommendationInfo";
import { RelationshipEBBSInfo } from "../../../app/workflow/bundle/@types/RelationshipEBBSInfo";
import { RelationshipCardInfo } from "../../../app/workflow/bundle/@types/RelationshipCardInfo";
import { FrmCheckRequest } from "../../../app/workflow/bundle/@types/FrmCheckRequest";
import { FrmCheckInfo } from "../../../app/workflow/bundle/@types/FrmCheckInfo";
import { CCDataEntryRequest } from "../../../app/workflow/bundle/@types/CCDataEntryRequest";
import { CCDataEntryInfo } from "../../../app/workflow/bundle/@types/CCDataEntryInfo";
import { BundleUWLevelRequest } from "../../../app/workflow/bundle/@types/BundleUWLevelRequest";
import { BundleUWLevelInfo } from "../../../app/workflow/bundle/@types/BundleUWLevelInfo";
import { NicDetails } from "../../../app/core/types/NicDetails";
import { SalesReworkRequest } from "../../../app/workflow/bundle/@types/SalesReworkRequest";
import { SalesReworkInfo } from "../../../app/workflow/bundle/@types/SalesReworkInfo";
import { FraudStatusInfo } from "../../../app/workflow/bundle/@types/FraudStatusInfo";
import { FemFraudInvestForm } from "../../../app/workflow/FrnFraudInvestigation/@types/FemFraudInvestForm";
import { ApprovalAmountInfo } from "../../../app/workflow/bundle/@types/ApprovalAmountInfo";
import { FrmSummeryReportInfos } from "../../../app/workflow/FrmInvestigation/reports/frm-invest-report/components/FrmSummeryReportInfo";
import { LoanDataEntryInfo } from "../../../app/workflow/bundle/@types/LoanDataEntryInfo";
import { LoanDataEntryRequest } from "../../../app/workflow/bundle/@types/LoanDataEntryRequest";
import { LoanDocCheckRequest } from "../../../app/workflow/bundle/@types/LoanDocCheckRequest";
import { AutobookRequest } from "../../../app/workflow/bundle/@types/AutobookRequest";
import { eSignatureRequest } from "../../../app/workflow/eSign/FK_task02/Types/eSignatureRequest";
import { DocumentData } from "../../../app/workflow/eSign/FK_task02/components/DocumentData";
import { DocumentGenerateRequest } from "../../../app/workflow/eSign/FK_task02/Types/documentGenerateRequest";
import { FormRequest } from "../../../app/workflow/eSign/FK_task01/components/FormRequest";
import { FRMAlertInfo } from "../../../app/workflow/bundle/@types/FRMAlertInfo";
import { FRMAlertRequest } from "../../../app/workflow/bundle/@types/FRMAlertInfoRequest";

export const creditCardServiceRequests = () => {
  const prefix = "credit-card";

  return {
    /**
     * Save CLI Request details
     *
     * @param request cli reequest data
     */
    saveCliRequest: (request: CliRequest) =>
      Request.POST<void>(`${prefix}/credit-limit-increase`, request, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }),

    /**
     * Get CLI process information by process instance
     *
     * @param idProcess relevant user process id that need to get details
     * @returns UserProcessInfo
     */
    getCliByProcess: (idProcess: string) =>
      Request.GET<CliInfo>(`${prefix}/credit-limit-increase/${idProcess}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }),

    /**
     * Get CLI process personal title master
     *
     * @returns DropDownItem
     */
    getPersonalTitles: () =>
      Request.GET<DropDownItem>(`${prefix}/master/personal-titles`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }),

    /**
     * Get CLI process card type master
     *
     * @returns DropDownItem
     */
    getCardTypes: () =>
      Request.GET<DropDownItem>(`${prefix}/master/card-types`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }),

    /**
     * Get CLI process upgrade card type master
     *
     * @returns DropDownItem
     */
    getUpgradeCardTypes: () =>
      Request.GET<DropDownItem>(`${prefix}/master/upgrade-card-types`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }),

    /**
     * Get CLI process enhancement type master
     *
     * @returns DropDownItem
     */
    getEnhancementTypes: () =>
      Request.GET<DropDownItem>(`${prefix}/master/enhancement-types`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }),
    /**
     * Get CLI process request mode master
     *
     * @returns DropDownItem
     */
    getRequestMode: () =>
      Request.GET<DropDownItem>(`${prefix}/master/request-modes`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }),

    /**
     * Get CLI process request mode master
     *
     * @returns DropDownItem
     */
    getCheckListItems: (
      idProcess: string,
      category: CLICheckListCategory,
      heading: CLICheckListHeading | null
    ) =>
      Request.GET<CLIProcessCheckListInfo[]>(
        `${prefix}/credit-limit-increase/check-list/${idProcess}/${category}${heading ? `?heading-code=${heading}` : ""
        }`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      ),

    /**
     * Save CLI Request verifications
     *
     * @param request cli reequest data
     */
    verify: (
      verificationList: CLIProcessCheckListInfo[],
      selectionCriteriaList: CLIProcessCheckListInfo[],
      pendingReasonList: CLIProcessCheckListInfo[],
      cliRequest: CliRequest
    ) =>
      Request.POST<void>(
        `${prefix}/credit-limit-increase/verify`,
        {
          verificationList,
          selectionCriteriaList,
          pendingReasonList,
          cliRequest,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      ),

    /**
     * Get CLI process category list-UW Task
     *
     * @returns DropDownItem
     */
    getCagegoryItems: () =>
      Request.GET<DropDownItem>(`${prefix}/master/category`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }),

    /**
     * Get CLI process evaluated types list-UW Task
     *
     * @returns DropDownItem
     */
    getEvaluatedTypes: () =>
      Request.GET<DropDownItem>(`${prefix}/master/evaluated-type`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }),

    /**
     * Get CLI process approved Levels-UW Task
     *
     * @returns DropDownItem
     */
    getApprovedLevel: () =>
      Request.GET<DropDownItem>(`${prefix}/master/approved-level`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }),

    /**
     * Save CLI Request verifications
     *
     * @param request cli request data
     */
    underWriter: (
      processInstanace: string,
      cliRequest: CliRequest | null,
      pendReasonList: CLIProcessCheckListInfo[],
      rejectReasonList: CLIProcessCheckListInfo[]
    ) =>
      Request.POST<void>(
        `${prefix}/credit-limit-increase/under-writer/${processInstanace}`,
        {
          cliRequest,
          pendReasonList,
          rejectReasonList,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      ),

    /**
     * Save CLI Request details
     *
     * @param request cli reequest data
     */
    saveDocCheckList: (request: CliRequest) =>
      Request.POST<void>(
        `${prefix}/credit-limit-increase/doc-check-list`,
        request,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      ),

    /**
     * Save Check List
     *
     * @param request cli reequest data
     */
    saveCheckList: (
      checkList: CLIProcessCheckListInfo[],
      processInstance: string
    ) =>
      Request.POST<void>(
        `${prefix}/credit-limit-increase/check-list/${processInstance}`,
        checkList,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      ),

    /**
     * ---- OVER DRAFT FLOW REQUESTS
     */

    /**
     *
     * @param suffix - dropdown suffix
     * @returns relevant dropdown values according to the suffix
     */
    getOverDraftDropdownData: (suffix: string, isEform?: boolean) =>
      Request.GET<DropDownItem>(
        isEform === false
          ? `${prefix}/master/over-draft/${suffix}`
          : `${prefix}/master/over-draft/e-form/${suffix}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      ),

    /**
     * Save Overdraft customer
     *
     * @param odRequest containing the primary customer data
     * @returns odProcessInfo - credentials
     */
    saveOverdraftPrimaryCustomer: (request: odRequest) =>
      Request.POST<odProcessInfo>(
        `${prefix}/over-draft/e-form/primary-customer`,
        request
      ),

    /**
     * Get Overdraft primary customer
     *
     * @param odProcessId overdraft process id returned after saving the primary customer
     * @returns odPrimary user info
     */
    getPrimaryCustomerDetails: (odProcessId: number) =>
      Request.GET<odInfo>(
        `${prefix}/over-draft/e-form/primary-customer/${odProcessId}`
      ),

    /**
     * Save Overdraft customer
     *
     * @param odRequest containing the joint customer data
     * @returns none
     */
    saveOverdraftJointCustomer: (request: odRequest, id: number) =>
      Request.POST<void>(
        `${prefix}/over-draft/e-form/joint-customer/${id}`,
        request
      ),

    /**
     * Save Overdraft customer
     *
     * @param odRequest containing the joint customer data
     * @returns none
     */
    updateOverdraftJointCustomer: (request: odRequest) =>
      Request.PUT<void>(
        `${prefix}/over-draft/e-form/update-joint-customer`,
        request
      ),

    /**
     *
     * @param odProcessId - overdraft process id
     * @returns all the joint customers listed under the given primary customer id
     */
    getSavedJointCustomers: (odProcessId: number) =>
      Request.GET<odInfo[]>(
        `${prefix}/over-draft/e-form/joint-customers/${odProcessId}`
      ),

    /**
     *
     * @param request facility request data
     * @param odProcessId - overdraft process id
     * @returns none
     */
    saveFacilityDetails: (
      request: odFacilityRequest | tlFacilityRequest,
      odProcessId: number
    ) =>
      Request.POST<void>(
        `${prefix}/over-draft/e-form/facility-details/${odProcessId}`,
        request
      ),

    /**
     *
     * @param request collateral details request body of type odCollateralRequest
     * @param odProcessId - overdraft process id
     * @returns none
     */
    saveCollateralDetails: (
      request: odCollateralRequest,
      odProcessId: number
    ) =>
      Request.POST<void>(
        `${prefix}/over-draft/e-form/collateral-details/${odProcessId}`,
        request
      ),

    /**
     * get collateral details for the table
     *
     * @param odProcessId - overdraft process id
     * @returns collateral details table data
     */
    getCollateralDetails: (odProcessId: number) =>
      Request.GET<odCollateralInfo[]>(
        `${prefix}/over-draft/e-form/collateral-details/${odProcessId}`
      ),

    /**
     * complete e form request
     *
     * @param odProcessId - overdraft process id
     */
    completeEForm: (odProcessId: number) =>
      Request.POST<void>(
        `${prefix}/over-draft/e-form/e-form-complete/${odProcessId}`
      ),

    /**
     *
     * @param odProcessId - overdraft process id
     * @returns EFormInfo
     */
    getEformData: (odProcessId: number) =>
      Request.GET<EFormInfo>(`${prefix}/over-draft/e-form/${odProcessId}`),

    /**
     *
     * @param idProcess - process instance id
     * @returns an object containing the details of the specified Over Draft process instance.
     */
    getOverDraftProcessInfo: (idProcess: string) =>
      Request.GET<EFormInfo>(`${prefix}/over-draft/${idProcess}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }),

    /**
     *
     * @param collateral info request body
     */
    updateCollateralInfo: (request: odCollateralRequest) =>
      Request.PUT<void>(`${prefix}/over-draft/collateral-details`, request, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }),

    /**
     *
     * @param request OdProcessRequest request body
     * @param processInstance
     * @returns void
     */
    uploadEForm: (request: OdProcessRequest, processInstance: string) =>
      Request.POST<void>(
        `${prefix}/over-draft/upload-e-form-pdf/${processInstance}`,
        request,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      ),

    /**
     * Save the is doc retained value
     *
     * @param request OdProcessRequest request body
     * @param processInstance
     * @returns void
     */
    saveDocRetained: (request: OdProcessRequest, processInstance: string) =>
      Request.POST<void>(
        `${prefix}/over-draft/document-retained/${processInstance}`,
        request,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      ),

    /**
     *
     * @param request OdProcessRequest Request body
     * @param processInstanace
     * @returns
     */
    saveDocCheck: (request: OdProcessRequest, processInstanace: string) =>
      Request.POST<void>(
        `${prefix}/over-draft/doc-check/${processInstanace}`,
        request,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      ),

    /**
     *
     * @param processInstance process instance
     * @param processDefKey process definition key: eg: overDraft, cribPull
     * @param category - checklist category eg: OD_UNDERWRITER
     * @returns
     */
    getChecklistItems: (
      processInstance: string,
      processDefKey: string,
      category: string
    ) =>
      Request.GET<ChecklistInfo[]>(
        `${prefix}/over-draft/check-list/${processInstance}?process-def-key=${processDefKey}&category=${category}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      ),

    /**
     *
     * @param request checklist object
     * @returns void
     */
    saveUWChecklist: (request: ChecklistInfo[]) =>
      Request.POST<void>(`${prefix}/over-draft/check-list`, request, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }),

    /**
     *
     * @returns A list of UWUsers
     */
    getUWUsers: () =>
      Request.GET<UWUser[]>(`${prefix}/over-draft/uw-users`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }),

    /**
     *
     * @param processInstance
     * @param OdProcessRequest Request body
     * @returns none
     */
    saveUWDetails: (processInstance: string, request: OdProcessRequest) =>
      Request.POST<void>(
        `${prefix}/over-draft/uw-details/${processInstance}`,
        request,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      ),

    /**
     *
     * @param processInstance
     * @param OdProcessRequest Request body
     * @returns none
     */
    saveReProcessDetails: (
      processInstance: string,
      request: OdProcessRequest
    ) =>
      Request.POST<void>(
        `${prefix}/over-draft/re-process-date/${processInstance}`,
        request,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      ),

    saveCustomerVerify: (
      processInstance: string,
      request: CustomerVerificationRequest
    ) =>
      Request.POST<void>(
        `${prefix}/over-draft/customer-verify/${processInstance}`,
        request,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      ),

    getCustomerVerify: (processInstance: string) =>
      Request.GET<CustomerVerificationInfo>(
        `${prefix}/over-draft/customer-verify/${processInstance}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      ),

    saveFRMDetails: (processInstance: string, request: OdProcessRequest) =>
      Request.POST<void>(
        `${prefix}/over-draft/frm-date/${processInstance}`,
        request,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      ),

    saveForm: (request: FemlnvsRequest) =>
      Request.POST<void>(`${prefix}/frm-investigation/save-process`, request, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }),
    getNewNIC: (nic: string) =>
      Request.GET<NicDetails>(`${prefix}/master/nic-data`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        params: {
          nic: nic,
        },
      }),
    //saveExternalVerification
    saveExternalVerification: (
      request: FemExternVerifForm,
      processInstance: string
    ) =>
      Request.PUT<void>(
        `${prefix}/frm-external-verification/save-extrnl-verif-coment/${processInstance}`,
        request,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      ),
    //saveExternalVerificationAttampts
    saveExternalVerificationAttampts: (
      request: FemExternVerifForm,
      processInstance: string
    ) =>
      Request.PUT<void>(
        `${prefix}/frm-external-verification/save-attampts-details/${processInstance}`,
        request,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      ),

    saveActionPoinForm: (request: ActionPointRequest) =>
      Request.POST<void>(`${prefix}/frm-investigation/save-action`, request, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }),

    getFrmData: (idProcess: string) =>
      Request.GET<FemInvsProcessInfi>(
        `${prefix}/frm-investigation/get-process/${idProcess}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      ),
    //getMonthList
    getMonthList: (value: string) =>
      Request.GET<{ id: number; name: string }[]>(
        `${prefix}/master/common/${value}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      ),
    //getBranchList
    getBranchList: (value: string) =>
      Request.GET<{ id: number; name: string }[]>(
        `${prefix}/master/bundled/${value}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      ),
    //getApprovedUserList
    getApprovedUserList: () =>
      Request.GET<{ id: number; name: string }[]>(
        `${prefix}/e-signature/get-user-by-group`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      ),
    getApproverList: () =>
      Request.GET<{ id: number; name: string }[]>(
        `${prefix}/e-signature/get-approver-by-group`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      ),
    //getDocTypes
    getDocTypes: () =>
      Request.GET<{ id: number; name: string }[]>(
        `${prefix}/e-signature/get-doc-type`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      ),
    //getFormDetails
    getFormDetails: (value: string) =>
      Request.GET<FormRequest>(
        `${prefix}/e-signature/get-doc/${value}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      ),
    //getDocument
    getDocument: (value: string) =>
      Request.GET<FormRequest>(
        `document/archive/${value}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      ),
    //getActionData
    getActionData: (idProcess: string) =>
      Request.GET<FemInvsProcessInfi>(
        `${prefix}/frm-investigation/get-action/${idProcess}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      ),

    getInvFrmData: (idProcess: string) =>
      Request.GET<FemInvsProcessInfi>(
        `${prefix}/frm-data-entry/get-investigation/${idProcess}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      ),
    //getFraudInvmData
    getFraudInvmData: (idProcess: string) =>
      Request.GET<FemFraudInvestForm>(
        `${prefix}/frm-fraud-finalising/fraud-finalising-details/${idProcess}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      ),
    //getFraudInvestDetails
    getFraudInvestDetails: (idProcess: string) =>
      Request.GET<FemInvsProcessInfi>(
        `${prefix}/frm-fraud-finalising/get-investigation/${idProcess}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      ),
    //getFraudQuestionnaire
    getFraudQuestionnaire: (idProcess: string) =>
      Request.GET<FrmQuestionnaire>(
        `${prefix}/frm-fraud-finalising/get-questionnaire/${idProcess}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      ),
    getExpertOpinionData: (idProcess: string) =>
      Request.GET<FrmExpertOpinionResponse>(
        `${prefix}/frm-expert-opinion/get-expert-opinion/${idProcess}`,

        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      ),

    getActionPoints: (processInstance: string) =>
      Request.GET<FrmActionPointRequest[]>(
        `${prefix}/frm-data-entry/action-points/${processInstance}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      ),

    getFrmEOInvestigationData: (idProcess: string) =>
      Request.GET<FrmExpertOpinionInvestigationProcessResponse>(
        `${prefix}/frm-expert-opinion/get-investigation/${idProcess}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      ),
    getExpertOpinions: (processInstance: string) =>
      Request.GET<FrmExpertOpinionResponse[]>(
        `${prefix}/frm-data-entry/expert-opinion/${processInstance}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      ),
    getVerification: (processInstance: string) =>
      Request.GET<FrmVerificationResponse[]>(
        `${prefix}/frm-data-entry/verification/${processInstance}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      ),
    getQuestionnaire: (processInstance: string) =>
      Request.GET<FrmQuestionnaire[]>(
        `${prefix}/frm-data-entry/questionnaire/${processInstance}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      ),
    //getFraudActionPoints
    getFraudActionPoints: (processInstance: string) =>
      Request.GET<FrmActionPointRequest[]>(
        `${prefix}/frm-fraud-finalising/get-action-points/${processInstance}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      ),
    //getFraudExpertOpinions
    getFraudExpertOpinions: (processInstance: string) =>
      Request.GET<FrmExpertOpinionResponse[]>(
        `${prefix}/frm-fraud-finalising/get-expert-opinion/${processInstance}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      ),
    //getFraudDataEntry
    getFraudDataEntry: (processInstance: string) =>
      Request.GET<FrmDataEntryRequest>(
        `${prefix}/frm-fraud-finalising/get-data-entry/${processInstance}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      ),
    //getFraudVerification
    getFraudVerification: (processInstance: string) =>
      Request.GET<FrmVerificationResponse[]>(
        `${prefix}/frm-fraud-finalising/get-verification/${processInstance}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      ),
    //getFraudFrmExtVeri
    getFraudFrmExtVeri: (processInstance: string) =>
      Request.GET<FrmExternVerifResponse[]>(
        `${prefix}/frm-fraud-finalising/get-external-verification/${processInstance}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      ),
    getDataEntry: (processInstance: string) =>
      Request.GET<FrmDataEntryRequest[]>(
        `${prefix}/frm-data-entry/data-entry-details/${processInstance}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      ),
    saveFrmDataEntry: (frmDataEntryRequest: FrmDataEntryRequest) =>
      Request.POST<void>(`${prefix}/frm-data-entry/save`, frmDataEntryRequest, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }),
    //saveESignUploadForm
    saveESignUploadForm: (eSignData: FormRequest) =>
      Request.POST<void>(`${prefix}/e-signature/save-doc`, eSignData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }),
    saveFrmDataEntryPI: (processInstance: string) =>
      Request.PUT<void>(
        `${prefix}/frm-data-entry/save-data-entry-instance/${processInstance}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      ),
    getfrmEOActionPointData: (idProcess: string) =>
      Request.GET<FrmExpertOpinionActionPointResponse[]>(
        `${prefix}/frm-expert-opinion/get-action-points/${idProcess}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      ),

    getFrmEOFrmVerification: (idProcess: string) =>
      Request.GET<FrmExpertOpinionVerificationResponse[]>(
        `${prefix}/frm-expert-opinion/get-verification/${idProcess}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      ),
    getfrmEOFrmQuestionnaireData: (idProcess: string) =>
      Request.GET<FrmExpertOpinionQuestionnaireResponse[]>(
        `${prefix}/frm-expert-opinion/get-questionnaire/${idProcess}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      ),

    getFrmEOFrmDataEntry: (idProcess: string) =>
      Request.GET<FrmExpertOpinionDataEntryResponse>(
        `${prefix}/frm-expert-opinion/get-data-entry/${idProcess}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      ),
    getfrmEOFrmExternalVerification: (idProcess: string) =>
      Request.GET<FrmExpertOpinionExternalVerificationResponse[]>(
        `${prefix}/frm-expert-opinion/get-external-verification/${idProcess}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      ),

    getFrmEOfrmCompletedExpertOpinion: (idProcess: string) =>
      Request.GET<FrmExpertOpinionResponse[]>(
        `${prefix}/frm-expert-opinion/get-completed-expert-opinion/${idProcess}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      ),

    getFrmExtVeri: (processInstance: string) =>
      Request.GET<FrmExternVerifResponse[]>(
        `${prefix}/frm-data-entry/external-verification/${processInstance}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      ),
    getFrmEOfrmCompletedExpertOpinionUser: () =>
      Request.GET<DropDownItem[]>(
        `${prefix}/frm-expert-opinion/get-user-by-group`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      ),
    //getExternalVerif
    getExternalVerif: (processInstance: string) =>
      Request.GET<FrmExpertOpinionExternalVerificationResponse[]>(
        `${prefix}/frm-verification/get-frm-verification-list/${processInstance}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      ),
    //getQuestionList
    getQuestionList: (processInstance: string) =>
      Request.GET<FrmExpertOpinionExternalVerificationResponse[]>(
        `${prefix}/frm-verification/get-frm-question-list/${processInstance}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      ),
    //getDatEntryList
    getDatEntryList: (processInstance: string) =>
      Request.GET<FrmExpertOpinionDataEntryResponse>(
        `${prefix}/frm-verification/get-dataentry-list/${processInstance}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      ),

    getFrmVerificationData: (idProcess: string) =>
      Request.GET<FemInvsProcessInfi>(
        `${prefix}/frm-verification/get-invest-process/${idProcess}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      ),
    //getFrmVerificationDataView
    getFrmVerificationDataView: (idProcess: string) =>
      Request.GET<FemVerificFormList[]>(
        `${prefix}/frm-investigation/get-verification/${idProcess}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      ),
    //getReportDetails
    getReportDetails: (idProcess: string) =>
      Request.GET<FrmSummeryReportInfos>(
        `${prefix}/frm-data-entry/get-data-flow-report/${idProcess}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      ),
    //getFrmInvestView
    getFrmInvestView: (idProcess: string) =>
      Request.GET<FemInvsProcessInfi>(
        `${prefix}/frm-investigation/get-investigation/${idProcess}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      ),
    //getFrmActionPtVerificationDataView
    getFrmActionPtVerificationDataView: (idProcess: string) =>
      Request.GET<ActionPointRequest>(
        `${prefix}/frm-investigation/get-action-points/${idProcess}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      ),
    //getFrmQuestionView
    getFrmQuestionView: (idProcess: string) =>
      Request.GET<FrmExpertOpinionQuestionnaireResponse[]>(
        `${prefix}/frm-investigation/get-questionnaire/${idProcess}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      ),
    //getExpertOpi
    getExpertOpi: (idProcess: string) =>
      Request.GET<ExpertOpinion[]>(
        `${prefix}/frm-investigation/get-expert-opinion/${idProcess}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      ),
    //getDataEntryView
    getDataEntryView: (idProcess: string) =>
      Request.GET<FrmExpertOpinionDataEntryResponse>(
        `${prefix}/frm-investigation/get-data-entry/${idProcess}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      ),
    //getExternalVeridView
    getExternalVeridView: (idProcess: string) =>
      Request.GET<FrmExpertOpinionExternalVerificationResponse[]>(
        `${prefix}/frm-investigation/get-external-verification/${idProcess}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      ),

    getFrmActionPtVerificationData: (idProcess: string) =>
      Request.GET<FemInvsProcessInfi>(
        `${prefix}/frm-verification/get-action-points/${idProcess}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      ),
    saveVerificForm: (request: FemVerificForm, idProcess: string) =>
      Request.PUT<FemInvsProcessInfi>(
        `${prefix}/frm-verification/save-frm-verification-flow/${idProcess}`,
        request,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      ),
    //saveFraudInvestForm
    saveFraudInvestForm: (request: FemFraudInvestForm) =>
      Request.POST<void>(
        `${prefix}/frm-fraud-finalising/save`,
        request,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      ),
    saveVerificCommentForm: (request: FemVerificForm, idProcess: string) =>
      Request.PUT<FemInvsProcessInfi>(
        `${prefix}/frm-verification/savecomment-frm-verification-flow/${idProcess}`,
        request,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      ),

    getCommentData: (idProcess: string) =>
      Request.GET<FemInvsProcessInfi>(
        `${prefix}/frm-verification/get-comment-data/${idProcess}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      ),
    //getVerifiList
    getVerifiList: (idProcess: string) =>
      Request.GET<FemVerificFormList[]>(
        `${prefix}/frm-verification/get-comment-list/${idProcess}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      ),
    //setExpertOpini
    setExpertOpini: (idProcess: string) =>
      Request.GET<FemVerificFormList[]>(
        `${prefix}/frm-verification/get-expertopin-list/${idProcess}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      ),
    getInvestDetails: (idProcess: string) =>
      Request.GET<FemInvsProcessInfi>(
        `${prefix}/frm-external-verification/get-frmprocess-details/${idProcess}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      ),

    getEcternalVEriDetails: (idProcess: string) =>
      Request.GET<FemExternVerifForm>(
        `${prefix}/frm-external-verification/get-verificform-details/${idProcess}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      ),
    //getActionPointList
    getActionPointList: (idProcess: string) =>
      Request.GET<ActionPointRequest>(
        `${prefix}/frm-external-verification/get-action-points/${idProcess}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      ),
    //getVerifInstruct
    getVerifInstruct: (idProcess: string) =>
      Request.GET<FemVerificFormList[]>(
        `${prefix}/frm-external-verification/get-verification-data-list/${idProcess}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      ),
    getExptOpinjion: (idProcess: string) =>
      Request.GET<ExpertOpinion[]>(
        `${prefix}/frm-external-verification/get-exprt-opinion-list/${idProcess}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      ),
    //getQuestionListVerification
    getQuestionListVerification: (idProcess: string) =>
      Request.GET<ExpertOpinion[]>(
        `${prefix}/frm-external-verification/get-frm-question-list/${idProcess}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      ),
    //getDatEntryListVerific
    getDatEntryListVerific: (idProcess: string) =>
      Request.GET<FrmExpertOpinionDataEntryResponse>(
        `${prefix}/frm-external-verification/get-dataentry-list/${idProcess}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      ),
    //getExternalVerifList
    getExternalVerifList: (idProcess: string) =>
      Request.GET<FrmExpertOpinionDataEntryResponse>(
        `${prefix}/frm-external-verification/get-verificform-details-list/${idProcess}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      ),
    saveFrmEOCreateInstance: (idProcess: string) =>
      Request.PUT<void>(
        `${prefix}/frm-expert-opinion/save-expert-opinion-process-instance/${idProcess}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      ),

    saveExternalInstance: (idProcess: string) =>
      Request.PUT<void>(
        `${prefix}/frm-external-verification/save-frm-externverific-process-instance/${idProcess}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      ),
    saveExpertOpinionForm: (request: FrmExpertOpinionRequest) =>
      Request.PUT<void>(
        `${prefix}/frm-expert-opinion/save-expert-opinion`,
        request,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      ),
    //saveExternalInstanceTaskTwo
    saveExternalInstanceTaskTwo: (idProcess: string) =>
      Request.PUT<void>(
        `${prefix}/frm-external-verification/save-frm-externverific-process-instance/${idProcess}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      ),

    getFrmQuestionnaireExpertOpinionData: (idProcess: string) =>
      Request.GET<FrmQExpertOpinionResponse[]>(
        `${prefix}/frm-questionnaire/get-expert-opinion/${idProcess}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      ),

    getFrmQuestionnaireInvestigationData: (idProcess: string) =>
      Request.GET<FrmQInvestigationResponse>(
        `${prefix}/frm-questionnaire/get-investigation/${idProcess}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      ),

    getfrmQuestionnaireActionPointData: (idProcess: string) =>
      Request.GET<FrmQActionPointResponse[]>(
        `${prefix}/frm-questionnaire/get-action-points/${idProcess}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      ),

    getFrmQuestionnaireFrmVerification: (idProcess: string) =>
      Request.GET<FrmQVerificationResponse[]>(
        `${prefix}/frm-questionnaire/get-verification/${idProcess}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      ),

    getfrmFrmQuestionnaireData: (idProcess: string) =>
      Request.GET<FrmQuestionnaireResponse>(
        `${prefix}/frm-questionnaire/get-questionnaire/${idProcess}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      ),

    getFrmQuestionnaireFrmDataEntry: (idProcess: string) =>
      Request.GET<FrmQDataEntryResponse>(
        `${prefix}/frm-questionnaire/get-data-flow/${idProcess}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      ),

    getfrmQuestionnaireFrmExternalVerification: (idProcess: string) =>
      Request.GET<FrmQExternalVerificationResponse[]>(
        `${prefix}/frm-questionnaire/get-external-verification/${idProcess}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      ),

    getFrmEOfrmCompletedQuestionnaire: (idProcess: string) =>
      Request.GET<FrmQuestionnaireResponse[]>(
        `${prefix}/frm-questionnaire/get-completed-questionnaire/${idProcess}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      ),
    saveQuestionnaire: (request: FrmQuestionnaireRequest) =>
      Request.PUT<void>(
        `${prefix}/frm-questionnaire/save-questionnaire`,
        request,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      ),
    saveFrmQuestionnaireCreateInstance: (idProcess: string) =>
      Request.PUT<void>(
        `${prefix}/frm-questionnaire/save-questionnaire-process-instance/${idProcess}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      ),
    //saveFrmVerificInstance
    saveFrmVerificInstance: (idProcess: string) =>
      Request.PUT<void>(
        `${prefix}/frm-verification/save-verific-process-instance/${idProcess}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      ),
    //saveFraudFrmDataEntryAPI
    saveFraudFrmDataEntryAPI: (idProcess: string) =>
      Request.PUT<void>(
        `${prefix}/frm-fraud-finalising/save-fraud-process-instance/${idProcess}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      ),
    //sendAction
    sendAction: (request: ActionDetailsInf) =>
      Request.POST<void>(
        `${prefix}/frm-investigation/reports/invoke`,

        request,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      ),
    getEsignatureDoc: (
      request: eSignatureRequest,
    ) =>
      Request.POST<DocumentData>(
        `${prefix}/e-signature/get-e-signature`,
        request,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      ),

    generateEsignaturPDF: (
      request: DocumentGenerateRequest,
    ) =>
      Request.POST<void>(
        `${prefix}/e-signature/generate-document`,
        request,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      ),

    /**
     * BUNDLED REQUESTS
     */

    /**
     * Common method to get bundled master dropdowns
     *
     * @param suffix - dropdown suffix
     * @returns relevant dropdown values according to the suffix
     */
    getBundledDropdownData: (suffix: string) =>
      Request.GET<DropDownItem>(`${prefix}/master/bundled/${suffix}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }),

    getNicDetails: (nic: string) =>
      Request.GET<NicDetails>(`${prefix}/master/nic-data`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        params: {
          nic: nic,
        },
      }),

    /**
     * save credit information
     *
     * @param request CreditRequest
     * @returns void
     */
    saveCreditInformation: (request: CreditRequest) =>
      Request.POST<void>(
        `${prefix}/bundled/invoke/credit-information`,
        request,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      ),

    /**
     * get credit information
     *
     * @param processInstance
     * @returns CreditInformation
     */
    getCreditInformation: (processInstance: string) =>
      Request.GET<CreditInformation>(
        `${prefix}/bundled/invoke/credit-information/${processInstance}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      ),

    /**
     * get client information
     *
     * @param processInstance
     * @returns ClientInformation
     */
    getClientInformation: (processInstance: string) =>
      Request.GET<ClientInformation>(
        `${prefix}/bundled/invoke/client-information/${processInstance}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      ),

    /**
     * save client information
     *
     * @param request BundleClientRequest
     * @returns void
     */
    saveBundleClientInformation: (request: BundleClientRequest) =>
      Request.POST<void>(
        `${prefix}/bundled/invoke/client-information`,
        request,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      ),

    /**
     * save verification steps information
     *
     * @param request BundleClientRequest
     * @returns void
     */
    saveBundleVerificationInformation: (request: BundleVerificationRequest) =>
      Request.POST<void>(
        `${prefix}/bundled/invoke/verification-information`,
        request,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      ),

    /**
     * save bundled sales information
     *
     * @param request BundleSalesInfoRequest
     * @returns void
     */
    saveBundledSalesInformation: (request: BundleSalesInfoRequest) =>
      Request.POST<void>(
        `${prefix}/bundled/invoke/sales-information`,
        request,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      ),

    /**
     * get DBR users
     *
     * @returns list of DBRUsers
     */
    getDBRUsers: () =>
      Request.GET<DBRUser[]>(`${prefix}/bundled/dbr-users`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }),

    /**
     *
     * @param processInstanace - process instance id
     * @returns list of branch managers
     */
    getBranchManagers: (processInstanace: string) =>
      Request.GET<DBRUser[]>(
        `${prefix}/bundled/branch-managers/${processInstanace}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      ),

    /**
     * get verification information
     *
     * @param processInstance
     * @returns VerificationInformations
     */
    getVerificationInformation: (processInstance: string) =>
      Request.GET<VerificationInfromation>(
        `${prefix}/bundled/invoke/verification-information/${processInstance}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      ),

    /**
     * get sales information
     *
     * @param processInstance
     * @returns SalesInformations
     */
    getSalesInformation: (processInstance: string) =>
      Request.GET<SalesInfromation>(
        `${prefix}/bundled/invoke/sales-information/${processInstance}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      ),

    /**
     * get final checks
     *
     * @param processInstance
     * @returns FinalChecks
     */
    getFinalChecks: (processInstance: string) =>
      Request.GET<SalesInfromation>(
        `${prefix}/bundled/invoke/extended-verifications/${processInstance}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      ),

    /**
     *
     * @param processInstance process instance
     * @param processDefKey process definition key: eg: overDraft, cribPull
     * @param category - checklist category eg: OD_UNDERWRITER
     * @returns
     */
    getCasaChecklistItems: (
      processInstance: string,
      processDefKey: string,
      category: string
    ) =>
      Request.GET<ChecklistInfo[]>(
        `${prefix}/bundled/check-list/${processInstance}?process-def-key=${processDefKey}&category=${category}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      ),

    /**
     *
     * @param request checklist object
     * @returns void
     */
    saveBundleChecklist: (
      request: ChecklistInfo[],
      processInstanace: string,
      taskInstance: string
    ) =>
      Request.POST<void>(
        `${prefix}/bundled/invoke/check-list/${processInstanace}/${taskInstance}`,
        request,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      ),

    /**
     * Save extended verification information
     *
     * @param request ExtendedVerificationRequest
     * @returns void
     */
    saveExtendedVerification: (request: ExtendedVerificationRequest) =>
      Request.POST<void>(
        `${prefix}/bundled/invoke/extended-verifications`,
        request,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      ),

    /**
     * get extended verification information
     *
     * @param processInstanace - process instance
     * @returns ExtendedVerificationInfo
     */
    getExtendedVerificationInformation: (processInstanace: string) =>
      Request.GET<ExtendedVerificationInfo>(
        `${prefix}/bundled/invoke/extended-verifications/${processInstanace}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      ),
    /**
     * Save the error comment and error code for a given process instance.
     *
     * @param request ErrorCommentRequest containing the error comment and error code
     * @returns void
     */
    saveErrorComment: (request: ErrorCommentRequest) =>
      Request.POST<void>(`${prefix}/bundled/error-comment`, request, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }),

    /**
     * Save a new cheque book entry for a given process instance.
     *
     * @param processInstanace - The unique identifier of the process instance.
     * @param request - The details of the cheque book entry to be saved.
     * @returns void
     */
    saveChequeBookEntry: (
      processInstanace: string,
      request: ChequeBookRequest
    ) =>
      Request.POST<void>(
        `${prefix}/bundled/cheque-book/${processInstanace}`,
        request,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      ),

    /**
     * Retrieves cheque book entries for a given process instance.
     *
     * @param processInstance - The unique identifier of the process instance.
     * @returns ChequeBookInfo - The information related to the cheque book entries.
     */
    getChequeBookEntries: (processInstance: string) =>
      Request.GET<ChequeBookInfo>(
        `${prefix}/bundled/cheque-book/${processInstance}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      ),

    /**
     * Deletes a cheque book entry given the process instance and cheque book id.
     *
     * @param processInstance - The unique identifier of the process instance.
     * @param chequeBookId - The id of the cheque book entry to be deleted.
     * @returns void
     */
    deleteCheckbookEntry: (processInstance: string, chequeBookId: number) =>
      Request.DELETE(
        `${prefix}/bundled/cheque-book/${processInstance}/${chequeBookId}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      ),

    /**
     * Save the FD Special Rate status for a given process instance.
     *
     * @param processInstance - The unique identifier of the process instance.
     * @param fdSpecialStatus - The FD Special Rate status associated with the specified process instance.
     * @returns void
     */
    saveFDSpecialRate: (processInstance: string, fdSpecialStatus: boolean) =>
      Request.POST(
        `${prefix}/bundled/fd-special/${processInstance}?fd-special-status=${fdSpecialStatus}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      ),

    /**
     * Retrieve the FD Special Rate status for a given process instance.
     *
     * @param processInstance - The unique identifier of the process instance.
     * @returns boolean - The FD Special Rate status associated with the specified process instance.
     */
    getFDSpecialRate: (processInstance: string) =>
      Request.GET(`${prefix}/bundled/fd-special/${processInstance}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }),

    /**
     * Save I-Banking data for a given process instance.
     *
     * @param processInstance - The unique identifier of the process instance.
     * @param request - The I-Banking data to be saved.
     * @returns void
     */
    saveIBankingData: (processInstance: string, request: IBankingRequest) =>
      Request.POST<void>(
        `${prefix}/bundled/i-banking/${processInstance}`,
        request,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      ),

    /**
     * Retrieve I-Banking data for a given process instance.
     *
     * @param processInstance - The unique identifier of the process instance.
     * @returns IBankingInfo - The I-Banking information associated with the specified process instance.
     */
    getIBankingData: (processInstance: string) =>
      Request.GET<IBankingInfo>(
        `${prefix}/bundled/i-banking/${processInstance}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      ),

    getCCChecklist: (processInstance: string, category: string) =>
      Request.GET<ChecklistInfo[]>(
        `${prefix}/bundled/check-list/${processInstance}?process-def-key=bundled&category=${category}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      ),

    /**
     * Invoke crib pull from CLI
     *
     * @param processInstance Process instance id
     * @returns void
     */
    requestCribPull: (processInstance: string, taskInstance: string) =>
      Request.POST<void>(
        `${prefix}/bundled/invoke/crib-pull/${processInstance}/${taskInstance}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      ),

    /**
     * Retrieve bundle crib pull information for a given process instance.
     *
     * @param processInstance - The unique identifier of the process instance.
     * @returns BundleCribpullInfo - The crib pull information associated with the specified process instance.
     */
    getBundleCribPullInfo: (processInstance: string) =>
      Request.GET<BundleCribpullInfo>(
        `${prefix}/bundled/crib-pull/${processInstance}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      ),

    /**
     * Retrieve bundle crib score information for a given process instance.
     *
     * @param processInstance - The unique identifier of the process instance.
     * @returns BundleCribScoreInfo - The crib score information associated with the specified process instance.
     */
    getBundleCribScore: (processInstance: string) =>
      Request.GET<BundleCribScoreInfo>(
        `${prefix}/bundled/crib-score/${processInstance}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      ),

    /**
     * Retrieves data entry data for eyeballing for a given process instance.
     *
     * @param processInstance - The unique identifier of the process instance.
     * @returns EyeballingDataEntryDataInfo - The data entry data associated with the specified process instance.
     */
    getDataEntryData: (processInstance: string) =>
      Request.GET<EyeballingDataEntryDataInfo>(
        `${prefix}/bundled/eye-balling/data-entry-data/${processInstance}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      ),

    /**
     * Save eyeballing data entry for a given process instance.
     *
     * @param processInstance - The unique identifier of the process instance.
     * @param taskInstance - The unique identifier of the task instance.
     * @param request - The data entry data to be saved.
     * @returns void
     */
    saveEyeballingDataEntry: (
      processInstance: string,
      taskInstance: string,
      request: EyeballingRequest
    ) =>
      Request.POST<void>(
        `${prefix}/bundled/eye-balling/${processInstance}/${taskInstance}`,
        request,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      ),

    /**
     * Retrieve saved eyeballing data for a given process instance.
     *
     * @param processInstance - The unique identifier of the process instance.
     * @returns EyeballingInfo - The saved eyeballing data associated with the specified process instance.
     */
    getEyeBallingSavedData: (processInstance: string) =>
      Request.GET<EyeballingInfo>(
        `${prefix}/bundled/eye-balling/${processInstance}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      ),

    /**
     * Retrieve pre-check information for eyeballing for a given process instance.
     *
     * @param processInfo - The unique identifier of the process instance.
     * @returns EyeballingPrecheckInfo - The pre-check information associated with the specified process instance.
     */
    getEyeballingPrecheckInformation: (processInstance: string) =>
      Request.GET<EyeballingPrecheckInfo>(
        `${prefix}/bundled/relationship/pre-check/${processInstance}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      ),

    /**
     * Retrieve the NIC match information associated with the specified process instance.
     *
     * @param processInstance - The unique identifier of the process instance.
     * @returns RelationshipProcessInfo - The NIC match information associated with the specified process instance.
     */
    getEyeBallingNicMatch: (processInstance: string) =>
      Request.GET<RelationshipProcessInfo>(
        `${prefix}/bundled/relationship/processFlow-data/nic-match/${processInstance}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      ),

    /**
     * Retrieves the residential number match information associated with the specified process instance.
     *
     * @param processInstance - The unique identifier of the process instance.
     * @returns RelationshipProcessInfo - The residential number match information associated with the specified process instance.
     */
    getEyeBallingResNumberMatch: (processInstance: string) =>
      Request.GET<RelationshipProcessInfo>(
        `${prefix}/bundled/relationship/processFlow-data/res-number-match/${processInstance}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      ),

    /**
     * Retrieves the mobile number match information associated with the specified process instance.
     *
     * @param processInstance - The unique identifier of the process instance.
     * @returns RelationshipProcessInfo - The mobile number match information associated with the specified process instance.
     */
    getEyeBallingMobileNumberMatch: (processInstance: string) =>
      Request.GET<RelationshipProcessInfo>(
        `${prefix}/bundled/relationship/processFlow-data/mobile-match/${processInstance}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      ),

    /**
     * Retrieves the address match information associated with the specified process instance.
     *
     * @param processInstance - The unique identifier of the process instance.
     * @returns RelationshipProcessInfo - The address match information associated with the specified process instance.
     */
    getEyeBallingAddressMatch: (processInstance: string) =>
      Request.GET<RelationshipProcessInfo>(
        `${prefix}/bundled/relationship/processFlow-data/address-match/${processInstance}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      ),

    /**
     * Retrieves the NIC match information associated with the specified process instance for fraud.
     *
     * @param processInstance - The unique identifier of the process instance.
     * @returns RelationshipProcessInfo - The NIC match information associated with the specified process instance for fraud.
     */
    getFraudNicMatch: (processInstance: string) =>
      Request.GET<RelationshipFraudInfo>(
        `${prefix}/bundled/relationship/fraud/nic-match/${processInstance}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      ),

    /**
     * Retrieves the residential number match information associated with the specified process instance for fraud.
     *
     * @param processInstance - The unique identifier of the process instance.
     * @returns RelationshipProcessInfo - The residential number match information associated with the specified process instance for fraud.
     */
    getFraudResNumberMatch: (processInstance: string) =>
      Request.GET<RelationshipFraudInfo>(
        `${prefix}/bundled/relationship/fraud/res-number-match/${processInstance}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      ),

    /**
     * Retrieves the mobile number match information associated with the specified process instance for fraud.
     *
     * @param processInstance - The unique identifier of the process instance.
     * @returns RelationshipProcessInfo - The mobile number match information associated with the specified process instance for fraud.
     */
    getFraudMobileNumberMatch: (processInstance: string) =>
      Request.GET<RelationshipFraudInfo>(
        `${prefix}/bundled/relationship/fraud/mobile-number-match/${processInstance}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      ),

    /**
     * Retrieves the address match information associated with the specified process instance for fraud.
     *
     * @param processInstance - The unique identifier of the process instance.
     * @returns RelationshipProcessInfo - The address match information associated with the specified process instance for fraud.
     */
    getFraudAddressMatch: (processInstance: string) =>
      Request.GET<RelationshipFraudInfo>(
        `${prefix}/bundled/relationship/fraud/address-match/${processInstance}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      ),

    /**
     * Retrieves the NIC match information associated with the specified process instance from Crib.
     *
     * @param processInstance - The unique identifier of the process instance.
     * @returns RelationshipProcessInfo - The NIC match information associated with the specified process instance from Crib.
     */
    getCribNicMatch: (processInstance: string) =>
      Request.GET<RelationshipCribInfo>(
        `${prefix}/bundled/relationship/crib/nic-match/${processInstance}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      ),
    /**
     * Retrieves the residential number match information associated with the specified process instance from Crib.
     *
     * @param processInstance - The unique identifier of the process instance.
     * @returns RelationshipProcessInfo - The residential number match information associated with the specified process instance from Crib.
     */
    getCribResNumberMatch: (processInstance: string) =>
      Request.GET<RelationshipCribInfo>(
        `${prefix}/bundled/relationship/crib/res-number-match/${processInstance}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      ),
    /**
     * Retrieves the mobile number match information associated with the specified process instance from Crib.
     *
     * @param processInstance - The unique identifier of the process instance.
     * @returns RelationshipProcessInfo - The mobile number match information associated with the specified process instance from Crib.
     */
    getCribMobileNumberMatch: (processInstance: string) =>
      Request.GET<RelationshipCribInfo>(
        `${prefix}/bundled/relationship/crib/mobile-number-match/${processInstance}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      ),
    /**
     * Retrieves the address match information associated with the specified process instance from Crib.
     *
     * @param processInstance - The unique identifier of the process instance.
     * @returns RelationshipProcessInfo - The address match information associated with the specified process instance from Crib.
     */
    getCribAddressMatch: (processInstance: string) =>
      Request.GET<RelationshipCribInfo>(
        `${prefix}/bundled/relationship/crib/address-match/${processInstance}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      ),

    /**
     * Retrieves the history data associated with the specified process instance.
     *
     * @param processInstance - The unique identifier of the process instance.
     * @returns RelationshipHistoryInfo - The history data associated with the specified process instance.
     */
    getHistoryData: (processInstance: string) =>
      Request.GET<RelationshipHistoryInfo>(
        `${prefix}/bundled/relationship/history/${processInstance}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      ),

    /**
     * Retrieves the verification alert data associated with the specified process instance.
     *
     * @param processInstance - The unique identifier of the process instance.
     * @returns RelationshipVerificationAlertInfo - The verification alert data associated with the specified process instance.
     */
    getVerificationAlertData: (processInstance: string) =>
      Request.GET<RelationshipVerificationAlertInfo>(
        `${prefix}/bundled/relationship/verification-alert/${processInstance}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      ),

    /**
     * Retrieves the recommendation data associated with the specified process instance.
     *
     * @param processInstance - The unique identifier of the process instance.
     * @returns RelationshipRecommendationInfo[] - The recommendation data associated with the specified process instance.
     */
    getRecommendation: (processInstance: string) =>
      Request.GET<RelationshipRecommendationInfo[]>(
        `${prefix}/bundled/relationship/recommendation/${processInstance}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      ),

    /**
     * Save the static data changed status for a given process instance.
     *
     * @param processInstance - The unique identifier of the process instance.
     * @param value - The value to be saved, indicating whether static data has changed or not.
     * @returns void
     */
    saveStaticDataChangedStatus: (processInstance: string, taskInstance: string, value: boolean) =>
      Request.POST<void>(
        `${prefix}/bundled/relationship/${processInstance}/${taskInstance}?static-data-changed=${value}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      ),

    /**
     * Retrieves the static data changed status for a given process instance.
     *
     * @param processInstance - The unique identifier of the process instance.
     * @returns boolean - The static data changed status associated with the specified process instance.
     */
    getStaticDataChangedStatus: (processInstance: string) =>
      Request.GET<boolean>(
        `${prefix}/bundled/relationship/${processInstance}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      ),

    getEbbsNicMatch: (processInstance: string) =>
      Request.GET<RelationshipEBBSInfo>(
        `${prefix}/bundled/relationship/ebbs/nic-match/${processInstance}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      ),
    getEbbsAddressMatch: (processInstance: string) =>
      Request.GET<RelationshipEBBSInfo>(
        `${prefix}/bundled/relationship/ebbs/address-match/${processInstance}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      ),
    getResNumberMatch: (processInstance: string) =>
      Request.GET<RelationshipEBBSInfo>(
        `${prefix}/bundled/relationship/ebbs/res-number-match/${processInstance}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      ),
    getEmpNumberMatch: (processInstance: string) =>
      Request.GET<RelationshipEBBSInfo>(
        `${prefix}/bundled/relationship/ebbs/emp-number-match/${processInstance}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      ),

    getCardNicMatch: (processInstance: string) =>
      Request.GET<RelationshipCardInfo>(
        `${prefix}/bundled/relationship/card/nic-match/${processInstance}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      ),
    getCardAddressMatch: (processInstance: string) =>
      Request.GET<RelationshipCardInfo>(
        `${prefix}/bundled/relationship/card/address-match/${processInstance}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      ),
    saveReferenceCodes: (
      processInstance: string,
      taskInstance: string,
      request: CCDataEntryRequest
    ) =>
      Request.POST<void>(
        `${prefix}/bundled/reference-codes/${processInstance}/${taskInstance}`,
        request,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      ),
    getReferenceCodes: (processInstance: string) =>
      Request.GET<CCDataEntryInfo>(
        `${prefix}/bundled/reference-codes/${processInstance}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      ),

    saveFrmCheck: (
      processInstance: string,
      taskInstance: string,
      request: FrmCheckRequest
    ) =>
      Request.POST<void>(
        `${prefix}/bundled/frm-alert-check/${processInstance}/${taskInstance}`,
        request,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      ),

    getFrmCheck: (processInstance: string) =>
      Request.GET<FrmCheckInfo>(
        `${prefix}/bundled/frm-alert-check/${processInstance}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      ),

    /**
     * Retrieves the FRM alerts associated with the specified process instance.
     *
     * @param processInstance - The unique identifier of the process instance.
     * @returns FRMAlertInfo[] - The FRM alerts associated with the specified process instance.
     */
    getFrmAlerts: (processInstance: string) =>
      Request.GET<FRMAlertInfo[]>(
        `${prefix}/bundled/relationship/frm-alerts/${processInstance}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      ),

    /**
     * Saves the FRM alerts associated with the specified process instance.
     *
     * @param processInstance - The unique identifier of the process instance.
     * @param request - The FRM alerts data to be saved.
     * @returns void
     */
    saveFRMAlerts: (processInstance: string, request: FRMAlertRequest) =>
      Request.POST<void>(`${prefix}/bundled/relationship/frm-alerts/${processInstance}`, request,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      ),

    getBundledChecklistItems: (
      processInstance: string,
      processDefKey: string,
      category: string
    ) =>
      Request.GET<ChecklistInfo[]>(
        `${prefix}/bundled/check-list/${processInstance}?process-def-key=${processDefKey}&category=${category}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      ),

    saveBundledUWLevel: (
      processInstance: string,
      taskInstance: string,
      request: BundleUWLevelRequest
    ) =>
      Request.POST<void>(
        `${prefix}/bundled/under-writer/uw-level/${processInstance}/${taskInstance}`,
        request,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      ),

    getUWLevelBundledRequest: (processInstance: string) =>
      Request.GET<BundleUWLevelInfo>(
        `${prefix}/bundled/under-writer/uw-level/${processInstance}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      ),

    getCribFacilityDetails: (processInstance: string) =>
      Request.GET<string[][]>(
        `${prefix}/bundled/crib/facility-details/${processInstance}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      ),

    saveReworkData: (processInstance: string, taskInstance: string, request: SalesReworkRequest) =>
      Request.POST<void>(`${prefix}/bundled/rework-data/${processInstance}/${taskInstance}`, request,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      ),

    getReworkData: (processInstance: string) =>
      Request.GET<SalesReworkInfo>(`${prefix}/bundled/rework-data/${processInstance}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      ),
    getFraudStatus: (processInstance: string) =>
      Request.GET<FraudStatusInfo>(`${prefix}/bundled/fraud-status/${processInstance}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      ),

    getAmounts: (processInstance: string) =>
      Request.GET<ApprovalAmountInfo>(`${prefix}/bundled/amounts/${processInstance}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      ),

    /**
     * LOAN REQUESTS
     */


    /**
     * Retrieves loan extra data entry information for a given process instance.
     *
     * @param processInstance - The unique identifier of the process instance.
     * @returns LoanDataEntryInfo - The loan extra data entry information associated with the specified process instance.
     */
    getLoanDataEntryInfo: (processInstance: string) =>
      Request.GET<LoanDataEntryInfo>(`${prefix}/bundled/loan-extra-data-entry/${processInstance}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      ),

    /**
     * Saves loan extra data entry information for a given process instance.
     *
     * @param processInstance - The unique identifier of the process instance.
     * @param request - The loan extra data entry information to be saved.
     * @returns void
     */
    saveLoanDataEntryInfo: (processInstance: string, request: LoanDataEntryRequest) =>
      Request.POST<void>(`${prefix}/bundled/loan-extra-data-entry/${processInstance}`, request,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      ),

    /**
     * Saves the document check loan type for a given process instance.
     *
     * @param processInstance - The unique identifier of the process instance.
     * @param request - The loan document check request containing loan type information.
     * @returns void
     */

    saveDocCheckLoanType: (processInstance: string, taskInstance: string, request: LoanDocCheckRequest) =>
      Request.POST<void>(`${prefix}/bundled/doc-check-loan-type/${processInstance}/${taskInstance}`, request,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      ),


    /**
     * Gets the document check loan type for a given process instance.
     *
     * @param processInstance - The unique identifier of the process instance.
     * @returns The loan document check request containing loan type information.
     */
    getDocCheckLoanType: (processInstance: string) =>
      Request.GET<LoanDocCheckRequest>(`${prefix}/bundled/doc-check-loan-type/${processInstance}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      ),

    /**
     * Saves the auto book status for a given process instance.
     *
     * @param processInstance - The unique identifier of the process instance.
     * @param request - The autobook request containing auto book status information.
     * @returns void
     */

    saveAutoBookStatus: (processInstance: string, request: AutobookRequest) =>
      Request.POST<void>(`${prefix}/bundled/auto-book/${processInstance}`, request,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      ),

    /**
     * Gets the auto book status for a given process instance.
     *
     * @param processInstance - The unique identifier of the process instance.
     * @returns The autobook request containing auto book status information.
     */
    getAutoBookStatus: (processInstance: string) =>
      Request.GET<AutobookRequest>(`${prefix}/bundled/auto-book/${processInstance}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      ),

    /**
     * Get uw-approvers list for the Bundled Request Report Filter
     * @returns list of uw-approvers(approvers)
     */
    getUWApprovers: () =>
      Request.GET<DropDownItem[]>(`${prefix}/bundled/uw-approves`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }),

  };
};
