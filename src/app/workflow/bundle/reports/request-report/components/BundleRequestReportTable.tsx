import { ChangeEvent, FC, useEffect, useState } from "react";
import moment from "moment";
import { IconButton, Pagination, Paper, Popover, Tooltip, Typography } from "@mui/material";
import { Pageable } from "../../../../../../api/types/Pageable";
import { BundledRequestReportIf } from "../../../../../core/types/reports/BundledRequestReport";
import EdgeSvgIcon from "../../../../../../@core/ui/EdgeSvgIcon";
import { formatCurrency } from "../../../@helpers/Common";
import React from "react";
import Ve3Popup from "../../../../../../@core/ui/Ve3Popup/Ve3Popup";
import ScorecardDetails from "./ScorecardDetails";
import ScoreCalculator from "./ScoreCalculator";
import ScorecardOutput from "./ScorecardOutput";
import CribScore from "../../../components/CribScore/CribScore";
import { BundleCribScoreInfo } from "../../../@types/BundleCribScore";
import { Api } from "../../../../../../api/Api";
import { Box } from "@mui/system";
import CribScoreDetails from "./CribScoreDetails";


interface ProcessTableProps {
  bundledRequestReportList: Pageable<BundledRequestReportIf> | null;
  setPage: (v: number) => void;
  page: number;
}


