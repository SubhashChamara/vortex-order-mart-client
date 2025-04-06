import { FC, useState } from "react";
import { Tooltip, Typography } from "@mui/material";
import { Timeline } from "@mui/lab";

import ActivityTimelineItem from "./ActivityTimelineItem";
import { ScoreBoardTask } from "../../../types/ScoreBoardTask";
import { ScoreBoardProcess } from "../../../types/ScoreBoardProcess";
import RetriveFile from "../../../../../@helpers/RetriveFiles";
import useThemeMediaQuery from "../../../../../@hooks/useThemeMediaQuery";
import EdgeSvgIcon from "../../../../../@core/ui/EdgeSvgIcon";

type ActivityViewProps = {
  taskList: ScoreBoardTask[];
  process: ScoreBoardProcess | null;
};

const ActivityView: FC<ActivityViewProps> = (props) => {
  const { taskList, process } = props;
  const [isCopied, setIsCopied] = useState(false);

  const handleCopy = () => {
    if (process?.processInstance) {
      navigator.clipboard.writeText(process.processInstance).then(() => {
        setIsCopied(true); // Change icon to checkmark
        setTimeout(() => setIsCopied(false), 3000); // Revert to original icon after 3 seconds
      });
    }
  };

  const isMobile = useThemeMediaQuery((theme) => theme.breakpoints.down("sm"));

  if (process === null) {
    return;
  }

  return (
    <div className="bg-white p-0 px-10">
      <Typography className="text-10 sm:text-12 text-red-700 font-semibold tracking-tight leading-none flex flex-col sm:flex-row items-center w-full shadow-3 p-6 mb-12">
        <div className="flex items-center sm:w-1/2">
          <img
            src={
              process?.processLogo
                ? RetriveFile(process.processLogo)
                : "assets/icons/workflow/PF (20).png"
            }
            className="h-32 pr-6"
            alt="workflow-logo"
          />
          <label>{process.processName}</label>
          <Tooltip
            title={isCopied ? "Copied!" : process?.processInstance || ""}
            placement="top"
            className="ml-5"
          >
            <EdgeSvgIcon
              size={20}
              onClick={handleCopy}
              style={{ cursor: "pointer" }}
            >
              {isCopied
                ? "heroicons-solid:check-circle"
                : "heroicons-solid:question-mark-circle"}
            </EdgeSvgIcon>
          </Tooltip>
        </div>
        <div className="flex w-full justify-center sm:w-1/2 sm:justify-end">
          <div
            className="my-6 pr-12 text-[12px] sm:text-10 text-right font-bold text-secondary"
            style={{ letterSpacing: "2px" }}
          >
            TAT: {process.tat}
          </div>
        </div>
      </Typography>
      <div className="h-xs overflow-auto">
        <Timeline
          className=""
          position="right"
          sx={{
            "& .MuiTimelineItem-root:before": {
              display: "none",
            },
          }}
        >
          {taskList.map((item, index) => (
            <ActivityTimelineItem
              last={taskList.length === index + 1}
              item={item}
              key={index}
              isMobile={isMobile}
            />
          ))}
        </Timeline>
      </div>
    </div>
  );
};

export default ActivityView;
