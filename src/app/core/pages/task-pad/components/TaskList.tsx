import { FC, useEffect, useState } from "react";
import { Avatar, Button, Paper, Tooltip, darken } from "@mui/material";
import { useNavigate } from "react-router-dom";
import moment from "moment";

import EdgeSvgIcon from "../../../../../@core/ui/EdgeSvgIcon";
import { TaskInfo } from "../../../types/TaskInfo";
import { Pageable } from "../../../../../api/types/Pageable";
import RetriveFile from "../../../../../@helpers/RetriveFiles";

type Category = {
  name: string;
  border: string;
  list: Pageable<TaskInfo> | null;
  setCount: (count: number) => void;
  count: number;
};

interface TaskTableProps {
  urgentTask: Pageable<TaskInfo> | null;
  todayTask: Pageable<TaskInfo> | null;
  oneDayTask: Pageable<TaskInfo> | null;
  sevenDayTask: Pageable<TaskInfo> | null;
  thirtyDayTask: Pageable<TaskInfo> | null;
  overThirtyDayTask: Pageable<TaskInfo> | null;
  urgentItemCount: number;
  todayItemCount: number;
  oneDayItemCount: number;
  sevenDayItemCount: number;
  thirtyDayItemCount: number;
  overThirtyDayItemCount: number;
  setUrgentItemCount: (count: number) => void;
  setTodayItemCount: (count: number) => void;
  setOneDayItemCount: (count: number) => void;
  setSevenDayItemCount: (count: number) => void;
  setThirtyDayItemCount: (count: number) => void;
  setOverThirtyDayItemCount: (count: number) => void;
}

