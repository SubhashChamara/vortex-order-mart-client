import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import Logger from '../../../../../@helpers/Logger';
import EdgeAdminContentLayout from "../../../../../@layout/EdgeAdminContentLayout";
import EdgeSimplePage from "../../../../../@layout/EdgeSimplePage";
import { Api } from '../../../../../api/Api';
import { ProcessInfo } from "../../../types/ProcessInfo";
import CreateProcessForm from "./components/CreateProcessForm";
import ProcessList from "./components/ProcessList";
import TaskPadFilters from "../components/ProcessFilters";
import { ReportFilters } from "../components/ProcessFilters";

const UserManagement = () => {
  const [processInfoList, setProcessInfoList] = useState<ProcessInfo[]>([]);
  const [actionName, setActionName] = useState<string>("CREATE")
  const [formTitle, setFormTitle] = useState<string>("Create New Process")
  const [processForUpdate, setProcessForUpdate] = useState<ProcessInfo | null>(null);

  const fetchProcessList = async () => {
    const { data, err } = await Api.performRequest((r) =>
      r.admin.processInfoList()
    );

    Logger.debug(
      "(Process List) => { DATA: " +
      JSON.stringify(data) +
      " , ERROR: " +
      JSON.stringify(err)
    );

    if (data !== null) {
      setProcessInfoList(data);
    }
  };

  useEffect(() => {
    fetchProcessList();
  }, [])

  const selectProcess = (process: ProcessInfo) => {
    setActionName("UPDATE");
    setFormTitle("Update Process");
    setProcessForUpdate(process);
  }
  const formReset = () => {
    setActionName("CREATE");
    setFormTitle("Create New Process");
    setProcessForUpdate(null);
  }
  const deleteProcess = async (process: ProcessInfo) => {
    const { data, err } = await Api.performRequest((r) =>
      r.admin.deleteProcess(process.id)
    );

    Logger.debug(
      "(Process Delete) => { DATA: " +
      JSON.stringify(data) +
      " , ERROR: " +
      JSON.stringify(err)
    );

    if (err == null) {
      toast.success("Process Deleted Successfully");
      fetchProcessList();
    } else {
      toast.error(err?.msg);
    }
  }

  // const defaultFilter: ReportFilters = {
  //   processStatus: null,
  // };

  // const [filter, setFilter] = useState<ReportFilters | null>(defaultFilter);


  // const handlePassFilters = (filters: ReportFilters) => {
  //   setFilter(filters);
  // };
  // const processStatus = filter?.processStatus ? filter?.processStatus : null;

  // useEffect(() => {
  //   fetchProcessList();
  // }, [processStatus]);

  // Logger.debug(
  //   "(Process Status) => { DATA: " +
  //   JSON.stringify(processStatus) +
  //   " , ERROR: " +
  //   JSON.stringify("errors")
  // )

  return (
    <>
      <EdgeSimplePage
        title="Process"
        icon="/assets/icons/admin/admin-tool-icons/process.png"
        mainBreadCrumb={{ name: "Admin Tools", url: "/admin-tools" }}
        subBreadCrumbs={[
          { name: "Process", url: "/admin-tools/process" },
        ]}
        content={
          <>
            <EdgeAdminContentLayout
              formComponent={
                <CreateProcessForm formTitle={formTitle} actionName={actionName} processForUpdate={processForUpdate} formReset={formReset} fetchProcessList={fetchProcessList} />}
              tableComponent={
                <>
                  {/* <TaskPadFilters handlePassFilters={handlePassFilters} /> */}
                  <ProcessList
                    processList={processInfoList}
                    selectProcess={selectProcess}
                    deleteProcess={deleteProcess} />
                </>
              }
            />
          </>
        }
      />
    </>
  );
};

export default UserManagement;
