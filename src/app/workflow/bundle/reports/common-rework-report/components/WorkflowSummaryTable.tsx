import { Paper } from "@mui/material";
import React from "react";

const WorkflowSummaryTable: React.FC = () => {
  return (
    <Paper className="w-full overflow-hidden p-12">
      <div>
        <div className="flex justify-between items-center mb-4">
          <div>
            <div className="text-sm text-red-600 font-600">Search Results</div>
            <div className="text-[12px] font-600 text-gray">
              Rework Report summary for the selected workflow & date range
            </div>
          </div>
        </div>
        <table className="w-full whitespace-no-wrap">
          <thead>
            <tr className="border">
              <th className="border">Workflow Name</th>
              <th className="border">Workflow Count</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border">
              <td className="border" align="center">
                Bundled
              </td>
              <td className="border" align="center">
                22
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </Paper>
  );
};

export default WorkflowSummaryTable;
