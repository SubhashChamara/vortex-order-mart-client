import {
  TimelineConnector,
  TimelineContent,
  TimelineItem,
  TimelineSeparator,
} from "@mui/lab";
import { Divider, Paper, Box, Tooltip } from "@mui/material";

import EdgeSvgIcon from "../../../../../@core/ui/EdgeSvgIcon";
import { ScoreBoardTask } from "../../../types/ScoreBoardTask";
import { FC, useState } from "react";
import moment from "moment";

type ActivityTimelineItemProps = {
  item: ScoreBoardTask;
  last: boolean;
  isMobile?: boolean;
};

const ActivityTimelineItem: FC<ActivityTimelineItemProps> = (props) => {
  const { item, last, isMobile } = props;
  const [isCopied, setIsCopied] = useState(false);

  const handleCopy = () => {
    if (item?.taskInstance) {
      navigator.clipboard.writeText(item?.taskInstance).then(() => {
        setIsCopied(true); // Change icon to checkmark
        setTimeout(() => setIsCopied(false), 3000); // Revert to original icon after 3 seconds
      });
    }
  };

  return (
    <TimelineItem>
      <div className="flex flex-col justify-center">
        <Tooltip
          title="Task Created Date"
          className="cursor-default"
          placement="bottom"
          slotProps={{
            popper: {
              modifiers: [
                {
                  name: "offset",
                  options: {
                    offset: [0, -14],
                  },
                },
              ],
            },
          }}
        >
          <div>
            <div
              className="w-32 text-[12px] sm:text-12 sm:w-112 font-bold -ml-16 sm:ml-0"
              color="text.secondary"
            >
              {moment(item.createdDate).format("dddd")}
            </div>
            <div
              className="w-32 text-[10px] sm:text-10 sm:w-112 flex text-grey font-bold -ml-10 sm:ml-0"
              color="text.secondary"
            >
              {moment(item.createdDate).format("MMM DD, YYYY HH:mm:ss")}
            </div>
          </div>
        </Tooltip>
      </div>

      <TimelineSeparator>
        <TimelineConnector />
        <div className="w-10 h-10 sm:h-20 sm:w-20 p-2 flex items-center justify-center">
          <Tooltip
            title={item.status}
            className="cursor-default"
            placement="bottom"
            slotProps={{
              popper: {
                modifiers: [
                  {
                    name: "offset",
                    options: {
                      offset: [0, -14],
                    },
                  },
                ],
              },
            }}
          >
            <EdgeSvgIcon
              className={`text-white ${
                item.status === "Returned"
                  ? "bg-red"
                  : item.status === "Completed"
                  ? "bg-green"
                  : "bg-yellow"
              } rounded-full p-2`}
              size={isMobile ? 16 : 24}
            >
              {item.status === "Returned"
                ? "feather:corner-down-left"
                : item.status === "Completed"
                ? "feather:check"
                : "feather:clock"}
            </EdgeSvgIcon>
          </Tooltip>
        </div>
        <TimelineConnector />
      </TimelineSeparator>

      <TimelineContent className="flex flex-col items-start pt-0 py-6 pr-0">
        {item.taskInstance && !isMobile ? (
          <Paper className="w-full rounded-lg shadow-3 grid grid-cols-12 justify-between py-4 ">
            <Box className="col-span-9 flex flex-col md:flex-auto justify-center p-12 gap-6 border-r-3 border-r-grey-300">
              <div className=" text-black-900 font-bold text-10 flex items-center gap-3 text-grey-800">
                <p>{item.taskName}</p>
                {/* <Tooltip title={item?.taskInstance} placement="top">
                  <EdgeSvgIcon size={20}>
                    heroicons-solid:question-mark-circle
                  </EdgeSvgIcon>
                </Tooltip> */}
                <Tooltip
                  title={isCopied ? "Copied!" : item?.taskInstance || ""}
                  placement="bottom"
                  className="ml-5"
                  slotProps={{
                    popper: {
                      modifiers: [
                        {
                          name: "offset",
                          options: {
                            offset: [0, -14],
                          },
                        },
                      ],
                    },
                  }}
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
                {item.priorityTask && (
                        <Tooltip title="Urgent Task">
                          <span className="flex items-center justify-center ml-5">
                            <EdgeSvgIcon className="text-red-600" size={17}>
                              heroicons-solid:flag
                            </EdgeSvgIcon>
                          </span>
                        </Tooltip>
                      )}
              </div>
              <div className="flex flex-row gap-3">
                <span className="font-normal text-black">
                  {item.status == "Pending" ? "Claimed by" : "Submitted by"}
                </span>
                <span className="text-primary font-normal">
                  {item.submittedBy}
                </span>
              </div>
              <div className="flex flex-row gap-3">
                <span className="font-normal text-black">Decision</span>
                <span className="text-primary font-normal">
                  {item?.decision}
                </span>
              </div>
            </Box>

            {/* <Divider
              sx={{ borderRightWidth: 3, borderRightColor: "grey.400" }}
              orientation="vertical"
              className="hidden md:block"
              flexItem
            /> */}
            {/* <Divider
              sx={{ borderBottomWidth: 3, borderBottomColor: "grey.400" }}
              orientation="horizontal"
              className="mx-10 md:hidden"
              flexItem
            /> */}

            <Box className="col-span-3 flex flex-col md:items-start justify-between p-6 gap-10 w-full">
              <Tooltip
                title="Task Claimed Date"
                className="cursor-default w-full"
                placement="bottom"
                slotProps={{
                  popper: {
                    modifiers: [
                      {
                        name: "offset",
                        options: {
                          offset: [0, -14],
                        },
                      },
                    ],
                  },
                }}
              >
                <div className="flex gap-10 font-400">
                  <EdgeSvgIcon className="text-black">
                    feather:calendar
                  </EdgeSvgIcon>
                  <span className="self-center text-[14px] font-bold text-gray">
                    {item.claimedDate
                      ? moment(item.claimedDate).format("DD-MM-YYYY HH:mm:ss")
                      : "Not claimed yet"}
                  </span>
                </div>
              </Tooltip>
              <Tooltip
                title="Task Completed Date"
                className="cursor-default w-full"
                placement="bottom"
                slotProps={{
                  popper: {
                    modifiers: [
                      {
                        name: "offset",
                        options: {
                          offset: [0, -14],
                        },
                      },
                    ],
                  },
                }}
              >
                <div className="flex gap-10 font-400">
                  <EdgeSvgIcon className="text-black">
                    feather:calendar
                  </EdgeSvgIcon>
                  <span className="self-center text-[14px] font-bold text-gray">
                    {item.submittedDate
                      ? moment(item.submittedDate).format("DD-MM-YYYY HH:mm:ss")
                      : "Not completed yet"}
                  </span>
                </div>
              </Tooltip>
              <Tooltip
                title="TAT"
                className="cursor-default w-full"
                placement="bottom"
                slotProps={{
                  popper: {
                    modifiers: [
                      {
                        name: "offset",
                        options: {
                          offset: [0, -14],
                        },
                      },
                    ],
                  },
                }}
              >
                <div className="flex gap-10 font-400">
                  <EdgeSvgIcon className="text-">feather:pie-chart</EdgeSvgIcon>
                  <span className="self-center text-[14px] font-bold text-gray">
                    {item.tat}
                  </span>
                </div>
              </Tooltip>
            </Box>
          </Paper>
        ) : (
          <>
            <Paper className="w-full rounded-lg shadow-3 flex flex-col md:flex-row justify-between py-4">
              <Box className="flex flex-col w-full md:flex-auto justify-center p-6 gap-3">
                <p className="text-[10px] font-bold">{item.taskName}</p>
                <span className="flex flex-row gap-3 items-center font-normal text-[10px] text-orange">
                  submitted by
                  {/* <Tooltip title={item?.taskInstance} placement="top">
                    <EdgeSvgIcon size={12}>
                      heroicons-solid:question-mark-circle
                    </EdgeSvgIcon>
                  </Tooltip> */}
                  <Tooltip
                    title={isCopied ? "Copied!" : item?.taskInstance || ""}
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
                </span>
                <span className="text-[10px] text-primary font-normal">
                  {item.submittedBy}
                </span>
              </Box>
              <Divider
                sx={{
                  borderRightWidth: 3,
                  borderRightColor: "grey.400",
                  borderBottomWidth: 2,
                }}
                orientation="horizontal"
                className="m-4"
                flexItem
              />
              <Box className="flex justify-end">
                <div className="flex flex-col gap-3 px-6">
                  <Tooltip
                    title="Completed Date"
                    className="cursor-default"
                    placement="bottom"
                    slotProps={{
                      popper: {
                        modifiers: [
                          {
                            name: "offset",
                            options: {
                              offset: [0, -14],
                            },
                          },
                        ],
                      },
                    }}
                  >
                    <div className="flex flex-row items-center gap-3 font-400">
                      <EdgeSvgIcon className="text-green" size={12}>
                        feather:calendar
                      </EdgeSvgIcon>
                      <span className="self-center text-[8px] font-bold text-gray">
                        {item.submittedDate
                          ? moment(item.submittedDate).format(
                              "DD-MM-YYYY HH:mm:ss"
                            )
                          : ""}
                      </span>
                    </div>
                  </Tooltip>
                  <Tooltip
                    title="TAT"
                    className="cursor-default"
                    placement="bottom"
                    slotProps={{
                      popper: {
                        modifiers: [
                          {
                            name: "offset",
                            options: {
                              offset: [0, -14],
                            },
                          },
                        ],
                      },
                    }}
                  >
                    <div className="flex flex-row items-center gap-3 font-400">
                      <EdgeSvgIcon className="text-orange" size={12}>
                        feather:pie-chart
                      </EdgeSvgIcon>
                      <span className="self-center text-[8px] font-bold text-gray">
                        {item.tat}
                      </span>
                    </div>
                  </Tooltip>
                </div>
              </Box>
            </Paper>
          </>
        )}
      </TimelineContent>
    </TimelineItem>
  );
};

export default ActivityTimelineItem;
