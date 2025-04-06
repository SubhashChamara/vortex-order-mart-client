import React from "react";
import { RelationshipVerificationAlertInfo } from "../../../../@types/RelationshipVerificationAlertInfo";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
} from "@mui/material";
import { formatCurrency } from "../../../../@helpers/Common";

interface VerificationAlertInfoProps {
  relationshipVerificationAlert: RelationshipVerificationAlertInfo | null;
}

const VerificationAlertInfo: React.FC<VerificationAlertInfoProps> = ({
  relationshipVerificationAlert,
}) => {
  return (
    <div className="flex flex-col gap-12">
      <TextField
        value={relationshipVerificationAlert?.designation}
        label="Designation"
        disabled
        size="small"
        InputLabelProps={{
          shrink: true,
        }}
      />
      <TextField
        value={
          (relationshipVerificationAlert?.salary &&
            formatCurrency(relationshipVerificationAlert?.salary.toString())) ||
          ""
        }
        label="Basic Salary"
        disabled
        size="small"
        InputLabelProps={{
          shrink: true,
        }}
        InputProps={{
          sx: {
            input: {
              textAlign: "right",
            },
          },
        }}
      />
      <TextField
        value={
          (relationshipVerificationAlert?.marketAverage &&
            formatCurrency(
              relationshipVerificationAlert?.marketAverage.toString()
            )) ||
          ""
        }
        label="Market Average"
        disabled
        size="small"
        InputLabelProps={{
          shrink: true,
        }}
        InputProps={{
          sx: {
            input: {
              textAlign: "right",
            },
          },
        }}
      />
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell className="border border-gray-300 bg-grey-200 pt-6 pb-6" />
              <TableCell className="border border-gray-300 bg-grey-200 pt-6 pb-6" />
              <TableCell className="border border-gray-300 bg-grey-200 pt-6 pb-6">
                Risk Grading
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <TableCell className="border border-gray-300 bg-grey-200 pt-6 pb-6">
                Income Var.
              </TableCell>
              <TableCell>
                {relationshipVerificationAlert?.incomeVary != null &&
                !isNaN(Number(relationshipVerificationAlert.incomeVary))
                  ? `${Number(relationshipVerificationAlert.incomeVary).toFixed(
                      2
                    )} %`
                  : ""}
              </TableCell>
              <TableCell>
                {relationshipVerificationAlert?.incomeVaryGrade || ""}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="border border-gray-300 bg-grey-200 pt-6 pb-6">
                City
              </TableCell>
              <TableCell>{relationshipVerificationAlert?.city || ""}</TableCell>
              <TableCell>
                {relationshipVerificationAlert?.cityGrade || ""}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="border border-gray-300 bg-grey-200 pt-6 pb-6">
                Company
              </TableCell>
              <TableCell>
                {relationshipVerificationAlert?.company || ""}
              </TableCell>
              <TableCell>
                {relationshipVerificationAlert?.companyGrade || ""}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="border border-gray-300 bg-grey-200 pt-6 pb-6">
                Industry
              </TableCell>
              <TableCell>
                {relationshipVerificationAlert?.industry || ""}
              </TableCell>
              <TableCell>
                {relationshipVerificationAlert?.industryGrade || ""}
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default VerificationAlertInfo;
