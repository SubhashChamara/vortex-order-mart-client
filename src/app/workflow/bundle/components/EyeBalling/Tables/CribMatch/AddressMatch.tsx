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
import { RelationshipCribInfo } from "../../../../@types/RelationshipCribInfo";

interface CribAddressMatchProps {
  cribAddressMatch?: RelationshipCribInfo | null;
}

const CribAddressMatch: React.FC<CribAddressMatchProps> = ({
  cribAddressMatch,
}) => {
  return (
    <div>
      <Paper className="px-12 pb-10">
        <Ve3FormHeader
          icon="heroicons-outline:map"
          title={
            <>
              Address Match -{" "}
              {cribAddressMatch?.matchedList?.map((item, index) => (
                <React.Fragment key={index}>
                  {index !== 0 && <span className="text-gray-400">|</span>}
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
                  Address
                </TableCell>
                <TableCell className="border border-gray-300 bg-grey-200 pt-6 pb-6">
                  Applicant NIC
                </TableCell>
                <TableCell className="border border-gray-300 bg-grey-200 pt-6 pb-6">
                  Crib Report No
                </TableCell>
                <TableCell className="border border-gray-300 bg-grey-200 pt-6 pb-6">
                  Spouse Name
                </TableCell>
                <TableCell className="border border-gray-300 bg-grey-200 pt-6 pb-6">
                  Mailing Permanent
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {(cribAddressMatch &&
                cribAddressMatch?.matchedCribList &&
                cribAddressMatch.matchedCribList?.map((item, index) => (
                  <TableRow key={index}>
                    <TableCell>{""}</TableCell>
                    <TableCell>{item.CRIBReportNumber || ""}</TableCell>
                    <TableCell>{item.nicNumber || ""}</TableCell>
                    <TableCell>{item.spouseName || ""}</TableCell>
                    <TableCell></TableCell>
                    <TableCell>{""}</TableCell>
                    <TableCell></TableCell>
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

export default CribAddressMatch;
