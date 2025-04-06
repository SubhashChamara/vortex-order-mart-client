import { ChangeEvent, FC } from "react";
import { Pagination, Paper } from "@mui/material";
import { Pageable } from "../../../../../../api/types/Pageable";
import { CHAccEodReportIf } from "../../../../../core/types/reports/ChAccEodReport";
import moment from "moment";

interface ProcessTableProps {
    getCHBBAccEODReportList: Pageable<CHAccEodReportIf> | null;
  setPage: (v: number) => void;
  page: number;
}

const ChAccEodReportTable: FC<ProcessTableProps> = (props) => {
  const { getCHBBAccEODReportList, setPage, page } = props;
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

  if (getCHBBAccEODReportList === null) {
    return null;
  }

  const formatDate = (date: string) => {
    if (date) {
      return moment(date).format("DD-MM-YYYY")
    } else {
      return "----------"
    }
  }

  return (
    <Paper className="w-full overflow-hidden p-12">
      <div>
        {getCHBBAccEODReportList.content.length === 0 ? (
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
                    <div className="text-sm text-red-600 font-600">Search Results</div>
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
                    <th className="p-6 text-left">Ref#</th>
                    <th className="p-6 text-left">Category</th>
                    <th className="p-6 text-left">Branch</th>
                    <th className="p-6 text-left">Customer Name</th>
                    <th className="p-6 text-left">OLD NIC</th>
                    <th className="p-6 text-left">NEW NIC</th>
                    <th className="p-6 text-left">ARM Code</th>
                    <th className="p-6 text-left">Initiated Date</th>
                    <th className="p-6 text-left">Initiator Fullname</th>
                    <th className="p-6 text-left">Doc Checker</th>
                    <th className="p-6 text-left">status</th>
                  </tr>
                </thead>
                <tbody className="bg-white whitespace-nowrap">
                  {getCHBBAccEODReportList?.content.map((process, index) => (
                    <tr
                      className="text-black h-full bg-white shadow-2"
                      key={index}
                      style={{ borderSpacing: "10px" }}
                    >
                      <td className="p-6 text-[12px] align-middle text-left">
                        <p className="text-[12px] text-gray font-bold">
                          {process.refId}
                        </p>
                      </td>
                      <td className="p-6 align-middle text-left">
                        <p className="text-[12px] text-gray font-bold">
                          {process.category}
                        </p>
                      </td>
                      <td className="p-6 align-middle text-left">
                        <p className="text-[12px] text-gray font-bold">
                          {process.branch}
                        </p>
                      </td>
                      <td className="p-6 align-middle text-left">
                        <p className="text-[12px] text-gray font-bold">
                          {process.customerName}
                        </p>
                      </td>
                      <td className="p-6 align-middle text-left">
                        <p className="text-[12px] text-gray font-bold">
                          {process.oldNIC}
                        </p>
                      </td>
                      <td className="p-6 align-middle text-right">
                        <p className="text-[12px] text-gray font-bold">
                          {process.newNIC}
                        </p>
                      </td>
                      <td className="p-6 align-middle text-left">
                        <p className="text-[12px] text-gray font-bold">
                          {process.armCode}
                        </p>
                      </td>
                      <td className="p-6 align-middle text-right">
                        <p className="text-[12px] text-gray font-bold">
                          {formatDate(process.initiateDate?.toString())}
                        </p>
                      </td>
                      <td className="p-6 align-middle text-right">
                        <p className="text-[12px] text-gray font-bold">
                          {process.initiaterFullName}
                        </p>
                      </td>
                      <td className="p-6 align-middle text-right">
                        <p className="text-[12px] text-gray font-bold">
                          {process.docChecker}
                        </p>
                      </td>
                      <td className="p-6 align-middle text-right">
                        <p className="text-[12px] text-gray font-bold">
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
                count={getCHBBAccEODReportList.totalPages}
                siblingCount={0}
                page={page + 1}
                onChange={handlePageChange}
              />
            </div>
          </div>
        )
        }
      </div>
    </Paper>
  );
};

export default ChAccEodReportTable;


