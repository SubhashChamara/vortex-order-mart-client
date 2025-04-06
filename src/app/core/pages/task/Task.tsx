import {
  ComponentType,
  LazyExoticComponent,
  Suspense,
  memo,
  useEffect,
  useState,
} from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Paper, Tooltip } from "@mui/material";
import { toast } from "react-toastify";

import Decision from "./components/Decision";
import Logger from "../../../../@helpers/Logger";
import filterComponent from "../../../../@helpers/TaskFormFilter";
import { Api } from "../../../../api/Api";
import EdgeSvgIcon from "../../../../@core/ui/EdgeSvgIcon";
import Ve3Popup from "../../../../@core/ui/Ve3Popup/Ve3Popup";
import RetriveFile from "../../../../@helpers/RetriveFiles";
import { DocumentListParams } from "../../../../api/types/params/DocumentListParams";
import DocumentView from "./components/DocumentView";
import CommentView from "./components/CommentView";
import TaskView from "./components/TaskView";

import { TaskClaimRequest } from "../../types/TaskClaimRequest";
import { TaskDetailInfo } from "../../types/TaskDetailInfo";
import { Pageable } from "../../../../api/types/Pageable";
import { DocumentInfo } from "../../types/DocumentInfo";
import { ScoreBoardProcess } from "../../types/ScoreBoardProcess";
import Ve3LoadingScreen from "../../../../@core/ui/Ve3LoadingScreen/Ve3LoadingScreen";

