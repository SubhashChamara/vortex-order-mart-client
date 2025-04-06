import { ChangeEvent, FC } from "react";
import moment from "moment";
import { Pagination, Paper } from "@mui/material";
import { Pageable } from "../../../../../../api/types/Pageable";
import useThemeMediaQuery from "../../../../../../@hooks/useThemeMediaQuery";
import { CliEodReportIf } from "../../../../../core/types/CliEodReportIf";

interface ProcessTableProps {
  cliEodReportList: Pageable<CliEodReportIf> | null;
  setPage: (v: number) => void;
  page: number;
}

const CliEodReportTable: FC<ProcessTableProps> = (props) => {
  const { cliEodReportList, setPage, page } = props;

  console.log(cliEodReportList);

  const handlePageChange = (_event: ChangeEvent<unknown>, page: number) => {
    setPage(page - 1);
  };

  const isMobile = useThemeMediaQuery((theme) => theme.breakpoints.down("md"));

  if (cliEodReportList === null) {
    return;
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

  return (
    <Paper className="w-full overflow-hidden p-12">
      <div>
        {cliEodReportList.content.length === 0 ? (
          <div className="flex items-center justify-center">
            <p className="text-red-600 text-14 font-bold">
              No records found for the selected date range
            </p>
          </div>
        ) : isMobile ? (
          <div>
            <div className="text-xs font-semibold tracking-wide text-left border-b">
              <div className="pb-6">
                <div className="text-sm text-red-600">Search Results</div>
                <div className="text-[12px] font-600 text-gray">
                  Below lists a credit limit increase end of day report
                </div>
              </div>
            </div>
            <div className="w-full overflow-x-auto">
              <table>
                <thead>
                  <tr className="whitespace-nowrap divide-x-1">
                    <th className="p-6 text-left">Ref#</th>
                    <th className="p-6 text-left">Created Date</th>
                    <th className="p-6 text-left">Card Number</th>
                    <th className="p-6 text-left">Created By</th>
                    <th className="p-6 text-left">Present Limit</th>
                    <th className="p-6 text-left">New Limit</th>
                    <th className="p-6 text-left">Enhancement Type</th>
                    <th className="p-6 text-left">Mode Type</th>
                    <th className="p-6 text-left">Verified By</th>
                    <th className="p-6 text-left">Approved By</th>
                    <th className="p-6 text-left">Process Status</th>
                  </tr>
                </thead>
                <tbody className="bg-white whitespace-nowrap">
                  {cliEodReportList?.content.map((process, index) => (
                    <tr
                      className="text-black h-full bg-white shadow-2"
                      key={index}
                      style={{ borderSpacing: "10px" }}
                    >
                      <td className="p-6 text-[12px] align-middle">
                        <p className="text-[12px] text-gray font-bold">
                          {process.refNum}
                        </p>
                      </td>
                      <td className="p-6 align-middle">
                        <p className="text-[12px] text-gray font-bold">
                          {moment(process.createdDate)?.format("DD-MM-YYYY")}
                        </p>
                      </td>
                      <td className="p-6 align-middle">
                        <p className="text-[12px] text-gray font-bold">
                          {formatCardNumber(process.cardNumber)}
                        </p>
                      </td>
                      <td className="p-6 align-middle">
                        <p className="text-[12px] text-gray font-bold">
                          {process.createdBy}
                        </p>
                      </td>
                      <td className="p-6 align-middle text-right">
                        <p className="text-[12px] text-gray font-bold">
                          {formatCurrency(process.presentLimit?.toString())}
                        </p>
                      </td>
                      <td className="p-6 align-middle text-right">
                        <p className="text-[12px] text-gray font-bold">
                          {formatCurrency(process.newLimit?.toString())}
                        </p>
                      </td>
                      <td className="p-6 align-middle">
                        <p className="text-[12px] text-gray font-bold">
                          {process.enhancementType}
                        </p>
                      </td>
                      <td className="p-6 align-middle">
                        <p className="text-[12px] text-gray font-bold">
                          {process.modeType}
                        </p>
                      </td>
                      <td className="p-6 align-middle">
                        <p className="text-[12px] text-gray font-bold">
                          {process.verifiedBy}
                        </p>
                      </td>
                      <td className="p-6 align-middle">
                        <p className="text-[12px] text-gray font-bold">
                          {process.approvedBy}
                        </p>
                      </td>
                      <td className="p-6 align-middle">
                        <p
                          className={`text-[12px] font-bold ${
                            process.status === "Completed"
                              ? "text-green-700"
                              : process.status === "Pending"
                              ? "text-yellow-800"
                              : "text-red-600"
                          }`}
                        >
                          {process.status}
                        </p>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="flex items-center justify-center">
              <Pagination
                count={cliEodReportList.totalPages}
                siblingCount={0}
                page={page + 1}
                onChange={handlePageChange}
              />
            </div>
          </div>
        ) : (
          <div>
            <div className="w-full overflow-x-auto">
              <table className="w-full whitespace-no-wrap">
                <thead>
                  <tr className="text-xs font-semibold tracking-wide text-left border-b">
                    <th colSpan={4} className="pb-6 pl-6">
                      <div className="text-sm text-red-600">Search Results</div>
                      <div className="text-[12px] font-600 text-gray">
                        Below lists a credit limit increase end of day report
                      </div>
                    </th>
                    <th colSpan={7} className=" h-full"></th>
                  </tr>
                  <tr className="whitespace-nowrap divide-x-1">
                    <th className="p-6 text-left">Ref#</th>
                    <th className="p-6 text-left">Created Date</th>
                    <th className="p-6 text-left">Card Number</th>
                    <th className="p-6 text-left">Created By</th>
                    <th className="p-6 text-left">Present Limit</th>
                    <th className="p-6 text-left">New Limit</th>
                    <th className="p-6 text-left">Enhancement Type</th>
                    <th className="p-6 text-left">Mode Type</th>
                    <th className="p-6 text-left">Verified By</th>
                    <th className="p-6 text-left">Approved By</th>
                    <th className="p-6 text-left">Process Status</th>
                  </tr>
                </thead>
                <tbody className="bg-white whitespace-nowrap">
                  {cliEodReportList?.content.map((process, index) => (
                    <tr
                      className="text-black h-full bg-white shadow-2"
                      key={index}
                      style={{ borderSpacing: "10px" }}
                    >
                      <td className="p-6 text-[12px] align-middle">
                        <p className="text-[12px] text-gray font-bold">
                          {process.refNum}
                        </p>
                      </td>
                      <td className="p-6 align-middle">
                        <p className="text-[12px] text-gray font-bold">
                          {moment(process.createdDate)?.format("DD-MM-YYYY")}
                        </p>
                      </td>
                      <td className="p-6 align-middle">
                        <p className="text-[12px] text-gray font-bold">
                          {/* {process.cardNumber} */}
                          {formatCardNumber(process.cardNumber)}
                        </p>
                      </td>
                      <td className="p-6 align-middle">
                        <p className="text-[12px] text-gray font-bold">
                          {process.createdBy}
                        </p>
                      </td>
                      <td className="p-6 align-middle text-right">
                        <p className="text-[12px] text-gray font-bold">
                          {/* {process.presentLimit} */}
                          {formatCurrency(process.presentLimit?.toString())}
                        </p>
                      </td>
                      <td className="p-6 align-middle text-right">
                        <p className="text-[12px] text-gray font-bold">
                          {/* {process.newLimit} */}
                          {formatCurrency(process.newLimit?.toString())}
                        </p>
                      </td>
                      <td className="p-6 align-middle">
                        <p className="text-[12px] text-gray font-bold">
                          {process.enhancementType}
                        </p>
                      </td>
                      <td className="p-6 align-middle">
                        <p className="text-[12px] text-gray font-bold">
                          {process.modeType}
                        </p>
                      </td>
                      <td className="p-6 align-middle">
                        <p className="text-[12px] text-gray font-bold">
                          {process.verifiedBy}
                        </p>
                      </td>
                      <td className="p-6 align-middle">
                        <p className="text-[12px] text-gray font-bold">
                          {process.approvedBy}
                        </p>
                      </td>
                      <td className="p-6 align-middle">
                        <p
                          className={`text-[12px] font-bold ${
                            process.status === "Completed"
                              ? "text-green-700"
                              : process.status === "Pending"
                              ? "text-yellow-800"
                              : "text-red-600"
                          }`}
                        >
                          {process.status}
                        </p>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="flex items-center justify-center">
              <Pagination
                count={cliEodReportList.totalPages}
                siblingCount={0}
                page={page + 1}
                onChange={handlePageChange}
              />
            </div>
          </div>
        )}
      </div>
    </Paper>
  );
};

export default CliEodReportTable;
