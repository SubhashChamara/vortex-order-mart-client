import { ChangeEvent, FC, useState } from "react";
import { Pageable } from "../../../../../../api/types/Pageable";
import { FrmInvestReportIf } from "../../../../../core/types/reports/FrmInvestReportIf";
import { Button, Pagination, Paper, Tooltip } from "@mui/material";
import EdgeSvgIcon from "../../../../../../@core/ui/EdgeSvgIcon";
import { Api } from "../../../../../../api/Api";
import { ActionDetailsInf } from "../models/ActionDetailsInf";
import { TaskDetailInfo } from "../../../../../core/types/TaskDetailInfo";
import FrmEventSummaryReport from "./FrmEventSummaryReport";
import FrmViewDetails from "./FrmViewDetails";
import { FrmSummeryReportInfos } from "./FrmSummeryReportInfo";
import SaveDialogBox from "./SaveDialogBox";
import { toast } from "react-toastify";

interface ProcessTableProps {
  getFrmInverstReportList: Pageable<FrmInvestReportIf> | null;
  setPage: (v: number) => void;
  page: number;
  setRefresh: (value: boolean) => void;
}

const FrmInvestReportTable: FC<ProcessTableProps> = (props) => {
  const { getFrmInverstReportList, setPage, page, setRefresh } = props;
  const [openModel, setOpenModel] = useState(false);
  const [openViewModel, setOpenViewModel] = useState(false);
  const [getId, setId] = useState("");
  const [getNameType, setNameType] = useState("");
  const [getBusinessKey, setBusinessKey] = useState("");
  const [getSaveBox, setSaveBox] = useState(false);
  const [getSavedData, setSavedData] = useState({
    frmInvestigationProcessInstance: "",
    frmProcess: "",
  });
  const handlePageChange = (_event: ChangeEvent<unknown>, page: number) => {
    setPage(page - 1);
  };
  const [getReportData, setReportData] = useState<
    FrmSummeryReportInfos | null
  >(null);

  if (getFrmInverstReportList === null) {
    return null;
  }

  const formatCardNumber = (value: string) => {
    if (value) {
      return value
        .replace(/\s+/g, "")
        .replace(/(\d{4})(?=\d)/g, "$1 ")
        .trim();
    } else {
      return value;
    }
  };

  const fieldButtonClickCommon = async (value: any, proId: any, name: any, businessKeyz: any) => {
    const request: ActionDetailsInf = {
      frmInvestigationProcessInstance: proId,
      frmProcess: value,
    };

    if (value == 'eventSummaryReport') {
      console.log("eventSummaryReport")
      setOpenModel(true);
      const { data, err } = await Api.performRequest((r) =>
        r.creditCard.getReportDetails(proId)
      );

      if (err === null) {
        console.log("Success");
        setOpenModel(true);
        setReportData(data);
      } else {
        console.log("Fail");
      }

    } else if (value == 'view') {
      console.log("view")
      setOpenViewModel(true);
      setId(proId);
    } else {
      setSavedData(request)
      setNameType(name)
      setBusinessKey(businessKeyz)
      setSaveBox(true)
    }

  };

  const saveData = async () => {
    console.log("getBusinessKey", getBusinessKey)
    const { data, err } = await Api.performRequest((r) =>
      r.creditCard.sendAction(getSavedData)
    );

    if (err === null) {
      toast.success(getBusinessKey + "-Workflow invoked");
      setRefresh(true);
      console.log("Success");
    } else {
      console.log("Fail");
    }
  }

  const closeModel = () => {
    setOpenModel(false);
  }

  const closeViewModel = () => {
    setOpenViewModel(false);
  }

  const closeSaveModel = () => {
    setSaveBox(false)
  }

  return (
    <Paper className="w-full overflow-hidden p-12">
      <div>
        {getFrmInverstReportList.content.length === 0 ? (
          <div className="flex items-center justify-center">
            <p className="text-red-600 text-14 font-bold">
              No records found for the selected date range
            </p>
          </div>
        ) : (
          <div>
            <div className="text-xs font-semibold tracking-wide text-left border-b">
              <div className="pb-6">
                <div className="flex justify-between items-center mb-4">
                  <div>
                    <div className="text-sm text-red-600 font-600">
                      Search Results
                    </div>
                    <div className="text-[12px] font-600 text-gray">
                      FRM Investigation
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="w-full overflow-x-auto">
              <table id="my-table" className="w-full whitespace-no-wrap">
                <thead>
                  <tr className="whitespace-nowrap divide-x-1">
                    <th className="p-6 text-left">Wf REF</th>
                    <th className="p-6 text-left">WF LABEL</th>
                    <th className="p-6 text-left">OLD NIC</th>
                    <th className="p-6 text-left">NEW NIC</th>
                    <th className="p-6 text-left">EXPERT OPINION</th>
                    <th className="p-6 text-left">FRM VERIFICATION</th>
                    <th className="p-6 text-left">EXTERNAL VERIFICATION</th>
                    <th className="p-6 text-left">QUESTIONNAIRE</th>
                    <th className="p-6 text-left">DATA ENTRY</th>
                    <th className="p-6 text-left">FRAUD FINALISING</th>
                    <th className="p-6 text-left">VIEW</th>
                    <th className="p-6 text-left">EVENT SUMMARY REPORT</th>
                    <th className="p-6 text-left">FRAUD APPROVED</th>
                    <th className="p-6 text-left">ACTION POINT</th>
                  </tr>
                </thead>
                <tbody className="bg-white whitespace-nowrap">
                  {getFrmInverstReportList?.content.map((process, index) => (
                    <tr
                      className="text-black h-full bg-white shadow-2"
                      key={index}
                      style={{ borderSpacing: "10px" }}
                    >
                      <td className="p-6 text-[12px] align-middle text-left">
                        <p className="text-[12px] text-gray font-bold">
                          {process.businessKey}
                        </p>
                      </td>
                      <td className="p-6 align-middle text-left">
                        <p className="text-[12px] text-gray font-bold">
                          {process.source}
                        </p>
                      </td>
                      <td className="p-6 align-middle text-left">
                        <p className="text-[12px] text-gray font-bold">
                          {process.oldNic}
                        </p>
                      </td>
                      <td className="p-6 align-middle text-left">
                        <p className="text-[12px] text-gray font-bold">
                          {process.newNic}
                        </p>
                      </td>
                      <td
                        className="p-6 align-middle text-center"

                      >
                        <Button variant="outlined" className="px-14 border-gray bg-grey-50 cursor-pointer hover:bg-gray-200 focus:outline-none active:scale-95 active:bg-gray-300"
                          onClick={() =>
                            fieldButtonClickCommon(
                              "FRM_EXPERT_OPINION",
                              process.processInstanceId,
                              "EXPERT OPINION",
                              process.businessKey
                            )
                          }
                          disabled={!(process.frmExpertOpinionData.completedCount == process.frmExpertOpinionData.totalCount)}>
                          <Tooltip title={<p>{process.frmExpertOpinionData?.pendingList ?? 0}/{process.frmExpertOpinionData?.completedList ?? 0}</p>}>
                            <div className="flex items-center justify-center space-x-2">
                              <p className="text-[12px] text-gray font-bold">
                                {process.frmExpertOpinionData?.completedCount ??
                                  0}
                                /{process.frmExpertOpinionData?.totalCount ?? 0}
                              </p>
                              <p className="text-[12px] text-gray font-bold">
                                {process.expertOpinion}
                              </p>
                              <EdgeSvgIcon className="text-blue-500">
                                heroicons-outline:user
                              </EdgeSvgIcon>
                            </div>
                          </Tooltip>
                        </Button>
                      </td>
                      <td
                        className="p-6 align-middle text-center"

                      ><Button variant="outlined" className="px-20 border-gray bg-grey-50 cursor-pointer hover:bg-gray-200 focus:outline-none active:scale-95 active:bg-gray-300"
                        onClick={() =>
                          fieldButtonClickCommon(
                            "FRM_VERIFICATION",
                            process.processInstanceId,
                            "FRM VERIFICATION",
                            process.businessKey
                          )
                        }
                        disabled={!(process.frmVerificationData.completedCount == process.frmVerificationData.totalCount)}>
                          <Tooltip title={<p>{process.frmVerificationData?.pendingList ?? 0}/{process.frmVerificationData?.completedList ?? 0}</p>}>
                            <div className="flex items-center justify-center space-x-2">
                              <p className="text-[12px] text-gray font-bold">
                                {process.frmVerificationData?.completedCount ?? 0}
                                /{process.frmVerificationData?.totalCount ?? 0}
                              </p>
                              <p className="text-[12px] text-gray font-bold">
                                {process.frmVerification}
                              </p>
                              <EdgeSvgIcon className="text-blue-500">
                                heroicons-outline:check-circle
                              </EdgeSvgIcon>
                            </div>
                          </Tooltip>
                        </Button>
                      </td>
                      <td
                        className="p-6 align-middle text-center"

                      >
                        <Button variant="outlined" className="px-32 border-gray bg-grey-50 cursor-pointer hover:bg-gray-200 focus:outline-none active:scale-95 active:bg-gray-300"
                          onClick={() =>
                            fieldButtonClickCommon(
                              "FRM_EXTERNAL_VERIFICATION",
                              process.processInstanceId,
                              "EXTERNAL VERIFICATION",
                              process.businessKey
                            )
                          }
                          disabled={!(process.frmExternalVerificationData.completedCount == process.frmExternalVerificationData.totalCount)}>
                          <Tooltip title={<p>{process.frmExternalVerificationData?.pendingList ?? 0}/{process.frmExternalVerificationData?.completedList ?? 0}</p>}>
                            <div className="flex items-center justify-center space-x-2">
                              <p className="text-[12px] text-gray font-bold">
                                {process.frmExternalVerificationData
                                  ?.completedCount ?? 0}
                                /
                                {process.frmExternalVerificationData
                                  ?.totalCount ?? 0}
                              </p>
                              <p className="text-[12px] text-gray font-bold">
                                {process.externalVerification}
                              </p>
                              <EdgeSvgIcon className="text-blue-500">
                                heroicons-outline:arrow-right
                              </EdgeSvgIcon>
                            </div>
                          </Tooltip>
                        </Button>
                      </td>
                      <td
                        className="p-6 align-middle text-center"

                      >
                        <Button variant="outlined" className="px-14 border-gray bg-grey-50 cursor-pointer hover:bg-gray-200 focus:outline-none active:scale-95 active:bg-gray-300"
                          onClick={() =>
                            fieldButtonClickCommon(
                              "FRM_QUESTIONNAIRE",
                              process.processInstanceId,
                              "QUESTIONNAIRE",
                              process.businessKey
                            )
                          }
                          disabled={!(process.frmQuestionnaireData.completedCount == process.frmQuestionnaireData.totalCount)}>
                          <Tooltip title={<p>{process.frmQuestionnaireData?.pendingList ?? 0}/{process.frmQuestionnaireData?.completedList ?? 0}</p>}>
                            <div className="flex items-center justify-center space-x-2">
                              <p className="text-[12px] text-gray font-bold">
                                {process.frmQuestionnaireData?.completedCount ??
                                  0}
                                /{process.frmQuestionnaireData?.totalCount ?? 0}
                              </p>
                              <p className="text-[12px] text-gray font-bold">
                                {process.questionnaire}
                              </p>
                              <EdgeSvgIcon className="text-blue-500">
                                heroicons-outline:question-mark-circle
                              </EdgeSvgIcon>
                            </div>
                          </Tooltip>
                        </Button>
                      </td>
                      <td
                        className="p-6 align-middle text-center "

                      >
                        <Button variant="outlined" className="px-10 border-gray bg-grey-50 cursor-pointer hover:bg-gray-200 focus:outline-none active:scale-95 active:bg-gray-300"
                          onClick={() =>
                            fieldButtonClickCommon(
                              "FRM_DATA_ENTRY",
                              process.processInstanceId,
                              "DATA ENTRY",
                              process.businessKey
                            )
                          }
                          disabled={process.dataEntryInvoked}>
                          <Tooltip title={<p>{process.dataEntryInvokedRef}</p>}>
                            <p className="text-[12px] text-gray font-bold  flex justify-center items-center">
                              {/* {process.dataEntry} */}
                              {
                                !process.dataEntryInvoked && !process.dataEntryCompleted ? (
                                  <EdgeSvgIcon className="text-red-500">heroicons-outline:document-text</EdgeSvgIcon>
                                ) : process.dataEntryInvoked && !process.dataEntryCompleted ? (
                                  <EdgeSvgIcon className="text-yellow-800">heroicons-outline:clock</EdgeSvgIcon>
                                ) : process.dataEntryCompleted ? (
                                  <EdgeSvgIcon className="text-green-500">heroicons-outline:check</EdgeSvgIcon>
                                ) : null
                              }

                            </p>
                          </Tooltip>
                        </Button>
                      </td>
                      <td
                        className="p-6 align-middle text-center"

                      >
                        <Button variant="outlined" className="border-gray bg-grey-50 cursor-pointer hover:bg-gray-200 focus:outline-none active:scale-95 active:bg-gray-300"
                          onClick={() =>
                            fieldButtonClickCommon(
                              "FRM_FRAUD_FINALISING",
                              process.processInstanceId,
                              "FRAUD FINALISING",
                              process.businessKey
                            )
                          }
                          disabled={process.fraudFinalisingInvoked ? true : !process.dataEntryCompleted ? true : false}>
                          <Tooltip title={<p>{process.fraudFinalisingInvokedRef}</p>}>
                            <p className="text-[12px] text-gray font-bold  flex justify-center items-center">
                              {
                                !process.fraudFinalisingCompleted && process.fraudFinalisingInvoked ? (
                                  <EdgeSvgIcon className="text-yellow-800">heroicons-outline:clock</EdgeSvgIcon>
                                ) : process.fraudFinalisingCompleted && process.fraudStatus == 'NO FRAUD' ? (
                                  <EdgeSvgIcon className="text-green-500">heroicons-outline:check</EdgeSvgIcon>
                                ) : process.fraudFinalisingCompleted && process.fraudStatus == 'CONFIRMED FRAUD' ? (
                                  <EdgeSvgIcon className="text-red-500">heroicons-outline:check</EdgeSvgIcon>
                                ) : <EdgeSvgIcon className="text-red-500">heroicons-outline:document-text</EdgeSvgIcon>
                              }

                            </p>
                          </Tooltip>
                        </Button>
                      </td>
                      <td
                        className="p-6 align-middle text-center"

                      >
                        <Button variant="outlined" className="border-gray bg-grey-50 cursor-pointer hover:bg-gray-200 focus:outline-none active:scale-95 active:bg-gray-300"
                          onClick={() =>
                            fieldButtonClickCommon(
                              "view",
                              process.processInstanceId,
                              "VIEW",
                              process.businessKey
                            )
                          }>
                          <p className="text-[12px] text-gray font-bold">
                            {/* {process.view} */}
                            <p className="text-[12px] text-gray font-bold  flex justify-center items-center">
                              <EdgeSvgIcon className="text-green-500">heroicons-outline:document</EdgeSvgIcon>
                            </p>
                          </p>
                        </Button>
                      </td>
                      <td
                        className="p-6 align-middle text-center"

                      >
                        <Button variant="outlined" className="px-36 border-gray bg-grey-50 cursor-pointer hover:bg-gray-200 focus:outline-none active:scale-95 active:bg-gray-300"
                          onClick={() =>
                            fieldButtonClickCommon(
                              "eventSummaryReport",
                              process.processInstanceId,
                              "SUMMERY REPORT",
                              process.businessKey
                            )
                          }
                          disabled={!process.fraudFinalisingCompleted}>
                          <p className="text-[12px] text-gray font-bold">
                            {/* {process.eventSummaryReport} */}
                            <p className="text-[12px] text-gray font-bold  flex justify-center items-center">
                              <EdgeSvgIcon className="text-green-500">
                                heroicons-outline:document-duplicate
                              </EdgeSvgIcon>
                            </p>
                          </p>
                        </Button>
                      </td>
                      <td className="p-6 align-middle text-left">
                        <p className="text-[12px] text-gray font-bold">
                          {process.fraudStatus ? process.fraudStatus : "-"}
                        </p>
                      </td>
                      <td className="p-6 align-middle text-left">
                        <p className="text-[12px] text-gray font-bold flex justify-center items-center">
                          {(process.frmExpertOpinionData?.completedCount ?? 0) + (process.frmVerificationData?.completedCount ?? 0) + (process.frmExternalVerificationData?.completedCount ?? 0) + (process.frmQuestionnaireData?.completedCount ?? 0)}/
                          {(process.frmExpertOpinionData?.totalCount ?? 0) + (process.frmVerificationData?.totalCount ?? 0) + (process.frmExternalVerificationData?.totalCount ?? 0) + (process.frmQuestionnaireData?.totalCount ?? 0)}
                        </p>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="flex items-center justify-center mt-4">
              <Pagination
                count={getFrmInverstReportList.totalPages}
                siblingCount={0}
                page={page + 1}
                onChange={handlePageChange}
              />
            </div>
          </div>
        )}
      </div>
      <FrmEventSummaryReport open={openModel} handleClose={closeModel} getReportData={getReportData} />
      <FrmViewDetails open={openViewModel} handleClose={closeViewModel} id={getId} />
      <SaveDialogBox open={getSaveBox} handleClose={closeSaveModel} saveData={saveData} type={getNameType} />
    </Paper>
  );
};

export default FrmInvestReportTable;
