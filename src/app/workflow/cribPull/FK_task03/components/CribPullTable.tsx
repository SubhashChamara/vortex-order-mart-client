import {
  Button,
  Checkbox,
  FormControlLabel,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Tooltip,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import EdgeSvgIcon from "../../../../../@core/ui/EdgeSvgIcon";
import { TaskDetailInfo } from "../../../../core/types/TaskDetailInfo";
import {
  CribPullDownloadFileTableRequest,
  CribPullProcess,
  CribPullTableRequest,
} from "../../@types/CribPullTable";
import { Api } from "../../../../../api/Api";
import { toast } from "react-toastify";
import Ve3LoadingScreen from "../../../../../@core/ui/Ve3LoadingScreen/Ve3LoadingScreen";
import Ve3Popup from "../../../../../@core/ui/Ve3Popup/Ve3Popup";
import CribPaneUpload from "./CribPaneUpload";
import FileView from "./FileView";
import {
  CribPullFileInfo,
  CribPullSummaryCountInfo,
} from "../../@types/CribPullInfo";
import dayjs from "dayjs";
import { Controller, useForm } from "react-hook-form";
import { SaveCribPullHeaderRequest } from "../../@types/CribPullRequest";
import CribFileView from "./CribFileView";
import CribSummaryComponent from "../../components/CribSummaryComponent/CribSummaryComponent";
import Ve3NoDataScreen from "../../../../../@core/ui/Ve3NoDataScreen/Ve3NoDataScreen";

export interface CribPullTableProps {
  task: TaskDetailInfo;
  isLoading: boolean;
  setIsLoading: (val: boolean) => void;
  refreshTable: boolean;
  setRefreshTable: (val: boolean) => void;
  tableData: CribPullTableRequest | null;
  setTableData: (items: CribPullTableRequest | null) => void;
  isPDFVisible: boolean;
  setIsPDFVisible: (val: boolean) => void;
}

type NoCribFormType = {
  noCribHistory: boolean;
  eicSelectedCribExtraction: boolean;
  nicSelectedCribExtraction: boolean;
  ppSelectedCribExtraction: boolean;
};

type FormType = {
  cribPullProcessList: NoCribFormType[];
};

const defaultValues: FormType = {
  cribPullProcessList: [
    {
      noCribHistory: false,
      eicSelectedCribExtraction: false,
      nicSelectedCribExtraction: false,
      ppSelectedCribExtraction: false,
    },
  ],
};

const CribPullTable: React.FC<CribPullTableProps> = ({
  task,
  isLoading,
  setIsLoading,
  refreshTable,
  tableData,
  setTableData,
  isPDFVisible,
  setIsPDFVisible,
}) => {
  const [viewingRow, setViewingRow] = useState<number | null>(null);
  const [isTextFileDownloading, setIsTextFileDownloading] =
    useState<boolean>(false);
  const [currentCribProcessItem, setCurrentCribProcessItem] =
    useState<CribPullProcess | null>(null);
  const [summaryInfo, setSummaryInfo] =
    useState<CribPullSummaryCountInfo | null>(null);
  const [allSelected, setAllSelected] = useState(false);

  const toggleViewingRow = (index: number) => {
    setViewingRow(viewingRow === index ? null : index);
  };

  const [selectedCribPanePDF, setSelectedCribPanePDF] =
    useState<CribPullFileInfo | null>(null);

  const formatCurrency = (value: string) => {
    if (!value) return value;
    let cleanedValue = value.replace(/[^0-9.]/g, "");
    if (cleanedValue.includes(".")) {
      const [integer, decimal] = cleanedValue.split(".");
      cleanedValue = `${integer}.${decimal.slice(0, 2)}`;
    }
    const formattedValue = cleanedValue.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    return `${formattedValue}`;
  };

  const { control, handleSubmit, setValue, watch } = useForm<FormType>({
    mode: "onChange",
    defaultValues,
  });

  const cribPullProcessList = watch("cribPullProcessList", []);

  const handleToggleAll = () => {
    const updatedAllSelected = !allSelected;
    setAllSelected(updatedAllSelected);

    cribPullProcessList.forEach((_, index) => {
      setValue(
        `cribPullProcessList.${index}.noCribHistory`,
        updatedAllSelected
      );
    });
  };

  const formatDataEntryMethod = (leftSide: string): string | undefined => {
    switch (leftSide) {
      case "DATA_ENTRY":
        return "Data Entry";
      case "CLI_INFO_FILE":
        return "CLI File Upload";
      case "SIMPLE_FILE":
        return "Simple File Upload";
      case "EFORM":
        return "EForm Upload";
      case "LEAD_GENERATION_FILE":
        return "Lead Generation Upload";
      default:
        return undefined;
    }
  };

  const handleTextFileDownload = async () => {
    const request: CribPullDownloadFileTableRequest = {
      processInstance: task.processInstanceId,
      taskInstance: task.taskInstance,
    };
    try {
      setIsTextFileDownloading(true);
      const { data, err } = await Api.performRequest((r) =>
        r.cribPull.textFileDownload(request)
      );

      if (data) {
        const blob = new Blob([data], { type: "text/txt" });
        const link = document.createElement("a");
        link.href = URL.createObjectURL(blob);
        link.download = "crib-pull.txt";
        document.body.appendChild(link);
        // Programmatically click the link to trigger the download
        link.click();
        // Remove the link from the document
        document.body.removeChild(link);
        toast.success("File downloaded successfully");
      } else {
        toast.error("Error downloading file:", <p>{err?.msg}</p>);
      }
    } catch (err) {
      console.log(err);
    } finally {
      setIsTextFileDownloading(false);
    }
  };

  const fetchSummaryInfo = async () => {
    try {
      const { data } = await Api.performRequest((r) =>
        r.cribPull.getSummaryCounts(task.processInstanceId)
      );

      if (data !== null) {
        setSummaryInfo(data);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const fetchTableData = async () => {
    try {
      setIsLoading(true);
      const { data, err } = await Api.performRequest((r) =>
        r.cribPull.getCribTableData(task.processInstanceId)
      );

      console.log("data", data);

      if (err === null) {
        setTableData(data);
      } else {
        toast.error(err.msg);
      }
    } catch (err) {
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchSummaryInfo();
  }, []);

  useEffect(() => {
    if (!tableData?.cribPullProcessList?.length) {
      console.warn(
        "Table data or cribPullProcessList is not available or empty."
      );
      return;
    }

    tableData.cribPullProcessList.forEach((processItem, index) => {
      setValue(
        `cribPullProcessList.${index}.noCribHistory`,
        processItem?.noCribHistory ?? false
      );
      setValue(
        `cribPullProcessList.${index}.ppSelectedCribExtraction`,
        processItem?.ppSelectedCribExtraction ?? false
      );
      setValue(
        `cribPullProcessList.${index}.nicSelectedCribExtraction`,
        processItem?.nicSelectedCribExtraction ?? false
      );
      setValue(
        `cribPullProcessList.${index}.eicSelectedCribExtraction`,
        processItem?.eicSelectedCribExtraction ?? false
      );
    });
  }, [tableData, setValue]);

  useEffect(() => {
    if (viewingRow !== null) {
      setIsPDFVisible(true);
    } else {
      setIsPDFVisible(false);
    }
  }, [viewingRow]);

  useEffect(() => {
    if (!isPDFVisible) {
      setSelectedCribPanePDF(null);
    }
  }, [isPDFVisible]);

  useEffect(() => {
    fetchTableData();
  }, [refreshTable]);

  const onSubmit = async (formData: FormType) => {
    if (!tableData) {
      return;
    }

    const { cribPullProcessList } = formData;

    const header: SaveCribPullHeaderRequest = {
      cribPullMethod: tableData.cribPullMethod,
      processInstance: task.processInstanceId,
      unitInitiating: tableData.unitInitiating,
      noCribHistory: allSelected,
    };

    const body: CribPullProcess[] = tableData.cribPullProcessList.map(
      (process, index) => ({
        id: process.id,
        clientName: process.clientName,
        citizenship: process.citizenship,
        nic: process.nic || null,
        passportNo: process.passportNo || null,
        gender: process.gender,
        dateOfBirth: process.dateOfBirth,
        creditFacilityType: process.creditFacilityType,
        amount: process.amount,
        clientEmail: process.clientEmail,
        employerName: process.employerName,
        purpose: process.purpose,
        noCribHistory: cribPullProcessList[index].noCribHistory,
        nicSelectedCribExtraction: cribPullProcessList[index]
          .nicSelectedCribExtraction
          ? cribPullProcessList[index].nicSelectedCribExtraction
          : false,
        eicSelectedCribExtraction: cribPullProcessList[index]
          .eicSelectedCribExtraction
          ? cribPullProcessList[index].eicSelectedCribExtraction
          : false,
        ppSelectedCribExtraction: cribPullProcessList[index]
          .ppSelectedCribExtraction
          ? cribPullProcessList[index].ppSelectedCribExtraction
          : false,
        eic: process.eic || null,
        reason: process.reason || "",
      })
    );

    const request = {
      cribPullHeader: header,
      cribPullRequestList: body,
    };

    const { data, err } = await Api.performRequest((r) =>
      r.cribPull.updateCribExtraction(request)
    );

    if (data !== null) {
      toast.success("Saved Successfully");
    } else {
      toast.error(err?.msg);
    }
  };

  return (
    <>
      <Paper className="px-12 pb-12 flex flex-col gap-12">
        <div className="text-center mb-4 border-b-1 border-b-gray-200 py-6">
          <h1 className="text-md font-600 text-left text-blue-gray-800">
            <div className="flex flex-row justify-between">
              <div className="flex flex-row items-center justify-center">
                <EdgeSvgIcon
                  className="icon-size-18 cursor-pointer mr-3"
                  color="error"
                >
                  material-outline:find_in_page
                </EdgeSvgIcon>
                <p>Crib View</p>
              </div>

              <div className="grid grid-cols-4 gap-12">
                <CribSummaryComponent
                  count={summaryInfo?.noOfRequests || 0}
                  icon="material-solid:forum"
                  title="Number of Request(s)"
                />

                <CribSummaryComponent
                  count={summaryInfo?.noOfCribAttached || 0}
                  icon="material-solid:note_add"
                  title="Number of CRIB files Attached"
                />

                <CribSummaryComponent
                  count={summaryInfo?.noOfCribPaneAttached || 0}
                  icon="material-solid:call_to_action"
                  title="Number of CRIB Panes"
                />

                <CribSummaryComponent
                  count={summaryInfo?.noOfNoMatchCrib || 0}
                  icon="material-solid:branding_watermark"
                  title="Number of No Match CRIB"
                />
              </div>
            </div>
          </h1>
        </div>

        <div className="relative">
          <form onSubmit={handleSubmit(onSubmit)}>
            <TableContainer component={Paper} className="max-w-screen">
              <Table className="max-w-screen">
                <TableHead>
                  <TableRow>
                    <TableCell className="border border-gray-300 bg-grey-200 font-bold">
                      Method
                    </TableCell>
                    <TableCell className="border border-gray-300 bg-grey-200 font-bold">
                      Unit Initiating
                    </TableCell>
                    <TableCell className="border border-gray-300 bg-grey-200 font-bold">
                      Client Details
                    </TableCell>
                    <TableCell className="border border-gray-300 bg-grey-200 font-bold">
                      Purpose
                    </TableCell>
                    <TableCell className="border border-gray-300 bg-grey-200 font-bold">
                      Credit Facility Type
                    </TableCell>
                    <TableCell className="border border-gray-300 bg-grey-200 font-bold">
                      Credit Facility Amount
                    </TableCell>
                    <TableCell className="border border-gray-300 bg-grey-200 font-bold">
                      Client Email
                    </TableCell>
                    <TableCell className="border border-gray-300 bg-grey-200 font-bold">
                      Employer Name
                    </TableCell>
                    <TableCell
                      className="border border-gray-300 bg-grey-200 font-bold"
                      align="center"
                    >
                      No Crib History
                      <FormControlLabel
                        control={
                          <Checkbox
                            disabled
                            checked={allSelected}
                            onChange={handleToggleAll}
                            size="small"
                          />
                        }
                        label="Select all"
                      />
                    </TableCell>
                    <TableCell className="border border-gray-300 bg-grey-200 font-bold">
                      View Crib
                    </TableCell>
                  </TableRow>
                </TableHead>
                {tableData && (
                  <TableBody>
                    {tableData?.cribPullProcessList.map((item, index) => (
                      <TableRow key={index}>
                        <TableCell>
                          {formatDataEntryMethod(tableData.cribPullMethod)}
                        </TableCell>
                        <TableCell>{tableData.unitInitiating}</TableCell>
                        <TableCell>
                          {item.clientName && (
                            <Tooltip title="Client Name">
                              <p className="flex flex-row items-start">
                                <EdgeSvgIcon
                                  className="icon-size-12 cursor-pointer mr-6 text-primary"
                                  color="error"
                                >
                                  material-outline:person_outline
                                </EdgeSvgIcon>
                                {item.clientName}
                              </p>
                            </Tooltip>
                          )}
                          {item.citizenship && (
                            <Tooltip title="Citizenship">
                              <p className="flex flex-row items-start">
                                <EdgeSvgIcon
                                  className="icon-size-12 cursor-pointer mr-6 text-primary"
                                  color="error"
                                >
                                  material-outline:language
                                </EdgeSvgIcon>
                                {item.citizenship}
                              </p>
                            </Tooltip>
                          )}

                          {item.nic && (
                            <Tooltip title="NIC Number (Old)">
                              <p className="flex flex-row items-center">
                                <EdgeSvgIcon
                                  className="icon-size-12 cursor-pointer mr-6 text-primary"
                                  color="error"
                                >
                                  heroicons-outline:identification
                                </EdgeSvgIcon>
                                <div
                                  className={`w-full flex flex-row justify-between items-center ${
                                    item.cribAvailSts30DaysNic === "NEW"
                                      ? "text-green-700"
                                      : item.cribAvailSts30DaysNic ===
                                        "EXISTING"
                                      ? "text-primary"
                                      : "text-black"
                                  }`}
                                >
                                  {item.nic}
                                  <Controller
                                    name={`cribPullProcessList.${index}.nicSelectedCribExtraction`}
                                    control={control}
                                    defaultValue={false}
                                    render={({ field }) => (
                                      <FormControlLabel
                                        className="ml-3"
                                        control={
                                          <Checkbox
                                            {...field}
                                            disabled
                                            checked={field.value}
                                            sx={{
                                              "& .MuiSvgIcon-root": {
                                                fontSize: 16,
                                              },
                                            }}
                                          />
                                        }
                                        label=""
                                      />
                                    )}
                                  />
                                </div>
                              </p>
                            </Tooltip>
                          )}

                          {item.passportNo && (
                            <Tooltip title="Passport Number">
                              <p className="flex flex-row items-center">
                                <EdgeSvgIcon
                                  className="icon-size-12 cursor-pointer mr-6 text-primary"
                                  color="error"
                                >
                                  heroicons-outline:identification
                                </EdgeSvgIcon>
                                <div
                                  className={`w-full flex flex-row justify-between items-center ${
                                    item.cribAvailSts30DaysPassport === "NEW"
                                      ? "text-green-700"
                                      : item.cribAvailSts30DaysPassport ===
                                        "EXISTING"
                                      ? "text-primary"
                                      : "text-black"
                                  }`}
                                >
                                  {item.passportNo}
                                  <Controller
                                    name={`cribPullProcessList.${index}.ppSelectedCribExtraction`}
                                    control={control}
                                    defaultValue={false}
                                    render={({ field }) => (
                                      <FormControlLabel
                                        className="ml-3"
                                        control={
                                          <Checkbox
                                            {...field}
                                            disabled
                                            checked={field.value}
                                            sx={{
                                              "& .MuiSvgIcon-root": {
                                                fontSize: 16,
                                              },
                                            }}
                                          />
                                        }
                                        label=""
                                      />
                                    )}
                                  />
                                </div>
                              </p>
                            </Tooltip>
                          )}

                          {item.eic && (
                            <Tooltip title="NIC Number(New)">
                              <p className="flex flex-row items-center">
                                <EdgeSvgIcon
                                  className="icon-size-12 cursor-pointer mr-6 text-primary"
                                  color="error"
                                >
                                  heroicons-outline:identification
                                </EdgeSvgIcon>
                                <div
                                  className={`w-full flex flex-row justify-between items-center ${
                                    item.cribAvailSts30DaysEic === "NEW"
                                      ? "text-green-700"
                                      : item.cribAvailSts30DaysEic ===
                                        "EXISTING"
                                      ? "text-primary"
                                      : "text-black"
                                  }`}
                                >
                                  {item.eic}
                                  <Controller
                                    name={`cribPullProcessList.${index}.eicSelectedCribExtraction`}
                                    control={control}
                                    defaultValue={false}
                                    render={({ field }) => (
                                      <FormControlLabel
                                        className="ml-3"
                                        control={
                                          <Checkbox
                                            {...field}
                                            disabled
                                            checked={field.value}
                                            sx={{
                                              "& .MuiSvgIcon-root": {
                                                fontSize: 16,
                                              },
                                            }}
                                          />
                                        }
                                        label=""
                                      />
                                    )}
                                  />
                                </div>
                              </p>
                            </Tooltip>
                          )}

                          {item.gender && (
                            <Tooltip title="Gender">
                              <p className="flex flex-row items-start">
                                <EdgeSvgIcon
                                  className="icon-size-12 cursor-pointer mr-6 text-primary"
                                  color="error"
                                >
                                  material-outline:wc
                                </EdgeSvgIcon>
                                {item.gender}
                              </p>
                            </Tooltip>
                          )}
                          {item.dateOfBirth && (
                            <Tooltip title="Date of Birth">
                              <p className="flex flex-row items-start">
                                <EdgeSvgIcon
                                  className="icon-size-12 cursor-pointer mr-6 text-primary"
                                  color="error"
                                >
                                  material-outline:perm_contact_calendar
                                </EdgeSvgIcon>
                                {dayjs(item.dateOfBirth).format("DD-MM-YYYY")}
                              </p>
                            </Tooltip>
                          )}
                        </TableCell>
                        <TableCell>{item.purpose}</TableCell>
                        <TableCell>{item.creditFacilityType}</TableCell>
                        <TableCell align="right">
                          {formatCurrency(String(item.amount))}
                        </TableCell>
                        <TableCell>{item.clientEmail}</TableCell>
                        <TableCell>{item.employerName}</TableCell>
                        <TableCell align="center">
                          <Controller
                            name={`cribPullProcessList.${index}.noCribHistory`}
                            control={control}
                            defaultValue={false}
                            render={({ field }) => (
                              <FormControlLabel
                                control={
                                  <Checkbox
                                    {...field}
                                    checked={field.value}
                                    disabled
                                  />
                                }
                                label=""
                              />
                            )}
                          />
                        </TableCell>
                        <TableCell>
                          <Button
                            aria-label="View Crib"
                            type="button"
                            className="bg-white"
                            onClick={() => {
                              toggleViewingRow(index);
                              setCurrentCribProcessItem(item);
                            }}
                          >
                            <EdgeSvgIcon className="icon-size-12 cursor-pointer text-primary mr-3">
                              feather:paperclip
                            </EdgeSvgIcon>
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                )}
              </Table>
            </TableContainer>
          </form>

          {isLoading && (
            <div className="absolute inset-0 flex items-center justify-center bg-white opacity-75">
              <Ve3LoadingScreen />
            </div>
          )}
        </div>
      </Paper>

      <Ve3Popup
        open={isPDFVisible}
        fullWidth={true}
        setOpen={setIsPDFVisible}
        customWidth="95%"
        body={
          <div className="grid grid-cols-3 gap-12">
            <div className="grid grid-cols-1 gap-12">
              <CribPaneUpload
                task={task}
                currentCribProcessItem={currentCribProcessItem}
                setSelectedCribPanePDF={setSelectedCribPanePDF}
              />
              <CribFileView
                task={task}
                currentCribProcessItem={currentCribProcessItem}
                setSelectedCribPanePDF={setSelectedCribPanePDF}
              />
            </div>
            <div className="col-span-2">
              {selectedCribPanePDF ? (
                <FileView
                  task={task}
                  currentCribProcessItem={currentCribProcessItem}
                  selectedCribPanePDF={selectedCribPanePDF}
                />
              ) : (
                <div className="flex h-full items-center">
                  <Ve3NoDataScreen message="Please select a file to display here" />
                </div>
              )}
            </div>
          </div>
        }
        onClose={() => setSelectedCribPanePDF(null)}
      />
    </>
  );
};

export default CribPullTable;
