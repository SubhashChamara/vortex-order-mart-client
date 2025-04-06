import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
} from "@mui/material";

import { CribPullSimpleFormInfo } from "../../@types/CribPullSimpleFormInfo";

interface ExcelDataViewPLLGProps {
  data: CribPullSimpleFormInfo | null;
}

const ExcelDataSimpleForm: React.FC<ExcelDataViewPLLGProps> = ({ data }) => {
  return (
    <div>
      <div className="text-left mb-5 border-b-1 border-b-gray-200 ml-4">
        <h1 className="text-sm font-600 text-blue-900 ">Simple Form</h1>
      </div>
      <TableContainer>
        {data && (
          <Table>
            <TableBody>
              <TableRow>
                <TableCell style={{ fontWeight: "bold" }}>
                  CUSTOMER NAME
                </TableCell>
                <TableCell>{data.customerName || ""}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell style={{ fontWeight: "bold" }}>NIC</TableCell>
                <TableCell>{data.nic || ""}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell style={{ fontWeight: "bold" }}>EIC</TableCell>
                <TableCell>{data.eic || ""}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell style={{ fontWeight: "bold" }}>Passport</TableCell>
                <TableCell>{data.passport || ""}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell style={{ fontWeight: "bold" }}>
                  PURPOSE OF CRIB EXTRACTION
                </TableCell>
                <TableCell>{data.purpose || ""}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell style={{ fontWeight: "bold" }}>
                  REFERENCE NUMBER
                </TableCell>
                <TableCell>{data.referenceNo || ""}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell style={{ fontWeight: "bold" }}>
                  FACILITY TYPE
                </TableCell>
                <TableCell>{data.creditFacilityType || ""}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell style={{ fontWeight: "bold" }}>AMOUNT</TableCell>
                <TableCell>{data.amount || ""}</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        )}
      </TableContainer>
    </div>
  );
};

export default ExcelDataSimpleForm;
