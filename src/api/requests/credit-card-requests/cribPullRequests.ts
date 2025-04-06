import { DropDownItem, DropDownItemCribPull } from "../../../app/core/types/DropDown";
import { NicDetails } from "../../../app/core/types/NicDetails";
import { CribPullCLIInfo } from "../../../app/workflow/cribPull/@types/CribPullCLIInfo";
import { CribPullEFormInfo } from "../../../app/workflow/cribPull/@types/CribPullEFormInfo";
import { CribPullFileInfo, CribPullSummaryCountInfo } from "../../../app/workflow/cribPull/@types/CribPullInfo";
import { CribPullManualEntry } from "../../../app/workflow/cribPull/@types/CribPullManualEntry";
import { CribPullPLCardInfo } from "../../../app/workflow/cribPull/@types/CribPullPLCardInfo";
import { CribPullPLLoanInfo } from "../../../app/workflow/cribPull/@types/CribPullPLLoanInfo";
import { CribFileUploadRequest, CribPaneRequest, CribPullExcelFileGenerateRequest, CribPullRequest, SaveCribPullHeaderRequest, XMLFileUploadRequest } from "../../../app/workflow/cribPull/@types/CribPullRequest";
import { CribPullDownloadFileTableRequest, CribPullProcess, CribPullTableRequest } from "../../../app/workflow/cribPull/@types/CribPullTable";
import { Request } from "../../api/Request";

export const cribPullServiceRequests = () => {
    const prefix = "credit-card";

    return {
        /**
         * Get Crib pull methods dropdowns
         *
         * @param suffix - The API endpoint suffix
         * @returns DropDownItem
         */
        getCribPullDropDownData: (suffix: string) =>
            Request.GET<DropDownItemCribPull | DropDownItem>(
                `${prefix}/master/crib-pull/${suffix}`,
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                    },
                }
            ),

        getCribPullDropDownDataWithId: (suffix: string) =>
            Request.GET<DropDownItem>(
                `${prefix}/master/crib-pull/${suffix}`,
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                    },
                }
            ),

        saveCribDataEntry: (request: CribPullManualEntry) =>
            Request.POST<void>(`${prefix}/crib-pull`, request, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
            }),

        updateCribDataEntry: (request: CribPullManualEntry) =>
            Request.PUT<void>(`${prefix}/crib-pull`, request, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
            }),

        getCribTableData: (processInstance: string) =>
            Request.GET<CribPullTableRequest>(
                `${prefix}/credit-card/crib-pull/${processInstance}`,
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                    },
                }),

        saveCribFileEntry: (request: CribFileUploadRequest) =>
            Request.POST<void>(`${prefix}/crib-pull/upload`, request, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
            }),

        deleteCribTableEntry: (id: number) =>
            Request.DELETE(`${prefix}/crib-pull/${id}`, {}, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
            }),

        textFileDownload: (request: CribPullDownloadFileTableRequest) =>
            Request.PUT(`${prefix}/crib-pull/text-file`, request, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
            }),

        bulkXMLFileUpload: (request: XMLFileUploadRequest) =>
            Request.POST(`${prefix}/crib-pull/upload-xml`, request, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
            }),

        generateExcelFile: (request: CribPullExcelFileGenerateRequest) =>
            Request.PUT(`${prefix}/crib-pull/excel-file`, request, {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
                responseType: "blob",
            }),

        cribPaneUpload: (request: CribPaneRequest) =>
            Request.POST(`${prefix}/crib-pull/upload-crib-pane`, request, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
            }),

        cribPaneDelete: (request: CribPaneRequest) =>
            Request.DELETE(`${prefix}/crib-pull/delete-crib-pane`, request, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
            }),

        updateCribExtraction: (request: {
            cribPullHeader: SaveCribPullHeaderRequest,
            cribPullRequestList: CribPullProcess[]
        }) =>
            Request.PUT(`${prefix}/crib-pull/crib-extraction`, request, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
            }),

        getCribPanePDF: (processId: number, idType: string) =>
            Request.GET<CribPullFileInfo>(`${prefix}/crib-pull/crib-pane-pdf/${processId}/${idType}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
            }),

        getCribPDF: (cribProcessID: number, idType: string) =>
            Request.GET<CribPullFileInfo>(`${prefix}/crib-pull/crib-pdf/${cribProcessID}/${idType}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
            }),

        getSummaryCounts: (processInstance: string) =>
            Request.GET<CribPullSummaryCountInfo>(`${prefix}/crib-pull/summary/${processInstance}`, {
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

        getCribPullExcelPL: (id: number) =>
            Request.GET<CribPullPLLoanInfo>(`${prefix}/crib-pull/excel-data?processId=${id}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
            }),

        getCribPullExcelPLCard: (id: number) =>
            Request.GET<CribPullPLCardInfo>(`${prefix}/crib-pull/excel-data?processId=${id}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
            }),

        getCribPullExcelSimpleForm: (id: number) =>
            Request.GET<CribPullPLCardInfo>(`${prefix}/crib-pull/excel-data?processId=${id}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
            }),

        getCribPullCLIForm: (id: number) =>
            Request.GET<CribPullCLIInfo>(`${prefix}/crib-pull/excel-data?processId=${id}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
            }),

        getCribPullEForm: (id: number) =>
            Request.GET<CribPullEFormInfo>(`${prefix}/crib-pull/excel-data?processId=${id}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
            }
            )


    }
}