import { ChangeEvent, FC, useState } from "react";
import { Pagination, Paper, Tooltip } from "@mui/material";
import { Pageable } from "../../../../../../api/types/Pageable";
import useThemeMediaQuery from "../../../../../../@hooks/useThemeMediaQuery";
import { ODEODReportIf } from "../../../../../core/types/reports/ODEODReport";
import { ScoreBoardProcess } from "../../../../../core/types/ScoreBoardProcess";
import Ve3Popup from "../../../../../../@core/ui/Ve3Popup/Ve3Popup";
import DocumentView from "./DocView";
import { Api } from "../../../../../../api/Api";
import Logger from "../../../../../../@helpers/Logger";
import { EncodeUrlPath } from "../../../../../../@helpers/RetriveFiles";

interface ProcessTableProps {
  ODEODReportList: Pageable<ODEODReportIf> | null;
  setPage: (v: number) => void;
  page: number;
}

const ODEODReportTable: FC<ProcessTableProps> = (props) => {
  const { ODEODReportList, setPage, page } = props;

  const handlePageChange = (_event: ChangeEvent<unknown>, page: number) => {
    setPage(page - 1);
  };

  const formatCurrency = (value: string) => {
    if (!value) return value;

    let cleanedValue = value.replace(/[^0-9.]/g, "");

    if (cleanedValue.includes(".")) {
      const [integer, decimal] = cleanedValue.split(".");
      cleanedValue = `${integer}.${(decimal + "00").slice(0, 2)}`;
    } else {
      cleanedValue = `${cleanedValue}.00`;
    }

    return cleanedValue.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  if (ODEODReportList === null) {
    return null;
  }

  const [blobObj, setBlobObj] = useState<Blob | null>(null);
  const [open, setOpen] = useState(false);

  async function handleDownloadCreditForm(creditForm: string) {
    setOpen(true);
    const FileUrl = EncodeUrlPath(creditForm);

    if (!FileUrl) return;

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
      setBlobObj(null);
    } finally {
      // setLoading(false);
    }
  }

  return (
    <Paper className="w-full overflow-hidden p-12">
      <div>
        {ODEODReportList.content.length === 0 ? (
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
                      Over Draft Report for the selected date range
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="w-full overflow-x-auto">
              <table id="my-table" className="w-full whitespace-no-wrap">
                <thead>
                  <tr className="whitespace-nowrap divide-x-1">
                    {/* <th className="p-6 text-left">Peoplewise ID</th> */}
                    <th className="p-6 text-left">Create Date</th>
                    <th className="p-6 text-left">Completed Date</th>
                    <th className="p-6 text-left">Facility Type</th>
                    <th className="p-6 text-left">OD Type</th>
                    <th className="p-6 text-left">REF#</th>
                    <th className="p-6 text-left">Branch Maker</th>
                    <th className="p-6 text-left">Branch Manager</th>
                    <th className="p-6 text-left">DOC Checker Officer 1</th>
                    <th className="p-6 text-left">Eyeballing Maker</th>
                    <th className="p-6 text-left">Verification team</th>
                    <th className="p-6 text-left">Eyeballing Checker</th>
                    <th className="p-6 text-left">FRM Team</th>
                    <th className="p-6 text-left">Underwriter</th>
                    <th className="p-6 text-left">UW Level</th>
                    <th className="p-6 text-left">Underwriter 1/2/3</th>
                    <th className="p-6 text-left">Doc Checkter Officer 2</th>
                    <th className="p-6 text-left">Ops Marker</th>
                    <th className="p-6 text-left">Ops Checker</th>
                    <th className="p-6 text-left">Call Center</th>
                    <th className="p-6 text-left">Approved Amount</th>
                    <th className="p-6 text-left">Customer Name</th>
                    <th className="p-6 text-left">Loan Status</th>
                    <th className="p-6 text-left">WF Status</th>
                    <th className="p-6 text-left">EB WF Status</th>
                    <th className="p-6 text-left">UW WF Status</th>
                    <th className="p-6 text-left">E Form</th>
                    <th className="p-6 text-left">Credit Form</th>
                  </tr>
                </thead>
                <tbody className="bg-white whitespace-nowrap">
                  {ODEODReportList?.content.map((process, index) => (
                    <tr
                      className="text-black h-full bg-white shadow-2"
                      key={index}
                      style={{ borderSpacing: "10px" }}
                    >
                      {/* <td className="p-6 text-[12px] align-middle text-left">
                        <p className="text-[12px] text-gray font-bold">
                          {process.peoplewiseID}
                        </p>
                      </td> */}
                      <td className="p-6 align-middle text-left">
                        <p className="text-[12px] text-gray font-bold">
                          {process.createDate}
                        </p>
                      </td>
                      <td className="p-6 align-middle text-left">
                        <p className="text-[12px] text-gray font-bold">
                          {process.completedDate}
                        </p>
                      </td>
                      <td className="p-6 align-middle text-left">
                        <p className="text-[12px] text-gray font-bold">
                          {process.overDraftFacilityType}
                        </p>
                      </td>
                      <td className="p-6 align-middle text-left">
                        <p className="text-[12px] text-gray font-bold">
                          {process.overDraftType}
                        </p>
                      </td>
                      <td className="p-6 align-middle text-left">
                        <p className="text-[12px] text-gray font-bold">
                          {process.refNum}
                        </p>
                      </td>
                      <td className="p-6 align-middle text-left">
                        <p className="text-[12px] text-gray font-bold">
                          {process.branchMaker}
                        </p>
                      </td>
                      <td className="p-6 align-middle text-left">
                        <p className="text-[12px] text-gray font-bold">
                          {process.branchManager}
                        </p>
                      </td>
                      <td className="p-6 align-middle text-left">
                        <p className="text-[12px] text-gray font-bold">
                          {process.docCheckerOfficer1}
                        </p>
                      </td>
                      <td className="p-6 align-middle text-left">
                        <p className="text-[12px] text-gray font-bold">
                          {process.eyeballingMaker}
                        </p>
                      </td>
                      <td className="p-6 align-middle text-left">
                        <p className="text-[12px] text-gray font-bold">
                          {process.verificationTeam}
                        </p>
                      </td>
                      <td className="p-6 align-middle text-left">
                        <p className="text-[12px] text-gray font-bold">
                          {process.eyeballingChecker}
                        </p>
                      </td>
                      <td className="p-6 align-middle text-left">
                        <p className="text-[12px] text-gray font-bold">
                          {process.frmTeam}
                        </p>
                      </td>
                      <td className="p-6 align-middle text-left">
                        <p className="text-[12px] text-gray font-bold">
                          {process.underWriter}
                        </p>
                      </td>
                      <td className="p-6 align-middle text-left">
                        <p className="text-[12px] text-gray font-bold">
                          {process.uwLevel}
                        </p>
                      </td>
                      <td className="p-6 align-middle text-left">
                        <p className="text-[12px] text-gray font-bold">
                          {process.underwriter123}
                        </p>
                      </td>
                      <td className="p-6 align-middle text-left">
                        <p className="text-[12px] text-gray font-bold">
                          {process.docCheckerOfficer2}
                        </p>
                      </td>
                      <td className="p-6 align-middle text-left">
                        <p className="text-[12px] text-gray font-bold">
                          {process.opsMaker}
                        </p>
                      </td>
                      <td className="p-6 align-middle text-left">
                        <p className="text-[12px] text-gray font-bold">
                          {process.opsChecker}
                        </p>
                      </td>
                      <td className="p-6 align-middle text-left">
                        <p className="text-[12px] text-gray font-bold">
                          {process.callCenter}
                        </p>
                      </td>
                      <td className="p-6 align-middle text-right">
                        <p className="text-[12px] text-gray font-bold">
                          {formatCurrency(process.approvedAmount?.toString())}
                        </p>
                      </td>
                      <td className="p-6 align-middle text-left">
                        <p className="text-[12px] text-gray font-bold">
                          {process.customerName}
                        </p>
                      </td>
                      <td className="p-6 align-middle text-left">
                        <p className="text-[12px] text-gray font-bold">
                          {/* {process.loanStatus} */}
                        </p>
                      </td>
                      <td className="p-6 align-middle text-left">
                        <p className="text-[12px] text-gray font-bold">
                          {process.odLoanStatus}
                        </p>
                      </td>
                      <td className="p-6 align-middle text-left">
                        <p className="text-[12px] text-gray font-bold">
                          {/* {process.odwfStatus} */}
                        </p>
                      </td>
                      <td className="p-6 align-middle text-left">
                        <p className="text-[12px] text-gray font-bold">
                          {/* {process.uwwfStatus} */}
                        </p>
                      </td>
                      <td className="p-6 align-middle text-left">
                        <Tooltip title={`Attachment`}>
                          <button
                            className="flex items-center justify-between text-sm font-medium leading-5 text-red-600 rounded-lg focus:outline-none focus:shadow-outline-red"
                            aria-label="View"
                            onClick={() => {
                              handleDownloadCreditForm(process.eform);
                            }}
                          >
                            <img
                              className="h-24 p-6 border rounded-md border-gray-200 bg-grey-50"
                              src="/assets/icons/scoreboard/view.png"
                            />
                          </button>
                        </Tooltip>
                      </td>
                      <td className="p-6 align-middle text-left">
                        <Tooltip title={`View`}>
                          <button
                            className="flex items-center justify-between text-sm font-medium leading-5 text-red-600 rounded-lg focus:outline-none focus:shadow-outline-red"
                            aria-label="Attachments"
                            onClick={() => {
                              handleDownloadCreditForm(process.creditForm);
                            }}
                          >
                            <img
                              className="h-24 p-6 border rounded-md border-gray-200 bg-grey-50"
                              src="/assets/icons/scoreboard/view.png"
                            />
                          </button>
                        </Tooltip>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="flex items-center justify-center mt-4">
              <Pagination
                count={ODEODReportList.totalPages}
                siblingCount={0}
                page={page + 1}
                onChange={handlePageChange}
              />
            </div>
          </div>
        )}
        <Ve3Popup
          open={open}
          fullWidth={true}
          setOpen={setOpen}
          body={<DocumentView docUrl={blobObj} />}
        />
      </div>
    </Paper>
  );
};

export default ODEODReportTable;
