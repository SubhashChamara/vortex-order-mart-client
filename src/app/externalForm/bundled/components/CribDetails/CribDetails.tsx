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
import Ve3FormHeader from "../../../../../@core/ui/Ve3FormHeader/Ve3FormHeader";
import { BundleCribpullInfo } from "../../../../workflow/bundle/@types/BundleCribpullInfo";

interface CribDetailsProps {
  cribPullInformation?: BundleCribpullInfo | null;
}

const CribDetails: React.FC<CribDetailsProps> = ({ cribPullInformation }) => {
  return (
    <div className="grid grid-cols-1 gap-12">
      <Paper className="px-12 pb-10">
        <Ve3FormHeader
          icon="material-outline:stacked_line_chart"
          title="Criteria Analyze Summary"
        />
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell
                  className="border border-gray-300 bg-grey-200 text-start pt-6 pb-6"
                  style={{ borderRight: "1px solid #ccc" }}
                >
                  Type
                </TableCell>
                <TableCell className="border border-gray-300 bg-grey-200 text-start pt-6 pb-6">
                  Logic
                </TableCell>
                <TableCell className="border border-gray-300 bg-grey-200 text-start pt-6 pb-6">
                  Result
                </TableCell>
                <TableCell className="border border-gray-300 bg-grey-200 text-start pt-6 pb-6">
                  File Name
                </TableCell>
                <TableCell className="border border-gray-300 bg-grey-200 text-start pt-6 pb-6">
                  Record Number
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {cribPullInformation &&
                cribPullInformation.criteriaAnalysisSummary.map(
                  (item, index) => (
                    <TableRow key={index}>
                      <TableCell>{item.type || ""}</TableCell>
                      <TableCell>{item.expression || ""}</TableCell>
                      <TableCell
                        className={`${
                          item.decision === "REJECTED"
                            ? "text-primary"
                            : "text-green-600"
                        }`}
                      >
                        {item.decision || ""}
                      </TableCell>
                      <TableCell
                        className={`${
                          item.decision === "REJECTED"
                            ? "text-primary"
                            : "text-green-600"
                        }`}
                      >
                        {item.filename || ""}
                      </TableCell>
                      <TableCell
                        className={`${
                          item.decision === "REJECTED"
                            ? "text-primary"
                            : "text-green-600"
                        }`}
                      >
                        {item.lineNum || ""}
                      </TableCell>
                    </TableRow>
                  )
                )}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>

      <Paper className="px-12 pb-10">
        <Ve3FormHeader
          icon="material-outline:notifications_paused"
          title="Ignored Facilities"
        />
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell
                  className="border border-gray-300 bg-grey-200 text-start pt-6 pb-6"
                  style={{ borderRight: "1px solid #ccc" }}
                >
                  Type
                </TableCell>
                <TableCell className="border border-gray-300 bg-grey-200 text-start pt-6 pb-6">
                  Logic
                </TableCell>
                <TableCell className="border border-gray-300 bg-grey-200 text-start pt-6 pb-6">
                  Result
                </TableCell>
                <TableCell className="border border-gray-300 bg-grey-200 text-start pt-6 pb-6">
                  File Name
                </TableCell>
                <TableCell className="border border-gray-300 bg-grey-200 text-start pt-6 pb-6">
                  Record Number
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {/* to do, map values here */}
              {cribPullInformation &&
                cribPullInformation.ignoredFacilities.map((item, index) => (
                  <TableRow key={index}>
                    <TableCell>
                      <p className="whitespace-nowrap">{item.type || ""}</p>
                    </TableCell>
                    <TableCell>{item.expression || ""}</TableCell>
                    <TableCell
                      className={`${
                        item.decision === "REJECTED"
                          ? "text-primary"
                          : "text-green-600"
                      }`}
                    >
                      {
                        <p className="whitespace-nowrap">
                          {item.decision || ""}
                        </p>
                      }
                    </TableCell>
                    <TableCell
                      className={`${
                        item.decision === "REJECTED"
                          ? "text-primary"
                          : "text-green-600"
                      }`}
                    >
                      {item.filename || ""}
                    </TableCell>
                    <TableCell
                      className={`${
                        item.decision === "REJECTED"
                          ? "text-primary"
                          : "text-green-600"
                      }`}
                    >
                      {item.lineNum || ""}
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </div>
  );
};

export default CribDetails;
