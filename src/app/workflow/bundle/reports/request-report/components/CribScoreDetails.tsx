import { Paper } from "@mui/material";
import { BundleCribScoreInfo } from "../../../@types/BundleCribScore";

interface CribScoreProps {
    cribScore: BundleCribScoreInfo | null;
}

const CribScoreDetails = (props: CribScoreProps) => {
    const { cribScore } = props;
    return (
        <Paper className="max-w-screen-sm overflow-hidden p-12 ">
            <h1 className="text-12 font-600 mt-12 mb-12 bg-grey-400 text-center">
                <div>Crib Score</div>
            </h1>
            {
                (cribScore) ? (
                    <div className="w-full overflow-x-auto" >
                        <table className="w-full whitespace-no-wrap">
                            <thead>
                                <tr className="whitespace-nowrap divide-x-1">
                                    <th className="p-6 text-left align-top divide-x-1">Score</th>
                                    <th className="p-6 text-left align-top">Crib Score</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr className="whitespace-nowrap divide-x-1">
                                    <td className="p-6 align-middle text-left">
                                        <p className="text-[12px] text-gray font-bold text-left">
                                            {cribScore.cribScoreGrade || ""}
                                        </p>
                                    </td>
                                    <td className="p-6 align-middle text-left">
                                        <p className="text-[12px] text-gray font-bold text-left">
                                            {cribScore.cribScoreValue || ""}
                                        </p>
                                    </td>
                                </tr>

                            </tbody>
                        </table>
                    </div>
                ) : (
                    <div className="text-11 font-600 text-center  text-red">
                        No Data Found

                    </div>)

            }
        </Paper >
    );
};

export default CribScoreDetails;
