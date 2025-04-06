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
import { RelationshipFraudInfo } from "../../../../../../workflow/bundle/@types/RelationshipFraudInfo";

interface FCUNICMatchTableProps {
  fcuBaseNicMatch?: RelationshipFraudInfo | null;
}

const FCUNICMatchTable: React.FC<FCUNICMatchTableProps> = ({
  fcuBaseNicMatch,
}) => {
  return (
    <div>
      <Paper className="px-12 pb-10">
        <Ve3FormHeader
          icon="heroicons-outline:identification"
          title={
            <div className="flex flex-row gap-2 items-center">
              <p>NIC Match - </p>
              {fcuBaseNicMatch?.matchedList?.map((item, index) => (
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
                  NIC/ Passport Number
                </TableCell>
                <TableCell className="border border-gray-300 bg-grey-200 pt-6 pb-6">
                  Full Name
                </TableCell>
                <TableCell className="border border-gray-300 bg-grey-200 pt-6 pb-6">
                  Account Ecaps Ref
                </TableCell>
                <TableCell className="border border-gray-300 bg-grey-200 pt-6 pb-6">
                  Mobile No
                </TableCell>
                <TableCell className="border border-gray-300 bg-grey-200 pt-6 pb-6">
                  Residence No
                </TableCell>
                <TableCell className="border border-gray-300 bg-grey-200 pt-6 pb-6">
                  Fraud Category
                </TableCell>
                <TableCell className="border border-gray-300 bg-grey-200 pt-6 pb-6">
                  Remark
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {(fcuBaseNicMatch &&
                fcuBaseNicMatch?.matchedProcessList &&
                fcuBaseNicMatch.matchedProcessList?.map((item, index) => (
                  <TableRow key={index}>
                    <TableCell>{item.nicPassportNo || ""}</TableCell>
                    <TableCell>{item.fullName || ""}</TableCell>
                    <TableCell>{item.accountEcapsRef || ""}</TableCell>
                    <TableCell>{item.mobileNo || ""}</TableCell>
                    <TableCell>
                      {`${item.resAddress1} ${item.resAddress2} ${item.resAddress3}` ||
                        ""}
                    </TableCell>
                    <TableCell>{item.fraudCategory || ""}</TableCell>
                    <TableCell>{item.remarks || ""}</TableCell>
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

export default FCUNICMatchTable;
