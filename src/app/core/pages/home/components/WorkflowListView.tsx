import { Paper, TextField } from "@mui/material";
import { FC, memo, useEffect, useState } from "react";

import Logger from "../../../../../@helpers/Logger";
import { Api } from "../../../../../api/Api";
import WorkflowCard from "./WorkflowCard";

import { ProcessDefinitionInfo } from "../../../types/ProcessDefinitionInfo";
import Ve3LoadingScreen from "../../../../../@core/ui/Ve3LoadingScreen/Ve3LoadingScreen";

type WorkflowListViewProps = {
  handleSetProcess: (proc: ProcessDefinitionInfo) => void;
};

const WorkflowListView: FC<WorkflowListViewProps> = (props) => {
  const { handleSetProcess } = props;

  const [workflowList, setWorkflowList] = useState<ProcessDefinitionInfo[]>([]);
  const [filteredList, setFilteredList] = useState<ProcessDefinitionInfo[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [search, setSearch] = useState<string>("");

  const handleFetchWorkflows = async () => {
    setIsLoading(true);
    try {
      const { data, err } = await Api.performRequest((r) =>
        r.workflow.processList()
      );

      Logger.debug(
        "(Workflow List) => { DATA: " +
          JSON.stringify(data) +
          " , ERROR: " +
          JSON.stringify(err)
      );

      if (data !== null) {
        console.log(data);
        setWorkflowList(data);
        handleSetProcess(data?.length !== 0 ? data[0] : null);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    handleFetchWorkflows();
  }, []);

  useEffect(() => {
    if (search === "") {
      setFilteredList(workflowList);
    } else {
      const filtered = workflowList.filter((item) =>
        item.name.toLowerCase().includes(search.toLowerCase())
      );
      setFilteredList(filtered);
    }
  }, [search, workflowList]);

  return (
    <Paper className="w-full h-full overflow-y-auto p-12">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-12">
          <img
            src="assets/icons/home/Workflows.png"
            className="w-24 rounded-4 bg-grey-200 p-6 shadow-3"
            alt=""
          />
          <div className="text-12 font-bold text-gray-800">
            Process Flows at a Glance
          </div>
        </div>
        <div>
          <TextField
            label="Search"
            type="text"
            size="small"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>
      <div className="px-12 pt-6">
        {!isLoading ? (
          filteredList.map((workflow, index) => (
            <WorkflowCard
              workflow={workflow}
              key={index}
              handleSetProcess={handleSetProcess}
            />
          ))
        ) : (
          <Ve3LoadingScreen />
        )}
      </div>
    </Paper>
  );
};

export default memo(WorkflowListView);
