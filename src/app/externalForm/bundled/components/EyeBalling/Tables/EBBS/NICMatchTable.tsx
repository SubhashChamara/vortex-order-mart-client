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
import dayjs from "dayjs";
import { RelationshipEBBSInfo } from "../../../../../../workflow/bundle/@types/RelationshipEBBSInfo";

interface EBBSNICMatchTableProps {
  ebbsNicMatch: RelationshipEBBSInfo | null;
}

const EBBSNICMatchTable: React.FC<EBBSNICMatchTableProps> = ({
  ebbsNicMatch,
}) => {
  return (
    <div>
      <Paper className="px-12 pb-10">
        <Ve3FormHeader
          icon="heroicons-outline:identification"
          title={
            <>
              NIC Match -{" "}
              {ebbsNicMatch?.matchedList &&
                ebbsNicMatch?.matchedList.map((item, index) => (
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
                  Account Number
                </TableCell>
                <TableCell className="border border-gray-300 bg-grey-200 pt-6 pb-6">
                  Opened Date
                </TableCell>
                <TableCell className="border border-gray-300 bg-grey-200 pt-6 pb-6">
                  Recorded Address
                </TableCell>
                <TableCell className="border border-gray-300 bg-grey-200 pt-6 pb-6">
                  STS
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {(ebbsNicMatch &&
                ebbsNicMatch.matchedProcessList &&
                ebbsNicMatch.matchedProcessList.map((item, index) => (
                  <TableRow key={index}>
                    <TableCell>{item.nicNumber || ""}</TableCell>
                    <TableCell>{item.accountName || ""}</TableCell>
                    <TableCell>
                      {dayjs(item.openDate).format("DD-MM-YYYY") || ""}
                    </TableCell>
                    <TableCell>{item.address || ""}</TableCell>
                    <TableCell>{item.status || ""}</TableCell>
                  </TableRow>
                ))) || (
                <TableRow>
                  <TableCell colSpan={5} className="text-center">
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

export default EBBSNICMatchTable;
