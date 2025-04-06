import {
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
  CribPullProcess,
  CribPullTableRequest,
} from "../../@types/CribPullTable";
import { Api } from "../../../../../api/Api";
import { toast } from "react-toastify";
import Ve3LoadingScreen from "../../../../../@core/ui/Ve3LoadingScreen/Ve3LoadingScreen";
import dayjs from "dayjs";
import Ve3Popup from "../../../../../@core/ui/Ve3Popup/Ve3Popup";
import ExcelDataViewPLLG from "../../components/ExcelDataView/ExcelDataViewPLLG";
import { CribPullPLLoanInfo } from "../../@types/CribPullPLLoanInfo";
import ExcelDataViewPLCD from "../../components/ExcelDataView/ExcelDataViewPLCD";
import { CribPullPLCardInfo } from "../../@types/CribPullPLCardInfo";
import { CribPullSimpleFormInfo } from "../../@types/CribPullSimpleFormInfo";
import ExcelDataSimpleForm from "../../components/ExcelDataView/ExcelDataSimpleForm";
import { CribPullCLIInfo } from "../../@types/CribPullCLIInfo";
import { table } from "console";
import ExcelDataCLI from "../../components/ExcelDataView/ExcelDataCLI";
import { CribPullEFormInfo } from "../../@types/CribPullEFormInfo";
import ExcelDataViewEForm from "../../components/ExcelDataView/ExcelDataViewEForm";

export interface CribPullTableProps {
  task: TaskDetailInfo;
  isLoading: boolean;
  setIsLoading: (val: boolean) => void;
  setSelectedItemForEdit: (item: CribPullProcess | null) => void;
  refreshTable: boolean;
  setRefreshTable: (val: boolean) => void;
  tableData: CribPullTableRequest | null;
  setTableData: (items: CribPullTableRequest | null) => void;
}

