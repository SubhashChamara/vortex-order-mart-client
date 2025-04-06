import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
} from "@mui/material";
import React from "react";
import Ve3FormHeader from "../../../../../@core/ui/Ve3FormHeader/Ve3FormHeader";

interface CribCreditFacilitiesProps {
  cribCreditFacilities: string[][];
}

const CribCreditFacilities: React.FC<CribCreditFacilitiesProps> = ({
  cribCreditFacilities,
}) => {
  if (!cribCreditFacilities || cribCreditFacilities.length === 0) {
    return (
      <Paper className="px-12 pb-10">
        <Ve3FormHeader
          icon="material-outline:stacked_line_chart"
          title="CRIB Credit Facilities"
        />
        <TableContainer>
          <Table>
            <TableBody>
              <TableRow>
                <TableCell>No data available</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    );
  }

  // Transpose the data: Rows become columns
  const transposedData = cribCreditFacilities[0].map((_, colIndex) =>
    cribCreditFacilities.map((row) => row[colIndex] || "-")
  );

  return (
    <Paper className="px-12 pb-10">
      <Ve3FormHeader
        icon="material-outline:stacked_line_chart"
        title="CRIB Credit Facilities"
      />
      <TableContainer>
        <Table>
          <TableBody>
            {transposedData.map((row, rowIndex) => (
              <TableRow key={rowIndex}>
                {row.map((cell, colIndex) => (
                  <TableCell
                    key={colIndex}
                    className="border"
                    sx={{
                      backgroundColor: colIndex === 0 ? "#f5f5f5" : "inherit",
                      fontWeight: colIndex === 0 ? "bold" : "normal",
                    }}
                  >
                    {cell}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
};

export default CribCreditFacilities;