const TaskList: FC<TaskTableProps> = (props) => {
  const {
    urgentTask,
    todayTask,
    oneDayTask,
    sevenDayTask,
    thirtyDayTask,
    overThirtyDayTask,
    urgentItemCount,
    todayItemCount,
    oneDayItemCount,
    sevenDayItemCount,
    thirtyDayItemCount,
    overThirtyDayItemCount,
    setUrgentItemCount,
    setTodayItemCount,
    setOneDayItemCount,
    setSevenDayItemCount,
    setThirtyDayItemCount,
    setOverThirtyDayItemCount,
  } = props;

  const navigate = useNavigate();

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(3);

  const categoryList: Category[] = [
    {
      name: "Urgent",
      border: "border-gray",
      list: urgentTask,
      count: urgentItemCount,
      setCount: setUrgentItemCount,
    },
    {
      name: "Today",
      border: "border-primary",
      list: todayTask,
      count: todayItemCount,
      setCount: setTodayItemCount,
    },

    {
      name: "1 Day",
      border: "border-gray",
      list: oneDayTask,
      count: oneDayItemCount,
      setCount: setOneDayItemCount,
    },
    {
      name: "7 Days",
      border: "border-gray",
      list: sevenDayTask,
      count: sevenDayItemCount,
      setCount: setSevenDayItemCount,
    },
    {
      name: "30 Days",
      border: "border-gray",
      list: thirtyDayTask,
      count: thirtyDayItemCount,
      setCount: setThirtyDayItemCount,
    },
    {
      name: "Over 30 Days",
      border: "border-gray",
      list: overThirtyDayTask,
      count: overThirtyDayItemCount,
      setCount: setOverThirtyDayItemCount,
    },
  ];

  const navigateToTask = async (link: string) => {
    navigate(link);
  };

  const totalPages = Math.ceil(categoryList.length / itemsPerPage);

  const handleNextPage = () => {
    setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages));
  };

  const handlePrevPage = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
  };

  const paginatedCategoryList = categoryList.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1920) {
        setItemsPerPage(6);
        setCurrentPage(1);
      } else if (window.innerWidth > 1280) {
        setItemsPerPage(5);
        setCurrentPage(1);
      } else if (window.innerWidth > 1024) {
        setItemsPerPage(4);
        setCurrentPage(1);
      } else if (window.innerWidth > 768) {
        setItemsPerPage(4);
        setCurrentPage(1);
      } else if (window.innerWidth > 640) {
        setCurrentPage(1);
        setItemsPerPage(3);
      } else {
        setCurrentPage(1);
        setItemsPerPage(1);
      }
    };

    window.addEventListener("resize", handleResize);
    handleResize();

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  function truncateText(text: string, maxLength: number) {
    if (text.length > maxLength) {
      return text.substring(0, maxLength) + "...";
    }
    return text;
  }

  return (
    <div className="relative w-full">
      <div className="grid sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-9 w-full overflow-auto">
        {paginatedCategoryList.map((category, index) => (
          <Paper key={index} className=" w-full flex flex-col shadow-1">
            <div
              className={`bg-white border-b-3 text-center font-bold p-3 text-blue-gray-800 ${category.border}`}
            >
              {category.name} ({category.list?.totalElements || 0})
            </div>

            <div className="bg-grey-100 flex flex-col pt-6 gap-6 h-full">
              {category.list?.content?.map((task, index) => (
                <Paper
                  key={index}
                  // className={`w-full cursor-pointer relative ${
                  //   task.urgent ? "border-2 border-red-600 hover:before:content-['URGENT_TASK'] hover:before:absolute hover:before:top-2 hover:before:right-2 hover:before:bg-red-600 hover:before:text-white hover:before:px-5 hover:before:py-1 hover:before:rounded hover:before:text-xs" : ""
                  // }`}
                  className={`w-full cursor-pointer relative ${
                    task.priorityProcess || task.priorityTask
                      ? "border-2 border-red-600"
                      : ""
                  }`}
                  onClick={() => navigateToTask(`/task/${task.taskInstance}`)}
                >
                  <div className="p-2">
                    <div className="p-4 px-9 rounded-sm">
                      <div className="flex flex-row justify-between">
                        <div className="text-[13px] font-bold text-blue-gray-800">
                          <span>WF L:</span>
                          <span className="text-gray-600 ml-3 ">
                            {task.businessKey}
                          </span>
                        </div>
                        <div className="flex justify-end text-[12px] text-secondary text-10p font-bold">
                          <Tooltip title="Invoked Date">
                            <span>
                              {moment(task.invokedTime).format(
                                "DD/MM/YYYY HH:mm:ss"
                              )}
                            </span>
                          </Tooltip>
                          {(task.priorityProcess || task.priorityTask) && (
                            <Tooltip title="Urgent Task">
                              <span className="flex items-center justify-center -mr-8">
                                <EdgeSvgIcon
                                  className="text-red-600 ml-3"
                                  size={15}
                                >
                                  heroicons-solid:flag
                                </EdgeSvgIcon>
                              </span>
                            </Tooltip>
                          )}
                        </div>
                      </div>
                      <div className="pt-6 pb-6">
                        <span className=" text-black font-bold text-9 flex">
                          <Tooltip title={task.status}>
                            <EdgeSvgIcon
                              className={`icon-size-18 cursor-pointer mr-6 ${
                                task.status === "Unassigned"
                                  ? "text-orange"
                                  : task.status === "Assigned to me"
                                  ? "text-green"
                                  : "text-red"
                              }`}
                              color="error"
                            >
                              {task.status === "Unassigned"
                                ? "feather:unlock"
                                : "feather:lock"}
                            </EdgeSvgIcon>
                          </Tooltip>

                          {task.taskName}
                        </span>
                      </div>
                      <div className="flex justify-between items-end">
                        <div className="text-[12px] font-bold text-blue-gray-800">
                          <div>
                            <span>Invoker:</span>
                            <span className="text-black ml-4">
                              {truncateText(
                                task.owner,
                                task.returned ? 15 : 20
                              )}
                            </span>
                          </div>
                          {task.assignedGroup && (
                            <div>
                              <span>Group:</span>
                              <Tooltip title={task.assignedGroup}>
                                <span className="text-black ml-4">
                                  {truncateText(
                                    task.assignedGroup,
                                    task.returned ? 15 : 20
                                  )}
                                </span>
                              </Tooltip>
                            </div>
                          )}
                        </div>

                        <div>
                          <div className="relative rounded-full p-0 w-full scale-75 flex items-center">
                            {task.returned && (
                              <Tooltip title="Returned">
                                <EdgeSvgIcon
                                  className="icon-size-20 cursor-pointer mr-6 bg-gray p-3 rounded-full text-white"
                                  color="error"
                                >
                                  feather:corner-down-left
                                </EdgeSvgIcon>
                              </Tooltip>
                            )}
                            {task.ownerProfile ? (
                              <Tooltip title={task.owner}>
                                <Avatar
                                  sx={{
                                    background: (theme) =>
                                      theme.palette.background.default,
                                    color: (theme) =>
                                      theme.palette.text.secondary,
                                  }}
                                  alt="user photo"
                                  src={RetriveFile(task.ownerProfile)}
                                />
                              </Tooltip>
                            ) : (
                              <Tooltip title={task.owner}>
                                <Avatar
                                  sx={{
                                    background: (theme) =>
                                      darken(
                                        theme.palette.background.default,
                                        0.05
                                      ),
                                    color: (theme) =>
                                      theme.palette.text.secondary,
                                  }}
                                >
                                  {task.assignee?.[0]}
                                </Avatar>
                              </Tooltip>
                            )}
                            <div
                              className="absolute inset-0 rounded-full shadow-inner"
                              aria-hidden="true"
                            ></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </Paper>
              ))}
              {category.list !== null &&
                category.list?.numberOfElements <
                  category.list?.totalElements && (
                  <div
                    className="w-full flex justify-center"
                    onClick={() => category.setCount(category.count + 5)}
                  >
                    <Button size="small">More</Button>
                  </div>
                )}
            </div>
          </Paper>
        ))}
      </div>
      {currentPage < totalPages && (
        <button
          className="absolute right-0 top-12 transform -translate-y-1/2 text-white bg-blue-gray-800 flex justify-center items-center"
          onClick={handleNextPage}
        >
          <EdgeSvgIcon size={32}>heroicons-solid:chevron-right</EdgeSvgIcon>
        </button>
      )}
      {currentPage > 1 && (
        <button
          className="absolute left-0 top-12 transform -translate-y-1/2 text-white bg-blue-gray-800 flex justify-center items-center"
          onClick={handlePrevPage}
        >
          <EdgeSvgIcon size={32}>heroicons-solid:chevron-left</EdgeSvgIcon>
        </button>
      )}
    </div>
  );
};

export default TaskList;