const CribPullTable: React.FC<CribPullTableProps> = ({
  task,
  isLoading,
  setIsLoading,
  setSelectedItemForEdit,
  refreshTable,
  setRefreshTable,
  tableData,
  setTableData,
}) => {
  const [isExcelViewVisible, setIsExcelViewVisible] = useState<boolean>(false);
  const [excelPLLoanlData, setExcelPLLoanData] =
    useState<CribPullPLLoanInfo | null>(null);
  const [excelPLLoanlCard, setExcelPLLoanCard] =
    useState<CribPullPLCardInfo | null>(null);
  const [excelSimpleLoan, setExcelSimpleLoan] =
    useState<CribPullSimpleFormInfo | null>(null);
  const [excelCLITableData, setExcelCLITableData] =
    useState<CribPullCLIInfo | null>(null);
  const [excelEFormTableData, setExcelEFormTableData] =
    useState<CribPullEFormInfo | null>(null);
  const [isPlTypeLoan, setIsPLTypeLoan] = useState<boolean>(false);

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

  const fetchTableData = async () => {
    try {
      setIsLoading(true);
      const { data, err } = await Api.performRequest((r) =>
        r.cribPull.getCribTableData(task.processInstanceId)
      );

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

  const getPLIndividualData = async (id: number) => {
    try {
      const { data, err } = await Api.performRequest((r) =>
        r.cribPull.getCribPullExcelPL(id)
      );
      if (data !== null) {
        setExcelPLLoanData(data);
      } else {
        toast.error(err?.msg);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const getPLIndividualDataPLCard = async (id: number) => {
    try {
      const { data, err } = await Api.performRequest((r) =>
        r.cribPull.getCribPullExcelPL(id)
      );
      if (data !== null) {
        setExcelPLLoanCard(data);
      } else {
        toast.error(err?.msg);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const getCribPullExcelSimpleForm = async (id: number) => {
    try {
      const { data, err } = await Api.performRequest((r) =>
        r.cribPull.getCribPullExcelSimpleForm(id)
      );
      if (data !== null) {
        setExcelSimpleLoan(data);
      } else {
        toast.error(err?.msg);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const getCribPullCLIFormTable = async (id: number) => {
    try {
      const { data, err } = await Api.performRequest((r) =>
        r.cribPull.getCribPullCLIForm(id)
      );
      if (data !== null) {
        setExcelCLITableData(data);
      } else {
        toast.error(err?.msg);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const getCribPullEFormTable = async (id: number) => {
    try {
      const { data, err } = await Api.performRequest((r) =>
        r.cribPull.getCribPullEForm(id)
      );
      if (data !== null) {
        setExcelEFormTableData(data);
      } else {
        toast.error(err?.msg);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const deleteSelectedRow = async (id: number) => {
    try {
      setIsLoading(true);
      const { err } = await Api.performRequest((r) =>
        r.cribPull.deleteCribTableEntry(id)
      );

      if (err === null) {
        toast.success("Deleted Successfully!");
      } else {
        toast.error(err.msg);
      }
    } catch (err) {
      console.log(err);
    } finally {
      setRefreshTable(!refreshTable);
    }
  };

  useEffect(() => {
    fetchTableData();
  }, [refreshTable]);

  return (
    <>
      <Paper className="px-12 pb-12">
        <div className="text-center mb-16 border-b-1 border-b-gray-200 py-6">
          <h1 className="text-md font-600 text-left flex items-center text-blue-gray-800">
            <div>
              <EdgeSvgIcon
                className="icon-size-18 cursor-pointer mr-3"
                color="error"
              >
                feather:tablet
              </EdgeSvgIcon>
            </div>
            <div>Results</div>
          </h1>
        </div>

        <div className="relative">
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
                  {tableData?.cribPullMethod !== "DATA_ENTRY" && (
                    <TableCell className="border border-gray-300 bg-grey-200 font-bold"></TableCell>
                  )}
                  <TableCell className="border border-gray-300 bg-grey-200 font-bold"></TableCell>
                </TableRow>
              </TableHead>
              {tableData && (
                <TableBody>
                  {tableData.cribPullProcessList.map((item, index) => (
                    <TableRow key={index}>
                      <TableCell>
                        {formatDataEntryMethod(tableData.cribPullMethod)}
                      </TableCell>{" "}
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
                          <Tooltip title="NIC Number(Old)">
                            <p className="flex flex-row items-start">
                              <EdgeSvgIcon
                                className="icon-size-12 cursor-pointer mr-6 text-primary"
                                color="error"
                              >
                                heroicons-outline:identification
                              </EdgeSvgIcon>
                              {item.nic}
                            </p>
                          </Tooltip>
                        )}

                        {item.passportNo && (
                          <Tooltip title="Passport Number">
                            <p className="flex flex-row items-start">
                              <EdgeSvgIcon
                                className="icon-size-12 cursor-pointer mr-6 text-primary"
                                color="error"
                              >
                                heroicons-outline:identification
                              </EdgeSvgIcon>
                              {item.passportNo}
                            </p>
                          </Tooltip>
                        )}

                        {item.eic && (
                          <Tooltip title="NIC Number(New)">
                            <p className="flex flex-row items-start">
                              <EdgeSvgIcon
                                className="icon-size-12 cursor-pointer mr-6 text-primary"
                                color="error"
                              >
                                heroicons-outline:identification
                              </EdgeSvgIcon>
                              {item.eic}
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
                      {tableData?.cribPullMethod !== "DATA_ENTRY" && (
                        <TableCell>
                          <EdgeSvgIcon
                            className="hover:cursor-pointer"
                            onClick={() => {
                              if (
                                tableData?.cribPullMethod ===
                                  "LEAD_GENERATION_CARD" &&
                                item.leadType === "Loan"
                              ) {
                                setIsPLTypeLoan(true);
                                getPLIndividualData(item.id);
                              } else {
                                setIsPLTypeLoan(false);
                                getPLIndividualDataPLCard(item.id);
                              }

                              if (tableData.cribPullMethod === "SIMPLE_FILE") {
                                getCribPullExcelSimpleForm(item.id);
                              } else if (
                                tableData.cribPullMethod === "CLI_INFO_FILE"
                              ) {
                                getCribPullCLIFormTable(item.id);
                              } else if (tableData.cribPullMethod === "EFORM") {
                                getCribPullEFormTable(item.id);
                              }

                              setIsExcelViewVisible(!isExcelViewVisible);
                            }}
                          >
                            material-outline:description
                          </EdgeSvgIcon>
                        </TableCell>
                      )}
                      <TableCell>
                        <div className="flex flex-row gap-2">
                          <EdgeSvgIcon
                            className="icon-size-12 cursor-pointer mr-6"
                            color="warning"
                            onClick={() => {
                              setSelectedItemForEdit(null);
                              setSelectedItemForEdit(item);
                            }}
                          >
                            feather:edit
                          </EdgeSvgIcon>

                          <EdgeSvgIcon
                            className="icon-size-12 cursor-pointer mr-6"
                            color="error"
                            onClick={() => deleteSelectedRow(item.id)}
                          >
                            feather:trash-2
                          </EdgeSvgIcon>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              )}
            </Table>
          </TableContainer>

          {isLoading && (
            <div className="absolute inset-0 flex items-center justify-center bg-white opacity-75">
              <Ve3LoadingScreen />
            </div>
          )}
        </div>
      </Paper>
      <Ve3Popup
        open={isExcelViewVisible}
        fullWidth={true}
        setOpen={setIsExcelViewVisible}
        onClose={() => {
          setExcelPLLoanCard(null);
          setExcelPLLoanData(null);
        }}
        body={
          <div className="flex flex-col gap-6">
            {tableData?.cribPullMethod === "LEAD_GENERATION_FILE" &&
            isPlTypeLoan ? (
              <ExcelDataViewPLLG data={excelPLLoanlData} />
            ) : (
              tableData?.cribPullMethod === "LEAD_GENERATION_FILE" && (
                <ExcelDataViewPLCD data={excelPLLoanlCard} />
              )
            )}
            {tableData?.cribPullMethod === "SIMPLE_FILE" && (
              <ExcelDataSimpleForm data={excelSimpleLoan} />
            )}
            {tableData?.cribPullMethod === "CLI_INFO_FILE" && (
              <ExcelDataCLI data={excelCLITableData} />
            )}
            {tableData?.cribPullMethod === "EFORM" && (
              <ExcelDataViewEForm data={excelEFormTableData} />
            )}
          </div>
        }
      />
    </>
  );
};

export default CribPullTable;
