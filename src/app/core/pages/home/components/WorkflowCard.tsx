import { Paper, Tooltip } from "@mui/material";
import { FC, memo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import EdgeSvgIcon from "../../../../../@core/ui/EdgeSvgIcon";
import Logger from "../../../../../@helpers/Logger";
import { Api } from "../../../../../api/Api";

import RetriveFile from "../../../../../@helpers/RetriveFiles";
import { ProcessDefinitionInfo } from "../../../types/ProcessDefinitionInfo";
import { ProcessStartRequest } from "../../../types/ProcessStartRequest";

import signIn from "../../../../../../public/assets/icons/home/sign-in.png";

type WorkflowCardProps = {
  workflow: ProcessDefinitionInfo;
  handleSetProcess: (proc: ProcessDefinitionInfo) => void;
};

const WorkflowCard: FC<WorkflowCardProps> = (props) => {
  const { workflow, handleSetProcess } = props;

  const navigate = useNavigate();

  const handleNavigateTaskPad = (processName: string) => {
    navigate(`/task-pad?process=${encodeURIComponent(processName)}`);
  };

  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);

  const handleInvokeProcess = async () => {
    if (isSubmitted) {
      Logger.debug("Form Already Submitted");
      return;
    }
    handleTaskPadFilters();

    /**
     * set submit true to identify form submitted already
     * help to prevent multiple submissions
     */
    setIsSubmitted(true);

    const startReq: ProcessStartRequest = {
      processDefinition: workflow.processDefinition,
      group: workflow.groupName,
      id: workflow.processId,
    };

    const { data, err } = await Api.performRequest((r) =>
      r.activity.startProcess(startReq, workflow.serviceUrl)
    );

    Logger.debug(
      "(Start Process) => { DATA: " +
        JSON.stringify(data) +
        " , ERROR: " +
        JSON.stringify(err)
    );

    if (data !== null) {
      toast.success("Workflow Invoked Successfully");
      navigate(`/task/${data.tasks[0].taskInstance}`);
    } else {
      toast.error(err?.msg);
      /**
       * set submit false to identify form submitted but failed
       * help to resubmit
       * and timeout prevent double clicks
       */
      setTimeout(() => setIsSubmitted(false), 3000);
    }
  };

  const handleTaskPadFilters = () => {
    const processFilter = localStorage.getItem("taskpadFilters");

    const filterObject = processFilter
      ? JSON.parse(processFilter)
      : { process: {} };

    filterObject.process.id = workflow.groupId;
    filterObject.process.name = workflow.name;

    const updatedProcessFilter = JSON.stringify(filterObject);
    localStorage.setItem("taskpadFilters", updatedProcessFilter);
  };

  const card = (
    <Paper className="max-w-full p-3 my-12 flex rounded-2 items-center hover:bg-grey-100 shadow-2">
      <div
        className="w-32 text-md font-600 pl-10 cursor-pointer text-black"
        onClick={() => handleNavigateTaskPad(workflow.name)}
      >
        {workflow.taskCount < 10
          ? `0${workflow.taskCount}`
          : workflow.taskCount}
      </div>
      <hr className="w-3 mx-6 h-24 bg-blue-gray-500" />
      <img
        src={
          workflow.logo
            ? RetriveFile(workflow.logo)
            : "assets/icons/workflow/PF (20).png"
        }
        className="h-28"
        alt="workflow-logo"
      />
      <div
        className="w-full font-bold pl-9 hover:cursor-pointer"
        onClick={() => handleSetProcess(workflow)}
      >
        {workflow.name}
      </div>
      <div className="w-40 min-w-0 flex gap-10 sm:w-40">
        {workflow.groupName && (
          <Tooltip title={workflow.groupName}>
            <div onClick={() => handleInvokeProcess()}>
              <EdgeSvgIcon
                className="text-48 icon-size-18 cursor-pointer"
                color="inherit"
              >
                feather:log-in
              </EdgeSvgIcon>
            </div>
          </Tooltip>
        )}
        {!workflow.groupName && (
          <Tooltip title="NO AUTHORIZATION">
            <EdgeSvgIcon
              className="text-48 icon-size-18 cursor-pointer"
              color="disabled"
            >
              feather:log-in
            </EdgeSvgIcon>
          </Tooltip>
        )}
      </div>
    </Paper>
  );

  return (
    <Paper className="grid grid-cols-12 w-full my-12 rounded-2 items-center hover:bg-grey-100 shadow-2">
      <div
        className="col-span-2 h-full flex items-center justify-end pr-10 text-md tracking-wide font-bold cursor-pointer text-black  rounded-l-2 bg-gray-200 border-r-2 border-r-gray-300"
        onClick={() => handleNavigateTaskPad(workflow.name)}
      >
        {workflow.taskCount < 10
          ? `0${workflow.taskCount || 0}`
          : workflow.taskCount}
      </div>

      <img
        src={
          workflow.logo
            ? RetriveFile(workflow.logo)
            : "assets/icons/workflow/PF (20).png"
        }
        className="mx-10 my-8 h-20"
        alt="workflow-logo"
      />

      <div
        className="w-full font-bold hover:cursor-pointer col-span-8 ml-10"
        onClick={() => handleSetProcess(workflow)}
      >
        {workflow.name}
      </div>
      <div className="w-40 min-w-0 flex gap-10 sm:w-40">
        {workflow.groupName && (
          <Tooltip title={workflow.groupName}>
            <div onClick={() => handleInvokeProcess()}>
              {/* <EdgeSvgIcon
                className="text-48 icon-size-18 cursor-pointer text-secondary"
                color="inherit"
              >
                feather:log-in
              </EdgeSvgIcon> */}
              <img src={signIn} className="w-12 h-12 cursor-pointer" />
            </div>
          </Tooltip>
        )}
        {!workflow.groupName && (
          <Tooltip title="NO AUTHORIZATION">
            {/* <EdgeSvgIcon
              className="text-48 icon-size-18 cursor-pointer"
              color="disabled"
            >
              feather:log-in
            </EdgeSvgIcon> */}
            <img
              src={signIn}
              className="w-12 h-12 cursor-not-allowed opacity-50"
            />
          </Tooltip>
        )}
      </div>
    </Paper>
  );
};

export default memo(WorkflowCard);
