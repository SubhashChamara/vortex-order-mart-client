import { ChangeEvent, FC } from "react";
import moment from "moment";
import { Pagination, Paper } from "@mui/material";
import { Pageable } from "../../../../../../api/types/Pageable";
import { BundleEODIf } from "../../../../../core/types/reports/BundleEOD";
import { ForkRight } from "@mui/icons-material";
import EdgeSvgIcon from "../../../../../../@core/ui/EdgeSvgIcon";


interface ProcessTableProps {
  bundleEODReportList: Pageable<BundleEODIf> | null;
  // startDate: String | null;
  // endDate: String | null;
  setPage: (v: number) => void;
  page: number;
}

const BundleEODReportTable: FC<ProcessTableProps> = (props) => {
  const { bundleEODReportList, setPage, page } = props;

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


  if (bundleEODReportList?.content === null) {
    return null;
  }

  return (
    <Paper className="w-full overflow-hidden p-12">
      {bundleEODReportList?.content.length === 0 ? (
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
                  Bundled  EOD Report Report for the selected date range
                </div>
              </div>
            </div>
            <div className="w-full overflow-x-auto">
              <table className="w-full whitespace-no-wrap">
                <thead>
                  <tr className="whitespace-nowrap divide-x-1">
                    <th className="p-6 text-left">Ref#</th>
                    <th className="p-6 text-left">Category</th>
                    <th className="p-6 text-left">Branch</th>
                    <th className="p-6 text-left">Card Type</th>
                    <th className="p-6 text-left">ECAPS Ref</th>
                    <th className="p-6 text-left">Customer Name</th>
                    <th className="p-6 text-left">Old NIC</th>
                    <th className="p-6 text-left">New NIC</th>
                    <th className="p-6 text-left">ARM Code</th>
                    <th className="p-6 text-left">CASA</th>
                    <th className="p-6 text-left">CARD</th>
                    <th className="p-6 text-center" colSpan={3}>ALPL</th>
                    <th className="p-6 text-left">Initiated Date</th>
                    <th className="p-6 text-left">Initiator Full Name</th>
                    <th className="p-6 text-left">Doc Checker (COMMON)</th>
                    <th className="p-6 text-left">Doc Checker (CASA)</th>
                    <th className="p-6 text-left">Doc Checker (CARD)</th>
                    <th className="p-6 text-left">Doc Checker (ALPL)</th>
                    <th className="p-6 text-left">Status</th>
                  </tr>
                  <tr className="whitespace-nowrap divide-x-1">
                    <th className="p-6 text-left"></th>
                    <th className="p-6 text-left"></th>
                    <th className="p-6 text-left"></th>
                    <th className="p-6 text-left"></th>
                    <th className="p-6 text-left"></th>
                    <th className="p-6 text-left"></th>
                    <th className="p-6 text-left"></th>
                    <th className="p-6 text-left"></th>
                    <th className="p-6 text-left"></th>
                    <th className="p-6 text-left"></th>
                    <th className="p-6 text-left"></th>
                    <th className="p-6 text-left">New</th>
                    <th className="p-6 text-left">Top-up</th>
                    <th className="p-6 text-left">Auto</th>
                    <th className="p-6 text-left"></th>
                    <th className="p-6 text-left"></th>
                    <th className="p-6 text-left"></th>
                    <th className="p-6 text-left"></th>
                    <th className="p-6 text-left"></th>
                    <th className="p-6 text-left"></th>
                    <th className="p-6 text-left"></th>
                  </tr>
                </thead>

                <tbody className="bg-white whitespace-nowrap divide-x-1">
                  {bundleEODReportList?.content.map((process, index) => (
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
                          {process.category}
                        </p>
                      </td>
                      <td className="p-6 align-middle text-left">
                        <p className="text-[12px] text-gray font-bold text-left">
                          {process.branch}
                        </p>
                      </td>
                      <td className="p-6 align-middle text-left">
                        <p className="text-[12px] text-gray font-bold text-left">
                          {process.cardType}
                        </p>
                      </td>
                      <td className="p-6 align-middle text-left">
                        <p className="text-[12px] text-gray font-bold text-left">
                          {process.ecapsRef}
                        </p>
                      </td>
                      <td className="p-6 align-middle text-left">
                        <p className="text-[12px] text-gray font-bold text-left">
                          {process.customerName}
                        </p>
                      </td>
                      <td className="p-6 align-middle text-left">
                        <p className="text-[12px] text-gray font-bold text-left">
                          {process.oldNIC}
                        </p>
                      </td>
                      <td className="p-6 align-middle text-left">
                        <p className="text-[12px] text-gray font-bold text-left">
                          {process.newNic}
                        </p>
                      </td>
                      <td className="p-6 align-middle text-left">
                        <p className="text-[12px] text-gray font-bold text-left">
                          {process.armCode}
                        </p>
                      </td>
                      <td className="p-6 align-middle justify-items-center">
                        <p className="text-[12px] text-gray font-bold ">
                          {process.casa ?
                            <EdgeSvgIcon color="success">feather:check</EdgeSvgIcon> :
                            <EdgeSvgIcon color="error">feather:x</EdgeSvgIcon>
                          }
                        </p>
                      </td>
                      <td className="p-6 align-middle text-left">
                        <p className="text-[12px] text-gray font-bold text-left">
                          {process.card ?
                            <EdgeSvgIcon color="success">feather:check</EdgeSvgIcon> :
                            <EdgeSvgIcon color="error">feather:x</EdgeSvgIcon>
                          }

                        </p>
                      </td>
                      <td className="p-6 align-middle text-left border-1">
                        <p className="text-[12px] text-gray font-bold text-left">
                          {process.personalLoanType === 'PL_NEW' ?
                            <EdgeSvgIcon color="success">feather:check</EdgeSvgIcon>
                            : <></>}
                        </p>
                      </td>
                      <td className="p-6 align-middle text-left border-1">
                        <p className="text-[12px] text-gray font-bold text-left">
                          {process.personalLoanType === 'PL_TOP_UP' ?
                            <EdgeSvgIcon color="success">feather:check</EdgeSvgIcon> : <></>}
                        </p>
                      </td>
                      <td className="p-6 align-middle text-left border-1">
                        <p className="text-[12px] text-gray font-bold text-left">
                          {process.personalLoanType === 'AUTO_LN' ?
                            <EdgeSvgIcon color="success">feather:check</EdgeSvgIcon> : <></>}
                        </p>
                      </td>
                      <td className="p-6 align-middle text-left">
                        <p className="text-[12px] text-gray font-bold text-left">
                          {formatDate(process.initiatedDate?.toString())}
                        </p>
                      </td>
                      <td className="p-6 align-middle text-left">
                        <p className="text-[12px] text-gray font-bold text-left">
                          {process.initiatorFullName}
                        </p>
                      </td>
                      <td className="p-6 align-middle text-left">
                        <p className="text-[12px] text-gray font-bold text-left">
                          {process.docCheckerCommon}
                        </p>
                      </td>
                      <td className="p-6 align-middle text-left">
                        <p className="text-[12px] text-gray font-bold text-left">
                          {process.docCheckerCasa}
                        </p>
                      </td>
                      <td className="p-6 align-middle text-left">
                        <p className="text-[12px] text-gray font-bold text-left">
                          {process.docCheckerCard}
                        </p>
                      </td>
                      <td className="p-6 align-middle text-left">
                        <p className="text-[12px] text-gray font-bold text-left">
                          {process.docCheckerALPL}
                        </p>
                      </td>
                      <td className="p-6 align-middle text-left">
                        <p className={`text-[12px] font-bold text-left`} style={{ color: process.processStatusColor }}>
                          {process.processStatusDesc}
                        </p>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="flex items-center justify-center mt-4">
              <Pagination
                count={bundleEODReportList?.totalPages}
                siblingCount={0}
                page={page + 1}
                onChange={handlePageChange}
              />
            </div>
          </div>
        )
      }
    </Paper >

  );
};

export default BundleEODReportTable;



