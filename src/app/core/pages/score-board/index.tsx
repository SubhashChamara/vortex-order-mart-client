import { FC, memo, useEffect, useState } from "react";

import TaskPadFilters, {
  ScoreBoardFilters,
} from "./components/ScoreBoardFilters";
import ScoreBoardTable from "./components/ScoreBoardTable";
import { Api } from "../../../../api/Api";
import { Pageable } from "../../../../api/types/Pageable";
import { ScoreBoardProcess } from "../../types/ScoreBoardProcess";
import Logger from "../../../../@helpers/Logger";
import Ve3Popup from "../../../../@core/ui/Ve3Popup/Ve3Popup";
import DocumentView from "./components/DocumentView";
import { ScoreBoardTask } from "../../types/ScoreBoardTask";
import { DocumentInfo } from "../../types/DocumentInfo";
import ActivityView from "./components/ActivityView";
import moment from "moment";
import { DocumentListParams } from "../../../../api/types/params/DocumentListParams";
import Ve3LoadingScreen from "../../../../@core/ui/Ve3LoadingScreen/Ve3LoadingScreen";
import ExternalFormView from "./components/ExternalFormView";

const ScoreBoard: FC = () => {
  const [page, setPage] = useState<number>(0);
  const [size, setSize] = useState<number>(10);
  const [processList, setProcessList] =
    useState<Pageable<ScoreBoardProcess> | null>(null);
  const [filter, setFilter] = useState<ScoreBoardFilters | null>(null);

  const [process, setProcess] = useState<ScoreBoardProcess | null>(null);
  const [externalFormOpen, setExternalFormOpen] = useState<boolean>(false);

  const [taskList, setTaskList] = useState<ScoreBoardTask[]>([]);
  const [taskViewOpen, setTaskViewOpen] = useState<boolean>(false);

  const [documentViewOpen, setDocumentViewOpen] = useState<boolean>(false);
  const [documentList, setDocumentList] =
    useState<Pageable<DocumentInfo> | null>(null);
  const [docPage, setDocPage] = useState<number>(0);

  const handlePassFilters = (filters: ScoreBoardFilters) => {
    setFilter(filters);
  };

  const handleFetchExternalForm = (proc: ScoreBoardProcess) => {
    setExternalFormOpen(true);
    setProcess(proc);
  };

  const [loading, setLoading] = useState<boolean>(true);

  const handleFetchHistoryProcessList = async () => {
    setLoading(true);
    const { data, err } = await Api.performRequest((r) =>
      r.workflow.processListHistory(
        filter?.label ? filter?.label : null,
        filter?.fromDate
          ? filter.fromDate
          : moment().subtract(1, "months").format("YYYY-MM-DD"),
        filter?.toDate ? filter.toDate : moment().format("YYYY-MM-DD"),
        filter?.process ? filter.process.name : null,
        filter?.status ? filter.status.name : null,
        size,
        page
      )
    );

    Logger.debug(
      "(History Process List) => { DATA: " +
        JSON.stringify(data) +
        " , ERROR: " +
        JSON.stringify(err)
    );

    if (data !== null) {
      setProcessList(data);
    }

    setLoading(false);
  };

  const handleFetchTaskList = async (proc: ScoreBoardProcess) => {
    const { data, err } = await Api.performRequest((r) =>
      r.workflow.taskListHistory(proc.processInstance)
    );
    Logger.debug(
      "(History Task List) => { DATA: " +
        JSON.stringify(data) +
        " , ERROR: " +
        JSON.stringify(err)
    );
    if (data !== null) {
      setTaskList(data);
      setProcess(proc);
      setTaskViewOpen(true);
    }
  };

  const handleFetchDocumentList = async (proc: ScoreBoardProcess) => {
    const params: DocumentListParams = {
      processInstance: proc.processInstance,
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
      setProcess(proc);
    }
  };

  useEffect(() => {
    handleFetchHistoryProcessList();
  }, [page, filter]);

  useEffect(() => {
    if (process !== null) handleFetchDocumentList(process);
  }, [docPage]);

  return (
    <div className="px-12 pb-12">
      <TaskPadFilters handlePassFilters={handlePassFilters} />
      {loading ? (
        <Ve3LoadingScreen />
      ) : (
        <>
          <ScoreBoardTable
            processList={processList}
            setPage={setPage}
            page={page}
            handleFetchDocumentList={handleFetchDocumentList}
            handleFetchTaskList={handleFetchTaskList}
            handleFetchExternalForm={handleFetchExternalForm}
          />

          <Ve3Popup
            open={externalFormOpen}
            fullWidth={true}
            maxWidth="xl"
            setOpen={setExternalFormOpen}
            body={<ExternalFormView process={process} />}
          />
        </>
      )}

      <Ve3Popup
        open={taskViewOpen}
        fullWidth={true}
        setOpen={setTaskViewOpen}
        body={<ActivityView taskList={taskList} process={process} />}
      />

      <Ve3Popup
        open={documentViewOpen}
        fullWidth={true}
        setOpen={setDocumentViewOpen}
        body={
          <DocumentView
            documentList={documentList}
            process={process}
            page={docPage}
            setPage={setDocPage}
          />
        }
      />
    </div>
  );
};

export default memo(ScoreBoard);
