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
import { RelationshipProcessInfo } from "../../../../@types/RelationshipProcessInfo";
import { formatCurrency } from "../../../../@helpers/Common";
import dayjs from "dayjs";

interface WFBAddressMatchProps {
  eyeBallingAddressMatch?: RelationshipProcessInfo | null;
}

const WFBAddressMatch: React.FC<WFBAddressMatchProps> = ({
  eyeBallingAddressMatch,
}) => {
  return (
    <div>
      <Paper className="px-12 pb-10">
        <Ve3FormHeader
          icon="heroicons-outline:map"
          title={
            <>
              Address Match -{" "}
              {eyeBallingAddressMatch?.matchedList?.map((item, index) => (
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
                  Address
                </TableCell>
                <TableCell className="border border-gray-300 bg-grey-200 pt-6 pb-6">
                  Applicant NIC
                </TableCell>
                <TableCell className="border border-gray-300 bg-grey-200 pt-6 pb-6">
                  Applicant Name
                </TableCell>
                <TableCell className="border border-gray-300 bg-grey-200 pt-6 pb-6">
                  Application Date/Time
                </TableCell>
                <TableCell className="border border-gray-300 bg-grey-200 pt-6 pb-6">
                  Basic Salary
                </TableCell>
                <TableCell className="border border-gray-300 bg-grey-200 pt-6 pb-6">
                  Process Key
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {(eyeBallingAddressMatch &&
                eyeBallingAddressMatch.matchedProcessList?.map(
                  (item, index) => (
                    <TableRow key={index}>
                      <TableCell>
                        {`${item.resAddress1} ${item.resAddress2} ${item.resAddress3}` ||
                          ""}
                      </TableCell>
                      <TableCell>{item.nicNumber || ""}</TableCell>
                      <TableCell>{item.reportName || ""}</TableCell>
                      <TableCell>
                        {item.applicationDateTime &&
                          dayjs(item.applicationDateTime).format(
                            "DD-MM-YYYY HH:mm"
                          )}
                      </TableCell>
                      <TableCell align="right">
                        {(item.salaryScale &&
                          formatCurrency(item.salaryScale?.toString())) ||
                          ""}
                      </TableCell>
                      <TableCell>{item.businessKey || ""}</TableCell>
                    </TableRow>
                  )
                )) || (
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

export default WFBAddressMatch;
