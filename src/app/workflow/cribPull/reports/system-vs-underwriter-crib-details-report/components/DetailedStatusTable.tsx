import { Paper } from "@mui/material";
import React from "react";

const DetailedStatusTable = () => {
  return (
    <Paper className="p-12 h-full">
      <table className="w-full whitespace-no-wrap">
        <thead>
          <tr className="border">
            <th className="border">WF No </th>
            <th className="border">Submission Date </th>
            <th className="border">CASA </th>
            <th className="border">CARD </th>
            <th className="border">Loan </th>
            <th className="border">CRIB Approved Date </th>
            <th className="border">CRIB Reject Date </th>
            <th className="border">Status </th>
            <th className="border">Final Decision Date</th>
          </tr>
        </thead>
        <tbody>
          <tr className="border">
            <td className="border" align="center">
              #001
            </td>
            <td className="border" align="center">
              2024-12-22
            </td>
            <td className="border" align="center">
              NO
            </td>
            <td className="border" align="center">
              YES
            </td>
            <td className="border" align="center">
              YES
            </td>
            <td className="border" align="center">
              2024-12-22
            </td>
            <td className="border" align="center">
              2024-12-22
            </td>
            <td className="border" align="center">
              UNDERWRITER PASS
            </td>
            <td className="border" align="center">
              2024-12-22
            </td>
          </tr>
        </tbody>
      </table>
    </Paper>
  );
};

export default DetailedStatusTable;
