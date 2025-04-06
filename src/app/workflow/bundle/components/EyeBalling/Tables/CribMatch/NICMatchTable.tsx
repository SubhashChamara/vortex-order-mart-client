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
import dayjs from "dayjs";

interface CribNICMatchTableProps {
  cribNicMatch?: RelationshipCribInfo | null;
}

const CribNICMatchTable: React.FC<CribNICMatchTableProps> = ({
  cribNicMatch,
}) => {
  return (
    <div>
      <Paper className="px-12 pb-10">
        <Ve3FormHeader
          icon="heroicons-outline:identification"
          title={
            <div className="flex flex-row gap-2 items-center">
              <p>NIC Match - </p>
              {cribNicMatch?.matchedList?.map((item, index) => (
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
                  Nic Number
                </TableCell>
                <TableCell className="border border-gray-300 bg-grey-200 pt-6 pb-6">
                  Passport Number
                </TableCell>
                <TableCell className="border border-gray-300 bg-grey-200 pt-6 pb-6">
                  Spouse Name
                </TableCell>
                <TableCell className="border border-gray-300 bg-grey-200 pt-6 pb-6">
                  Date of Birth
                </TableCell>
                <TableCell className="border border-gray-300 bg-grey-200 pt-6 pb-6">
                  Crib Report No
                </TableCell>
                <TableCell className="border border-gray-300 bg-grey-200 pt-6 pb-6">
                  Mobile No
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {(cribNicMatch &&
                cribNicMatch?.matchedCribList &&
                cribNicMatch.matchedCribList?.map((item, index) => (
                  <TableRow key={index}>
                    <TableCell>{item.nicNumber || ""}</TableCell>
                    <TableCell>{item.passportNumber || ""}</TableCell>
                    <TableCell>{item.spouseName || ""}</TableCell>
                    <TableCell>
                      {dayjs(item.dateOfBirth).format("DD-MM-YYYY") || ""}
                    </TableCell>
                    <TableCell>{item.CRIBReportNumber || ""}</TableCell>
                    <TableCell>{item.mobileNumber || ""}</TableCell>
                  </TableRow>
                ))) || (
                <TableRow>
                  <TableCell colSpan={6} className="text-center">
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

export default CribNICMatchTable;
