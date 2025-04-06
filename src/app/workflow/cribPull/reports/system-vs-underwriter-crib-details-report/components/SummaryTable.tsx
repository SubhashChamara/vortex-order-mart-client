import { Paper } from "@mui/material";
import React from "react";

const SummaryTable: React.FC = () => {
  return (
    <Paper className="p-12 h-full">
      <div className="flex justify-between items-center mb-4">
        <div>
          <div className="text-sm text-red-600 font-600">Search Results</div>
          <div className="text-[12px] font-600 text-gray">
            Status summary for selected date range
          </div>
        </div>
      </div>
      <div className="w-full overflow-x-auto">
        <table className="w-full whitespace-no-wrap">
          <thead>
            <tr className="border">
              <th className="border" rowSpan={2}>
                System
              </th>
              <th colSpan={3}>Manual</th>
            </tr>
            <tr>
              <th className="border">Approved</th>
              <th className="border">Rejected</th>
              <th className="border">Pending</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border">
              <th className="border">Approved</th>
              <td className="border" align="center">
                22
              </td>
              <td className="border" align="center">
                2
              </td>
              <td className="border" align="center">
                44
              </td>
            </tr>
            <tr className="border">
              <th className="border">Rejected</th>
              <td className="border" align="center">
                12
              </td>
              <td className="border" align="center">
                10
              </td>
              <td className="border" align="center">
                9
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </Paper>
  );
};

export default SummaryTable;
