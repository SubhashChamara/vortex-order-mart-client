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
import { RelationshipCribInfo } from "../../../../../../workflow/bundle/@types/RelationshipCribInfo";

interface CribTPSearchEmploymentProps {
  cribMobileMatch?: RelationshipCribInfo | null;
}

const CribTPSearchEmployment: React.FC<CribTPSearchEmploymentProps> = ({
  cribMobileMatch,
}) => {
  return (
    <div>
      <Paper className="px-12 pb-10">
        <Ve3FormHeader
          icon="heroicons-outline:phone"
          title={
            <div className="flex flex-row gap-2 items-center">
              <p>TP Search Mobile - </p>
              {cribMobileMatch?.matchedList?.map((item, index) => (
                <React.Fragment key={index}>
                  {index !== 0 && <span className="text-gray-400">|</span>}
                  <span className="text-primary">{item}</span>
                </React.Fragment>
              ))}
            </div>
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
                  Nic / Passport
                </TableCell>
                <TableCell className="border border-gray-300 bg-grey-200 pt-6 pb-6">
                  Crib Report No
                </TableCell>
                <TableCell className="border border-gray-300 bg-grey-200 pt-6 pb-6">
                  Spouse Name
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {(cribMobileMatch &&
                cribMobileMatch?.matchedCribList &&
                cribMobileMatch.matchedCribList?.map((item, index) => (
                  <TableRow key={index}>
                    <TableCell>{""}</TableCell>
                    <TableCell>{item.nicNumber || ""}</TableCell>
                    <TableCell>{item.CRIBReportNumber || ""}</TableCell>
                    <TableCell>{item.spouseName || ""}</TableCell>
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

export default CribTPSearchEmployment;
