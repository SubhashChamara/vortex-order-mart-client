import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import React from "react";
import Ve3FormHeader from "../../../../../../../@core/ui/Ve3FormHeader/Ve3FormHeader";
import { formatCurrency } from "../../../../../../workflow/bundle/@helpers/Common";
import { RelationshipProcessInfo } from "../../../../../../workflow/bundle/@types/RelationshipProcessInfo";

interface WFBNICMatchTableProps {
  eyeBallingNicMatch?: RelationshipProcessInfo | null;
}
const WFBNICMatchTable: React.FC<WFBNICMatchTableProps> = ({
  eyeBallingNicMatch,
}) => {
  return (
    <div>
      <Paper className="px-12 pb-10">
        <Ve3FormHeader
          icon="heroicons-outline:identification"
          title={
            <>
              NIC Match -{" "}
              {eyeBallingNicMatch?.matchedList?.map((item, index) => (
                <React.Fragment key={index}>
                  {index !== 0 && <span className="text-gray-400"> | </span>}
                  <span className="text-primary">{item}</span>
                </React.Fragment>
              ))}
            </>
          }
        />
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell className="border border-gray-300 bg-grey-200 pt-6 pb-6">
                  NIC Number
                </TableCell>
                <TableCell className="border border-gray-300 bg-grey-200 pt-6 pb-6">
                  Applicants Name
                </TableCell>
                <TableCell className="border border-gray-300 bg-grey-200 pt-6 pb-6">
                  Mobile T/P
                </TableCell>
                <TableCell className="border border-gray-300 bg-grey-200 pt-6 pb-6">
                  Residence T/P
                </TableCell>
                <TableCell className="border border-gray-300 bg-grey-200 pt-6 pb-6">
                  Office T/P
                </TableCell>
                <TableCell className="border border-gray-300 bg-grey-200 pt-6 pb-6">
                  Address
                </TableCell>
                <TableCell className="border border-gray-300 bg-grey-200 pt-6 pb-6">
                  Basic Salary
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {(eyeBallingNicMatch &&
                eyeBallingNicMatch?.matchedProcessList?.map((item, index) => (
                  <TableRow key={index}>
                    <TableCell>{item.nicNumber || ""}</TableCell>
                    <TableCell>{item.reportName || ""}</TableCell>
                    <TableCell>{item.mobTp || ""}</TableCell>
                    <TableCell>{item.resTp || ""}</TableCell>
                    <TableCell>{item.offTp || ""}</TableCell>
                    <TableCell>{item.address || ""}</TableCell>
                    <TableCell align="right">
                      {(item.salaryScale &&
                        formatCurrency(item.salaryScale.toString())) ||
                        ""}
                    </TableCell>
                  </TableRow>
                ))) || (
                <TableRow>
                  <TableCell colSpan={7} className="text-center">
                    <span>No data available</span>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </div>
  );
};

export default WFBNICMatchTable;
