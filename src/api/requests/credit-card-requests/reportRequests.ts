import { Request } from "../../api/Request";
import { Pageable } from "../../types/Pageable";
import { CliEodReportIf } from "../../../app/core/types/CliEodReportIf";
import { CliApprovalReportIf } from "../../../app/core/types/reports/CliApprovalReport";
import { CliRejectedReportIf } from "../../../app/core/types/reports/CliRejectedReport";
import { FrmInvestReportIf } from "../../../app/core/types/reports/FrmInvestReportIf";
import { ODEODReportIf } from "../../../app/core/types/reports/ODEODReport";
import { ODCollateralReportIf } from "../../../app/core/types/reports/ODCollateralReport";
import { CHAccEodReportIf } from "../../../app/core/types/reports/ChAccEodReport";
import { BranchInfo } from "../../../app/core/types/BranchInfo";
import { BundleEODIf } from "../../../app/core/types/reports/BundleEOD";
import { CribPullEODIf } from "../../../app/core/types/reports/CribPullEOD";
import { StatusInfo } from "../../../app/core/types/StatusInfo";
import { DecisionPathInfo } from "../../../app/core/types/DecisionPathInfo";
import { BundleCD, BundleCDSearchData } from "../../../app/core/types/reports/BundleCD";
import { CribPullExcelFileGenerateRequest } from "../../../app/workflow/cribPull/@types/CribPullRequest";
import { BundledEODStats } from "../../../app/core/types/reports/BundledEODStats";
import { BundledRequestReportIf } from "../../../app/core/types/reports/BundledRequestReport";
import { ScorecardInput } from "../../../app/core/types/ScorecardInput";
import { AgentCardReportDTO, AgentLoanReportDTO, BranchSummaryDTO, DrilldownReportDTO } from "../../../app/workflow/bundle/reports/bundle-cc-pl-activity-report/@types/CCPLApprovalCommon";
import { BranchAgentWiseReport, LoanApplicationModel, SourceGenerateDTO } from "../../../app/workflow/bundle/reports/bundle-cc-pl-activity-report/@types/CCPLSourcingCommon";
import { TVReportDTO } from "../../../app/workflow/bundle/reports/bundle-cc-pl-activity-report/@types/CCPLProcessing";
import { ScoreCalculatorIf } from "../../../app/core/types/ScoreCalculator";
import { ScorecardDetailsIf } from "../../../app/core/types/ScorecardDetails";
import { BundledUserWiseActivityTracker } from "../../../app/core/types/reports/BundledUserWiseActivityTracker";
import ReworkCountDto from "../../../app/workflow/commonReports/rework-report/@types/ReworkCountDto";
import ReworkDetailsDto from "../../../app/workflow/commonReports/rework-report/@types/ReworkDetailsDto";
import { BundledTATReportInfo } from "../../../app/core/types/reports/BundledTATReportInfo";
import { CreateNews } from "../../../app/core/types/reports/CreateNews";
import { BundledTvReportInfo } from "../../../app/workflow/bundle/@types/BundledTvReportInfo";

