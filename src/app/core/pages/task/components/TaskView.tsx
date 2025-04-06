import { FC, useEffect, useState } from "react";
import { TaskDetailInfo } from "../../../types/TaskDetailInfo";
import { ScoreBoardProcess } from "../../../types/ScoreBoardProcess";
import { ScoreBoardTask } from "../../../types/ScoreBoardTask";
import { Api } from "../../../../../api/Api";
import Logger from "../../../../../@helpers/Logger";
import ActivityView from "../../score-board/components/ActivityView";

type TaskViewPorps = {
  task: TaskDetailInfo | null;
};

const TaskView: FC<TaskViewPorps> = (props) => {
  const { task } = props;
  const [process, setProcess] = useState<ScoreBoardProcess | null>(null);
  const [taskList, setTaskList] = useState<ScoreBoardTask[]>([]);

  const handleFetchHistoryProcessList = async () => {
    if (task === null) return;
    const { data, err } = await Api.performRequest((r) =>
      r.workflow.processDetails(task.processInstanceId)
    );

    Logger.debug(
      "(History Process) => { DATA: " +
        JSON.stringify(data) +
        " , ERROR: " +
        JSON.stringify(err)
    );

    if (data !== null) {
      setProcess(data);
    }
  };

  const handleFetchTaskList = async () => {
    if (task === null) return;
    const { data, err } = await Api.performRequest((r) =>
      r.workflow.taskListHistory(task?.processInstanceId)
    );
    Logger.debug(
      "(History Task List) => { DATA: " +
        JSON.stringify(data) +
        " , ERROR: " +
        JSON.stringify(err)
    );
    if (data !== null) {
      setTaskList(data);
    }
  };

  useEffect(() => {
    handleFetchHistoryProcessList();
    handleFetchTaskList();
  }, [task]);

  return (
    <>
      <ActivityView taskList={taskList} process={process} />
    </>
  );
};

export default TaskView;
