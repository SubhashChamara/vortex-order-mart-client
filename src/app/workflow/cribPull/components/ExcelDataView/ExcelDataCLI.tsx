import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
} from "@mui/material";

import { CribPullCLIInfo } from "../../@types/CribPullCLIInfo";

interface ExcelDataCLIProps {
  data: CribPullCLIInfo | null;
}

const ExcelDataCLI: React.FC<ExcelDataCLIProps> = ({ data }) => {
  return (
    <div>
      <div className="text-left mb-5 border-b-1 border-b-gray-200 ml-4">
        <h1 className="text-sm font-600 text-blue-900 ">CLI</h1>
      </div>
      <TableContainer>
        {data && (
          <Table>
            <TableBody>
              <TableRow>
                <TableCell style={{ fontWeight: "bold" }}>S NO</TableCell>
                <TableCell>{data.sno || ""}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell style={{ fontWeight: "bold" }}>RelNo</TableCell>
                <TableCell>{data.relNo || ""}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell style={{ fontWeight: "bold" }}>Entry Time</TableCell>
                <TableCell>{data.entryTimeStr || ""}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell style={{ fontWeight: "bold" }}>ID Type</TableCell>
                <TableCell>{data.idType || ""}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell style={{ fontWeight: "bold" }}>ID Value</TableCell>
                <TableCell>{data.idValue || ""}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell style={{ fontWeight: "bold" }}>CardType</TableCell>
                <TableCell>{data.cardType || ""}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell style={{ fontWeight: "bold" }}>
                  OutstandingBalance
                </TableCell>
                <TableCell>{data.outstandingBalance || ""}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell style={{ fontWeight: "bold" }}>
                  AvailableCreditBalance
                </TableCell>
                <TableCell>{data.availableCreditBalance || ""}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell style={{ fontWeight: "bold" }}>CardNumber</TableCell>
                <TableCell>{data.cardNumber || ""}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell style={{ fontWeight: "bold" }}>
                  CreditCardLimit
                </TableCell>
                <TableCell>{data.creditCardLimit || ""}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell style={{ fontWeight: "bold" }}>
                  IncrementType
                </TableCell>
                <TableCell>{data.incrementType || ""}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell style={{ fontWeight: "bold" }}>Limit</TableCell>
                <TableCell>{data.limit || ""}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell style={{ fontWeight: "bold" }}>
                  Reference No
                </TableCell>
                <TableCell>{data.referenceNo || ""}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell style={{ fontWeight: "bold" }}>Error Code</TableCell>
                <TableCell>{data.errorCode || ""}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell style={{ fontWeight: "bold" }}>
                  Error Description
                </TableCell>
                <TableCell>{data.errorDescription || ""}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell style={{ fontWeight: "bold" }}>
                  Country Code
                </TableCell>
                <TableCell>{data.countryCode || ""}</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        )}
      </TableContainer>
    </div>
  );
};

export default ExcelDataCLI;
