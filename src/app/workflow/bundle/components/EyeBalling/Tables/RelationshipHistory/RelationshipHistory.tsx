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
import { RelationshipHistoryInfo } from "../../../../@types/RelationshipHistoryInfo";
import dayjs from "dayjs";

interface RelationshipHistoryTableProps {
  relationshipHistory: RelationshipHistoryInfo | null;
}
const RelationshipHistoryTable: React.FC<RelationshipHistoryTableProps> = ({
  relationshipHistory,
}) => {
  return (
    <div>
      <Paper className="px-12 pb-10">
        <Ve3FormHeader
          icon="heroicons-outline:map"
          title={`Relationship History`}
        />
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell className="border border-gray-300 bg-grey-200 pt-6 pb-6" />
                <TableCell className="border border-gray-300 bg-grey-200 pt-6 pb-6">
                  Mobile
                </TableCell>
                <TableCell className="border border-gray-300 bg-grey-200 pt-6 pb-6">
                  NIC Number
                </TableCell>
                <TableCell className="border border-gray-300 bg-grey-200 pt-6 pb-6">
                  Account Open Date
                </TableCell>
                <TableCell className="border border-gray-300 bg-grey-200 pt-6 pb-6">
                  Account Number
                </TableCell>
                <TableCell className="border border-gray-300 bg-grey-200 pt-6 pb-6">
                  Card Number
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow>
                <TableCell>Account</TableCell>
                <TableCell>
                  {(relationshipHistory?.accInfoDto &&
                    relationshipHistory?.accInfoDto.mob) ||
                    ""}
                </TableCell>
                <TableCell>
                  {(relationshipHistory?.accInfoDto &&
                    relationshipHistory?.accInfoDto.nicNumber) ||
                    ""}
                </TableCell>
                <TableCell>
                  {(relationshipHistory?.accInfoDto &&
                    dayjs(relationshipHistory?.accInfoDto.openDate).format(
                      "DD-MM-YYYY"
                    )) ||
                    ""}
                </TableCell>
                <TableCell>
                  {(relationshipHistory?.accInfoDto &&
                    relationshipHistory?.accInfoDto.accountNumber) ||
                    ""}
                </TableCell>
                <TableCell>{""}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Card</TableCell>
                <TableCell>
                  {(relationshipHistory?.cardInfoDto &&
                    relationshipHistory.accInfoDto.mob) ||
                    ""}
                </TableCell>
                <TableCell>
                  {(relationshipHistory?.cardInfoDto &&
                    relationshipHistory.cardInfoDto.nicNumber) ||
                    ""}
                </TableCell>
                <TableCell>
                  {(relationshipHistory?.cardInfoDto &&
                    dayjs(relationshipHistory?.cardInfoDto.openDate).format(
                      "DD-MM-YYYY"
                    )) ||
                    ""}
                </TableCell>
                <TableCell>{""}</TableCell>
                <TableCell>
                  {(relationshipHistory?.cardInfoDto &&
                    relationshipHistory.cardInfoDto.cardNumber) ||
                    ""}
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </div>
  );
};

export default RelationshipHistoryTable;
