import {
  Paper,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
} from "@mui/material";
import React from "react";
import Ve3FormHeader from "../../../../../@core/ui/Ve3FormHeader/Ve3FormHeader";

const CribCriteriaSummary: React.FC = () => {
  return (
    <div className="flex flex-col gap-12">
      <Paper className="px-12 pb-10 h-full">
        <Ve3FormHeader
          icon="feather:check-square"
          title="Criteria Analyze Summery"
        />
        <div className="flex flex-col gap-12">
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
                  <TableCell
                    className="border border-gray-300 bg-grey-200 text-start pt-6 pb-6"
                    style={{ borderRight: "1px solid #ccc" }}
                  >
                    Logic
                  </TableCell>
                  <TableCell
                    className="border border-gray-300 bg-grey-200 text-start pt-6 pb-6"
                    style={{ borderRight: "1px solid #ccc" }}
                  >
                    Result
                  </TableCell>
                  <TableCell
                    className="border border-gray-300 bg-grey-200 text-start pt-6 pb-6"
                    style={{ borderRight: "1px solid #ccc" }}
                  >
                    File Name
                  </TableCell>
                  <TableCell
                    className="border border-gray-300 bg-grey-200 text-start pt-6 pb-6"
                    style={{ borderRight: "1px solid #ccc" }}
                  >
                    Record Number
                  </TableCell>
                </TableRow>
              </TableHead>
            </Table>
          </TableContainer>
        </div>
      </Paper>

      <Paper className="px-12 pb-10 h-full">
        <Ve3FormHeader icon="feather:check-square" title="Ignored Facilities" />
        <div className="flex flex-col gap-12">
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
                  <TableCell
                    className="border border-gray-300 bg-grey-200 text-start pt-6 pb-6"
                    style={{ borderRight: "1px solid #ccc" }}
                  >
                    Logic
                  </TableCell>
                  <TableCell
                    className="border border-gray-300 bg-grey-200 text-start pt-6 pb-6"
                    style={{ borderRight: "1px solid #ccc" }}
                  >
                    Result
                  </TableCell>
                  <TableCell
                    className="border border-gray-300 bg-grey-200 text-start pt-6 pb-6"
                    style={{ borderRight: "1px solid #ccc" }}
                  >
                    File Name
                  </TableCell>
                  <TableCell
                    className="border border-gray-300 bg-grey-200 text-start pt-6 pb-6"
                    style={{ borderRight: "1px solid #ccc" }}
                  >
                    Record Number
                  </TableCell>
                </TableRow>
              </TableHead>
            </Table>
          </TableContainer>
        </div>
      </Paper>
    </div>
  );
};

export default CribCriteriaSummary;