export const reportRequests = () => {
  const prefix = "reports";

  return {
    /**
     * Get CLI report in eod report 
     * @param startDate start date
     * @param endDate end date
     * @param page page number
     * @param size page size
     * @returns CLIProcessCheckListInfo[]
     */
    getCliEodReport: (
      startDate: string,
      endDate: string,
      size: number,
      page: number,
    ) =>
      Request.GET<Pageable<CliEodReportIf>>(`credit-card/credit-limit-increase/${prefix}/eod-report`, {
        params: {
          'start-date': startDate,
          'end-date': endDate,
          size,
          page
        },
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }),

    getCliApprovalReport: (
      startDate: string,
      endDate: string,
      size: number,
      page: number,
    ) =>
      Request.GET<Pageable<CliApprovalReportIf>>(`credit-card/credit-limit-increase/${prefix}/cli-approval-report`, {
        params: {
          'start-date': startDate,
          'end-date': endDate,
          size,
          page
        },
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }),

    getCliRejectedReport: (
      startDate: string,
      endDate: string,
      size: number,
      page: number,
    ) =>
      Request.GET<Pageable<CliRejectedReportIf>>(`credit-card/credit-limit-increase/${prefix}/cli-rejected-report`, {
        params: {
          'start-date': startDate,
          'end-date': endDate,
          size,
          page
        },
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }),


    getAllCliApprovalReport: (
      startDate: string,
      endDate: string,
    ) =>
      //get list of CliReportIf
      Request.GET<CliApprovalReportIf[]>(`credit-card/credit-limit-increase/${prefix}/all-cli-approval-report`, {
        params: {
          'start-date': startDate,
          'end-date': endDate,
        },
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }),

    getFrmInvestReport: (
      startDate: string, endDate: string, wfLabelVal: string, accountNumVal: string, decision: string, status: string, resultCategory: string, size: number, page: number) =>

      Request.GET<number[]>(`credit-card/frm-investigation/${prefix}/frm-flow`, {
        params: {
          'start-date': startDate,
          'end-date': endDate,
          'account-no': accountNumVal,
          'decision': decision,
          'status': status,
          'result-category': resultCategory,
          'wf-label': wfLabelVal,
          size,
          page
        },
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }),

    getDecisionDropdown: () =>
      Request.GET<DecisionPathInfo[]>(`credit-card/frm-investigation/get-decision-dropdown`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }),

    getStatusDropdown: () =>
      Request.GET<StatusInfo[]>(`credit-card/frm-investigation/get-status-dropdown`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }),


    getTaskDetailz: (
      startDate: string, endDate: string, accountNumVal: string, Status: string, decision: string, wfLabelVal: string,
    ) =>
      Request.GET<FrmInvestReportIf>(`credit-card/frm-investigation/${prefix}/frm-flow-counts`, {
        params: {
          'start-date': startDate,
          'end-date': endDate,
          'account-no': accountNumVal,
          'decision': decision,
          'status': Status,
          'wf-label': wfLabelVal,
        },
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }),

    getODEODReport: (
      startDate: string,
      endDate: string,
      status: string,
      size: number,
      page: number,
    ) =>
      Request.GET<Pageable<ODEODReportIf>>(`credit-card/over-draft/${prefix}/od-eod-report`, {
        params: {
          'start-date': startDate,
          'end-date': endDate,
          'odProcessStatus': status,
          size,
          page
        },
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }),

    getCollateralReport: (
      startDate: string,
      endDate: string,
      facilityAccNum: string,
      status: string,
      size: number,
      page: number,
    ) =>
      Request.GET<Pageable<ODCollateralReportIf>>(`credit-card/over-draft/${prefix}/od-collateral-report`, {
        params: {
          'start-date': startDate,
          'end-date': endDate,
          'facility-account-number': facilityAccNum,
          'status': status,
          size,
          page
        },
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }),

    getChAccEODReport: (
      startDate: string,
      endDate: string,
      branch: string | number,
      size: number,
      page: number,
    ) =>
      Request.GET<Pageable<CHAccEodReportIf>>(`credit-card/bundled/${prefix}/bundle-account-eod-report`, {
        params: {
          'start-date': startDate,
          'end-date': endDate,
          'branch': branch,
          size,
          page
        },
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }),

    getBundleEODReport: (
      startDate: string,
      endDate: string,
      branch: string | number,
      size: number,
      page: number,
    ) =>
      Request.GET<Pageable<BundleEODIf>>(`credit-card/bundled/${prefix}/bundled-eod-report`, {
        params: {
          'start-date': startDate,
          'end-date': endDate,
          'branch': branch,
          size,
          page
        },
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }),


    getBundledEODReportStats: () =>
      Request.GET<BundledEODStats>(`credit-card/bundled/${prefix}/eod-report-stats`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }),

    getBundledRequestReport: (
      size: number,
      page: number,
      nicPPNumber: string | null,
      startDate: string,
      endDate: string,
      status: string | null,
      cardType: number | null,
      sourceType: number | null,
      approver: string | null,
      dsr: string | null

    ) =>
      Request.GET<Pageable<BundledRequestReportIf>>(`credit-card/bundled/${prefix}/bundled-request-report`, {
        params: {
          size,
          page,
          nicPPNumber,
          startDate,
          endDate,
          status,
          cardType,
          sourceType,
          approver,
          dsr
        },
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }),

    getBundledRequestReportScoreCard: (bundleProcessId: number | null) =>
      Request.GET<ScorecardInput[]>(`credit-card/bundled/${prefix}/scorecard-inputs/${bundleProcessId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        }
      }),


    getScoreCalculator: (bundleProcessId: number | null) =>
      Request.GET<ScoreCalculatorIf[]>(`credit-card/bundled/${prefix}/score-calculator/${bundleProcessId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        }
      }),

    getScoreOutput: (bundleProcessId: number | null) =>
      Request.GET<ScorecardInput[]>(`credit-card/bundled/${prefix}/score-output/${bundleProcessId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        }

      }),

    getScorecardDetails: (scoreVariable: string | null, processInstance: string | null) =>
      Request.GET<ScorecardDetailsIf[]>(`credit-card/bundled/${prefix}/scorecard-details/${scoreVariable}/${processInstance}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        }
      }),

    getScorecarInqdDetails: (processInstance: string | null) =>
      Request.GET<ScorecardDetailsIf[]>(`credit-card/bundled/${prefix}/scorecard-inq-details/${processInstance}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        }
      }),

    getBundledUserWiseActivityTracker: (
      startDate: string,
      endDate: string,
    ) =>
      Request.GET<Map<string, BundledUserWiseActivityTracker>>(`credit-card/bundled/${prefix}/user-wise-activity-report`, {
        params: {
          'start-date': startDate,
          'end-date': endDate
        },
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }),



    /*
    * Get Create News Report
    */

    getCreatedNews: (
      size: number,
      page: number
    ) =>
      Request.GET<Pageable<CreateNews>>(`credit-card/master/create-news`, {
        params: {
          'size': size,
          'page': page
        },
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }),

    createNews: (request: CreateNews) =>
      Request.POST<void>(`credit-card/master/create-news`, request, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }),

    updateNews: (request: CreateNews, newsId: number) =>
      Request.PUT<void>(`credit-card/master/update-news/${newsId}`, request, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }),

    deleteNews: (newsId: number) =>
      Request.PUT<void>(`credit-card/master/delete-news/${newsId}`, {}, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }),


    getCribPullEODReport: (
      startDate: string,
      endDate: string,
      branch: string | number,
      size: number,
      page: number,
    ) =>
      Request.GET<Pageable<CribPullEODIf>>(`credit-card/crib-pull/${prefix}/crib-pull-eod-report`, {
        params: {
          'start-date': startDate,
          'end-date': endDate,
          'branch': branch,
          size,
          page
        },
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }),

    getODstatus: () =>
      Request.GET<Pageable<ODEODReportIf>>(`credit-card/over-draft/master/od-status`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }),

    getBranchList: () =>
      Request.GET<BranchInfo[]>(`credit-card/master/bundled/branch`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }),

    getBundleCDSearchData: () =>
      Request.GET<BundleCDSearchData>(`credit-card/bundled/${prefix}/bundled-credit-duration-summary-filter`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }),


    getBundleCDTableData: (
      role: string,
      duration: string,
      size: number,
      page: number,
    ) =>
      Request.GET<Pageable<BundleCD>>(`credit-card/bundled/${prefix}/bundled-credit-duration-summary`, {
        params: {
          'role': role,
          'duration': duration,
          size,
          page
        },
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }),

    generateInvestMisExcelFile: (startDate: string, endDate: string) => {
      const params = new URLSearchParams();
      if (startDate) params.append("start-date", startDate);
      if (endDate) params.append("end-date", endDate);

      return Request.GET(`credit-card/frm-investigation/mis-excel-file?${params.toString()}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        responseType: "blob",
      });
    },

    getAlertStatusData: (
      startDate: string,
      endDate: string,
      size: number,
      page: number,
    ) =>
      Request.GET<Pageable<BundleEODIf>>(`credit-card/bundled/${prefix}/bundled-frm-alert-status-report`, {
        params: {
          'start-date': startDate,
          'end-date': endDate,
          size,
          page
        },
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }),

    getESignReportList: (
      startDate: string,
      endDate: string,
      branch: string,
      approver: string,
      wfRef: string,
      nic: string,
      custAcNo: string,
      custCardNo: string,
      invoker: string,
      size: number,
      page: number,

    ) =>
      Request.GET<Pageable<BundledRequestReportIf>>(`credit-card/e-signature/report`, {
        params: {
          startDate,
          endDate,
          branch,
          approver,
          wfRef,
          nic,
          custAcNo,
          custCardNo,
          invoker,
          size,
          page
        },
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }),

    downloadAlertStatusExcel: (startDate: string, endDate: string) => {
      const params = new URLSearchParams();
      if (startDate) params.append("start-date", startDate);
      if (endDate) params.append("end-date", endDate);

      return Request.GET(`credit-card/bundled/${prefix}/bundled-frm-alert-excel-file?${params.toString()}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        responseType: "blob",
      });
    },

    fetchAlertsByBusinessKey: (businessKey: string) => {
      const params = new URLSearchParams();
      params.append("businessKey", businessKey);

      return Request.GET(`credit-card/bundled/${prefix}/fraud-alerts?${params.toString()}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        responseType: "blob",
      });
    },
    getCLPLApprovalData: (
      startDate: string,
      endDate: string,
    ) =>
      Request.GET<BranchSummaryDTO>(`credit-card/bundled/${prefix}/branch-summaries`, {
        params: {
          'start-date': startDate,
          'end-date': endDate,
        },
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }),
    getCLPLAgentData: (
      startDate: string,
      endDate: string,
      branch: string | null
    ) =>
      Request.GET<AgentLoanReportDTO>(`credit-card/bundled/${prefix}/agent-summery/loans`, {
        params: {
          'start-date': startDate,
          'end-date': endDate,
          'branch': branch
        },
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }),
    getCardAgentData: (
      startDate: string,
      endDate: string,
      branch: string | null
    ) =>
      Request.GET<AgentCardReportDTO>(`credit-card/bundled/${prefix}/agent-summery/cards`, {
        params: {
          'start-date': startDate,
          'end-date': endDate,
          'branch': branch
        },
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }),
    getApprovalDetailData: (
      startDate: string,
      endDate: string,
      branch: string | null,
      type: string | null,
      agent: string | null
    ) =>
      Request.GET<DrilldownReportDTO>(`credit-card/bundled/${prefix}/agent-detailed-view`, {
        params: {
          'start-date': startDate,
          'end-date': endDate,
          'branch': branch,
          'type': type,
          'agent': agent
        },
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }),
    getCLPLSourcingData: (
      startDate: string,
      endDate: string,
    ) =>
      Request.GET<SourceGenerateDTO>(`credit-card/bundled/${prefix}/generate-sourcing`, {
        params: {
          'start-date': startDate,
          'end-date': endDate,
        },
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }),
    getAgentBranchData: (
      startDate: string,
      endDate: string,
      status: string | null,
      branch: string | null,
      type: string | null,

    ) =>
      Request.GET<BranchAgentWiseReport[]>(`credit-card/bundled/${prefix}/agent-branch`, {
        params: {
          'start-date': startDate,
          'end-date': endDate,
          'status': status,
          'branch': branch,
          'type': type,
        },
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }),
    getAgentBranchDrillDown: (
      startDate: string,
      endDate: string,
      status: string | null,
      branch: string | null,
      type: string | null,
      agent: string | null
    ) =>
      Request.GET<LoanApplicationModel[]>(`credit-card/bundled/${prefix}/agent-sourcing-detail`, {
        params: {
          'start-date': startDate,
          'end-date': endDate,
          'status': status,
          'branch': branch,
          'type': type,
          'agent': agent
        },
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }),
    getCLPLProcessingData: (
    ) =>
      Request.GET<TVReportDTO>(`credit-card/bundled/${prefix}/tv-report`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }),
    getAppReceivedAtHourReport: (
      startDate: string,
      endDate: string,
      workflow: string | null
    ) =>
      Request.GET<Object>(`credit-card/bundled/${prefix}/app-received-at-hours`, {
        params: {
          'start-date': startDate,
          'end-date': endDate,
          'workflow': workflow
        },
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }),

    /**
     * Gets the department-wise TAT report data
     * @param startDate The start date of the report
     * @param endDate The end date of the report
     * @param branch The branch to filter by
     * @param prodType The product type to filter by
     * @param segment The segment to filter by
     * @returns The BundledTATReportInfo object
     */
    getDepartmentWiseTATData: (
      startDate: string,
      endDate: string,
      branch: number | string | null,
      prodType: number | string | null,
      segment: number | string | null
    ) =>
      Request.GET<BundledTATReportInfo>(`credit-card/bundled/reports/department-wise-tat`,
        {
          params: {
            'start-date': startDate,
            'end-date': endDate,
            'branch': branch,
            'prod-type': prodType,
            'segment': segment
          },
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        },
      ),

    /**
     * Gets the TV report details
     * @returns The BundledTvReportInfo object
     */
    getTvReportDetails: () =>
      Request.GET<BundledTvReportInfo>(`credit-card/bundled/reports/tv-report-details`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          }
        }
      )
  }
};






