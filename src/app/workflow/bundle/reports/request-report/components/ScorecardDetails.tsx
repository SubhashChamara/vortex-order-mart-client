import { useEffect, useState } from "react";
import Ve3LoadingScreen from "../../../../../../@core/ui/Ve3LoadingScreen/Ve3LoadingScreen";
import { ScorecardInput } from "../../../../../core/types/ScorecardInput";
import { Api } from "../../../../../../api/Api";
import { Button, Paper } from "@mui/material";
import { ScorecardDetailsIf } from "../../../../../core/types/ScorecardDetails";
import { ScroecardInqDetails } from "../../../../../core/types/ScorecardInqDetails";
import { formatCurrency } from "../../../@helpers/Common";
import formatDate from "../../../../../core/pages/admin/helpers/helper-functions";
import { Box } from "@mui/system";

interface ScorecardDetailsProps {
    processId: number | null;
    processInstance: string | null;
}


const ScorecardDetails = (props: ScorecardDetailsProps) => {

    const { processId, processInstance } = props;

    const [scoreCard, setScoreCard] = useState<ScorecardInput[] | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const [ScorecardDetails, setScoreCardDetails] = useState<ScorecardDetailsIf[] | null>(null);
    const [isScorecardDetailsLoading, setIsScorecardDetailsLoading] = useState<boolean>(false);

    const [ScorecardInqDetails, setScoreCardInqDetails] = useState<ScroecardInqDetails[] | null>(null);
    const [isScorecardInqDetailsLoading, setIsScorecardInqDetailsLoading] = useState<boolean>(false);

    const [clicked, setClicked] = useState<boolean>(false);
    const [isInq, setIsInq] = useState<boolean>(false);

    const fetchScoreCards = async () => {
        setIsLoading(true);
        setScoreCard(null);
        const { data, err } = await Api.performRequest((r) =>
            r.reports.getBundledRequestReportScoreCard(processId)
        );
        if (data !== null) {
            setScoreCard(data);
        } else {
            setScoreCard(null);
            console.log(err);
        }
        setIsLoading(false);
    };

    useEffect(() => {
        fetchScoreCards();
    }, []);

    const fetchScorecardDetails = async (scoreVariable: string, processInstance: string | null) => {
        setIsScorecardDetailsLoading(true);
        setScoreCardDetails(null);
        const { data, err } = await Api.performRequest((r) =>
            r.reports.getScorecardDetails(scoreVariable, processInstance)
        );
        if (data !== null) {
            setScoreCardDetails(data);
        } else {
            setScoreCardDetails(null);
            console.log(err);
        }
        setIsScorecardDetailsLoading(false);
    }

    const fetchScorecarInqdDetails = async (processInstance: string | null) => {
        setIsScorecardInqDetailsLoading(true);
        setScoreCardInqDetails(null);
        const { data, err } = await Api.performRequest((r) =>
            r.reports.getScorecarInqdDetails(processInstance)
        );
        if (data !== null) {
            setScoreCardInqDetails(data);
        } else {
            setScoreCardInqDetails(null);
            console.log(err);
        }
        setIsScorecardInqDetailsLoading(false);
    }

    const handleButtonClicked = (scoreVariable: string, processInstance: string | null) => {
        setClicked(true);
        setScoreCardDetails(null);
        setScoreCardInqDetails(null);
        setIsInq(false);
        if (scoreVariable === "count_6m_eeval" || processInstance === null) {
            setIsInq(true);
            fetchScorecarInqdDetails(processInstance);
        }
        else if (scoreVariable !== "count_6m_eeval" && scoreVariable !== null && processInstance !== null) {
            setIsInq(false);
            fetchScorecardDetails(scoreVariable, processInstance);
        }
    }


    return (
        <>
            <Paper className="max-w-screen-sm overflow-hidden p-12 ">

                <h1 className="text-12 font-600 mt-12 mb-12 bg-grey-400 text-center ">
                    <div>Scorecard Details</div>
                </h1>
                {(isLoading) && <Ve3LoadingScreen />}
                {(scoreCard && scoreCard?.length > 0) ? (
                    <div className="overflow-x-auto" >
                        <table className="whitespace-no-wrap ">
                            <thead>
                                <tr className="whitespace-nowrap divide-x-1">
                                    <th className="p-6 text-left align-top">Description</th>
                                    <th className="p-6 text-left align-top">Value (User Input)</th>
                                </tr>

                            </thead>
                            <tbody>
                                {scoreCard?.map((item, index) => (
                                    <tr className="whitespace-nowrap divide-x-1" key={index} >
                                        <td className="p-6 align-middle text-left">
                                            <p className="text-[12px] text-gray font-bold text-left">
                                                {item.scoreKey}
                                            </p>
                                        </td>
                                        <td className="p-6 align-middle text-left ">
                                            <Box width={'100%'}>
                                                <Button fullWidth onClick={() => handleButtonClicked(item.scoreVariable, processInstance)}>
                                                {item.scoreValue}
                                                </Button>
                                            </Box>
                                        </td>
                                    </tr>
                                ))}

                            </tbody>
                        </table>
                    </div>

                ) : (!isLoading && (

                    <div className="text-11 font-600 text-center  text-red">
                        No Data Found

                    </div>
                )
                )}
            </Paper>


            {clicked && (isScorecardDetailsLoading || isScorecardInqDetailsLoading) && <Ve3LoadingScreen />}
            {clicked && !isInq && ScorecardDetails && ScorecardDetails?.length > 0 && (
                <>
                    <Paper className="overflow-hidden p-12 ">

                        <h1 className="text-12 font-600 mt-12 mb-12 bg-grey-400 text-center ">
                            <div>Scorecard Details - Detail Records</div>
                        </h1>
                        <div className="w-full overflow-x-auto" >
                            <table className="w-full whitespace-no-wrap">
                                <thead>
                                    <tr className="whitespace-nowrap divide-x-1">
                                        <th className="p-6 text-left align-middle">CF Type</th>
                                        <th className="p-6 text-left align-middle">CF Status</th>
                                        <th className="p-6 text-left align-middle">Ownership <br />Indicator</th>
                                        <th className="p-6 text-left align-middle">Currency</th>
                                        <th className="p-6 text-left align-middle">Amount Granted <br />/Limit</th>
                                        <th className="p-6 text-left align-middle">Current <br />Balance</th>
                                        <th className="p-6 text-left align-middle">Amount in <br />Arrears</th>
                                        <th className="p-6 text-left align-middle">Installment <br />Amount</th>
                                        <th className="p-6 text-left align-middle">Amount <br />Written OFF</th>
                                        <th className="p-6 text-left align-middle">Last Updated <br />Date</th>
                                        <th className="p-6 text-left align-middle">First<br /> Disbursement Date</th>
                                        <th className="p-6 text-left align-middle">Last<br /> Payment Date</th>
                                        <th className="p-6 text-left align-middle">Security <br />Coverage</th>
                                        <th className="p-6 text-left align-middle">Entity <br />Code</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {ScorecardDetails?.map((item, index) => (
                                        <tr className="whitespace-nowrap divide-x-1" key={index} >
                                            <td className="p-6 align-middle text-left">
                                                <p className="text-[12px] text-gray font-bold text-left">
                                                    {item.cfType}
                                                </p>
                                            </td>
                                            <td className="p-6 align-middle text-left">
                                                <p className="text-[12px] text-gray font-bold text-left">
                                                    {item.cfStat}
                                                </p>
                                            </td>
                                            <td className="p-6 align-middle text-left">
                                                <p className="text-[12px] text-gray font-bold text-left">
                                                    {item.ownership}
                                                </p>
                                            </td>
                                            <td className="p-6 align-middle text-left">
                                                <p className="text-[12px] text-gray font-bold text-left">
                                                    {item.crcy}
                                                </p>
                                            </td>
                                            <td className="p-6 align-middle text-left">
                                                <p className="text-[12px] text-gray font-bold text-left">
                                                    {formatCurrency(item.amountGranted?.toString())}
                                                </p>
                                            </td>
                                            <td className="p-6 align-middle text-left">
                                                <p className="text-[12px] text-gray font-bold text-left">
                                                    {formatCurrency(item.currentBalance?.toString())}

                                                </p>
                                            </td>
                                            <td className="p-6 align-middle text-left">
                                                <p className="text-[12px] text-gray font-bold text-left">
                                                    {formatCurrency(item.arrearsAmount?.toString())}

                                                </p>
                                            </td>
                                            <td className="p-6 align-middle text-left">
                                                <p className="text-[12px] text-gray font-bold text-left">
                                                    {formatCurrency(item.installmentAmount?.toString())}

                                                </p>
                                            </td>
                                            <td className="p-6 align-middle text-left">
                                                <p className="text-[12px] text-gray font-bold text-left">
                                                    {formatCurrency(item.amountWrittenOff?.toString())}
                                                </p>
                                            </td>
                                            <td className="p-6 align-middle text-left">
                                                <p className="text-[12px] text-gray font-bold text-left">
                                                    {formatDate(item.lastUpdatedDate?.toString())}
                                                </p>
                                            </td>
                                            <td className="p-6 align-middle text-left">
                                                <p className="text-[12px] text-gray font-bold text-left">
                                                    {formatDate(item.firstDisburseDate?.toString())}

                                                </p>
                                            </td>
                                            <td className="p-6 align-middle text-left">
                                                <p className="text-[12px] text-gray font-bold text-left">
                                                    {formatDate(item.latestPaymentDate?.toString())}

                                                </p>
                                            </td>
                                            <td className="p-6 align-middle text-left">
                                                <p className="text-[12px] text-gray font-bold text-left">
                                                    {item.contractSecurityType}
                                                </p>
                                            </td>
                                            <td className="p-6 align-middle text-left">
                                                <p className="text-[12px] text-gray font-bold text-left">
                                                    {item.entityCode}
                                                </p>
                                            </td>
                                        </tr>
                                    ))}

                                </tbody>
                            </table>
                        </div>
                    </Paper>
                </>
            )}


            {clicked && isInq && ScorecardInqDetails && ScorecardInqDetails?.length > 0 && (
                <Paper className=" overflow-hidden p-12 ">
                    <div className="w-full overflow-x-auto" >
                        <h1 className="text-12 font-600 mt-12 mb-12 bg-grey-400 text-center ">
                            <div>Scorecard Details - Detail Records</div>
                        </h1>
                        <table className="w-full whitespace-no-wrap">
                            <thead>
                                <tr className="whitespace-nowrap divide-x-1">
                                    <th className="p-6 text-left align-middle">Sector</th>
                                    <th className="p-6 text-left align-middle">Reason for Inquiry</th>
                                    <th className="p-6 text-left align-middle">Date of Inquiry</th>
                                </tr>
                            </thead>
                            <tbody>
                                {ScorecardInqDetails?.map((item, index) => (
                                    <tr className="whitespace-nowrap divide-x-1" key={index} >
                                        <td className="p-6 align-middle text-left">
                                            <p className="text-[12px] text-gray font-bold text-left">
                                                {item.sector}
                                            </p>
                                        </td>
                                        <td className="p-6 align-middle text-left">
                                            <p className="text-[12px] text-gray font-bold text-left">
                                                {item.reason}
                                            </p>
                                        </td>
                                        <td className="p-6 align-middle text-left">
                                            <p className="text-[12px] text-gray font-bold text-left">
                                                {formatDate(item.inqDate?.toString())}
                                            </p>
                                        </td>
                                    </tr>
                                ))}

                            </tbody>
                        </table>
                    </div>
                </Paper>
            )}

        </>
    );
};

export default ScorecardDetails;
