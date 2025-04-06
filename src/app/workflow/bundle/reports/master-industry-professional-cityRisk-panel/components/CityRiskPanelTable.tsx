import { Paper } from "@mui/material";
import React from "react";

const CityRiskPanelTable: React.FC = () => {
  return (
    <Paper className="p-12">
      <div className="w-full overflow-x-auto">
        <table className="w-full whitespace-no-wrap">
          <thead>
            <tr className="whitespace-nowrap border divide-x-1">
              <th className="p-2">Ind. Code</th>
              <th className="p-2">Description</th>
              <th className="p-2">Risk Rating</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border text-xs">
              <td className="text-center border">ADV</td>
              <td className="text-center border">Advertising </td>
              <td className="text-center border">M</td>
            </tr>
          </tbody>
        </table>
      </div>
    </Paper>
  );
};

export default CityRiskPanelTable;
