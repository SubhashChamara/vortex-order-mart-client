import { useEffect, useState } from "react";
import Ve3LoadingScreen from "../../../../../../@core/ui/Ve3LoadingScreen/Ve3LoadingScreen";
import { ScoreCalculatorIf } from "../../../../../core/types/ScoreCalculator";
import { Api } from "../../../../../../api/Api";
import { Paper } from "@mui/material";

interface ScoreCalculatorProps {
    processId: number | null;
    processInstance: string | null;
}


const ScoreCalculator = (props: ScoreCalculatorProps) => {
    const { processId, processInstance } = props;

    const [scoreCard, setScoreCard] = useState<ScoreCalculatorIf[] | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const fetchScoreCalculator = async () => {
        setIsLoading(true);
        setScoreCard(null);
        const { data, err } = await Api.performRequest((r) =>
            r.reports.getScoreCalculator(processId)
        );
        if (data !== null) {
            setScoreCard(data);
        }
        setIsLoading(false);
    }

    useEffect(() => {
        fetchScoreCalculator();
    }, [])

    return (
        <>
            <Paper className="w-full overflow-hidden p-12">
                <h1 className="text-12 font-600 mt-12 mb-12 bg-grey-400 text-center">
                    <div>Score Calculator</div>
                </h1>
                {(isLoading) && <Ve3LoadingScreen />}
                {
                    (scoreCard && scoreCard?.length > 0) ? (
                        <div className="w-full overflow-x-auto">
                            <table className="w-full whitespace-no-wrap">
                                <thead>
                                    <tr className="whitespace-nowrap divide-x-1">
                                        <th className="p-6 text-center align-top">Description</th>
                                        <th className="p-6 text-center align-top">Derived Variable</th>
                                        <th className="p-6 text-center align-top">Transform Value</th>
                                        <th className="p-6 text-center align-top">Coefficient</th>
                                        <th className="p-6 text-center align-top">Points</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {scoreCard?.map((item, index) => (
                                        <tr className="whitespace-nowrap divide-x-1" key={index}>
                                            <td className="p-6 align-middle text-left">
                                                <p className="text-[12px] text-gray font-bold text-left">
                                                    {item.dvKey}
                                                </p>
                                            </td>
                                            <td className="p-6 align-middle text-right">
                                                <p className="text-[12px] text-gray font-bold text-right">
                                                    {item.dvValue}
                                                </p>
                                            </td>
                                            <td className="p-6 align-middle text-right">
                                                <p className="text-[12px] text-gray font-bold text-right">
                                                    {item.transformValue}
                                                </p>
                                            </td>
                                            <td className="p-6 align-middle text-right">
                                                <p className="text-[12px] text-gray font-bold text-right">
                                                    {item.coefficient}
                                                </p>
                                            </td>
                                            <td className="p-6 align-middle text-right">
                                                <p className="text-[12px] text-gray font-bold text-right">
                                                    {item.points}
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

export default ScoreCalculator;
