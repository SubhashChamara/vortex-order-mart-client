import { useState } from "react";
import { TaskDetailInfo } from "../../../../core/types/TaskDetailInfo";
import BundleCCPLApprovals from "./components/bundleCCPLApprovals";
import BundleCCPLProcessing from "./components/bundleCCPLProcessing";
import BundleCCPLSearch from "./components/bundleCCPLSearch";
import BundleCCPLSourcing from "./components/bundleCCPLSourcing";
import { Api } from "../../../../../api/Api";
import Logger from "../../../../../@helpers/Logger";
import { BranchSummaryDTO } from "./@types/CCPLApprovalCommon";
import Ve3LoadingScreen from "../../../../../@core/ui/Ve3LoadingScreen/Ve3LoadingScreen";
import moment from "moment";
import { SourceGenerateDTO } from "./@types/CCPLSourcingCommon";
import { TVReportDTO } from "./@types/CCPLProcessing";

const BundleCCPLReport = () => {

    type FK_Task01Props = {
        task: TaskDetailInfo;
    };

    const [getApproval, setApproval] = useState<boolean | null>(false);
    const [getSourcing, setSourcing] = useState<boolean | null>(false);
    const [getProcesssing, setProcessing] = useState<boolean | null>(false);

    const [getApprovalLoader, setApprovalLoader] = useState<boolean | null>(false);
    const [getSourcingLoader, setSourcingLoader] = useState<boolean | null>(false);
    const [getProcessingLoader, setProcessingLoader] = useState<boolean | null>(false);


    const [getApprovalData, setApprovalData] = useState<BranchSummaryDTO | null>(null);
    const [getSourcingData, setSourcingData] = useState<SourceGenerateDTO | null>(null);
    const [getProcessingData, setProcessingData] = useState<TVReportDTO | null>(null);


    const [getStartDate, setStartDate] = useState<Date | null>(null);
    const [getEndDate, setEndDate] = useState<Date | null>(null);



    const handleSearchData = async (payload: {
        startDate: Date | null;
        endDate: Date | null;
        action: string;
    }) => {
        console.log("Received Payload:", payload);

        setStartDate(payload.startDate);
        setEndDate(payload.endDate);

        switch (payload.action) {
            case 'APPROVAL':
                await loadReportApprovalData(payload.startDate, payload.endDate);
                break;

            case 'SOURCING':
                setSourcing(true);
                await loadReportSourcingData(payload.startDate, payload.endDate);
                break;

            case 'PROCESSING':
                setProcessing(true);
                await loadReportProcessingData();
                break;

            default:
                console.warn("Unknown action:", payload.action);
        }
    };

    const loadReportApprovalData = async (
        startDate: Date | null,
        endDate: Date | null
    ) => {
        setApprovalLoader(true);
        const formattedStartDate = startDate ? moment(startDate).format("YYYY-MM-DD") : moment().format("YYYY-MM-DD");
        const formattedEndDate = endDate ? moment(endDate).format("YYYY-MM-DD") : moment().format("YYYY-MM-DD");


        const { data, err } = await Api.performRequest((r) =>
            r.reports.getCLPLApprovalData(formattedStartDate, formattedEndDate)
        );

        Logger.debug(
            "(Search Data) => { DATA: " +
            JSON.stringify(data) +
            " , ERROR: " +
            JSON.stringify(err)
        );

        if (err) {
            setApprovalLoader(false);
        }

        if (data) {
            setApprovalData(data);
            setApproval(true);
            setApprovalLoader(false);
        }
    }

    const loadReportSourcingData = async (
        startDate: Date | null,
        endDate: Date | null
    ) => {
        setSourcingLoader(true);
        const formattedStartDate = startDate ? moment(startDate).format("YYYY-MM-DD") : moment().format("YYYY-MM-DD");
        const formattedEndDate = endDate ? moment(endDate).format("YYYY-MM-DD") : moment().format("YYYY-MM-DD");

        const { data, err } = await Api.performRequest((r) =>
            r.reports.getCLPLSourcingData(formattedStartDate, formattedEndDate)
        );

        Logger.debug(
            "(Search Data) => { DATA: " +
            JSON.stringify(data) +
            " , ERROR: " +
            JSON.stringify(err)
        );

        if (err) {
            setSourcingLoader(false);
        }

        if (data) {
            setSourcingData(data);
            setSourcing(true);
            setSourcingLoader(false);
        }
    }

    const loadReportProcessingData = async (

    ) => {
        setProcessingLoader(true);

        const { data, err } = await Api.performRequest((r) =>
            r.reports.getCLPLProcessingData()
        );

        Logger.debug(
            "(Search Data) => { DATA: " +
            JSON.stringify(data) +
            " , ERROR: " +
            JSON.stringify(err)
        );

        if (err) {
            setProcessingLoader(false);
        }

        if (data) {
            setProcessingData(data);
            setProcessing(true);
            setProcessingLoader(false);
        }
    }

    return (
        <div className="px-12 pb-12">
            <BundleCCPLSearch onSearchData={handleSearchData} />
            {getApprovalLoader ? (
                <Ve3LoadingScreen />
            ) : (
                <>
                    {getApproval && getApprovalData && (
                        <BundleCCPLApprovals approvalData={getApprovalData} startDate={getStartDate} endDate={getEndDate} />
                    )}
                </>
            )}

            {getSourcingLoader ? (
                <Ve3LoadingScreen />
            ) : (
                <>
                    {getSourcing && getSourcingData && (
                        <BundleCCPLSourcing sourcingData={getSourcingData} startDate={getStartDate} endDate={getEndDate} />

                    )}
                </>
            )}

            {getProcessingLoader ? (
                <Ve3LoadingScreen />
            ) : (
                <>
                    {getProcesssing && getProcessingData && (
                        <BundleCCPLProcessing processingData={getProcessingData} />

                    )}
                </>
            )}


        
        </div>
    );
};

export default BundleCCPLReport;