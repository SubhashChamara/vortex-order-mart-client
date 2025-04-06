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
import { RelationshipCardInfo } from "../../../../@types/RelationshipCardInfo";
interface CARDNICMatchTableProps {
  cardNicMatch: RelationshipCardInfo | null;
}
const CARDNICMatchTable: React.FC<CARDNICMatchTableProps> = ({
  cardNicMatch,
}) => {
  return (
    <div>
      <Paper className="px-12 pb-10">
        <Ve3FormHeader
          icon="heroicons-outline:identification"
          title={
            <>
              NIC Match -{" "}
              {cardNicMatch?.matchedList &&
                cardNicMatch?.matchedList.map((item, index) => (
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
                  Card Number
                </TableCell>
                <TableCell className="border border-gray-300 bg-grey-200 pt-6 pb-6">
                  Limit
                </TableCell>
                <TableCell className="border border-gray-300 bg-grey-200 pt-6 pb-6">
                  Category
                </TableCell>
                <TableCell className="border border-gray-300 bg-grey-200 pt-6 pb-6">
                  Override Code
                </TableCell>
                <TableCell className="border border-gray-300 bg-grey-200 pt-6 pb-6">
                  Status
                </TableCell>
                <TableCell className="border border-gray-300 bg-grey-200 pt-6 pb-6">
                  Address
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {(cardNicMatch &&
                cardNicMatch.matchedProcessList &&
                cardNicMatch.matchedProcessList.map((item, index) => (
                  <TableRow key={index}>
                    <TableCell>{item.nicNumber || ""}</TableCell>
                    <TableCell>{item.cardNumber || ""}</TableCell>
                    <TableCell>{item.limit || ""}</TableCell>
                    <TableCell>{item.overrideCode || ""}</TableCell>
                    <TableCell>{item.status || ""}</TableCell>
                    <TableCell>{item.address || ""}</TableCell>
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

export default CARDNICMatchTable;