const BundledRequestReportTable: FC<ProcessTableProps> = (props) => {
  const { bundledRequestReportList, setPage, page } = props;

  const handlePageChange = (_event: ChangeEvent<unknown>, page: number) => {
    setPage(page - 1);
  };

  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
  const [anchorElPend, setAnchorElPend] = useState<HTMLButtonElement | null>(null);

  const [activePendReasons, setActivatePendReasons] = useState<string[] | null>(null);
  const [activeRejectReasons, setActivateRejectReasons] = useState<string[] | null>(null);

  const [cardOpen, setCardOpen] = useState(false);
  const [viewingRow, setViewingRow] = useState<number | null>(null);

  const [processInstance, setProcessInstance] = useState<string | null>(null);
  const [processId, setProcessId] = useState<number | null>(null);

  const [cribScoreInformation, setCribScoreInformation] = useState<BundleCribScoreInfo | null>(null);

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>, rejectReasons: string[]) => {
    setAnchorEl(event.currentTarget);
    setActivateRejectReasons(rejectReasons);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };


  const openPend = Boolean(anchorElPend);

  const handleClickPend = (event: React.MouseEvent<HTMLButtonElement>, pendReasons: string[]) => {
    setAnchorElPend(event.currentTarget);
    setActivatePendReasons(pendReasons);
  };

  const handleClosePend = () => {
    setAnchorElPend(null);
    setActivatePendReasons(null);
    setActivateRejectReasons(null);
  };

  const toggleViewingRow = (index: number) => {
    setCardOpen(!cardOpen);
    setViewingRow(viewingRow === index ? null : index);
  };

  const setId = (bundleProcessId: number) => {
    setProcessId(bundleProcessId);
  };

  const setProcess = (processInstance: string) => {
    setProcessInstance(processInstance);
  };

  // get crib score
  const getCribScore = async () => {
    if (processInstance === null) return
    const { data, err } = await Api.performRequest((r) =>
      r.creditCard.getBundleCribScore(processInstance ?? "")
    );

    if (data !== null) {
      setCribScoreInformation(data);
    } else {
      console.log(err);
    }

    console.log(data);
  };

  useEffect(() => {
    getCribScore();
  }, [processInstance]);


  const formatDate = (date: string) => {
    if (date) {
      return moment(date).format("DD-MM-YYYY")
    } else {
      return "----------"
    }
  }


  if (bundledRequestReportList?.content === null) {
    return null;
  }

  return (
    <Paper className="w-full overflow-hidden p-12">
      {bundledRequestReportList?.content.length === 0 ? (
        <div className="flex items-center justify-center">
          <p className="text-red-600 text-14 font-bold">
            No records found for the selected date range
          </p>
        </div>
      ) :
        (
          <div>
            <div className="flex justify-between items-center mb-4">
              <div>
                <div className="text-sm text-red-600 font-600">Search Results</div>
                <div className="text-[12px] font-600 text-gray">
                  Bundled  Request Report for the selected date range
                </div>
              </div>
            </div>
            <div className="w-full overflow-x-auto">
              <table className="w-full whitespace-no-wrap">
                <thead>
                  <tr className="whitespace-nowrap divide-x-1">
                    <th className="p-6 text-left align-top">Business Key</th>
                    <th className="p-6 text-left align-top">Category Type</th>
                    <th className="p-6 text-left align-top">Old NIC</th>
                    <th className="p-6 text-left align-top">New NIC</th>
                    <th className="p-6 text-left align-top">Passport Number</th>
                    <th className="p-6 text-left align-top">Customer Name</th>
                    <th className="p-6 text-left align-top">Submission Date</th>
                    <th className="p-6 text-left align-top">CASA</th>
                    <th className="p-6 text-left align-top">CARD</th>
                    <th className="p-6 text-center align-top" colSpan={3}>ALPL</th>
                    <th className="p-6 text-left align-top">RSD<br />Verification</th>
                    <th className="p-6 text-left align-top">EMP<br />Verification</th>
                    <th className="p-6 text-left align-top">REF<br />Verification</th>
                    <th className="p-6 text-left align-top">FRM Alert Checker<br /> Completion Date</th>
                    <th className="p-6 text-left align-top">Receiving Date<br /> to Credit (Latest)</th>
                    <th className="p-6 text-left align-top">EB Data Entry<br /> Completion Date</th>
                    <th className="p-6 text-left align-top">Relationship Marker<br /> Completion Date</th>
                    <th className="p-6 text-left align-top">Relationship Checker<br /> Completion Date</th>
                    <th className="p-6 text-left align-top">Data Entry Marker<br /> Completion Date</th>
                    <th className="p-6 text-left align-top">Data Entry Checker<br /> Completion Date</th>
                    <th className="p-6 text-left align-top">AIP RM  <br />Completion Date</th>
                    <th className="p-6 text-left align-top">AIP Doc Check<br /> Completion Date</th>
                    <th className="p-6 text-left align-top">Reject Resubmission<br /> Date</th>
                    <th className="p-6 text-left align-top">First Approver</th>
                    <th className="p-6 text-left align-top">Decision Date<br />(First Approver)</th>
                    <th className="p-6 text-left align-top">Status</th>
                    <th className="p-6 text-left align-top">Card Type</th>
                    <th className="p-6 text-left align-top">Source Type</th>
                    <th className="p-6 text-left align-top">Card Limit</th>
                    <th className="p-6 text-left align-top">Approved Amount</th>
                    <th className="p-6 text-left align-top">Net Amount</th>
                    <th className="p-6 text-left align-top">Second Approver</th>
                    <th className="p-6 text-left align-top">Decision Date<br />(Second Approver)</th>
                    <th className="p-6 text-left align-top">DSR</th>
                    <th className="p-6 text-left align-top">Pend Date</th>
                    <th className="p-6 text-left align-top">Pend Reason</th>
                    <th className="p-6 text-left align-top">Reject Reason</th>
                    <th className="p-6 text-left align-top">DBR %</th>
                    <th className="p-6 text-left align-top">Total Unsecured<br />Exposure</th>
                    <th className="p-6 text-left align-top">Gross Income</th>
                    <th className="p-6 text-left align-top">MUE Multiplier</th>
                    <th className="p-6 text-left align-top">Underwriter Approved<br /> Level</th>
                    <th className="p-6 text-left align-top">Sales Chanel</th>
                    <th className="p-6 text-left align-top">Static Data<br />Changed</th>
                    <th className="p-6 text-left align-top">Account Number</th>
                    <th className="p-6 text-left align-top">Relationship ID</th>
                    <th className="p-6 text-left align-top">Scorecard View</th>
                  </tr>
                  <tr className="whitespace-nowrap divide-x-1">
                    <th className="p-6 text-left align-top"></th>
                    <th className="p-6 text-left align-top"></th>
                    <th className="p-6 text-left align-top"></th>
                    <th className="p-6 text-left align-top"></th>
                    <th className="p-6 text-left align-top"></th>
                    <th className="p-6 text-left align-top"></th>
                    <th className="p-6 text-left align-top"></th>
                    <th className="p-6 text-left align-top"></th>
                    <th className="p-6 text-left align-top"></th>
                    <th className="p-6 text-left align-top">New</th>
                    <th className="p-6 text-left align-top">Top Up</th>
                    <th className="p-6 text-left align-top">Auto</th>
                    <th className="p-6 text-left"></th>
                    <th className="p-6 text-left"></th>
                    <th className="p-6 text-left"></th>
                    <th className="p-6 text-left"></th>
                    <th className="p-6 text-left"></th>
                    <th className="p-6 text-left"></th>
                    <th className="p-6 text-left"></th>
                    <th className="p-6 text-left"></th>
                    <th className="p-6 text-left"></th>
                    <th className="p-6 text-left"></th>
                    <th className="p-6 text-left"></th>
                    <th className="p-6 text-left"></th>
                    <th className="p-6 text-left"></th>
                    <th className="p-6 text-left"></th>
                    <th className="p-6 text-left"></th>
                    <th className="p-6 text-left"></th>
                    <th className="p-6 text-left"></th>
                    <th className="p-6 text-left"></th>
                    <th className="p-6 text-left"></th>
                    <th className="p-6 text-left"></th>
                    <th className="p-6 text-left"></th>
                    <th className="p-6 text-left"></th>
                    <th className="p-6 text-left"></th>
                    <th className="p-6 text-left"></th>
                    <th className="p-6 text-left"></th>
                    <th className="p-6 text-left"></th>
                    <th className="p-6 text-left"></th>
                    <th className="p-6 text-left"></th>
                    <th className="p-6 text-left"></th>
                    <th className="p-6 text-left"></th>
                    <th className="p-6 text-left"></th>
                    <th className="p-6 text-left"></th>
                    <th className="p-6 text-left"></th>
                    <th className="p-6 text-left"></th>
                    <th className="p-6 text-left"></th>
                    <th className="p-6 text-left"></th>
                    <th className="p-6 text-left"></th>
                  </tr>
                </thead>
                <tbody className="bg-white whitespace-nowrap">
                  {bundledRequestReportList?.content.map((process, index) => (
                    <tr
                      className="text-black h-full bg-white shadow-2"
                      key={index}
                      style={{ borderSpacing: "10px" }}
                    >
                      <td className="p-6 text-[12px] align-middle text-left">
                        <p className="text-[12px] text-gray font-bold">
                          {process.businessKey}
                        </p>
                      </td>
                      <td className="p-6 align-middle text-left">
                        <p className="text-[12px] text-gray font-bold text-left">
                          {process.categoryType}
                        </p>
                      </td>
                      <td className="p-6 align-middle text-left">
                        <p className="text-[12px] text-gray font-bold text-left">
                          {process.oldNIC}
                        </p>
                      </td>
                      <td className="p-6 align-middle text-left">
                        <p className="text-[12px] text-gray font-bold text-left">
                          {process.newNIC}
                        </p>
                      </td>
                      <td className="p-6 align-middle text-left">
                        <p className="text-[12px] text-gray font-bold text-left">
                          {process.passport}
                        </p>
                      </td>
                      <td className="p-6 align-middle text-left">
                        <p className="text-[12px] text-gray font-bold text-left">
                          {process.customerName}
                        </p>
                      </td>
                      <td className="p-6 align-middle text-left">
                        <p className="text-[12px] text-gray font-bold text-left">
                          {formatDate(process.submissionDate?.toString())}
                        </p>
                      </td>
                      <td className="p-6 align-middle text-center">
                        <p className="text-[12px] text-gray font-bold flex justify-center items-center">
                          {process.isCasa ? <EdgeSvgIcon color={"success"}>feather:check</EdgeSvgIcon> : <EdgeSvgIcon color={"error"}>feather:x</EdgeSvgIcon>}
                        </p>
                      </td>
                      <td className="p-6 align-middle text-center">
                        <p className="text-[12px] text-gray font-bold flex justify-center items-center">
                          {process.isCard ? <EdgeSvgIcon color={"success"}>feather:check</EdgeSvgIcon> : <EdgeSvgIcon color={"error"}>feather:x</EdgeSvgIcon>}
                        </p>
                      </td>
                      <td className="p-6 align-middle text-center">
                        <p className="text-[12px] text-gray font-bold flex justify-center items-center">
                          {process.personalLoanType === 'PL_NEW' ? <EdgeSvgIcon color={"success"}>feather:check</EdgeSvgIcon> : <></>}
                        </p>
                      </td>
                      <td className="p-6 align-middle text-center">
                        <p className="text-[12px] text-gray font-bold flex justify-center items-center">
                          {process.personalLoanType === 'PL_TOP_UP' ? <EdgeSvgIcon color={"success"}>feather:check</EdgeSvgIcon> : <></>}
                        </p>
                      </td>
                      <td className="p-6 align-middle text-center">
                        <p className="text-[12px] text-gray font-bold flex justify-center items-center">
                          {process.personalLoanType === 'AUTO_LN' ? <EdgeSvgIcon color={"success"}>feather:check</EdgeSvgIcon> : <></>}
                        </p>
                      </td>
                      <td className="p-6 align-middle text-center">
                        <p className="text-[12px] text-gray font-bold flex justify-center items-center">
                          {process.rsdVerification ? <EdgeSvgIcon color={"success"}>feather:check</EdgeSvgIcon> : <EdgeSvgIcon color={"error"}>feather:x</EdgeSvgIcon>}
                        </p>
                      </td>
                      <td className="p-6 align-middle text-center">
                        <p className="text-[12px] text-gray font-bold flex justify-center items-center">
                          {process.empVerification ? <EdgeSvgIcon color={"success"}>feather:check</EdgeSvgIcon> : <EdgeSvgIcon color={"error"}>feather:x</EdgeSvgIcon>}
                        </p>
                      </td>
                      <td className="p-6 align-middle text-center">
                        <p className="text-[12px] text-gray font-bold flex justify-center items-center">
                          {process.refVerification ? <EdgeSvgIcon color={"success"}>feather:check</EdgeSvgIcon> : <EdgeSvgIcon color={"error"}>feather:x</EdgeSvgIcon>}
                        </p>
                      </td>
                      <td className="p-6 align-middle text-left">
                        <p className="text-[12px] text-gray font-bold text-left">
                          {formatDate(process.frmalertCheckedDate?.toString())}
                        </p>
                      </td>
                      <td className="p-6 align-middle text-left">
                        <p className="text-[12px] text-gray font-bold text-left">
                          {formatDate(process.receivingDate?.toString())}
                        </p>
                      </td>
                      <td className="p-6 align-middle text-left">
                        <p className="text-[12px] text-gray font-bold text-left">
                          {formatDate(process.eyeBallingCompletedDate?.toString())}
                        </p>
                      </td>
                      <td className="p-6 align-middle text-left">
                        <p className="text-[12px] text-gray font-bold text-left">
                          {formatDate(process.relationshipMakerCompletionDate?.toString())}
                        </p>
                      </td>
                      <td className="p-6 align-middle text-left">
                        <p className="text-[12px] text-gray font-bold text-left">
                          {formatDate(process.relationshipCheckerCompletionDate?.toString())}
                        </p>
                      </td>
                      <td className="p-6 align-middle text-left">
                        <p className="text-[12px] text-gray font-bold text-left">
                          {formatDate(process.dataEntryMarkerCompletionDate?.toString())}
                        </p>
                      </td>
                      <td className="p-6 align-middle text-left">
                        <p className="text-[12px] text-gray font-bold text-left">
                          {formatDate(process.dataEntryCheckerCompletionDate?.toString())}
                        </p>
                      </td>
                      <td className="p-6 align-middle text-left">
                        <p className="text-[12px] text-gray font-bold text-left">
                          {formatDate(process.aipRMCompletionDate?.toString())}
                        </p>
                      </td>
                      <td className="p-6 align-middle text-left">
                        <p className="text-[12px] text-gray font-bold text-left">
                          {formatDate(process.aipDocCheckCompletionDate?.toString())}
                        </p>
                      </td>
                      <td className="p-6 align-middle text-left">
                        <p className="text-[12px] text-gray font-bold text-left">
                          {formatDate(process?.rejectResubmissionDate?.toString())}
                        </p>
                      </td>
                      <td className="p-6 align-middle text-left">
                        <p className="text-[12px] text-gray font-bold text-left">
                          {process.firstApprover}
                        </p>
                      </td>
                      <td className="p-6 align-middle text-left">
                        <p className="text-[12px] text-gray font-bold text-left">
                          {formatDate(process.approvedDate?.toString())}
                        </p>
                      </td>
                      <td className="p-6 align-middle text-left">
                        <p className="text-[12px] text-gray font-bold text-left">
                          {process.appStatus}
                        </p>
                      </td>
                      <td className="p-6 align-middle text-left">
                        <p className="text-[12px] text-gray font-bold text-left">
                          {process.cardType}
                        </p>
                      </td>
                      <td className="p-6 align-middle text-left">
                        <p className="text-[12px] text-gray font-bold text-left">
                          {process.sourceType}
                        </p>
                      </td>
                      <td className="p-6 align-middle text-right">
                        <p className="text-[12px] text-gray font-bold text-right">
                          {formatCurrency(process.cardLimit?.toString())}
                        </p>
                      </td>
                      <td className="p-6 align-middle text-left">
                        <p className="text-[12px] text-gray font-bold text-right">
                          {formatCurrency(process.approvedAmount?.toString())}
                        </p>
                      </td>
                      <td className="p-6 align-middle text-right">
                        <p className="text-[12px] text-gray font-bold text-right">
                          {formatCurrency(process.netAmount?.toString())}
                        </p>
                      </td>
                      <td className="p-6 align-middle text-left">
                        <p className="text-[12px] text-gray font-bold text-left">
                          {process.secondApprover}
                        </p>
                      </td>
                      <td className="p-6 align-middle text-left">
                        <p className="text-[12px] text-gray font-bold text-left">
                          {formatDate(process.secondApproveDecisionDate?.toString())}
                        </p>
                      </td>
                      <td className="p-6 align-middle text-left">
                        <p className="text-[12px] text-gray font-bold text-left">
                          {process.dsr}
                        </p>
                      </td>
                      <td className="p-6 align-middle text-left">
                        <p className="text-[12px] text-gray font-bold text-left">
                          {formatDate(process.pendDate?.toString())}
                        </p>
                      </td>

                      <td className="p-6 align-middle justify-center text-center">

                        <Tooltip title="Pend Reasons">
                          <button
                            className=" items-center justify-between text-sm font-medium leading-5 text-red-600 focus:outline-none focus:shadow-outline-red"
                            aria-label="Edit Group"
                            onClick={(event) => handleClickPend(event, process?.pendReasons || [])}
                          >
                            <EdgeSvgIcon
                              className="icon-size-12 cursor-pointer text-red "
                              color="error"
                            >
                              feather:book-open
                            </EdgeSvgIcon>
                          </button>
                        </Tooltip>
                        <Popover
                          open={openPend}
                          anchorEl={anchorElPend}
                          onClose={handleClosePend}
                          anchorOrigin={{
                            vertical: "bottom",
                            horizontal: "left",
                          }}
                        >
                          <Typography sx={{ p: 1 }}>
                            {(activePendReasons && activePendReasons?.length > 0)
                              ? activePendReasons?.map((pend, index) => (
                                pend.length > 0 && pend !== "" ?
                                  <li className="text-xs" key={index}>{pend}</li>
                                  : <li className="text-xs text-gray-500">No Pend reasons</li>

                              )) : (<li className="text-xs text-gray-500">No Pend reasons</li>)}
                          </Typography>
                        </Popover>
                      </td>

                      <td className="p-6 align-middle flex justify-center items-center">

                        <Tooltip title="Reject Reasons">
                          <button
                            className="flex items-center justify-between text-sm font-medium leading-5 text-red-600 focus:outline-none focus:shadow-outline-red"
                            aria-label="Edit Group"
                            onClick={(event) => handleClick(event, process?.rejectReasons || [])}
                          >
                            <EdgeSvgIcon
                              className="icon-size-12 cursor-pointer text-red mr-3"
                              color="error"
                            >
                              feather:book-open
                            </EdgeSvgIcon>
                          </button>
                        </Tooltip>
                        <Popover
                          open={open}
                          anchorEl={anchorEl}
                          onClose={handleClose}
                          anchorOrigin={{
                            vertical: "bottom",
                            horizontal: "left",
                          }}
                        >
                          <Typography sx={{ p: 1 }}>
                            {(activeRejectReasons && activeRejectReasons?.length > 0)
                              ? (activeRejectReasons?.map((rejects, index) => (
                                <li className="text-xs" key={index}>{rejects}</li>
                              ))
                              ) : (<li className="text-xs text-gray-500">No Reject Reasons</li>)}
                          </Typography>
                        </Popover>
                      </td>
                      <td className="p-6 align-middle text-right">
                        <p className="text-[12px] text-gray font-bold text-right">
                          {process.dbr}
                        </p>
                      </td>
                      <td className="p-6 align-middle text-right">
                        <p className="text-[12px] text-gray font-bold text-right">
                          {formatCurrency(process.totalUnsecuredExposure?.toString())}
                        </p>
                      </td>
                      <td className="p-6 align-middle text-right">
                        <p className="text-[12px] text-gray font-bold text-right">
                          {formatCurrency(process.grossIncome?.toString())}
                        </p>
                      </td>
                      <td className="p-6 align-middle text-right">
                        <p className="text-[12px] text-gray font-bold text-right">
                          {process.mueMultiplier}
                        </p>
                      </td>
                      <td className="p-6 align-middle text-left">
                        <p className="text-[12px] text-gray font-bold text-left">
                          {process.approvedLevelDesc}
                        </p>
                      </td>
                      <td className="p-6 align-middle text-left">
                        <p className="text-[12px] text-gray font-bold text-left">
                          {process.salesChannel}
                        </p>
                      </td>
                      <td className="p-6 align-middle text-center">
                        <p className="text-[12px] text-gray font-bold flex justify-center items-center">
                          {process.staticDataChanged ? <EdgeSvgIcon color={"success"}>feather:check</EdgeSvgIcon> : <EdgeSvgIcon color={"error"}>feather:x</EdgeSvgIcon>}

                        </p>
                      </td>
                      <td className="p-6 align-middle text-left">
                        <p className="text-[12px] text-gray font-bold text-left">
                          {process.accountNumber}
                        </p>
                      </td>
                      <td className="p-6 align-middle text-left">
                        <p className="text-[12px] text-gray font-bold text-left">
                          {process.relationShipID}
                        </p>
                      </td>
                      <td className="p-6 align-middle text-center">
                        <p className="text-[12px] text-gray flex justify-center items-center">
                          {process.showScoreCard &&
                            <button
                              className="flex items-center justify-between text-sm font-medium leading-5 text-red-600 focus:outline-none focus:shadow-outline-red"
                              aria-label="Scorecard"
                              onClick={(event) => {
                                toggleViewingRow(index);
                                setId(process.bundleProcessId);
                                setProcess(process.processInstance);
                              }}
                            >
                              <EdgeSvgIcon color={"error"}>feather:book</EdgeSvgIcon>
                            </button>}
                        </p>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="flex items-center justify-center mt-4">
              <Pagination
                count={bundledRequestReportList?.totalPages}
                siblingCount={0}
                page={page + 1}
                onChange={handlePageChange}
              />
            </div>
          </div>
        )
      }

      <Ve3Popup
        open={cardOpen}
        fullWidth={true}
        onClose={() => {
          setCardOpen(false);
        }}
        body={
          <div className="flex flex-col items-left p-12">
            <div className="grid grid-row gap-12 mt-8">
              <ScorecardDetails processId={processId} processInstance={processInstance} />
            </div>
            <div className="grid grid-row gap-212 mt-24">
              <ScoreCalculator processId={processId} processInstance={processInstance} />
            </div>
            <div className="grid grid-row gap-12 max-w-screen-sm mt-24">
              <ScorecardOutput processId={processId} processInstance={processInstance} />
            </div>
            <div className="grid grid-row gap-12 max-w-screen-sm mt-24">
              <CribScoreDetails cribScore={cribScoreInformation} />
            </div>
          </div>
        }
        setOpen={setCardOpen}
      />
    </Paper>

  );
};

export default BundledRequestReportTable;



