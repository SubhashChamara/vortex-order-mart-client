import { Paper } from "@mui/material";
import React from "react";

const DetailedReworkTable: React.FC = () => {
  return (
    <Paper className="p-12 h-full">
      <div>
        <table className="w-full whitespace-no-wrap">
          <thead>
            <tr className="border">
              <th className="border" align="center">
                Workflow Name
              </th>
              <th className="border" align="center">
                Workflow Ref
              </th>
              <th className="border" align="center">
                User Name
              </th>
              <th className="border" align="center">
                Date Of Return
              </th>
              <th className="border" align="center">
                Return By
              </th>
              <th className="border" align="center">
                Return Reason
              </th>
            </tr>
          </thead>
          <tbody>
            <tr className="border">
              <td className="border" align="center">
                Bundled
              </td>
              <td className="border" align="center">
                #00234
              </td>
              <td className="border" align="center">
                John Jameson
              </td>
              <td className="border" align="center">
                11-12-2024
              </td>
              <td className="border" align="center">
                James G
              </td>
              <td className="border" align="center">
                Some reason
              </td>
            </tr>
            <tr className="border">
              <td className="border" align="center">
                Bundled
              </td>
              <td className="border" align="center">
                #00234
              </td>
              <td className="border" align="center">
                John Jame
              </td>
              <td className="border" align="center">
                11-12-2024
              </td>
              <td className="border" align="center">
                James G
              </td>
              <td className="border" align="center">
                Some reason 2
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </Paper>
  );
};

export default DetailedReworkTable;
