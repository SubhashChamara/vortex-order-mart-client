import { ChangeEvent, FC } from "react";
import { Pagination, Paper } from "@mui/material";
import { Pageable } from "../../../../../../api/types/Pageable";
import { ODCollateralReportIf } from "../../../../../core/types/reports/ODCollateralReport";
import moment from "moment";

interface ProcessTableProps {
  ODCollateralReportList: Pageable<ODCollateralReportIf> | null;
  setPage: (v: number) => void;
  page: number;
}

const ODEODReportTable: FC<ProcessTableProps> = (props) => {
  const { ODCollateralReportList, setPage, page } = props;

  const handlePageChange = (_event: ChangeEvent<unknown>, page: number) => {
    setPage(page - 1);
  };

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

  if (ODCollateralReportList === null) {
    return null;
  }

  const formatDate = (date: string) => {
    if (date) {
      return moment(date).format("DD-MM-YYYY");
    } else {
      return "----------";
    }
  };

  return (
    <Paper className="w-full overflow-hidden p-12">
      <div>
        {ODCollateralReportList.content.length === 0 ? (
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
                    <th className="p-6 text-left">WF Ref</th>
                    <th className="p-6 text-left">Facility Account Number</th>
                    <th className="p-6 text-left">Lien Account Number</th>
                    <th className="p-6 text-left">Currency</th>
                    <th className="p-6 text-left">Account Name</th>
                    <th className="p-6 text-left">Interest Rate</th>
                    <th className="p-6 text-left">Matuarity Date</th>
                    <th className="p-6 text-left">Current Balance</th>
                    <th className="p-6 text-left">Lien Amount</th>
                    <th className="p-6 text-left">Applicable LTV(%)</th>
                    <th className="p-6 text-left">Amount After LTV</th>
                    <th className="p-6 text-left">Customer DOB</th>
                    <th className="p-6 text-left">Loan Status</th>
                  </tr>
                </thead>
                <tbody className="bg-white whitespace-nowrap">
                  {ODCollateralReportList?.content.map((process, index) => (
                    <tr
                      className="text-black h-full bg-white shadow-2"
                      key={index}
                      style={{ borderSpacing: "10px" }}
                    >
                      <td className="p-6 text-[12px] align-middle text-left">
                        <p className="text-[12px] text-gray font-bold">
                          {process.refNum}
                        </p>
                      </td>
                      <td className="p-6 align-middle text-left">
                        <p className="text-[12px] text-gray font-bold">
                          {process.facilityAccountNum}
                        </p>
                      </td>
                      <td className="p-6 align-middle text-left">
                        <p className="text-[12px] text-gray font-bold">
                          {process.lienAccountNum}
                        </p>
                      </td>
                      <td className="p-6 align-middle text-left">
                        <p className="text-[12px] text-gray font-bold">
                          {process.currencyType}
                        </p>
                      </td>
                      <td className="p-6 align-middle text-left">
                        <p className="text-[12px] text-gray font-bold">
                          {process.accountName}
                        </p>
                      </td>
                      <td className="p-6 align-middle text-right">
                        <p className="text-[12px] text-gray font-bold">
                          {process.interestRate}
                        </p>
                      </td>
                      <td className="p-6 align-middle text-left">
                        <p className="text-[12px] text-gray font-bold">
                          {process.maturityDate}
                        </p>
                      </td>
                      <td className="p-6 align-middle text-right">
                        <p className="text-[12px] text-gray font-bold">
                          {formatCurrency(process.currentBalance?.toString())}
                        </p>
                      </td>
                      <td className="p-6 align-middle text-right">
                        <p className="text-[12px] text-gray font-bold">
                          {formatCurrency(process.lienAmount?.toString())}
                        </p>
                      </td>
                      <td className="p-6 align-middle text-right">
                        <p className="text-[12px] text-gray font-bold">
                          {process.applicableLTV}
                        </p>
                      </td>
                      <td className="p-6 align-middle text-right">
                        <p className="text-[12px] text-gray font-bold">
                          {formatCurrency(process.amountAfterLTV?.toString())}
                        </p>
                      </td>
                      <td className="p-6 align-middle text-left">
                        <p className="text-[12px] text-gray font-bold">
                          {formatDate(process.customerDOB?.toString())}
                        </p>
                      </td>
                      <td className="p-6 align-middle text-left">
                        <p className="text-[12px] text-gray font-bold">
                          {process.loanStatus}
                        </p>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="flex items-center justify-center mt-4">
              <Pagination
                count={ODCollateralReportList.totalPages}
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

export default ODEODReportTable;
