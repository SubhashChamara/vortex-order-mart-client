import { ChangeEvent, FC } from "react";
import moment from "moment";
import { Pagination, Paper } from "@mui/material";
import { Pageable } from "../../../../../../api/types/Pageable";
import { CribPullEODIf } from "../../../../../core/types/reports/CribPullEOD";
import { formatCurrency } from "../../../../bundle/@helpers/Common";


interface ProcessTableProps {
  cribPullEODReport: Pageable<CribPullEODIf> | null;
  setPage: (v: number) => void;
  page: number;
}

const BundleEODReportTable: FC<ProcessTableProps> = (props) => {
  const { cribPullEODReport, setPage, page } = props;

  const handlePageChange = (_event: ChangeEvent<unknown>, page: number) => {
    setPage(page - 1);
  };

  const formatCardNumber = (value: string) => {
    if (value) {
      return value.replace(/\s+/g, "").replace(/(\d{4})(?=\d)/g, "$1 ").trim();
    } else {
      return value
    }
  };

  const formatDate = (date: string) => {
    if (date) {
      return moment(date).format("DD-MM-YYYY")
    } else {
      return "----------"
    }
  }

  const formatDateTime = (date: string) => {
    if (date) {
      return moment(date).format("DD-MM-YYYY HH:mm:ss")
    } else {
      return "----------"
    }
  }


  if (cribPullEODReport?.content === null) {
    return null;
  }

  return (
    <Paper className="w-full overflow-hidden p-12">
      {cribPullEODReport?.content.length === 0 ? (
        <div className="flex items-center justify-center">
          <p className="text-red-600 text-14 font-bold">
            No records found for the selected date range
          </p>
        </div>
      ) :
        (
          <div>
            <div className="flex justify-between items-center mb-4">
              <div>
                <div className="text-sm text-red-600 font-600">Search Results</div>
                <div className="text-[12px] font-600 text-gray">
                  Crib Pull EOD for the selected date range
                </div>
              </div>
            </div>
            <div className="w-full overflow-x-auto">
              <table className="w-full whitespace-no-wrap">
                <thead>
                  <tr className="whitespace-nowrap divide-x-1">
                    <th className="p-6 text-left">Ref#</th>
                    <th className="p-6 text-left">Created Date & Time</th>
                    <th className="p-6 text-left">End Date & Time</th>
                    <th className="p-6 text-left">Unit Initiating</th>
                    <th className="p-6 text-left">Branch Name</th>
                    <th className="p-6 text-left">Consumer Name</th>
                    <th className="p-6 text-left">Citizenship</th>
                    <th className="p-6 text-left">Old NIC</th>
                    <th className="p-6 text-left">New NIC</th>
                    <th className="p-6 text-left">Crib Status (Old NIC)</th>
                    <th className="p-6 text-left">Crib Status (New NIC)</th>
                    <th className="p-6 text-left">Passport</th>
                    <th className="p-6 text-left">DOB</th>
                    <th className="p-6 text-left">Gender</th>
                    <th className="p-6 text-left">Reason</th>
                    <th className="p-6 text-left">Credit Facility Type</th>
                    <th className="p-6 text-left">Credit Application Number</th>
                    <th className="p-6 text-left">Application Date</th>
                    <th className="p-6 text-left">Currency</th>
                    <th className="p-6 text-left">Amount</th>
                    <th className="p-6 text-left">Invoker Name</th>
                    <th className="p-6 text-left">Status</th>
                  </tr>
                </thead>
                <tbody className="bg-white whitespace-nowrap">
                  {cribPullEODReport?.content.map((process, index) => (
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
                        <p className="text-[12px] text-gray font-bold text-left">
                          {formatDateTime(process.createdDateTime?.toString())}
                        </p>
                      </td>
                      <td className="p-6 align-middle text-left">
                        <p className="text-[12px] text-gray font-bold text-left">
                          {process.endedDateTime}
                        </p>
                      </td>
                      <td className="p-6 align-middle text-left">
                        <p className="text-[12px] text-gray font-bold text-left">
                          {process.unitInitializing}
                        </p>
                      </td>
                      <td className="p-6 align-middle text-left">
                        <p className="text-[12px] text-gray font-bold text-left">
                          {process.branchName}
                        </p>
                      </td>
                      <td className="p-6 align-middle text-left">
                        <p className="text-[12px] text-gray font-bold text-left">
                          {process.consumerName}
                        </p>
                      </td>
                      <td className="p-6 align-middle text-left">
                        <p className="text-[12px] text-gray font-bold text-left">
                          {process.citizenship}
                        </p>
                      </td>
                      <td className="p-6 align-middle text-left">
                        <p className="text-[12px] text-gray font-bold text-left">
                          {process.oldNIC}
                        </p>
                      </td>
                      <td className="p-6 align-middle text-left">
                        <p className="text-[12px] text-gray font-bold text-left">
                          {process.newNIC}
                        </p>
                      </td>
                      <td className="p-6 align-middle text-left">
                        <p className="text-[12px] text-gray font-bold text-left">
                          {process.cribStatusOld}
                        </p>
                      </td>
                      <td className="p-6 align-middle text-left">
                        <p className="text-[12px] text-gray font-bold text-left">
                          {process.cribStatusNew}
                        </p>
                      </td>
                      <td className="p-6 align-middle text-left">
                        <p className="text-[12px] text-gray font-bold text-left">
                          {process.passport}
                        </p>
                      </td>
                      <td className="p-6 align-middle text-left">
                        <p className="text-[12px] text-gray font-bold text-left">
                          {formatDate(process.dob?.toString())}
                        </p>
                      </td>
                      <td className="p-6 align-middle text-left">
                        <p className="text-[12px] text-gray font-bold text-left">
                          {process.gender}
                        </p>
                      </td>
                      <td className="p-6 align-middle text-left">
                        <p className="text-[12px] text-gray font-bold text-left">
                          {process.reason}
                        </p>
                      </td>
                      <td className="p-6 align-middle text-left">
                        <p className="text-[12px] text-gray font-bold text-left">
                          {process.creditFacilityType}
                        </p>
                      </td>
                      <td className="p-6 align-middle text-left">
                        <p className="text-[12px] text-gray font-bold text-left">
                          {process.creditApplicationNumber}
                        </p>
                      </td>
                      <td className="p-6 align-middle text-left">
                        <p className="text-[12px] text-gray font-bold text-left">
                          {process.applicationDate}
                        </p>
                      </td>
                      <td className="p-6 align-middle text-left">
                        <p className="text-[12px] text-gray font-bold text-left">
                          {process.currency}
                        </p>
                      </td>
                      <td className="p-6 align-middle text-right">
                        <p className="text-[12px] text-gray font-bold text-right">
                          {formatCurrency(process.amount?.toString())}
                        </p>
                      </td>
                      <td className="p-6 align-middle text-left">
                        <p className="text-[12px] text-gray font-bold text-left">
                          {process.invokerName}
                        </p>
                      </td>
                      <td className="p-6 align-middle text-left">
                        <p className="text-[12px] text-gray font-bold text-left">
                          {process.status}
                        </p>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="flex items-center justify-center mt-4">
              <Pagination
                count={cribPullEODReport?.totalPages}
                siblingCount={0}
                page={page + 1}
                onChange={handlePageChange}
              />
            </div>
          </div>
        )
      }
    </Paper>

  );
};

export default BundleEODReportTable;



