import {
    Paper,
    Typography,
    Card,
    CardContent,
    Collapse,
    Button,
    IconButton,
    Divider,
    Box,
} from "@mui/material";
import { FC, useEffect, useState } from "react";
import { useNavbarState } from "../../../../../../@context/NavbarProvider";
import { useThemeMediaQuery } from "../../../../../../@edgevantage/hooks";
import { ExpandLess, ExpandMore } from "@mui/icons-material";
import { BranchAgentWiseReport, BranchDataSummaryDTO, LoanApplicationModel, SourceGenerateDTO } from "../@types/CCPLSourcingCommon";
import { Api } from "../../../../../../api/Api";
import moment from "moment";
import Logger from "../../../../../../@helpers/Logger";

type ReportFiltersProps = {
    sourcingData: SourceGenerateDTO | null;
    startDate: Date | null;
    endDate: Date | null;
};

const BundleCCPLSourcing: FC<ReportFiltersProps> = ({ sourcingData, startDate, endDate }) => {
    const { mobileOpen } = useNavbarState();
    const isMobile = useThemeMediaQuery((theme) => theme.breakpoints.down("lg"));

    const [isCollapsed, setIsCollapsed] = useState(true);

    const [getInitiatedData, setInitiatedData] = useState<BranchDataSummaryDTO[] | null>(null);
    const [getApprovedData, setApprovedData] = useState<BranchDataSummaryDTO[] | null>(null);
    const [getApprovedCardAgentData, setApprovedCardAgentData] = useState<BranchAgentWiseReport[] | null>(null);
    const [getApprovedALPLAgentData, setApprovedALPLAgentData] = useState<BranchAgentWiseReport[] | null>(null);

    const [getInitiatedCardAgentData, setInitiatedCardAgentData] = useState<BranchAgentWiseReport[] | null>(null);
    const [getInitiatedALPLAgentData, setInitiatedALPLAgentData] = useState<BranchAgentWiseReport[] | null>(null);

    const [getApprovedCardAgent, setApprovedCardAgent] = useState<LoanApplicationModel[] | null>(null);
    const [getApprovedALPLAgent, setApprovedALPLAgent] = useState<LoanApplicationModel[] | null>(null);

    const [getInitiatedCardAgent, setInitiatedCardAgent] = useState<LoanApplicationModel[] | null>(null);
    const [getInitiatedALPLAgent, setInitiatedALPLAgent] = useState<LoanApplicationModel[] | null>(null);



    const [selectedApprovedBranch, setSelectedApprovedBranch] = useState<string | null>(null);
    const [selectedApprovedStatus, setSelectedApprovedStatus] = useState<string | null>(null);

    const [selectedInitiatedBranch, setSelectedInitiatedBranch] = useState<string | null>(null);
    const [selectedInitiatedStatus, setSelectedInitiatedStatus] = useState<string | null>(null);

    const [selectedInitiatedAgent, setSelectedInitiatedAgent] = useState<string | null>(null);
    const [selectedApprovedAgent, setSelectedApprovedAgent] = useState<string | null>(null);
    const [selectedAgentType, setSelectedAgentType] = useState<string | null>(null);
    const [selectedInitiatedAgentName, setSelectedInitiatedAgentName] = useState<string | null>(null);
    const [selectedApprovalAgentName, setSelectedApprovalAgentName] = useState<string | null>(null);



    const [selectedBranch, setSelectedBranch] = useState<string | null>(null);
    const [selectedType, setSelectedType] = useState<string | null>(null);
    const [selectedStatus, setSelectedStatus] = useState<string | null>(null);


    useEffect(() => {
        if (sourcingData) {
            setInitiatedData(sourcingData.initiatedData || null);
            setApprovedData(sourcingData.approvedData || null);
        }


    }, [sourcingData]);

    const toggleCollapse = () => {
        setIsCollapsed((prev) => !prev);
    };



    const handleClick = (branch: string, type: string, status: string) => {

        if (type == "INITIATED") {
            setSelectedInitiatedBranch(branch);
            setSelectedInitiatedStatus(status);
        }

        if (type == "BRANCH_APPROVED") {
            setSelectedApprovedBranch(branch);
            setSelectedApprovedStatus(status);
        }

        setSelectedBranch(branch);
        setSelectedStatus(status);
        setSelectedType(type);

    };

    const handleAgentClick = (agent: string, type: string, name: string) => {
        if (type == "INITIATED") {
            setSelectedInitiatedAgent(agent);
            setSelectedAgentType(type);
            setSelectedInitiatedAgentName(name);
        }

        if (type == "BRANCH_APPROVED") {
            setSelectedApprovedAgent(agent);
            setSelectedAgentType(type);
            setSelectedApprovalAgentName(name);
        }
    };

    const formatCurrency = (amount: any) => {
        return new Intl.NumberFormat('en-US', {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
        }).format(amount);
    };


    useEffect(() => {
        if (selectedBranch || selectedType || selectedStatus) {
            loadAgentBranchData(startDate, endDate, selectedBranch, selectedType, selectedStatus)
        }
        if (selectedInitiatedAgent || selectedApprovedAgent || selectedAgentType) {
            if (selectedAgentType) {
                if (selectedAgentType == "INITIATED") {
                    loadAgentData(startDate, endDate, selectedInitiatedBranch, "INITIATED", selectedInitiatedStatus, selectedInitiatedAgent)

                }

                if (selectedAgentType == "BRANCH_APPROVED") {
                    loadAgentData(startDate, endDate, selectedApprovedBranch, "BRANCH_APPROVED", selectedApprovedStatus, selectedApprovedAgent)

                }
            }
        }
    }, [selectedBranch, selectedType, selectedStatus, selectedApprovedAgent, selectedInitiatedAgent, selectedAgentType]);



    const loadAgentBranchData = async (
        startDate: Date | null,
        endDate: Date | null,
        branch: string | null,
        status: string | null,
        type: string | null
    ) => {
        const formattedStartDate = startDate ? moment(startDate).format("YYYY-MM-DD") : moment().format("YYYY-MM-DD");
        const formattedEndDate = endDate ? moment(endDate).format("YYYY-MM-DD") : moment().format("YYYY-MM-DD");

        const { data, err } = await Api.performRequest((r) =>
            r.reports.getAgentBranchData(formattedStartDate, formattedEndDate, status, branch, type)
        );

        Logger.debug(
            "(Search Data) => { DATA: " +
            JSON.stringify(data) +
            " , ERROR: " +
            JSON.stringify(err)
        );
        if (data) {
            if (status == "INITIATED") {

                if (type == "ALPL") {
                    setInitiatedALPLAgentData(data)
                }
                else if (type == "CARD") {
                    setInitiatedCardAgentData(data)

                }
            }

            else if (status == "BRANCH_APPROVED") {

                if (type == "ALPL") {
                    setApprovedALPLAgentData(data)
                }
                else if (type == "CARD") {
                    setApprovedCardAgentData(data)

                }
            }

        }
    }

    const loadAgentData = async (
        startDate: Date | null,
        endDate: Date | null,
        branch: string | null,
        status: string | null,
        type: string | null,
        agent: string | null
    ) => {
        const formattedStartDate = startDate ? moment(startDate).format("YYYY-MM-DD") : moment().format("YYYY-MM-DD");
        const formattedEndDate = endDate ? moment(endDate).format("YYYY-MM-DD") : moment().format("YYYY-MM-DD");

        const { data, err } = await Api.performRequest((r) =>
            r.reports.getAgentBranchDrillDown(formattedStartDate, formattedEndDate, status, branch, type, agent)
        );

        Logger.debug(
            "(Search Data) => { DATA: " +
            JSON.stringify(data) +
            " , ERROR: " +
            JSON.stringify(err)
        );
        if (data) {
            if (status == "INITIATED") {

                if (type == "ALPL") {
                    setInitiatedALPLAgent(data)
                }
                else if (type == "CARD") {
                    setInitiatedCardAgent(data)

                }
            }

            else if (status == "BRANCH_APPROVED") {

                if (type == "ALPL") {
                    setApprovedALPLAgent(data)
                }
                else if (type == "CARD") {
                    setApprovedCardAgent(data)

                }
            }

        }
    }

    return (
        <Paper elevation={3} style={{ padding: "16px", margin: "16px 0" }}>
            <div className="text-xs font-semibold tracking-wide text-left">
                <div className="flex justify-between items-center mb-4">
                    <div className="text-red-600 font-bold flex-col pl-6">
                        <div>Sourcing Status</div>
                        <div className="text-[12px] text-gray">
                            This provides Sourcing status information
                        </div>
                    </div>
                    <IconButton onClick={toggleCollapse}>
                        {isCollapsed ? <ExpandLess /> : <ExpandMore />}
                    </IconButton>
                </div>
            </div>
            <Collapse in={isCollapsed}>
                <br />
                <Divider />
                <div className="grid grid-cols-2 gap-8">
                    <Box style={{ flex: 1, margin: '0 8px', height: 'auto' }}>
                        <br></br>
                        <div
                            className="text-[20px] font-600 text-gray"
                            style={{ marginBottom: '16px', textAlign: 'left' }}
                        >
                            INITIATED
                        </div>
                        {/* Branch Summary */}
                        <Card style={{ width: '100%', height: 'auto', display: 'flex', flexDirection: 'column' }}>
                            <CardContent style={{ flex: 1, overflow: 'auto' }}>
                                <Typography variant="body2" style={{ fontWeight: "bold", marginBottom: "16px" }}>
                                    Branch Summary
                                </Typography>
                                <div className="w-full">
                                    {getInitiatedData && getInitiatedData.length > 0 ? (
                                        <div style={{ position: 'relative' }}>
                                            {/* Main Table Wrapper */}
                                            <table
                                                id="branch-summary-table"
                                                className="w-full whitespace-no-wrap"
                                                style={{ borderCollapse: 'collapse', tableLayout: 'fixed' }}
                                            >
                                                {/* Fixed Header */}
                                                <thead>
                                                    <tr className="whitespace-nowrap divide-x-1">
                                                        <th className="p-6 text-left" style={{ width: '27%', padding: '12px', textAlign: 'left' }}>Branch</th>
                                                        <th className="p-6 text-left" style={{ width: '27%', padding: '12px', textAlign: 'left' }}>CC</th>
                                                        <th className="p-6 text-left" style={{ width: '27%', padding: '12px', textAlign: 'left' }}>PL</th>
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
                                                    id="branch-summary-table-body"
                                                    className="w-full whitespace-no-wrap"
                                                    style={{ borderCollapse: 'collapse', tableLayout: 'fixed' }}
                                                >
                                                    <tbody>
                                                        {getInitiatedData.map((branch) => (
                                                            <tr className="text-black h-full bg-white shadow-2">
                                                                <td className="p-6 text-[12px] align-middle text-left" style={{ width: '27%', padding: '12px', textAlign: 'left' }}>
                                                                    <p className="text-[12px] text-gray font-bold">
                                                                        {branch.branchName}
                                                                    </p>
                                                                </td>
                                                                <td
                                                                    style={{ width: '27%', padding: '12px', textAlign: 'left' }}

                                                                >
                                                                    <Button
                                                                        variant="outlined"
                                                                        className="w-32 px-24 border-gray bg-grey-50 text-gray-800 cursor-pointer hover:bg-gray-200 focus:outline-none active:scale-95 active:bg-gray-300"
                                                                        disabled={branch.cardCount == 0}
                                                                        onClick={(e) => {
                                                                            e.preventDefault();
                                                                            handleClick(branch.branchName, "INITIATED", "CARD");
                                                                        }}
                                                                    >
                                                                        {branch.cardCount}
                                                                    </Button>

                                                                </td>
                                                                <td
                                                                    style={{ width: '25%', padding: '12px', textAlign: 'left' }}

                                                                >

                                                                    <Button
                                                                        variant="outlined"
                                                                        className="w-32 px-24 border-gray bg-grey-50 text-gray-800 cursor-pointer hover:bg-gray-200 focus:outline-none active:scale-95 active:bg-gray-300"
                                                                        disabled={branch.loanCount == 0}
                                                                        onClick={(e) => {
                                                                            e.preventDefault();
                                                                            handleClick(branch.branchName, "INITIATED", "ALPL")
                                                                        }}
                                                                    >
                                                                        {branch.loanCount}
                                                                    </Button>
                                                                </td>
                                                            </tr>
                                                        ))}
                                                    </tbody>
                                                </table>
                                            </div>
                                            {/* Fixed Footer */}
                                            <table
                                                id="branch-summary-table-footer"
                                                className="w-full whitespace-no-wrap"
                                                style={{ borderCollapse: 'collapse', tableLayout: 'fixed' }}
                                            >
                                                <tfoot>
                                                    <tr style={{ backgroundColor: '#f3f3f3' }}>
                                                        <td className="p-6 text-[12px] align-middle text-left" style={{ width: '42%', padding: '12px', fontWeight: 'bold', textAlign: 'left' }}>
                                                            Total
                                                        </td>
                                                        <td className="p-6 text-[12px] align-middle text-left" style={{ width: '36%', padding: '12px', fontWeight: 'bold', textAlign: 'left' }}>
                                                            {getInitiatedData.reduce((acc, branch) => acc + branch.cardCount, 0)}
                                                        </td>
                                                        <td className="p-6 text-[12px] align-middle text-left" style={{ width: '30%', padding: '12px', fontWeight: 'bold', textAlign: 'left' }}>
                                                            {getInitiatedData.reduce((acc, branch) => acc + branch.loanCount, 0)}
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
                        {(selectedInitiatedStatus === "CARD" || selectedInitiatedStatus === "ALPL") && (
                            <Box style={{ marginTop: "16px" }}>
                                <Card style={{ width: "100%", height: "auto", display: "flex", flexDirection: "column" }}>
                                    <CardContent style={{ flex: 1, overflow: 'auto' }}>
                                        <Typography variant="body2" style={{ fontWeight: "bold", marginBottom: "16px" }}>
                                            {selectedInitiatedStatus === "CARD"
                                                ? `CARD - Agent Summary (${selectedInitiatedBranch})`
                                                : `ALPL - Agent Summary (${selectedInitiatedBranch})`}
                                        </Typography>

                                        <div className="w-full">
                                            {((selectedInitiatedStatus === "CARD"
                                                ? getInitiatedCardAgentData
                                                : getInitiatedALPLAgentData) || []).length > 0 ? (
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
                                                                <th className="p-6 text-left" style={{ width: '50%', padding: '12px', textAlign: 'left' }}>Agent Name</th>
                                                                <th className="p-6 text-left" style={{ width: '50%', padding: '12px', textAlign: 'left' }}>No's</th>
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
                                                                {((selectedInitiatedStatus === "CARD"
                                                                    ? getInitiatedCardAgentData
                                                                    : getInitiatedALPLAgentData) || []).map((agent, index) => (
                                                                        <tr key={index} className="text-black h-full bg-white shadow-2">
                                                                            <td className="p-6 text-[12px] align-middle text-left" style={{ width: '50%', padding: '12px', textAlign: 'left' }}>
                                                                                <p className="text-[12px] text-gray font-bold">
                                                                                    {agent.dsrName}
                                                                                </p>
                                                                            </td>
                                                                            <td
                                                                                style={{ width: '50%', padding: '12px', textAlign: 'left' }}

                                                                            >

                                                                                <Button
                                                                                    variant="outlined"
                                                                                    className="w-32 px-24 border-gray bg-grey-50 text-gray-800 cursor-pointer hover:bg-gray-200 focus:outline-none active:scale-95 active:bg-gray-300"
                                                                                    disabled={agent.count == 0}
                                                                                    onClick={(e) => {
                                                                                        e.preventDefault();
                                                                                        handleAgentClick(agent.dsrCode, "INITIATED", agent.dsrName)
                                                                                    }}
                                                                                >
                                                                                    {agent.count}
                                                                                </Button>
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
                                                                <td className="p-6 text-[12px] align-middle text-left" style={{ padding: '12px', fontWeight: 'bold', textAlign: 'left', width: '55%' }}>
                                                                    Total
                                                                </td>
                                                                <td className="p-6 text-[12px] align-middle text-left" style={{ padding: '12px', fontWeight: 'bold', textAlign: 'left' }}>
                                                                    {((selectedInitiatedStatus === "CARD"
                                                                        ? getInitiatedCardAgentData
                                                                        : getInitiatedALPLAgentData) || []).reduce((acc, agent) => acc + agent.count, 0)}
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
                                                    No records found for the selected agent summary.
                                                </div>
                                            )}
                                        </div>
                                    </CardContent>
                                </Card>
                            </Box>
                        )}

                        {(selectedInitiatedStatus === "CARD" ? getInitiatedCardAgent : getInitiatedALPLAgent) && (
                            <Box style={{ marginTop: "16px" }}>
                                <Card style={{ width: "100%", height: "auto", display: "flex", flexDirection: "column" }}>
                                    <CardContent style={{ flex: 1, overflow: "auto" }}>
                                        <Typography variant="body2" style={{ fontWeight: "bold", marginBottom: "16px" }}>
                                            Detail View ({selectedInitiatedBranch} - {selectedInitiatedAgentName})
                                        </Typography>
                                        <div
                                            style={{
                                                maxHeight: '230px',
                                                overflowY: 'auto',
                                                overflowX: 'hidden',
                                                minHeight: '230px',
                                            }}
                                        >
                                            <div className="w-full overflow-x-auto">

                                                <table id="detail-view-table" className="w-full whitespace-no-wrap" >
                                                    <thead>
                                                        <tr className="whitespace-nowrap divide-x-1">
                                                            <th className="p-6 text-left">WF REF#</th>
                                                            <th className="p-6 text-left">Customer Name</th>
                                                            <th className="p-6 text-left">NIC</th>
                                                            <th className="p-6 text-left">Date</th>
                                                            <th className="p-6 text-left">Agent</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {(selectedInitiatedStatus === "CARD" ? getInitiatedCardAgent : getInitiatedALPLAgent).map(
                                                            (detail, index) => (
                                                                <tr
                                                                    key={index}
                                                                    className="text-black h-full bg-white shadow-2"
                                                                    style={{ borderSpacing: "10px" }}
                                                                >
                                                                    <td className="p-6 text-[12px] align-middle text-left">
                                                                        <p className="text-[12px] text-gray font-bold">{detail.businessKey}</p>
                                                                    </td>
                                                                    <td className="p-6 text-[12px] align-middle text-left">
                                                                        <p className="text-[12px] text-gray font-bold">{detail.applicantName}</p>
                                                                    </td>
                                                                    <td className="p-6 text-[12px] align-middle text-left">
                                                                        <p className="text-[12px] text-gray font-bold">{detail.applicantNIC}</p>
                                                                    </td>
                                                                    <td className="p-6 text-[12px] align-middle text-left">
                                                                        <p className="text-[12px] text-gray font-bold">{detail.date}</p>
                                                                    </td>
                                                                    <td className="p-6 text-[12px] align-middle text-left">
                                                                        <p className="text-[12px] text-gray font-bold">{detail.dsrName}</p>
                                                                    </td>
                                                                </tr>
                                                            )
                                                        )}
                                                    </tbody>
                                                </table>
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>
                            </Box>
                        )}



                    </Box>
                    <Box style={{ flex: 1, margin: '0 8px', height: 'auto' }}>
                        <br></br>
                        <div
                            className="text-[20px] font-600 text-gray"
                            style={{ marginBottom: '16px', textAlign: 'left' }}
                        >
                            SUBMITTED
                        </div>
                        {/* Branch Summary */}
                        <Card style={{ width: '100%', height: 'auto', display: 'flex', flexDirection: 'column' }}>
                            <CardContent style={{ flex: 1, overflow: 'auto' }}>
                                <Typography variant="body2" style={{ fontWeight: "bold", marginBottom: "16px" }}>
                                    Branch Summary
                                </Typography>
                                <div className="w-full overflow-x-auto">
                                    {getApprovedData && getApprovedData.length > 0 ? (
                                        <div style={{ position: 'relative' }}>
                                            <table
                                                id="branch-summary-table"
                                                className="w-full whitespace-no-wrap"
                                                style={{ borderCollapse: 'collapse', tableLayout: 'fixed' }}
                                            >
                                                <thead>
                                                    <tr className="whitespace-nowrap divide-x-1">
                                                        <th className="p-6 text-left" style={{ width: '27%', padding: '12px', textAlign: 'left' }}>Branch</th>
                                                        <th className="p-6 text-left" style={{ width: '27%', padding: '12px', textAlign: 'left' }}>CC</th>
                                                        <th className="p-6 text-left" style={{ width: '27%', padding: '12px', textAlign: 'left' }}>PL</th>
                                                    </tr>
                                                </thead>
                                            </table>
                                            <div
                                                style={{
                                                    maxHeight: '180px',
                                                    overflowY: 'auto',
                                                    overflowX: 'hidden',
                                                    minHeight: '180px',
                                                }}
                                            >
                                                <table
                                                    id="branch-summary-table-body"
                                                    className="w-full whitespace-no-wrap"
                                                    style={{ borderCollapse: 'collapse', tableLayout: 'fixed' }}
                                                >
                                                    <tbody>
                                                        {getApprovedData.map((branch) => (
                                                            <tr className="text-black h-full bg-white shadow-2">
                                                                <td className="p-6 text-[12px] align-middle text-left" style={{ width: '27%', padding: '12px', textAlign: 'left' }}>
                                                                    <p className="text-[12px] text-gray font-bold">
                                                                        {branch.branchName}
                                                                    </p>
                                                                </td>
                                                                <td
                                                                    style={{ width: '27%', padding: '12px', textAlign: 'left' }}

                                                                >

                                                                    <Button
                                                                        variant="outlined"
                                                                        className="w-32 px-24 border-gray bg-grey-50 text-gray-800 cursor-pointer hover:bg-gray-200 focus:outline-none active:scale-95 active:bg-gray-300"
                                                                        disabled={branch.cardCount == 0}
                                                                        onClick={(e) => {
                                                                            e.preventDefault();
                                                                            handleClick(branch.branchName, "BRANCH_APPROVED", "CARD",)
                                                                        }}
                                                                    >
                                                                        {branch.cardCount}
                                                                    </Button>
                                                                </td>
                                                                <td
                                                                    style={{ width: '25%', padding: '12px', textAlign: 'left' }}
                                                                >
                                                                    <Button
                                                                        variant="outlined"
                                                                        className="w-32 px-24 border-gray bg-grey-50 text-gray-800 cursor-pointer hover:bg-gray-200 focus:outline-none active:scale-95 active:bg-gray-300"
                                                                        disabled={branch.loanCount == 0}
                                                                        onClick={(e) => {
                                                                            e.preventDefault();
                                                                            handleClick(branch.branchName, "BRANCH_APPROVED", "ALPL")
                                                                        }}
                                                                    >
                                                                        {branch.loanCount}
                                                                    </Button>

                                                                </td>
                                                            </tr>
                                                        ))}
                                                    </tbody>
                                                </table>
                                            </div>
                                            <table
                                                id="branch-summary-table-footer"
                                                className="w-full whitespace-no-wrap"
                                                style={{ borderCollapse: 'collapse', tableLayout: 'fixed' }}
                                            >
                                                <tfoot>
                                                    <tr style={{ backgroundColor: '#f3f3f3' }}>
                                                        <td className="p-6 text-[12px] align-middle text-left" style={{ width: '35%', padding: '12px', fontWeight: 'bold', textAlign: 'left' }}>
                                                            Total
                                                        </td>
                                                        <td className="p-6 text-[12px] align-middle text-left" style={{ width: '30%', padding: '12px', fontWeight: 'bold', textAlign: 'left' }}>
                                                            {getApprovedData.reduce((acc, branch) => acc + branch.cardCount, 0)}
                                                        </td>
                                                        <td className="p-6 text-[12px] align-middle text-left" style={{ width: '25%', padding: '12px', fontWeight: 'bold', textAlign: 'left' }}>
                                                            {getApprovedData.reduce((acc, branch) => acc + branch.loanCount, 0)}
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

                                    )
                                    }
                                </div>
                            </CardContent>
                        </Card>

                        {(selectedApprovedStatus === "CARD" || selectedApprovedStatus === "ALPL") && (
                            <Box style={{ marginTop: "16px" }}>
                                <Card style={{ width: "100%", height: "auto", display: "flex", flexDirection: "column" }}>
                                    <CardContent style={{ flex: 1, overflow: "auto" }}>
                                        <Typography variant="body2" style={{ fontWeight: "bold", marginBottom: "16px" }}>
                                            {selectedApprovedStatus === "CARD"
                                                ? `CARD - Agent Summary (${selectedApprovedBranch})`
                                                : `ALPL - Agent Summary (${selectedApprovedBranch})`}
                                        </Typography>

                                        <div className="w-full">
                                            {((selectedApprovedStatus === "CARD"
                                                ? getApprovedCardAgentData
                                                : getApprovedALPLAgentData) || []).length > 0 ? (
                                                <div style={{ position: "relative" }}>
                                                    {/* Main Table Wrapper */}
                                                    <table
                                                        id="agent-table"
                                                        className="w-full whitespace-no-wrap"
                                                        style={{ borderCollapse: "collapse", tableLayout: "fixed" }}
                                                    >
                                                        {/* Fixed Header */}
                                                        <thead>
                                                            {selectedApprovedStatus === "CARD" ? (
                                                                <tr className="whitespace-nowrap divide-x-1">
                                                                    <th className="p-6 text-left" style={{ width: "25%", padding: "12px", textAlign: "left" }}>Agent Name</th>
                                                                    <th className="p-6 text-left" style={{ width: "25%", padding: "12px", textAlign: "left" }}>No's</th>
                                                                    <th className="p-6 text-left" style={{ width: "25%", padding: "12px", textAlign: "left" }}>Card Limit</th>
                                                                </tr>
                                                            ) : (
                                                                <tr className="whitespace-nowrap divide-x-1">
                                                                    <th className="p-6 text-left" style={{ width: "25%", padding: "12px", textAlign: "left" }}>Agent Name</th>
                                                                    <th className="p-6 text-left" style={{ width: "25%", padding: "12px", textAlign: "left" }}>No's</th>
                                                                    <th className="p-6 text-left" style={{ width: "25%", padding: "12px", textAlign: "left" }}>Net Value</th>
                                                                    <th className="p-6 text-left" style={{ width: "25%", padding: "12px", textAlign: "left" }}>Gross Value</th>
                                                                </tr>
                                                            )}
                                                        </thead>
                                                    </table>
                                                    {/* Scrollable Body */}
                                                    <div
                                                        style={{
                                                            maxHeight: "180px",
                                                            overflowY: "auto",
                                                            overflowX: "hidden",
                                                            minHeight: "180px",
                                                        }}
                                                    >
                                                        <table
                                                            id="agent-table-body"
                                                            className="w-full whitespace-no-wrap"
                                                            style={{ borderCollapse: "collapse", tableLayout: "fixed" }}
                                                        >
                                                            <tbody>
                                                                {((selectedApprovedStatus === "CARD"
                                                                    ? getApprovedCardAgentData
                                                                    : getApprovedALPLAgentData) || []).map((agent, index) => (
                                                                        <tr key={index} className="text-black h-full bg-white shadow-2">
                                                                            <td className="p-6 text-[12px] align-middle text-left" style={{ width: "25%", padding: "12px", textAlign: "left" }}>
                                                                                <p className="text-[12px] text-gray font-bold">
                                                                                    {agent.dsrName}
                                                                                </p>
                                                                            </td>
                                                                            <td
                                                                                style={{ width: "25%", padding: "12px", textAlign: "left" }}                                                                            >
                                                                                <Button
                                                                                    variant="outlined"
                                                                                    className="w-32 px-24 border-gray bg-grey-50 text-gray-800 cursor-pointer hover:bg-gray-200 focus:outline-none active:scale-95 active:bg-gray-300"
                                                                                    disabled={agent.count == 0}
                                                                                    onClick={(e) => {
                                                                                        e.preventDefault();
                                                                                        handleAgentClick(agent.dsrCode, "BRANCH_APPROVED", agent.dsrName)
                                                                                    }}
                                                                                >
                                                                                    {agent.count}
                                                                                </Button>
                                                                            </td>
                                                                            {selectedApprovedStatus === "CARD" ? (
                                                                                <td className="p-6 text-[12px] align-middle text-left" style={{ width: "25%", padding: "12px", textAlign: "left" }}>
                                                                                    <p className="text-[12px] text-gray font-bold">{formatCurrency(agent.totalUnderwriterLimit)}</p>
                                                                                </td>
                                                                            ) : (
                                                                                <>
                                                                                    <td className="p-6 text-[12px] align-middle text-left" style={{ width: "25%", padding: "12px", textAlign: "left" }}>
                                                                                        <p className="text-[12px] text-gray font-bold">{formatCurrency(agent.totalNetAmountALPL)}</p>
                                                                                    </td>
                                                                                    <td className="p-6 text-[12px] align-middle text-left" style={{ width: "25%", padding: "12px", textAlign: "left" }}>
                                                                                        <p className="text-[12px] text-gray font-bold">{formatCurrency(agent.totalApprovedAmount)}</p>
                                                                                    </td>
                                                                                </>
                                                                            )}
                                                                        </tr>
                                                                    ))}
                                                            </tbody>
                                                        </table>
                                                    </div>
                                                    {/* Fixed Footer */}
                                                    <table
                                                        id="agent-table-footer"
                                                        className="w-full whitespace-no-wrap"
                                                        style={{ borderCollapse: "collapse", tableLayout: "fixed" }}
                                                    >
                                                        <tfoot>
                                                            <tr style={{ backgroundColor: "#f3f3f3" }}>
                                                                <td className="p-6 text-[12px] align-middle text-left" style={{ padding: "12px", fontWeight: "bold", textAlign: "left", width: '31%' }}>
                                                                    Total
                                                                </td>
                                                                <td className="p-6 text-[12px] align-middle text-left" style={{ padding: "12px", fontWeight: "bold", textAlign: "left", width: '20%' }}>
                                                                    {((selectedApprovedStatus === "CARD"
                                                                        ? getApprovedCardAgentData
                                                                        : getApprovedALPLAgentData) || []).reduce((acc, agent) => acc + agent.count, 0)}
                                                                </td>
                                                                {selectedApprovedStatus === "CARD" ? (
                                                                    <td className="p-6 text-[12px] align-middle text-left" style={{ padding: "12px", fontWeight: "bold", textAlign: "left", width: '31%' }}>
                                                                        {formatCurrency(((selectedApprovedStatus === "CARD"
                                                                            ? getApprovedCardAgentData
                                                                            : []) || []).reduce((acc, agent) => acc + agent.totalUnderwriterLimit, 0))}
                                                                    </td>
                                                                ) : (
                                                                    <>
                                                                        <td className="p-6 text-[12px] align-middle text-left" style={{ padding: "12px", fontWeight: "bold", textAlign: "left", width: '25%' }}>
                                                                            {formatCurrency(((selectedApprovedStatus === "ALPL"
                                                                                ? getApprovedALPLAgentData
                                                                                : []) || []).reduce((acc, agent) => acc + agent.totalNetAmountALPL, 0))}
                                                                        </td>
                                                                        <td className="p-6 text-[12px] align-middle text-left" style={{ padding: "12px", fontWeight: "bold", textAlign: "left" }}>
                                                                            {formatCurrency(((selectedApprovedStatus === "ALPL"
                                                                                ? getApprovedALPLAgentData
                                                                                : []) || []).reduce((acc, agent) => acc + agent.totalApprovedAmount, 0))}
                                                                        </td>
                                                                    </>
                                                                )}
                                                            </tr>
                                                        </tfoot>
                                                    </table>
                                                </div>
                                            ) : (
                                                <div
                                                    style={{
                                                        display: "flex",
                                                        justifyContent: "center",
                                                        alignItems: "center",
                                                        maxHeight: "260px",
                                                        minHeight: "260px",
                                                        height: "100%",
                                                        width: "100%",
                                                    }}
                                                    className="text-center"
                                                >
                                                    No records found for the selected agent summary.
                                                </div>
                                            )}
                                        </div>
                                    </CardContent>
                                </Card>
                            </Box>
                        )}


                        {(selectedApprovedStatus === "CARD" ? getApprovedCardAgent : getApprovedALPLAgent) && (
                            <Box style={{ marginTop: "16px" }}>
                                <Card style={{ width: "100%", height: "auto", display: "flex", flexDirection: "column" }}>
                                    <CardContent style={{ flex: 1 }}>
                                        <Typography variant="body2" style={{ fontWeight: "bold", marginBottom: "16px" }}>
                                            Detail View ({selectedApprovedBranch} - {selectedApprovalAgentName})
                                        </Typography>
                                        <div className="w-full overflow-x-auto">
                                            <div
                                                style={{
                                                    maxHeight: "180px",
                                                    overflowY: "auto",
                                                    overflowX: "auto",
                                                    minHeight: "180px",
                                                }}
                                            >
                                                <table
                                                    id="detail-view-table"
                                                    className="w-full whitespace-no-wrap"
                                                    style={{
                                                        borderCollapse: "collapse",
                                                        whiteSpace: "nowrap",
                                                    }}
                                                >
                                                    <thead>
                                                        <tr className="whitespace-nowrap divide-x-1">
                                                            <th className="p-6 text-left">WF REF#</th>
                                                            <th className="p-6 text-left">Customer Name</th>
                                                            <th className="p-6 text-left">NIC</th>
                                                            <th className="p-6 text-left">Date</th>
                                                            <th className="p-6 text-left">Agent</th>
                                                            {selectedApprovedStatus === "CARD" ? (
                                                                <th className="p-6 text-left">Card Limit</th>
                                                            ) : (
                                                                <>
                                                                    <th className="p-6 text-left">Net Value</th>
                                                                    <th className="p-6 text-left">Gross Value</th>
                                                                </>
                                                            )}
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {(selectedApprovedStatus === "CARD" ? getApprovedCardAgent : getApprovedALPLAgent).map(
                                                            (detail, index) => (
                                                                <tr
                                                                    key={index}
                                                                    className="text-black h-full bg-white shadow-2"
                                                                >
                                                                    <td className="p-6 text-[12px] align-middle text-left">
                                                                        <p className="text-[12px] text-gray font-bold">{detail.businessKey}</p>
                                                                    </td>
                                                                    <td className="p-6 text-[12px] align-middle text-left">
                                                                        <p className="text-[12px] text-gray font-bold">{detail.applicantName}</p>
                                                                    </td>
                                                                    <td className="p-6 text-[12px] align-middle text-left">
                                                                        <p className="text-[12px] text-gray font-bold">{detail.applicantNIC}</p>
                                                                    </td>
                                                                    <td className="p-6 text-[12px] align-middle text-left">
                                                                        <p className="text-[12px] text-gray font-bold">{detail.date}</p>
                                                                    </td>
                                                                    <td className="p-6 text-[12px] align-middle text-left">
                                                                        <p className="text-[12px] text-gray font-bold">{detail.dsrName}</p>
                                                                    </td>
                                                                    {selectedApprovedStatus === "CARD" ? (
                                                                        <td className="p-6 text-[12px] align-middle text-left">
                                                                            <p className="text-[12px] text-gray font-bold">{formatCurrency(detail.underwriterLimit)}</p>
                                                                        </td>
                                                                    ) : (
                                                                        <>
                                                                            <td className="p-6 text-[12px] align-middle text-left">
                                                                                <p className="text-[12px] text-gray font-bold">{formatCurrency(detail.netAmountALPL)}</p>
                                                                            </td>
                                                                            <td className="p-6 text-[12px] align-middle text-left">
                                                                                <p className="text-[12px] text-gray font-bold">{formatCurrency(detail.approvedAmount)}</p>
                                                                            </td>
                                                                        </>
                                                                    )}
                                                                </tr>
                                                            )
                                                        )}
                                                    </tbody>
                                                </table>
                                            </div>
                                        </div>
                                        {/* Sticky Total Row */}
                                        <div
                                            style={{
                                                backgroundColor: "#f3f3f3",
                                                display: "flex",
                                                justifyContent: "space-between",
                                                padding: "12px",
                                                fontWeight: "bold",
                                                borderTop: "1px solid #ccc",
                                                position: "sticky",
                                                bottom: 0,
                                                zIndex: 1,
                                            }}
                                        >
                                            <span>Total</span>
                                            <div style={{ display: "flex", gap: "16px" }}>
                                                {selectedApprovedStatus === "CARD" ? (
                                                    <span>
                                                        Card Limit :{formatCurrency((getApprovedCardAgent || []).reduce(
                                                            (sum, item) => sum + (item.underwriterLimit || 0),
                                                            0
                                                        ))}
                                                    </span>
                                                ) : (
                                                    <>
                                                        <span>
                                                            Net Value : {formatCurrency((getApprovedALPLAgent || []).reduce(
                                                                (sum, item) => sum + (item.netAmountALPL || 0),
                                                                0
                                                            ))}
                                                        </span>
                                                        <span>
                                                            Gross Value : {formatCurrency((getApprovedALPLAgent || []).reduce(
                                                                (sum, item) => sum + (item.approvedAmount || 0),
                                                                0
                                                            ))}
                                                        </span>
                                                    </>
                                                )}
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>
                            </Box>
                        )}

                    </Box>
                </div>

            </Collapse>
        </Paper>
    );
};

export default BundleCCPLSourcing;
