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
import { RelationshipProcessInfo } from "../../../../../../workflow/bundle/@types/RelationshipProcessInfo";

interface WFBTPSearchResidence {
  eyeBallingResMatch?: RelationshipProcessInfo | null;
}

const WFBTPSearchResidence: React.FC<WFBTPSearchResidence> = ({
  eyeBallingResMatch,
}) => {
  return (
    <div>
      <Paper className="px-12 pb-10">
        <Ve3FormHeader
          icon="heroicons-outline:phone"
          title={
            <>
              T/P Search Residence -{" "}
              {eyeBallingResMatch?.matchedList?.map((item, index) => (
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
                  Residence No
                </TableCell>
                <TableCell className="border border-gray-300 bg-grey-200 pt-6 pb-6">
                  Applicant's Name
                </TableCell>
                <TableCell className="border border-gray-300 bg-grey-200 pt-6 pb-6">
                  NIC
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {(eyeBallingResMatch &&
                eyeBallingResMatch?.matchedProcessList &&
                eyeBallingResMatch?.matchedProcessList?.map((item, index) => (
                  <TableRow key={index}>
                    <TableCell>{item.resTp || ""}</TableCell>
                    <TableCell>{item.reportName || ""}</TableCell>
                    <TableCell>{item.nicNumber || ""}</TableCell>
                  </TableRow>
                ))) || (
                <TableRow>
                  <TableCell colSpan={3} className="text-center">
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

export default WFBTPSearchResidence;
