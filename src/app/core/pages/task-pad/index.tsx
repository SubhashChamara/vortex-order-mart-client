import moment from "moment";
import { FC, useEffect, useState } from "react";

import Ve3LoadingScreen from "../../../../@core/ui/Ve3LoadingScreen/Ve3LoadingScreen";
import Logger from "../../../../@helpers/Logger";
import { Api } from "../../../../api/Api";
import { Pageable } from "../../../../api/types/Pageable";
import { TaskInfo } from "../../types/TaskInfo";
import TaskTable from "./components/TaskList";
import TaskPadFilters from "./components/TaskPadFilters";
import { Label } from "@mui/icons-material";

const TaskPad: FC = () => {
  const [urgentTask, seturgentTask] = useState<Pageable<TaskInfo> | null>(null);
  const [todayTask, setTodayTask] = useState<Pageable<TaskInfo> | null>(null);
  const [oneDayTask, setOneDayTask] = useState<Pageable<TaskInfo> | null>(null);
  const [sevenDayTask, setSevenDayTask] = useState<Pageable<TaskInfo> | null>(
    null
  );
  const [thirtyDayTask, setThirtyDayTask] = useState<Pageable<TaskInfo> | null>(
    null
  );
  const [overThirtyDayTask, setOverThirtyDayTask] =
    useState<Pageable<TaskInfo> | null>(null);

  const [urgentItemCount, setUrgentItemCount] = useState<number>(5);
  const [todayItemCount, setTodayItemCount] = useState<number>(5);
  const [oneDayItemCount, setOneDayItemCount] = useState<number>(5);
  const [sevenDayItemCount, setSevenDayItemCount] = useState<number>(5);
  const [thirtyDayItemCount, setThirtyDayItemCount] = useState<number>(5);
  const [overThirtyDayItemCount, setOverThirtyDayItemCount] =
    useState<number>(5);

  const [process, setProcess] = useState<string>("");
  const [label, setLabel] = useState<string | null>("");
  const [isMyTasks, setIsMyTasks] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const handleFetchTasks = (
    processName: string,
    workflowLabel: string | null,
    isAllTasks: boolean
  ) => {
    setIsLoading(true);
    Promise.all([
      handleFetchOneDayTasks(
        processName,
        workflowLabel,
        isAllTasks === undefined ? false : !isAllTasks
      ),
      handleFetchTodayTasks(
        processName,
        workflowLabel,
        isAllTasks === undefined ? false : !isAllTasks
      ),
      handleFetchSevenDayTasks(
        processName,
        workflowLabel,
        isAllTasks === undefined ? false : !isAllTasks
      ),
      handleFetchOverThirtyDayTasks(
        processName,
        workflowLabel,
        isAllTasks === undefined ? false : !isAllTasks
      ),
      handleFetchThirtyDayTasks(
        processName,
        workflowLabel,
        isAllTasks === undefined ? false : !isAllTasks
      ),
      handleFetchUrgentTasks(
        processName,
        workflowLabel,
        isAllTasks === undefined ? false : !isAllTasks
      ),
    ]).then(() => {
      setIsLoading(false);
    });
    setProcess(processName);
    setLabel(workflowLabel);
    setIsMyTasks(isAllTasks);
  };

  const handleFetchTodayTasks = async (
    processName: string,
    workflowLabel: string | null,
    myTasks: boolean
  ) => {
    const task = await handleFetchTaskList(
      moment().format("YYYY-MM-DD"),
      moment().format("YYYY-MM-DD"),
      todayItemCount,
      processName,
      workflowLabel,
      myTasks
    );

    setTodayTask(task);
  };

  const handleFetchOneDayTasks = async (
    processName: string,
    workflowLabel: string | null,
    myTasks: boolean
  ) => {
    const task = await handleFetchTaskList(
      moment().subtract(1, "days").format("YYYY-MM-DD"),
      moment().subtract(1, "days").format("YYYY-MM-DD"),
      oneDayItemCount,
      processName,
      workflowLabel,
      myTasks
    );

    setOneDayTask(task);
  };

  const handleFetchSevenDayTasks = async (
    processName: string,
    workflowLabel: string | null,
    myTasks: boolean
  ) => {
    const task = await handleFetchTaskList(
      moment().subtract(7, "days").format("YYYY-MM-DD"),
      moment().subtract(2, "days").format("YYYY-MM-DD"),
      sevenDayItemCount,
      processName,
      workflowLabel,
      myTasks
    );

    setSevenDayTask(task);
  };

  const handleFetchThirtyDayTasks = async (
    processName: string,
    workflowLabel: string | null,
    myTasks: boolean
  ) => {
    const task = await handleFetchTaskList(
      moment().subtract(30, "days").format("YYYY-MM-DD"),
      moment().subtract(8, "days").format("YYYY-MM-DD"),
      thirtyDayItemCount,
      processName,
      workflowLabel,
      myTasks
    );

    setThirtyDayTask(task);
  };

  const handleFetchOverThirtyDayTasks = async (
    processName: string,
    workflowLabel: string | null,
    myTasks: boolean
  ) => {
    const task = await handleFetchTaskList(
      moment().subtract(1, "years").format("YYYY-MM-DD"),
      moment().subtract(31, "days").format("YYYY-MM-DD"),
      overThirtyDayItemCount,
      processName,
      workflowLabel,
      myTasks
    );

    setOverThirtyDayTask(task);
  };

  const handleFetchUrgentTasks = async (
    processName: string,
    workflowLabel: string | null,
    myTasks: boolean
  ) => {
    const task = await handleFetchTaskList(
      null,
      null,
      urgentItemCount,
      processName,
      workflowLabel,
      myTasks,
      1
    );

    seturgentTask(task);
  };

  const handleFetchTaskList = async (
    startDate: string|null,
    endDate: string|null,
    itemCount: number,
    processName: string,
    workflowLabel: string | null,
    myTasks: boolean,
    priority?: number
  ) => {
    const { data, err } = await Api.performRequest((r) =>
      r.workflow.taskList(
        startDate,
        endDate,
        0,
        itemCount,
        processName,
        workflowLabel,
        myTasks,
        priority
      )
    );
    Logger.debug(
      "(Task List) => { DATA: " +
        JSON.stringify(data) +
        " , ERROR: " +
        JSON.stringify(err)
    );

    if (data !== null) {
      return data;
    }
    return null;
  };

  useEffect(() => {
    if (process) {
      handleFetchTodayTasks(process, label, isMyTasks);
    }
  }, [todayItemCount]);

  useEffect(() => {
    if (process) {
      handleFetchOneDayTasks(process, label, isMyTasks);
    }
  }, [oneDayItemCount]);

  useEffect(() => {
    if (process) {
      handleFetchSevenDayTasks(process, label, isMyTasks);
    }
  }, [sevenDayItemCount]);

  useEffect(() => {
    if (process) {
      handleFetchThirtyDayTasks(process, label, isMyTasks);
    }
  }, [thirtyDayItemCount]);

  useEffect(() => {
    if (process) {
      handleFetchOverThirtyDayTasks(process, label, isMyTasks);
    }
  }, [overThirtyDayItemCount]);

  useEffect(() => {
    if (process) {
      handleFetchUrgentTasks(process, label, isMyTasks);
    }
  }, [urgentItemCount]);

  return (
    <div className="px-12 pb-12">
      <TaskPadFilters handleFetchTasks={handleFetchTasks} />
      {isLoading ? (
        <Ve3LoadingScreen />
      ) : (
        <TaskTable
          urgentTask={urgentTask}
          todayTask={todayTask}
          oneDayTask={oneDayTask}
          sevenDayTask={sevenDayTask}
          thirtyDayTask={thirtyDayTask}
          overThirtyDayTask={overThirtyDayTask}
          urgentItemCount={urgentItemCount}
          setUrgentItemCount={setUrgentItemCount}
          todayItemCount={todayItemCount}
          setTodayItemCount={setTodayItemCount}
          oneDayItemCount={oneDayItemCount}
          setOneDayItemCount={setOneDayItemCount}
          sevenDayItemCount={sevenDayItemCount}
          setSevenDayItemCount={setSevenDayItemCount}
          thirtyDayItemCount={thirtyDayItemCount}
          setThirtyDayItemCount={setThirtyDayItemCount}
          overThirtyDayItemCount={overThirtyDayItemCount}
          setOverThirtyDayItemCount={setOverThirtyDayItemCount}
        />
      )}
    </div>
  );
};

export default TaskPad;
