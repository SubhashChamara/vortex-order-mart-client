import { useState,useEffect } from 'react';
import { FC } from 'react';
import Box from '@mui/material/Box';
import SpeedDial from '@mui/material/SpeedDial';
import SpeedDialIcon from '@mui/material/SpeedDialIcon';
import { toast } from "react-toastify";
import { ProcessDefinitionInfo } from '../../../types/ProcessDefinitionInfo';
import { Api } from '../../../../../api/Api';
import Logger from '../../../../../@helpers/Logger';
import { Avatar, darken, SpeedDialAction } from '@mui/material';
import { ProcessStartRequest } from '../../../types/ProcessStartRequest';
import { useNavigate } from 'react-router-dom';
import RetriveFile from '../../../../../@helpers/RetriveFiles';

type QuickActionButtonProps = {
  handleSetProcess: (proc: ProcessDefinitionInfo) => void;
};



const QuickActionButton: FC<QuickActionButtonProps> = (props) => {

    const { handleSetProcess } = props;
    const navigate = useNavigate();
    const [workflowList, setWorkflowList] = useState<ProcessDefinitionInfo[]>([]);
    const [filteredList, setFilteredList] = useState<ProcessDefinitionInfo[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [search, setSearch] = useState<string>("");
    const [isSubmitted, setIsSubmitted] = useState<boolean>(false);

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

    const handleTaskPadFilters = (workflow:ProcessDefinitionInfo) => {
      const processFilter = localStorage.getItem("taskpadFilters");
  
      const filterObject = processFilter
        ? JSON.parse(processFilter)
        : { process: {} };
  
      filterObject.process.id = workflow.groupId;
      filterObject.process.name = workflow.name;
  
      const updatedProcessFilter = JSON.stringify(filterObject);
      localStorage.setItem("taskpadFilters", updatedProcessFilter);
    };

    const handleInvokeProcess = async (workflow:ProcessDefinitionInfo) => {
        if (isSubmitted) {
          Logger.debug("Form Already Submitted");
          return;
        }
        handleTaskPadFilters(workflow);
    
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

    useEffect(() => {
        handleFetchWorkflows();
      }, []);

  return (
    <Box
      sx={{
        position: 'fixed',
        bottom: 16,
        right: 16,
        zIndex: 1500,
      }}
    >
      <SpeedDial
        ariaLabel="Workflow Quick Actions"
        sx={{ position: 'absolute', bottom: 32, right: 16 }}
        icon={<SpeedDialIcon />}
      >
        {workflowList.map((workflow) => (
          // <WorkflowCard2
          //     workflow={workflow}
          //     key={workflow.processDefinition}
          //     handleSetProcess={handleSetProcess}
          // />
          <SpeedDialAction
            key={workflow.processDefinition}
            icon={
              workflow.logo ? (
                <Avatar
                  sx={{
                    background: (theme) =>
                      theme.palette.background.default,
                    color: (theme) => theme.palette.text.secondary,
                  }}
                  alt="user photo"
                  src={RetriveFile(workflow.logo)}
                />
              ) : (
                <Avatar
                  sx={{
                    background: (theme) =>
                      darken(theme.palette.background.default, 0.05),
                    color: (theme) => theme.palette.text.secondary,
                  }}
                >
                  {workflow.name?.[0]}
                </Avatar>
              )}
            
            onClick={() => handleInvokeProcess(workflow)}
            tooltipTitle={workflow.name + '   (' + workflow.groupName +')'}
          />
        ))}
      </SpeedDial>
    </Box>
  );
};

export default QuickActionButton;
