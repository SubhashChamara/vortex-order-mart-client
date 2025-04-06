import { FC, memo } from "react";
import { Paper } from "@mui/material";

type SummaryCardProps = {
  summary: Summary;
};

type Summary = {
  color: string;
  icon: string;
  title: string;
  totalCount: number;
  newCount: number;
  returnCount: number;
};

const SummaryCard: FC<SummaryCardProps> = (props) => {
  const { summary } = props;

  return (
    <Paper
      style={{
        borderBottom: summary.color ? `5px solid ${summary.color}` : "none",
      }}
      className="flex justify-between flex-col h-full flex-auto rounded shadow-2 border-b-4 overflow-hidden grid-cols-1 divide-y-2 px-6"
    >
      <div className="flex py-6 gap-12">
      <img src={summary.icon} className="w-24 rounded-4 bg-grey-200 p-6 shadow-3 ml-2" alt="" />

        <div className="flex-auto  self-center">
          <div className="font-semibold text-12 text-gray-700">
            {summary.title || "-"}
          </div>
        </div>
      </div>
      <div className="flex justify-evenly">
        <div className="flex py-6 w-full">
          <div className="pr-6 flex justify-center w-full">
            <div
              className="text-24 icon-size-22 font-700 text-blue-gray-800"
              color="action"
            >
              {summary.totalCount || 0}
            </div>
          </div>
          <div className="flex flex-col pl-6 w-full border-l-3 border-l-yellow-500 ">
            <div className="text-8 font-bold text-gray-500">New</div>
            <div className="text-8 font-bold text-blue-gray-800">
              {summary.newCount}
            </div>
          </div>
          <div className="flex flex-col pl-6 w-full border-l-3 border-blue-gray-500">
            <div className="text-8 font-bold text-gray-500">Return</div>
            <div className="text-8 font-bold text-blue-gray-800">
              {summary.returnCount}
            </div>
          </div>
        </div>
      </div>
    </Paper>
  );
};

export default memo(SummaryCard);
