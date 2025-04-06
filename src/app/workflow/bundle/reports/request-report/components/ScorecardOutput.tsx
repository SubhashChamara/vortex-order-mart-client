import { useEffect, useState } from "react";
import Ve3LoadingScreen from "../../../../../../@core/ui/Ve3LoadingScreen/Ve3LoadingScreen";
import { ScorecardInput } from "../../../../../core/types/ScorecardInput";
import { Api } from "../../../../../../api/Api";
import { Paper } from "@mui/material";

interface ScorecardDetailsProps {
    processId: number | null;
    processInstance: string | null;
}


const ScorecardOutput = (props: ScorecardDetailsProps) => {

    const { processId, processInstance } = props;

    const [scoreCard, setScoreCard] = useState<ScorecardInput[] | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const fetchScoreCards = async () => {
        setIsLoading(true);
        setScoreCard(null);
        const { data, err } = await Api.performRequest((r) =>
            r.reports.getScoreOutput(processId)
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


    return (
        <>
            <Paper className="w-full overflow-hidden p-12">
                <h1 className="text-12 font-600 mt-12 mb-12 bg-grey-400 text-center">
                    <div>Score Output</div>
                </h1>
                {(isLoading) && <Ve3LoadingScreen />}
                {
                    (scoreCard && scoreCard?.length > 0) ? (
                        <div className="w-full overflow-x-auto" >
                            <table className="w-full whitespace-no-wrap">
                                <thead>
                                    <tr className="whitespace-nowrap divide-x-1">
                                        <th className="p-6 text-left align-top divide-x-1">Name</th>
                                        <th className="p-6 text-left align-top">Value</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {scoreCard?.map(
                                        (item, index) => (
                                            <tr className="whitespace-nowrap divide-x-1" key={index}>
                                                <td className="p-6 align-middle text-left">
                                                    <p className="text-[12px] text-gray font-bold text-left">
                                                        {item.scoreKey}
                                                    </p>
                                                </td>
                                                <td className="p-6 align-middle text-left">
                                                    <p className="text-[12px] text-gray font-bold text-left">
                                                        {item.scoreValue}
                                                    </p>
                                                </td>
                                            </tr>
                                        ))}

                                </tbody>
                            </table>
                        </div>
                    ) : (!isLoading && (
                        <div className="text-11 font-600 text-center  text-red">
                            No Data Found

                        </div>)
                    )
                }
            </Paper>
        </>
    );
};

export default ScorecardOutput;
