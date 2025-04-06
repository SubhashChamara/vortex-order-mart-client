import { Paper, Typography, Grid, Box, Card, CardContent, Collapse, Button, IconButton, Divider } from "@mui/material";
import { FC, useEffect, useState } from "react";
import { useNavbarState } from "../../../../../../@context/NavbarProvider";
import { useThemeMediaQuery } from "../../../../../../@edgevantage/hooks";
import { ExpandLess, ExpandMore } from "@mui/icons-material";
import { AgentCardReportDTO, AgentLoanReportDTO, BranchSummaryDTO, CardSummaryDTO, DrilldownReportDTO, LoanSummaryDTO } from "../@types/CCPLApprovalCommon";
import { Api } from "../../../../../../api/Api";
import Logger from "../../../../../../@helpers/Logger";
import moment from "moment";

type ReportFiltersProps = {
    approvalData: BranchSummaryDTO | null;
    startDate: Date | null;
    endDate: Date | null;
};

const BundleCCPLApprovals: FC<ReportFiltersProps> = ({ approvalData, startDate, endDate }) => {
    const { mobileOpen } = useNavbarState();
    const isMobile = useThemeMediaQuery((theme) => theme.breakpoints.down("lg"));

    const [getALPLData, setALPLData] = useState<LoanSummaryDTO[] | null>(null);
    const [getALPLAgentData, setALPLAgentData] = useState<AgentLoanReportDTO[] | null>(null);
    const [getCardData, setCardData] = useState<CardSummaryDTO[] | null>(null);
    const [getCardAgentData, setCardAgentData] = useState<AgentCardReportDTO[] | null>(null);
    const [getALPLDetailData, setALPLDetailData] = useState<DrilldownReportDTO[] | null>(null);
    const [getCardDetailData, setCardDetailtData] = useState<DrilldownReportDTO[] | null>(null);

    const [selectedALPLBranch, setSelectedALPLBranch] = useState<string | null>(null);
    const [selectedALPLAgent, setSelectedALPLAgent] = useState<string | null>(null);
    const [selectedALPLAgentName, setSelectedALPLAgentName] = useState<string | null>(null);
    const [selectedCardAgentName, setSelectedCardAgentName] = useState<string | null>(null);

    const [selectedCardBranch, setSelectedCardBranch] = useState<string | null>(null);
    const [selectedCardAgent, setSelectedCardAgent] = useState<string | null>(null);

    const [isCollapsed, setIsCollapsed] = useState(true);

    const toggleCollapse = () => {
        setIsCollapsed((prev) => !prev);
    };
    const handleALPLBranchClick = (branch: any) => {
        setSelectedALPLBranch(branch);
        setSelectedALPLAgent(null);
    };


    const handleALPLAgentClick = (agent: any, name: any) => {
        setSelectedALPLAgent(agent);
        setSelectedALPLAgentName(name)
    };

    const handleCardBranchSelect = (branch: any) => {
        setSelectedCardBranch(branch);
        setSelectedCardAgent(null);
    };

    const handleCardAgentSelect = (agent: any, name: any) => {
        setSelectedCardAgent(agent);
        setSelectedCardAgentName(name)
    };

    const formatCurrency = (amount: any) => {
        return new Intl.NumberFormat('en-US', {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
        }).format(amount);
    };

    useEffect(() => {
        if (approvalData) {
            setALPLData(approvalData.loanSummaries || null);
            setCardData(approvalData.cardSummaries || null);
        }

        if (selectedALPLBranch) {
            loadALPLAgentData(startDate, endDate, selectedALPLBranch);
        }

        if (selectedCardBranch) {
            loadCardAgentData(startDate, endDate, selectedCardBranch);
        }

        if (selectedALPLAgent) {
            loadALPLDetailedData(startDate, endDate, selectedALPLBranch, "ALPL", selectedALPLAgent)
        }

        if (selectedCardAgent) {
            loadCardDetailedData(startDate, endDate, selectedCardBranch, "CARD", selectedCardAgent)

        }
    }, [approvalData, selectedALPLBranch, selectedCardBranch, selectedALPLAgent, selectedCardAgent]);


    const loadALPLAgentData = async (
        startDate: Date | null,
        endDate: Date | null,
        branch: string | null
    ) => {
        const formattedStartDate = startDate ? moment(startDate).format("YYYY-MM-DD") : moment().format("YYYY-MM-DD");
        const formattedEndDate = endDate ? moment(endDate).format("YYYY-MM-DD") : moment().format("YYYY-MM-DD");

        const { data, err } = await Api.performRequest((r) =>
            r.reports.getCLPLAgentData(formattedStartDate, formattedEndDate, branch)
        );

        Logger.debug(
            "(Search Data) => { DATA: " +
            JSON.stringify(data) +
            " , ERROR: " +
            JSON.stringify(err)
        );
        if (data) {
            setALPLAgentData(data);
        }
    }

    const loadCardAgentData = async (
        startDate: Date | null,
        endDate: Date | null,
        branch: string | null
    ) => {
        const formattedStartDate = startDate ? moment(startDate).format("YYYY-MM-DD") : moment().format("YYYY-MM-DD");
        const formattedEndDate = endDate ? moment(endDate).format("YYYY-MM-DD") : moment().format("YYYY-MM-DD");

        const { data, err } = await Api.performRequest((r) =>
            r.reports.getCardAgentData(formattedStartDate, formattedEndDate, branch)
        );

        Logger.debug(
            "(Search Data) => { DATA: " +
            JSON.stringify(data) +
            " , ERROR: " +
            JSON.stringify(err)
        );
        if (data) {
            setCardAgentData(data);
        }
    }

    const loadCardDetailedData = async (
        startDate: Date | null,
        endDate: Date | null,
        branch: string | null,
        type: string | null,
        agent: string | null
    ) => {
        const formattedStartDate = startDate ? moment(startDate).format("YYYY-MM-DD") : moment().format("YYYY-MM-DD");
        const formattedEndDate = endDate ? moment(endDate).format("YYYY-MM-DD") : moment().format("YYYY-MM-DD");

        const { data, err } = await Api.performRequest((r) =>
            r.reports.getApprovalDetailData(formattedStartDate, formattedEndDate, branch, type, agent)
        );

        Logger.debug(
            "(Search Data) => { DATA: " +
            JSON.stringify(data) +
            " , ERROR: " +
            JSON.stringify(err)
        );
        if (data) {
            setCardDetailtData(data);
        }
    }

    const loadALPLDetailedData = async (
        startDate: Date | null,
        endDate: Date | null,
        branch: string | null,
        type: string | null,
        agent: string | null
    ) => {
        const formattedStartDate = startDate ? moment(startDate).format("YYYY-MM-DD") : moment().format("YYYY-MM-DD");
        const formattedEndDate = endDate ? moment(endDate).format("YYYY-MM-DD") : moment().format("YYYY-MM-DD");

        const { data, err } = await Api.performRequest((r) =>
            r.reports.getApprovalDetailData(formattedStartDate, formattedEndDate, branch, type, agent)
        );

        Logger.debug(
            "(Search Data) => { DATA: " +
            JSON.stringify(data) +
            " , ERROR: " +
            JSON.stringify(err)
        );
        if (data) {
            setALPLDetailData(data);
        }
    }


    return (
        <Paper elevation={3} style={{ padding: '16px', margin: '16px 0' }}>
            <div className="text-xs font-semibold tracking-wide text-left">
                <div className="flex justify-between items-center mb-4">
                    <div className="text-red-600 font-bold flex-col pl-6">
                        <div>Approval Status</div>
                        <div className="text-[12px] text-gray">
                            This provides Approval status information
                        </div>
                    </div>
                    <IconButton onClick={toggleCollapse}>
                        {isCollapsed ? <ExpandLess /> : <ExpandMore />}
                    </IconButton>
                </div>
            </div>
            <Collapse in={isCollapsed}>
                <br />
                <Divider></Divider>
                <div className="grid grid-cols-2 gap-8">
                    {/* Left Section - ALPL */}
                    <Box style={{ flex: 1, margin: '0 8px', height: 'auto' }}>
                        <br></br>
                        <div
                            className="text-[20px] font-600 text-gray"
                            style={{ marginBottom: '16px', textAlign: 'left' }}
                        >
                            ALPL
                        </div>
                        <Card style={{ width: '100%', height: 'auto', display: 'flex', flexDirection: 'column' }}>
                            <CardContent style={{ flex: 1 }}>
                                <Typography variant="body2" style={{ fontWeight: 'bold', marginBottom: '16px' }}>
                                    Branch Summary
                                </Typography>
                                <div className="w-full">
                                    {getALPLData && getALPLData.length > 0 ? (
                                        <div style={{ position: 'relative' }}>
                                            {/* Main Table Wrapper */}
                                            <table
                                                id="my-table"
                                                className="w-full whitespace-no-wrap"
                                                style={{ borderCollapse: 'collapse', tableLayout: 'fixed' }}
                                            >
                                                {/* Fixed Header */}
                                                <thead>
                                                    <tr className="whitespace-nowrap divide-x-1">
                                                        <th className="p-6 text-left" style={{ width: '27%', padding: '12px', textAlign: 'left' }}>Branch</th>
                                                        <th className="p-6 text-left" style={{ width: '27%', padding: '12px', textAlign: 'left' }}>No's</th>
                                                        <th className="p-6 text-left" style={{ width: '27%', padding: '12px', textAlign: 'left' }}>Net Value</th>
                                                        <th className="p-6 text-left" style={{ width: '30%', padding: '12px', textAlign: 'left' }}>Gross Value</th>
                                                    </tr>
                                                </thead>
                                            </table>
                                            {/* Scrollable Body */}
                                            <div
                                                style={{
                                                    maxHeight: '180px',
                                                    overflowY: 'auto',
                                                    overflowX: 'hidden',
                                                    minHeight: '180px',
                                                }}
                                            >
                                                <table
                                                    id="my-table-body"
                                                    className="w-full whitespace-no-wrap"
                                                    style={{ borderCollapse: 'collapse', tableLayout: 'fixed' }}
                                                >
                                                    <tbody>
                                                        {getALPLData.map((row, rowIndex) => (
                                                            <tr key={rowIndex} className="text-black h-full bg-white shadow-2">
                                                                <td className="p-6 text-[12px] align-middle text-left" style={{ width: '27%', padding: '12px', textAlign: 'left' }}>
                                                                    <p className="text-[12px] text-gray font-bold">
                                                                        {row.branchName}
                                                                    </p>
                                                                </td>
                                                                <td
                                                                    style={{
                                                                        width: '27%',
                                                                        padding: '12px',
                                                                        textAlign: 'left',
                                                                    }}

                                                                >
                                                                    <Button
                                                                        variant="outlined"
                                                                        className="w-32 px-24 border-gray bg-grey-50 text-gray-800 cursor-pointer hover:bg-gray-200 focus:outline-none active:scale-95 active:bg-gray-300"
                                                                        disabled={row.count == 0}
                                                                        onClick={(e) => {
                                                                            e.preventDefault();
                                                                            handleALPLBranchClick(row.branchName);
                                                                        }}
                                                                    >
                                                                        {row.count}
                                                                    </Button>
                                                                </td>
                                                                <td className="p-6 text-[12px] align-middle text-left" style={{ width: '27%', padding: '12px', textAlign: 'left' }}>
                                                                    <p className="text-[12px] text-gray font-bold">
                                                                        {formatCurrency(row.netAmount)}
                                                                    </p>
                                                                </td>
                                                                <td className="p-6 text-[12px] align-middle text-left" style={{ width: '27%', padding: '12px', textAlign: 'left' }}>
                                                                    <p className="text-[12px] text-gray font-bold">
                                                                        {formatCurrency(row.approvedAmount)}
                                                                    </p>
                                                                </td>
                                                            </tr>
                                                        ))}
                                                    </tbody>
                                                </table>
                                            </div>
                                            {/* Fixed Footer */}
                                            <table
                                                id="my-table-footer"
                                                className="w-full whitespace-no-wrap"
                                                style={{ borderCollapse: 'collapse', tableLayout: 'fixed' }}
                                            >
                                                <tfoot>
                                                    <tr style={{ backgroundColor: '#f3f3f3' }}>
                                                        <td className="p-6 text-[12px] align-middle text-left" style={{ width: '32%', padding: '12px', fontWeight: 'bold', textAlign: 'left' }}>
                                                            Total
                                                        </td>
                                                        <td className="p-6 text-[12px] align-middle text-left" style={{ width: '25%', padding: '12px', fontWeight: 'bold', textAlign: 'left' }}>
                                                            {getALPLData.reduce((acc, row) => acc + row.count, 0)}
                                                        </td>
                                                        <td className="p-6 text-[12px] align-middle text-left" style={{ width: '28%', padding: '12px', fontWeight: 'bold', textAlign: 'left' }}>
                                                            {formatCurrency(
                                                                getALPLData.reduce((acc, row) => acc + row.netAmount, 0)
                                                            )}
                                                        </td>
                                                        <td className="p-6 text-[12px] align-middle text-left" style={{ width: '27%', padding: '12px', fontWeight: 'bold', textAlign: 'left' }}>
                                                            {formatCurrency(
                                                                getALPLData.reduce((acc, row) => acc + row.approvedAmount, 0)
                                                            )}
                                                        </td>
                                                    </tr>
                                                </tfoot>
                                            </table>
                                        </div>
                                    ) : (
                                        <div
                                            style={{
                                                display: 'flex',
                                                justifyContent: 'center',
                                                alignItems: 'center',
                                                maxHeight: '260px',
                                                minHeight: '260px',
                                                height: '100%',
                                                width: '100%',
                                            }}
                                            className="text-center"
                                        >
                                            No records found for the selected date range.
                                        </div>
                                    )}
                                </div>
                            </CardContent>
                        </Card>


                        <br />

                        {/* Agent Summary */}
                        {getALPLAgentData && (
                            <Card style={{ width: '100%', height: 'auto', display: 'flex', flexDirection: 'column' }}>
                                <CardContent style={{ flex: 1 }}>
                                    <Typography variant="body2" style={{ fontWeight: 'bold', marginBottom: '16px' }}>
                                        Agent Summary - {selectedALPLBranch}
                                    </Typography>
                                    <div className="w-full">
                                        {getALPLAgentData.length > 0 ? (
                                            <div style={{ position: 'relative' }}>
                                                {/* Main Table Wrapper */}
                                                <table
                                                    id="agent-table"
                                                    className="w-full whitespace-no-wrap"
                                                    style={{ borderCollapse: 'collapse', tableLayout: 'fixed' }}
                                                >
                                                    {/* Fixed Header */}
                                                    <thead>
                                                        <tr className="whitespace-nowrap divide-x-1">
                                                            <th className="p-6 text-left" style={{ width: '27%', padding: '12px', textAlign: 'left' }}>Agent</th>
                                                            <th className="p-6 text-left" style={{ width: '27%', padding: '12px', textAlign: 'left' }}>No's</th>
                                                            <th className="p-6 text-left" style={{ width: '27%', padding: '12px', textAlign: 'left' }}>Net Value</th>
                                                            <th className="p-6 text-left" style={{ width: '30%', padding: '12px', textAlign: 'left' }}>Gross Value</th>
                                                        </tr>
                                                    </thead>
                                                </table>
                                                {/* Scrollable Body */}
                                                <div
                                                    style={{
                                                        maxHeight: '180px',
                                                        overflowY: 'auto',
                                                        overflowX: 'hidden',
                                                        minHeight: '180px',
                                                    }}
                                                >
                                                    <table
                                                        id="agent-table-body"
                                                        className="w-full whitespace-no-wrap"
                                                        style={{ borderCollapse: 'collapse', tableLayout: 'fixed' }}
                                                    >
                                                        <tbody>
                                                            {getALPLAgentData.map((row, rowIndex) => (
                                                                <tr key={rowIndex} className="text-black h-full bg-white shadow-2">
                                                                    <td className="p-6 text-[12px] align-middle text-left" style={{ width: '27%', padding: '12px', textAlign: 'left' }}>
                                                                        <p className="text-[12px] text-gray font-bold">
                                                                            {row.dsrName}
                                                                        </p>
                                                                    </td>
                                                                    <td
                                                                        style={{
                                                                            width: '27%',
                                                                            padding: '12px',
                                                                            textAlign: 'left',
                                                                        }}

                                                                    >
                                                                        <Button
                                                                            variant="outlined"
                                                                            className="w-32 px-24 border-gray bg-grey-50 text-gray-800 cursor-pointer hover:bg-gray-200 focus:outline-none active:scale-95 active:bg-gray-300"
                                                                            disabled={row.count == 0}
                                                                            onClick={(e) => {
                                                                                e.preventDefault();
                                                                                handleALPLAgentClick(row.agentId, row.dsrName);
                                                                            }}
                                                                        >
                                                                            {row.count}
                                                                        </Button>
                                                                    </td>
                                                                    <td className="p-6 text-[12px] align-middle text-left" style={{ width: '27%', padding: '12px', textAlign: 'left' }}>
                                                                        <p className="text-[12px] text-gray font-bold">
                                                                            {formatCurrency(row.netAmount)}
                                                                        </p>
                                                                    </td>
                                                                    <td className="p-6 text-[12px] align-middle text-left" style={{ width: '30%', padding: '12px', textAlign: 'left' }}>
                                                                        <p className="text-[12px] text-gray font-bold">
                                                                            {formatCurrency(row.grossAmount)}
                                                                        </p>
                                                                    </td>
                                                                </tr>
                                                            ))}
                                                        </tbody>
                                                    </table>
                                                </div>
                                                {/* Fixed Footer */}
                                                <table
                                                    id="agent-table-footer"
                                                    className="w-full whitespace-no-wrap"
                                                    style={{ borderCollapse: 'collapse', tableLayout: 'fixed' }}
                                                >
                                                    <tfoot>
                                                        <tr style={{ backgroundColor: '#f3f3f3' }}>
                                                            <td className="p-6 text-[12px] align-middle text-left" style={{ width: '35%', padding: '12px', fontWeight: 'bold', textAlign: 'left' }}>
                                                                Total
                                                            </td>
                                                            <td className="p-6 text-[12px] align-middle text-left" style={{ width: '25%', padding: '12px', fontWeight: 'bold', textAlign: 'left' }}>
                                                                {getALPLAgentData.reduce((acc, row) => acc + row.count, 0)}
                                                            </td>
                                                            <td className="p-6 text-[12px] align-middle text-left" style={{ width: '31%', padding: '12px', fontWeight: 'bold', textAlign: 'left' }}>
                                                                {formatCurrency(getALPLAgentData.reduce((acc, row) => acc + row.netAmount, 0))}
                                                            </td>
                                                            <td className="p-6 text-[12px] align-middle text-left" style={{ width: '33%', padding: '12px', fontWeight: 'bold', textAlign: 'left' }}>
                                                                {formatCurrency(getALPLAgentData.reduce((acc, row) => acc + row.grossAmount, 0))}
                                                            </td>
                                                        </tr>
                                                    </tfoot>
                                                </table>
                                            </div>
                                        ) : (
                                            <div
                                                style={{
                                                    display: 'flex',
                                                    justifyContent: 'center',
                                                    alignItems: 'center',
                                                    maxHeight: '260px',
                                                    minHeight: '260px',
                                                    height: '100%',
                                                    width: '100%',
                                                }}
                                                className="text-center"
                                            >
                                                No records found for the selected date range.
                                            </div>
                                        )}
                                    </div>
                                </CardContent>
                            </Card>
                        )}

                        <br />

                        {/* Detail View */}
                        {selectedALPLAgent && (
                            <Card style={{ width: '100%', height: 'auto', display: 'flex', flexDirection: 'column' }}>
                                <CardContent style={{ flex: 1 }}>
                                    <Typography variant="body2" style={{ fontWeight: 'bold', marginBottom: '16px' }}>
                                        Detail View - {selectedALPLAgentName}
                                    </Typography>
                                    <div
                                        style={{
                                            width: '100%',
                                            overflowX: 'auto',

                                        }}
                                    >
                                        {getALPLDetailData && getALPLDetailData.length > 0 ? (
                                            <>
                                                <div
                                                    style={{
                                                        width: '100%',
                                                        overflowX: 'auto',
                                                        overflowY: 'auto',
                                                        maxHeight: '200px',
                                                        minHeight: '250px',
                                                    }}
                                                >
                                                    <table
                                                        id="detail-table"
                                                        className="w-full"
                                                        style={{
                                                            borderCollapse: 'collapse',
                                                            whiteSpace: 'nowrap',
                                                        }}
                                                    >
                                                        <thead>
                                                            <tr className="whitespace-nowrap divide-x-1">
                                                                <th style={{ padding: '12px', textAlign: 'left' }}>WF Ref#</th>
                                                                <th style={{ padding: '12px', textAlign: 'left' }}>Customer Name</th>
                                                                <th style={{ padding: '12px', textAlign: 'left' }}>NIC</th>
                                                                <th style={{ padding: '12px', textAlign: 'left' }}>Approved Date</th>
                                                                <th style={{ padding: '12px', textAlign: 'left' }}>Agent</th>
                                                                <th style={{ padding: '12px', textAlign: 'left' }}>Net Value</th>
                                                                <th style={{ padding: '12px', textAlign: 'left' }}>Gross Value</th>
                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                            {getALPLDetailData.map((row, rowIndex) => (
                                                                <tr key={rowIndex} className="text-black h-full bg-white shadow-2">
                                                                    <td style={{ padding: '12px', textAlign: 'left' }}>
                                                                        <p className="text-[12px] text-gray font-bold">
                                                                            {row.businessKey}
                                                                        </p>
                                                                    </td>
                                                                    <td style={{ padding: '12px', textAlign: 'left' }}>
                                                                        <p className="text-[12px] text-gray font-bold">
                                                                            {row.applicantName}
                                                                        </p>
                                                                    </td>
                                                                    <td style={{ padding: '12px', textAlign: 'left' }}>
                                                                        <p className="text-[12px] text-gray font-bold">
                                                                            {row.applicantNIC}
                                                                        </p>
                                                                    </td>
                                                                    <td style={{ padding: '12px', textAlign: 'left' }}>
                                                                        <p className="text-[12px] text-gray font-bold">
                                                                            {row.approveDate}
                                                                        </p>
                                                                    </td>
                                                                    <td style={{ padding: '12px', textAlign: 'left' }}>
                                                                        <p className="text-[12px] text-gray font-bold">
                                                                            {row.dsrName}
                                                                        </p>
                                                                    </td>
                                                                    <td style={{ padding: '12px', textAlign: 'left' }}>
                                                                        <p className="text-[12px] text-gray font-bold">
                                                                            {formatCurrency(row.amount)}
                                                                        </p>
                                                                    </td>
                                                                    <td style={{ padding: '12px', textAlign: 'left' }}>
                                                                        <p className="text-[12px] text-gray font-bold">
                                                                            {formatCurrency(row.approvedAmount)}
                                                                        </p>
                                                                    </td>
                                                                </tr>
                                                            ))}
                                                        </tbody>
                                                    </table>
                                                </div>
                                                {/* Sticky Total Row */}
                                                <div
                                                    style={{
                                                        backgroundColor: '#f3f3f3',
                                                        display: 'flex',
                                                        justifyContent: 'space-between',
                                                        padding: '12px',
                                                        fontWeight: 'bold',
                                                        borderTop: '1px solid #ccc',
                                                        position: 'sticky',
                                                        bottom: 0,
                                                        zIndex: 1,
                                                    }}
                                                >
                                                    <span style={{ textAlign: 'left' }}>Total</span>
                                                    <span style={{ textAlign: 'left' }}>
                                                        Net Value :  {formatCurrency(getALPLDetailData.reduce((acc, row) => acc + (Number(row.amount) || 0), 0))}

                                                    </span>
                                                    <span style={{ textAlign: 'left' }}>

                                                        Gross Value :  {formatCurrency(getALPLDetailData.reduce((acc, row) => acc + (Number(row.approvedAmount) || 0), 0))}


                                                    </span>
                                                </div>
                                            </>
                                        ) : (
                                            <div
                                                style={{
                                                    display: 'flex',
                                                    justifyContent: 'center',
                                                    alignItems: 'center',
                                                    maxHeight: '260px',
                                                    minHeight: '260px',
                                                    height: '100%',
                                                    width: '100%',
                                                }}
                                                className="text-center"
                                            >
                                                No records found for the selected date range.
                                            </div>
                                        )}
                                    </div>
                                </CardContent>
                            </Card>
                        )}



                    </Box>

                    {/* Right Section - CARD */}
                    <Box style={{ flex: 1, margin: '0 8px', height: 'auto' }}>
                        <br></br>
                        <div
                            className="text-[20px] font-600 text-gray"
                            style={{ marginBottom: '16px', textAlign: 'left' }}
                        >
                            CARD
                        </div>

                        {/* Branch Summary */}
                        <Card style={{ width: '100%', height: 'auto', display: 'flex', flexDirection: 'column' }}>
                            <CardContent style={{ flex: 1 }}>
                                <Typography variant="body2" style={{ fontWeight: 'bold', marginBottom: '16px' }}>
                                    Branch Summary
                                </Typography>
                                <div className="w-full">
                                    {getCardData && getCardData.length > 0 ? (
                                        <div style={{ position: 'relative' }}>
                                            {/* Fixed Header */}
                                            <table
                                                id="my-table-header"
                                                className="w-full whitespace-no-wrap"
                                                style={{ borderCollapse: 'collapse', tableLayout: 'fixed' }}
                                            >
                                                <thead>
                                                    <tr className="whitespace-nowrap divide-x-1">
                                                        <th className="p-6 text-left" style={{ width: '33%', padding: '12px', textAlign: 'left' }}>
                                                            Branch
                                                        </th>
                                                        <th className="p-6 text-left" style={{ width: '33%', padding: '12px', textAlign: 'left' }}>
                                                            No's
                                                        </th>
                                                        <th className="p-6 text-left" style={{ width: '34%', padding: '12px', textAlign: 'left' }}>
                                                            Card Limit
                                                        </th>
                                                    </tr>
                                                </thead>
                                            </table>
                                            {/* Scrollable Body */}
                                            <div
                                                style={{
                                                    maxHeight: '180px',
                                                    overflowY: 'auto',
                                                    overflowX: 'hidden',
                                                    minHeight: '180px',
                                                }}
                                            >
                                                <table
                                                    id="my-table-body"
                                                    className="w-full whitespace-no-wrap"
                                                    style={{ borderCollapse: 'collapse', tableLayout: 'fixed' }}
                                                >
                                                    <tbody>
                                                        {getCardData.map((row, rowIndex) => (
                                                            <tr key={rowIndex} className="text-black h-full bg-white shadow-2">
                                                                <td
                                                                    className="p-6 text-[12px] align-middle text-left"
                                                                    style={{ width: '37%', padding: '12px', textAlign: 'left' }}
                                                                >
                                                                    <p className="text-[12px] text-gray font-bold">{row.branchName}</p>
                                                                </td>
                                                                <td

                                                                    style={{ width: '37%', padding: '12px', textAlign: 'left' }}

                                                                >
                                                                    <Button
                                                                        variant="outlined"
                                                                        className="w-32 px-24 border-gray bg-grey-50 text-gray-800 cursor-pointer hover:bg-gray-200 focus:outline-none active:scale-95 active:bg-gray-300"
                                                                        disabled={row.count == 0}
                                                                        onClick={(e) => {
                                                                            e.preventDefault();
                                                                            handleCardBranchSelect(row.branchName);
                                                                        }}
                                                                    >
                                                                        {row.count}
                                                                    </Button>
                                                                </td>
                                                                <td
                                                                    className="p-6 text-[12px] align-middle text-left"
                                                                    style={{ width: '34%', padding: '12px', textAlign: 'left' }}
                                                                >
                                                                    <p className="text-[12px] text-gray font-bold">{formatCurrency(row.underwriterLimit)}</p>
                                                                </td>
                                                            </tr>
                                                        ))}
                                                    </tbody>
                                                </table>
                                            </div>
                                            {/* Fixed Footer */}
                                            <table
                                                id="my-table-footer"
                                                className="w-full whitespace-no-wrap"
                                                style={{ borderCollapse: 'collapse', tableLayout: 'fixed' }}
                                            >
                                                <tfoot>
                                                    <tr style={{ backgroundColor: '#f3f3f3' }}>
                                                        <td
                                                            className="p-6 text-[12px] align-middle text-left"
                                                            style={{
                                                                width: '45%',
                                                                padding: '12px',
                                                                fontWeight: 'bold',
                                                                textAlign: 'left',
                                                            }}
                                                        >
                                                            Total
                                                        </td>
                                                        <td
                                                            className="p-6 text-[12px] align-middle text-left"
                                                            style={{
                                                                width: '35%',
                                                                padding: '12px',
                                                                fontWeight: 'bold',
                                                                textAlign: 'left',
                                                            }}
                                                        >
                                                            {getCardData.reduce((acc, row) => acc + row.count, 0)}
                                                        </td>
                                                        <td
                                                            className="p-6 text-[12px] align-middle text-left"
                                                            style={{
                                                                width: '35%',
                                                                padding: '12px',
                                                                fontWeight: 'bold',
                                                                textAlign: 'left',
                                                            }}
                                                        >
                                                            {formatCurrency(getCardData.reduce((acc, row) => acc + row.underwriterLimit, 0))}
                                                        </td>
                                                    </tr>
                                                </tfoot>
                                            </table>
                                        </div>
                                    ) : (
                                        <div
                                            style={{
                                                display: 'flex',
                                                justifyContent: 'center',
                                                alignItems: 'center',
                                                maxHeight: '260px',
                                                minHeight: '260px',
                                                height: '100%',
                                                width: '100%',
                                            }}
                                            className="text-center"
                                        >
                                            No records found for the selected date range.
                                        </div>
                                    )}
                                </div>
                            </CardContent>
                        </Card>

                        <br />

                        {/* Agent Summary */}
                        {getCardAgentData && (
                            <Card style={{ width: '100%', height: 'auto', display: 'flex', flexDirection: 'column' }}>
                                <CardContent style={{ flex: 1 }}>
                                    <Typography variant="body2" style={{ fontWeight: 'bold', marginBottom: '16px' }}>
                                        Agent Summary - {selectedCardBranch}
                                    </Typography>
                                    <div className="w-full">
                                        {getCardAgentData.length > 0 ? (
                                            <div style={{ position: 'relative' }}>
                                                {/* Main Table Wrapper */}
                                                <table
                                                    id="card-agent-table"
                                                    className="w-full whitespace-no-wrap"
                                                    style={{ borderCollapse: 'collapse', tableLayout: 'fixed' }}
                                                >
                                                    {/* Fixed Header */}
                                                    <thead>
                                                        <tr className="whitespace-nowrap divide-x-1">
                                                            <th className="p-6 text-left" style={{ width: '33%', padding: '12px', textAlign: 'left' }}>Agent</th>
                                                            <th className="p-6 text-left" style={{ width: '33%', padding: '12px', textAlign: 'left' }}>No's</th>
                                                            <th className="p-6 text-left" style={{ width: '34%', padding: '12px', textAlign: 'left' }}>Card Limit</th>
                                                        </tr>
                                                    </thead>
                                                </table>
                                                {/* Scrollable Body */}
                                                <div
                                                    style={{
                                                        maxHeight: '180px',
                                                        overflowY: 'auto',
                                                        overflowX: 'hidden',
                                                        minHeight: '180px',
                                                    }}
                                                >
                                                    <table
                                                        id="card-agent-table-body"
                                                        className="w-full whitespace-no-wrap"
                                                        style={{ borderCollapse: 'collapse', tableLayout: 'fixed' }}
                                                    >
                                                        <tbody>
                                                            {getCardAgentData.map((row, rowIndex) => (
                                                                <tr key={rowIndex} className="text-black h-full bg-white shadow-2">
                                                                    <td className="p-6 text-[12px] align-middle text-left" style={{ width: '36%', padding: '12px', textAlign: 'left' }}>
                                                                        <p className="text-[12px] text-gray font-bold">
                                                                            {row.dsrName}
                                                                        </p>
                                                                    </td>
                                                                    <td
                                                                        style={{
                                                                            width: '35%',
                                                                            padding: '12px',
                                                                            textAlign: 'left',
                                                                        }}

                                                                    >
                                                                        <Button
                                                                            variant="outlined"
                                                                            className="w-32 px-24 border-gray bg-grey-50 text-gray-800 cursor-pointer hover:bg-gray-200 focus:outline-none active:scale-95 active:bg-gray-300"
                                                                            disabled={row.count == 0}
                                                                            onClick={(e) => {
                                                                                e.preventDefault();
                                                                                handleCardAgentSelect(row.agentId, row.dsrName)
                                                                            }}
                                                                        >
                                                                            {row.count}
                                                                        </Button>
                                                                    </td>
                                                                    <td className="p-6 text-[12px] align-middle text-left" style={{ width: '34%', padding: '12px', textAlign: 'left' }}>
                                                                        <p className="text-[12px] text-gray font-bold">
                                                                            {formatCurrency(row.cardLimit)}
                                                                        </p>
                                                                    </td>
                                                                </tr>
                                                            ))}
                                                        </tbody>
                                                    </table>
                                                </div>
                                                {/* Fixed Footer */}
                                                <table
                                                    id="card-agent-table-footer"
                                                    className="w-full whitespace-no-wrap"
                                                    style={{ borderCollapse: 'collapse', tableLayout: 'fixed' }}
                                                >
                                                    <tfoot>
                                                        <tr style={{ backgroundColor: '#f3f3f3' }}>
                                                            <td className="p-6 text-[12px] align-middle text-left" style={{ width: '38%', padding: '12px', fontWeight: 'bold', textAlign: 'left' }}>
                                                                Total
                                                            </td>
                                                            <td className="p-6 text-[12px] align-middle text-left" style={{ width: '28%', padding: '12px', fontWeight: 'bold', textAlign: 'left' }}>
                                                                {getCardAgentData.reduce((acc, row) => acc + row.count, 0)}
                                                            </td>
                                                            <td className="p-6 text-[12px] align-middle text-left" style={{ width: '30%', padding: '12px', fontWeight: 'bold', textAlign: 'left' }}>
                                                                {formatCurrency(getCardAgentData.reduce((acc, row) => acc + row.cardLimit, 0))}
                                                            </td>
                                                        </tr>
                                                    </tfoot>
                                                </table>
                                            </div>
                                        ) : (
                                            <div
                                                style={{
                                                    display: 'flex',
                                                    justifyContent: 'center',
                                                    alignItems: 'center',
                                                    maxHeight: '260px',
                                                    minHeight: '260px',
                                                    height: '100%',
                                                    width: '100%',
                                                }}
                                                className="text-center"
                                            >
                                                No records found for the selected date range.
                                            </div>
                                        )}
                                    </div>
                                </CardContent>
                            </Card>
                        )}

                        <br />

                        {/* Detail View */}
                        {selectedCardAgent && (
                            <Card style={{ width: '100%', height: 'auto', display: 'flex', flexDirection: 'column' }}>
                                <CardContent style={{ flex: 1 }}>
                                    <Typography variant="body2" style={{ fontWeight: 'bold', marginBottom: '16px' }}>
                                        Detail View - {selectedCardAgentName}
                                    </Typography>
                                    <div
                                        style={{
                                            width: '100%',
                                            overflowX: 'auto',

                                        }}
                                    >
                                        {getCardDetailData && getCardDetailData?.length > 0 ? (
                                            <>
                                                <div

                                                    style={{
                                                        width: '100%',
                                                        overflowX: 'auto',
                                                        overflowY: 'auto',
                                                        maxHeight: '200px',
                                                        minHeight: '250px',
                                                    }}
                                                >
                                                    <table
                                                        id="my-table"
                                                        className="w-full"
                                                        style={{
                                                            borderCollapse: 'collapse',
                                                            whiteSpace: 'nowrap',
                                                        }}
                                                    >
                                                        <thead>
                                                            <tr className="whitespace-nowrap divide-x-1">
                                                                <th style={{ padding: '12px', textAlign: 'left' }}>WF Ref#</th>
                                                                <th style={{ padding: '12px', textAlign: 'left' }}>Customer Name</th>
                                                                <th style={{ padding: '12px', textAlign: 'left' }}>NIC</th>
                                                                <th style={{ padding: '12px', textAlign: 'left' }}>Approved Date</th>
                                                                <th style={{ padding: '12px', textAlign: 'left' }}>Agent</th>
                                                                <th style={{ padding: '12px', textAlign: 'left' }}>Card Limit</th>
                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                            {getCardDetailData.map((row, rowIndex) => (
                                                                <tr
                                                                    key={rowIndex}
                                                                    className="text-black h-full bg-white shadow-2"
                                                                >
                                                                    <td style={{ padding: '12px', textAlign: 'left' }}>
                                                                        <p className="text-[12px] text-gray font-bold">{row.businessKey}</p>
                                                                    </td>
                                                                    <td style={{ padding: '12px', textAlign: 'left' }}>
                                                                        <p className="text-[12px] text-gray font-bold">{row.applicantName}</p>
                                                                    </td>
                                                                    <td style={{ padding: '12px', textAlign: 'left' }}>
                                                                        <p className="text-[12px] text-gray font-bold">{row.applicantNIC}</p>
                                                                    </td>
                                                                    <td style={{ padding: '12px', textAlign: 'left' }}>
                                                                        <p className="text-[12px] text-gray font-bold">{row.approveDate}</p>
                                                                    </td>
                                                                    <td style={{ padding: '12px', textAlign: 'left' }}>
                                                                        <p className="text-[12px] text-gray font-bold">{row.dsrName}</p>
                                                                    </td>
                                                                    <td style={{ padding: '12px', textAlign: 'left' }}>
                                                                        <p className="text-[12px] text-gray font-bold">{formatCurrency(row.amount.toFixed)}</p>
                                                                    </td>
                                                                </tr>
                                                            ))}
                                                        </tbody>
                                                    </table>
                                                </div>
                                                {/* Sticky Total Row */}
                                                <div
                                                    style={{
                                                        backgroundColor: '#f3f3f3',
                                                        display: 'flex',
                                                        justifyContent: 'space-between',
                                                        padding: '12px',
                                                        fontWeight: 'bold',
                                                        borderTop: '1px solid #ccc',
                                                        position: 'sticky',
                                                        bottom: 0,
                                                        zIndex: 1,
                                                    }}
                                                >
                                                    <span>Total</span>
                                                    <span>Credit Limit : {formatCurrency(getCardDetailData.reduce((acc, row) => acc + (Number(row.amount) || 0), 0))}</span>
                                                </div>
                                            </>
                                        ) : (
                                            <div
                                                style={{
                                                    display: 'flex',
                                                    justifyContent: 'center',
                                                    alignItems: 'center',
                                                    maxHeight: '260px',
                                                    minHeight: '260px',
                                                    height: '100%',
                                                    width: '100%',
                                                }}
                                                className="text-center"
                                            >
                                                No records found for the selected date range.
                                            </div>
                                        )}
                                    </div>
                                </CardContent>
                            </Card>
                        )}


                    </Box>

                </div>
            </Collapse>
        </Paper>

    );

};

export default BundleCCPLApprovals;
