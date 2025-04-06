import {
  Checkbox,
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
import { CribPullTableRequest } from "../../../workflow/cribPull/@types/CribPullTable";
import EdgeSvgIcon from "../../../../@core/ui/EdgeSvgIcon";
import { Api } from "../../../../api/Api";
import { toast } from "react-toastify";
import { ScoreBoardProcess } from "../../../core/types/ScoreBoardProcess";
import dayjs from "dayjs";
import Ve3LoadingScreen from "../../../../@core/ui/Ve3LoadingScreen/Ve3LoadingScreen";
import Ve3NoDataScreen from "../../../../@core/ui/Ve3NoDataScreen/Ve3NoDataScreen";

export interface CribPullTableProps {
  process: ScoreBoardProcess | null;
}

const CribPullTable: React.FC<CribPullTableProps> = ({
  process,
}) => {
  const [tableData, setTableData] = useState<CribPullTableRequest | null>(null);
  const [isLoading, setIsLoading] = useState(false);



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
        r.cribPull.getCribTableData(process?.processInstance ?? "")
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

  useEffect(() => {
    fetchTableData();
  }, []);

  return (
    <>
      {isLoading ? (
        <div className="absolute inset-0 flex items-center justify-center bg-white opacity-75">
          <Ve3LoadingScreen />
        </div>
      ) : (
        tableData && tableData.cribPullProcessList.length > 0 ? (
          <Paper className="px-12 pb-12">

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
                      <TableCell className="border border-gray-300 bg-grey-200 font-bold">
                        No Crib History
                      </TableCell>
                      {tableData?.cribPullMethod !== "DATA_ENTRY" && (
                        <TableCell className="border border-gray-300 bg-grey-200 font-bold"></TableCell>
                      )}
                      <TableCell className="border border-gray-300 bg-grey-200 font-bold"></TableCell>
                    </TableRow>
                  </TableHead>
                  {tableData && (
                    <TableBody>
                      {tableData.cribPullProcessList?.map((item, index) => (
                        <TableRow key={index}>
                          <TableCell>
                            {formatDataEntryMethod(tableData.cribPullMethod?.toString())}
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
                                  {dayjs(item.dateOfBirth?.toString()).format("DD-MM-YYYY")}
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
                          <TableCell>
                            <Checkbox
                              checked={item.noCribHistory}
                              disabled />
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
        ) : (
          <Ve3NoDataScreen />
        )


      )}
    </>
  );
};

export default CribPullTable;


