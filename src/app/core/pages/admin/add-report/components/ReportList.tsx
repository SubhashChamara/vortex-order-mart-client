import { Pagination, Tooltip } from "@mui/material";
import { ChangeEvent, FC } from "react";
import { formatDateAndTime } from "../../helpers/helper-functions.tsx";
import { Report } from "../../../../types/Report.ts";
import { Pageable } from "../../../../../../api/types/Pageable";

interface ReportTableProps {
  reportList: Pageable<Report> | null;
  selectedReport: (reportInfo: Report) => void;
  setPage: (v: number) => void;
  page: number;
}


const ReportList: FC<ReportTableProps> = (props) => {
  const { reportList, selectedReport, setPage, page } = props;

  const handlePageChange = (_event: ChangeEvent<unknown>, page: number) => {
    setPage(page - 1);
  };


  return (
    <div className="w-full overflow-hidden">
      <div className="w-full overflow-x-auto">
        <table className="w-full whitespace-no-wrap">
          <thead>
            <tr className="text-xs font-semibold tracking-wide text-left text-black uppercase border-b border-red-600 ">
              <th className="p-6">Report Name</th>
              <th className="p-6">Created Date</th>
              <th className="p-6 text-center">ACTIONS</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-red-600">
            {(reportList) && (reportList?.content?.map((report, index) => (
              <tr className="text-black h-full" key={index}>
                <td className="p-6 align-middle text-sm">{report.name}</td>
                <td className="p-6 align-middle text-sm">{formatDateAndTime(report.createdDate?.toString())}</td>
                <td className="p-6 align-middle text-center">
                  <div className="flex items-center space-x-4 text-sm justify-center">
                    <Tooltip title="Edit Group">
                      <button
                        className="flex items-center justify-between text-sm font-medium leading-5 text-red-600 focus:outline-none focus:shadow-outline-red"
                        aria-label="Edit Group"
                        onClick={() => { selectedReport(report) }}
                      >
                        <svg
                          className="w-16 h-16"
                          aria-hidden="true"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z"></path>
                        </svg>
                      </button>
                    </Tooltip>
                  </div>
                </td>
              </tr>
            )))
            }
          </tbody>
        </table>
      </div>
      <div className="flex items-center justify-center">
        <Pagination
          count={reportList?.totalPages}
          siblingCount={0}
          page={page + 1}
          onChange={handlePageChange}
        />
      </div>
    </div>
  );
};

export default ReportList;
