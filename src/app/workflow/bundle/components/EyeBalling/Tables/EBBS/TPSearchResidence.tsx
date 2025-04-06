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
import { RelationshipEBBSInfo } from "../../../../@types/RelationshipEBBSInfo";

interface EBBSTPSearchResidenceProps {
  ebbsResMatch: RelationshipEBBSInfo | null;
}

const EBBSTPSearchResidence: React.FC<EBBSTPSearchResidenceProps> = ({
  ebbsResMatch,
}) => {
  return (
    <div>
      <Paper className="px-12 pb-10">
        <Ve3FormHeader
          icon="heroicons-outline:phone"
          title={
            <>
              T/P Search Residence -{" "}
              {ebbsResMatch?.matchedList &&
                ebbsResMatch?.matchedList.map((item, index) => (
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
                  Match
                </TableCell>
                <TableCell className="border border-gray-300 bg-grey-200 pt-6 pb-6">
                  Recorded Address
                </TableCell>
                <TableCell className="border border-gray-300 bg-grey-200 pt-6 pb-6">
                  STS
                </TableCell>
                <TableCell className="border border-gray-300 bg-grey-200 pt-6 pb-6">
                  Account Name
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {(ebbsResMatch &&
                ebbsResMatch.matchedProcessList &&
                ebbsResMatch.matchedProcessList.map((item, index) => (
                  <TableRow key={index}>
                    <TableCell>{item.tpResident || ""}</TableCell>
                    <TableCell>{item.address || ""}</TableCell>
                    <TableCell>{item.status || ""}</TableCell>
                    <TableCell>{item.accountName || ""}</TableCell>
                  </TableRow>
                ))) || (
                <TableRow>
                  <TableCell colSpan={4} className="text-center">
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

export default EBBSTPSearchResidence;
