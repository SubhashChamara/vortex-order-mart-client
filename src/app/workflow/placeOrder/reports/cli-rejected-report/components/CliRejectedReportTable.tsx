import React, { ChangeEvent, FC, useState } from "react";
import moment from "moment";
import {
  Button,
  Dialog,
  DialogContent,
  DialogActions,
  Pagination,
  Paper,
  Popover,
  Typography,
  Tooltip,
  IconButton,
} from "@mui/material";
import { Pageable } from "../../../../../../api/types/Pageable";
import useThemeMediaQuery from "../../../../../../@hooks/useThemeMediaQuery";
// import jsPDF from 'jspdf';
// import autoTable from 'jspdf-autotable';
import { CliRejectedReportIf } from "../../../../../core/types/reports/CliRejectedReport";
import { rejects } from "assert";
import EdgeSvgIcon from "../../../../../../@core/ui/EdgeSvgIcon";

interface ProcessTableProps {
  cliRejectedReportList: Pageable<CliRejectedReportIf> | null;
  startDate: String | null;
  endDate: String | null;
  setPage: (v: number) => void;
  page: number;
}

const CliRejectedReportTable: FC<ProcessTableProps> = (props) => {
  const { cliRejectedReportList, startDate, endDate, setPage, page } = props;

  const handlePageChange = (_event: ChangeEvent<unknown>, page: number) => {
    setPage(page - 1);
  };

  const formatCardNumber = (value: string) => {
    if (value) {
      return value
        .replace(/\s+/g, "")
        .replace(/(\d{4})(?=\d)/g, "$1 ")
        .trim();
    } else {
      return value
        .replace(/\s+/g, "")
        .replace(/(\d{4})(?=\d)/g, "$1 ")
        .trim();
    }

  };

  const formatDate = (date: string) => {
    if (date) {
      return moment(date).format("DD-MM-YYYY");
      return moment(date).format("DD-MM-YYYY");
    } else {
      return "----------";
      return "----------";
    }
  };

  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(
    null
  );

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  if (cliRejectedReportList?.content === null) {
    return null;
  }

  return (
    <Paper className="w-full overflow-hidden p-12">
      {cliRejectedReportList?.content.length === 0 ? (
        <div className="flex items-center justify-center">
          <p className="text-red-600 text-14 font-bold">
            No records found for the selected date range
          </p>
        </div>
      ) : (
        <div>
          <div className="flex justify-between items-center mb-4">
            <div>
              <div className="text-sm text-red-600 font-600">
                Search Results
              </div>
              <div className="text-[12px] font-600 text-gray">
                Credit Limit Increase Rejected Report for the selected date
                range
              </div>
            </div>
          </div>
          <div className="w-full overflow-x-auto">
            <table className="w-full whitespace-no-wrap">
              <thead>
                <tr className="whitespace-nowrap divide-x-1">
                  <th className="p-6 text-left">Ref#</th>
                  <th className="p-6 text-left">Card Number</th>
                  <th className="p-6 text-left">Invoker Branch</th>
                  <th className="p-6 text-left">Rejected Date</th>
                  <th className="p-6 text-left">Rejected By</th>
                  <th className="p-6 text-center">Rejected Reason</th>
                </tr>
              </thead>
              <tbody className="bg-white whitespace-nowrap">
                {cliRejectedReportList?.content.map((process, index) => (
                  <tr
                    className="text-black h-full bg-white shadow-2"
                    key={index}
                    style={{ borderSpacing: "10px" }}
                  >
                    <td className="p-6 text-[12px] align-middle text-left">
                      <p className="text-[12px] text-gray font-bold">
                        {process.refNum}
                      </p>
                    </td>
                    <td className="p-6 align-middle text-left">
                      <p className="text-[12px] text-gray font-bold">
                        {formatCardNumber(process.cardNumber)}
                      </p>
                    </td>
                    <td className="p-6 align-middle text-left">
                      <p className="text-[12px] text-gray font-bold text-left">
                        {process.invokerBranch}
                      </p>
                    </td>
                    <td className="p-6 align-middle text-left">
                      <p className="text-[12px] text-gray font-bold">
                        {formatDate(process.rejectedDate?.toString())}
                      </p>
                    </td>
                    <td className="p-6 align-middle text-left">
                      <p className="text-[12px] text-gray font-bold">
                        {process.rejectedUser}
                      </p>
                    </td>
                    <td className="p-6 align-middle text-center">
                      {/* {process.rejectedReasons.map(rejects=>{
                        return <li>{rejects}</li>
                      })} */}

                      {/* <Button
                        aria-describedby={id}
                        variant="contained"
                        onClick={handleClick}
                      >
                        Reject Reasons
                      </Button> */}
                      <Tooltip title="Reject Reasons">
                        <IconButton>
                          <button
                            className="flex items-center justify-between text-sm font-medium leading-5 text-red-600 focus:outline-none focus:shadow-outline-red"
                            aria-label="Edit Group"
                            onClick={handleClick}
                          >
                            <EdgeSvgIcon
                              className="icon-size-12 cursor-pointer text-red mr-3"
                              color="error"
                            >
                              feather:book-open
                            </EdgeSvgIcon>
                          </button>
                        </IconButton>
                      </Tooltip>
                      <Popover
                        id={id}
                        open={open}
                        anchorEl={anchorEl}
                        onClose={handleClose}
                        anchorOrigin={{
                          vertical: "bottom",
                          horizontal: "left",
                        }}
                      >
                        <Typography sx={{ p: 1 }}>
                          {process.rejectedReasons.map((rejects) => {
                            return <li className="text-xs" >{rejects}</li>;
                          })}
                        </Typography>
                      </Popover>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="flex items-center justify-center mt-4">
            <Pagination
              count={cliRejectedReportList?.totalPages}
              siblingCount={0}
              page={page + 1}
              onChange={handlePageChange}
            />
          </div>
        </div>
      )}
    </Paper>
  );
};

export default CliRejectedReportTable;
