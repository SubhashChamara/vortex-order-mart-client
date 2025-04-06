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
import { RelationshipCardInfo } from "../../../../../../workflow/bundle/@types/RelationshipCardInfo";

interface CARDAddressMatchProps {
  cardAddressMatch: RelationshipCardInfo | null;
}

const CARDAddressMatch: React.FC<CARDAddressMatchProps> = ({
  cardAddressMatch,
}) => {
  return (
    <div>
      <Paper className="px-12 pb-10">
        <Ve3FormHeader
          icon="heroicons-outline:map"
          title={
            <>
              Address Match -{" "}
              {cardAddressMatch?.matchedList &&
                cardAddressMatch?.matchedList.map((item, index) => (
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
                  Recorded Address
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {(cardAddressMatch &&
                cardAddressMatch.matchedProcessList &&
                cardAddressMatch.matchedProcessList.map((item, index) => (
                  <TableRow key={index}>
                    <TableCell>{item.nicNumber || ""}</TableCell>
                    <TableCell>{item.cardNumber || ""}</TableCell>
                    <TableCell>{item.recordedAddress || ""}</TableCell>
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

export default CARDAddressMatch;