const Task = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  Logger.debug(id ?? "query param not available");

  const [task, setTask] = useState<TaskDetailInfo | null>(null);
  const [ComponentToRender, setComponentToRender] =
    useState<LazyExoticComponent<ComponentType<any>> | null>(null);

  const [documentViewOpen, setDocumentViewOpen] = useState<boolean>(false);
  const [documentList, setDocumentList] =
    useState<Pageable<DocumentInfo> | null>(null);
  const [docPage, setDocPage] = useState<number>(0);

  const [commentViewOpen, setCommentViewOpen] = useState<boolean>(false);
  const [taskViewOpen, setTaskViewOpen] = useState<boolean>(false);

  const [copiedProcessId, setCopiedProcessId] = useState(false);
  const [copiedTaskId, setCopiedTaskId] = useState(false);

  const handleCopy = (text:string|null, setCopied: React.Dispatch<React.SetStateAction<boolean>>) => {
    if (text) {
      navigator.clipboard.writeText(text).then(() => {
        setCopied(true); // Change icon to checkmark
        setTimeout(() => setCopied(false), 3000); // Revert to original icon after 3 seconds
      });
    }
  };


  const handleFetchClaimDetails = async () => {
    if (!id) {
      Logger.error("Task Instance not available");
      return;
    }

    const request: TaskClaimRequest = {
      taskInstance: id,
    };

    const { data, err } = await Api.performRequest((r) =>
      r.workflow.claim(request)
    );

    Logger.debug(
      "(Task) => { DATA: " +
        JSON.stringify(data) +
        " , ERROR: " +
        JSON.stringify(err)
    );
    if (data !== null) {
      setTask(data);
    } else {
      toast.error(err?.msg);
      navigate("/task-pad");
    }
  };

  const handleFetchDocumentList = async () => {
    if (task === null) {
      return;
    }
    const params: DocumentListParams = {
      processInstance: task?.processInstanceId,
      page: docPage,
      size: 5,
      sort: "createdDate,desc",
      endDate: null,
      startDate: null,
      idProcess: null,
      workflowLabel: null,
      processName: null,
    };
    const { data, err } = await Api.performRequest((r) =>
      r.document.list(params)
    );
    Logger.debug(
      "(Document List) => { DATA: " +
        JSON.stringify(data) +
        " , ERROR: " +
        JSON.stringify(err)
    );
    if (data !== null) {
      setDocumentList(data);
      setDocumentViewOpen(true);
    }
  };

  useEffect(() => {
    handleFetchClaimDetails();
  }, [id]);

  useEffect(() => {
    if (task !== null) {
      const config = filterComponent(task.processDefinitionKey, task.formKey);

      if (config) {
        setComponentToRender(config.component);
      } else {
        Logger.error("Form not found");
        setComponentToRender(null);
      }
    }
  }, [task]);

  useEffect(() => {
    handleFetchDocumentList();
  }, [docPage]);

  return (
    <>
      <div className="p-12">
        <Paper className="p-9 flex justify-between items-center flex-col sm:flex-row">
          <div className="flex flex-col sm:flex-row gap-12 items-center">
            <div className="bg-gray-300 rounded p-4">
              <img
                src={
                  task?.logo
                    ? RetriveFile(task.logo)
                    : "assets/icons/workflow/PF (20).png"
                }
                className="w-32"
                alt="icon"
              />
            </div>
            <div className="flex flex-col gap-4">
              <div>
                {/* Process Section */}
                <div className="flex">
                  <div className="flex justify-between">
                    <div className="font-400 w-[100px]">Process</div>
                    <div>-</div>
                  </div>
                  <div className="flex">
                    <div className="font-700 ml-9 text-red-600">
                      {task?.processName}
                    </div>
                    <div className="font-700 ml-6 text-gray-600 text-9">
                      <Tooltip
                        title={
                          copiedProcessId ? "Copied!" : task?.processInstanceId
                        }
                      >
                        <EdgeSvgIcon
                          size={20}
                          onClick={() =>
                            handleCopy(
                              task?.processInstanceId!,
                              setCopiedProcessId
                            )
                          }
                          style={{ cursor: "pointer" }}
                        >
                          {copiedProcessId
                            ? "heroicons-solid:check-circle"
                            : "heroicons-solid:question-mark-circle"}
                        </EdgeSvgIcon>
                      </Tooltip>
                    </div>
                  </div>
                </div>

                {/* Task Section */}
                <div className="flex">
                  <div className="flex justify-between">
                    <div className="font-400 w-[100px]">Task</div>
                    <div>-</div>
                  </div>
                  <div className="flex">
                    <div className="font-600 ml-9">{task?.taskName}</div>
                    <div className="font-700 ml-6 text-gray-600 text-9">
                      <Tooltip
                        title={copiedTaskId ? "Copied!" : task?.taskInstance}
                      >
                        <EdgeSvgIcon
                          size={20}
                          onClick={() =>
                            handleCopy(task?.taskInstance!, setCopiedTaskId)
                          }
                          style={{ cursor: "pointer" }}
                        >
                          {copiedTaskId
                            ? "heroicons-solid:check-circle"
                            : "heroicons-solid:question-mark-circle"}
                        </EdgeSvgIcon>
                      </Tooltip>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex">
                <div className="flex justify-between">
                  <div className="font-400 w-[100px]">Process Key</div>
                  <div>-</div>
                </div>
                <div className="font-600 ml-9">{task?.businessKey}</div>
              </div>
            </div>
          </div>
          <div className="p-4 text-right flex gap-6">
            <div
              className=" p-6 rounded"
              onClick={() => handleFetchDocumentList()}
            >
              <Tooltip title="Attachments">
                <EdgeSvgIcon
                  className="icon-size-18 cursor-pointer mr-6"
                  color="error"
                >
                  feather:paperclip
                </EdgeSvgIcon>
              </Tooltip>
            </div>
            <div className=" p-6 rounded">
              <Tooltip title="Scoreboard Details">
                <EdgeSvgIcon
                  className="icon-size-18 cursor-pointer mr-6"
                  color="error"
                  onClick={() => setTaskViewOpen(true)}
                >
                  feather:monitor
                </EdgeSvgIcon>
              </Tooltip>
            </div>
            <div className=" p-6 rounded">
              <Tooltip title="User Comments">
                <EdgeSvgIcon
                  className="icon-size-18 cursor-pointer mr-6"
                  color="error"
                  onClick={() => setCommentViewOpen(true)}
                >
                  feather:message-circle
                </EdgeSvgIcon>
              </Tooltip>
            </div>
          </div>
        </Paper>
        <Suspense fallback={<Ve3LoadingScreen />}>
          <div className="my-9">
            {ComponentToRender && <ComponentToRender task={task} />}
          </div>
        </Suspense>
        <Decision
          decisionList={task?.decisionPaths}
          serviceUrl={task?.serviceUrl}
          processInstance={task?.processInstanceId}
          taskInstance={task?.taskInstance}
          unAssignOption={task?.unAssignOption}
        />
      </div>

      <Ve3Popup
        open={documentViewOpen}
        fullWidth={true}
        setOpen={setDocumentViewOpen}
        body={
          <DocumentView
            documentList={documentList}
            task={task}
            process={
              {
                processName: task?.processName,
                processInstance: task?.processInstanceId,
              } as ScoreBoardProcess
            }
            page={docPage}
            setPage={setDocPage}
            handleFetchDocumentList={handleFetchDocumentList}
          />
        }
      />

      <Ve3Popup
        open={commentViewOpen}
        fullWidth={true}
        maxWidth="md"
        setOpen={setCommentViewOpen}
        body={<CommentView task={task} />}
      />

      <Ve3Popup
        open={taskViewOpen}
        fullWidth={true}
        setOpen={setTaskViewOpen}
        body={<TaskView task={task} />}
      />
    </>
  );
};

export default memo(Task);
