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

const ExternalVerificationChecklist: React.FC = () => {
  return (
    <Paper className="px-12 pb-10 h-full">
      <Ve3FormHeader
        icon="feather:check-square"
        title="External Verification Dates"
      />
      <div>
        <TableContainer>
          <Table>
            <TableBody>
              <TableRow className="border">
                <TableCell className="border border-gray-300 bg-grey-200 pt-6 pb-6">
                  App Given Date
                </TableCell>
                <TableCell>{""}</TableCell>
              </TableRow>
              <TableRow className="border">
                <TableCell className="border border-gray-300 bg-grey-200 pt-6 pb-6">
                  App Received Date
                </TableCell>
                <TableCell>{""}</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </Paper>
  );
};

export default ExternalVerificationChecklist;
