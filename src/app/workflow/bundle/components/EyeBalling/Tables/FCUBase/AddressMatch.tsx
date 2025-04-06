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
import { RelationshipFraudInfo } from "../../../../@types/RelationshipFraudInfo";

interface FCUAddressMatchProps {
  fcuBaseAddressMatch?: RelationshipFraudInfo | null;
}

const FCUAddressMatch: React.FC<FCUAddressMatchProps> = ({
  fcuBaseAddressMatch,
}) => {
  return (
    <div>
      <Paper className="px-12 pb-10">
        <Ve3FormHeader
          icon="heroicons-outline:map"
          title={
            <div className="flex flex-row gap-2 items-center">
              <p>Address - </p>
              {fcuBaseAddressMatch?.matchedList?.map((item, index) => (
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
                  Address
                </TableCell>
                <TableCell className="border border-gray-300 bg-grey-200 pt-6 pb-6">
                  Mobile No
                </TableCell>
                <TableCell className="border border-gray-300 bg-grey-200 pt-6 pb-6">
                  Residence No
                </TableCell>
                <TableCell className="border border-gray-300 bg-grey-200 pt-6 pb-6">
                  Nic/passport Number
                </TableCell>
                <TableCell className="border border-gray-300 bg-grey-200 pt-6 pb-6">
                  Full Name
                </TableCell>
                <TableCell className="border border-gray-300 bg-grey-200 pt-6 pb-6">
                  Fraud Category
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {(fcuBaseAddressMatch && fcuBaseAddressMatch?.matchedProcessList &&
                fcuBaseAddressMatch?.matchedProcessList?.map((item, index) => (
                  <TableRow key={index}>
                    <TableCell>
                      {`${item.resAddress1} ${item.resAddress2} ${item.resAddress3}` ||
                        ""}
                    </TableCell>
                    <TableCell>{item.mobileNo || ""}</TableCell>
                    <TableCell>{item.residenceNo || ""}</TableCell>
                    <TableCell>{item.nicPassportNo || ""}</TableCell>
                    <TableCell>{item.fullName || ""}</TableCell>
                    <TableCell>{item.fraudCategory || ""}</TableCell>
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

export default FCUAddressMatch;
