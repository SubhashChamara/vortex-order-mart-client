import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import Logger from "../../../../../@helpers/Logger";
import EdgeAdminContentLayout from "../../../../../@layout/EdgeAdminContentLayout";
import EdgeSimplePage from "../../../../../@layout/EdgeSimplePage";
import { Api } from "../../../../../api/Api";
import { GroupInfo } from "../../../types/GroupInfo";
import CreateGroupForm from "./components/AddProcessAllocationForm";
import ProcessAllocationTable from "./components/ProcessAllocationTable";
import { ProcessInfo } from "../../../types/ProcessInfo";
import { ProcessAllocationInfo } from "../../../types/ProcessAllocationInfo";
import { ProcessAllocationRequest } from "../../../types/ProcessAllocationRequest";
import TaskPadFilters from "../components/ProcessFilters";
import { ReportFilters } from "../components/ProcessFilters";

const Groups = () => {
  const [groupInfoList, setGroupList] = useState<GroupInfo[]>([]);
  const [processInfoList, setProcessInfoList] = useState<ProcessInfo[]>([]);
  const [processAllocationList, setProcessAllocationList] = useState<ProcessAllocationInfo[]>([]);
  const [actionName, setActionName] = useState<string>("CREATE");
  const [formTitle, setFormTitle] = useState<string>(" New Process Allocation");
  const [groupForUpdate, setGroupForUpdate] = useState<GroupInfo | null>(null);

  // const fetchGroupList = async () => {
  //   const { data, err } = await Api.performRequest((r) =>
  //     r.admin.groupInfoList()
  //   );

  //   Logger.debug(
  //     "(Groups) => { DATA: " +
  //       JSON.stringify(data) +
  //       " , ERROR: " +
  //       JSON.stringify(err)
  //   );

  //   if (data !== null) {
  //     setGroupList(data);
  //   }
  // };

  const fetchProcessAllocationList = async () => {
    const { data, err } = await Api.performRequest((r) =>
      r.admin.allProcessAllocations(processStatus ?? null)
    );

    Logger.debug(
      "(Process ) => { DATA: " +
      JSON.stringify(data) +
      " , ERROR: " +
      JSON.stringify(err)
    );

    if (data !== null) {
      setProcessAllocationList(data);
    }
  };

  useEffect(() => {
    fetchProcessAllocationList();
  }, []);

  const selectGroup = (group: GroupInfo) => {
    setActionName("UPDATE");
    setFormTitle("Update Group");
    setGroupForUpdate(group);
  };
  const formReset = () => {
    setActionName("CREATE");
    setFormTitle("Create New Group");
    setGroupForUpdate(null);
  };
  const unAllocate = async (processAllocation: ProcessAllocationInfo) => {
    const request: ProcessAllocationRequest = {
      idProcess: processAllocation.process.id,
      idGroup: processAllocation.group.id,
    };

    const { data, err } = await Api.performRequest((r) =>
      r.admin.unAllocateProcess(request)
    );

    Logger.debug(
      "(Process Un Allocate) => { DATA: " +
      JSON.stringify(data) +
      " , ERROR: " +
      JSON.stringify(err)
    );

    if (err == null) {
      toast.success("Process Un-Allocated Successfully");
      fetchProcessAllocationList();
    } else {
      toast.error(err?.msg);
    }
  };

  const defaultFilter: ReportFilters = {
    processStatus: null,
  };

  const [filter, setFilter] = useState<ReportFilters | null>(defaultFilter);


  const handlePassFilters = (filters: ReportFilters) => {
    setFilter(filters);
  };
  const processStatus = filter?.processStatus ? filter?.processStatus : null;

  useEffect(() => {
    fetchProcessAllocationList();
  }, [processStatus]);

  Logger.debug(
    "(Process Status) => { DATA: " +
    JSON.stringify(processStatus) +
    " , ERROR: " +
    JSON.stringify("errors")
  )

  return (
    <>
      <EdgeSimplePage
        title="Process Allocation"
        icon="/assets/icons/admin/admin-tool-icons/process-allocation.png"
        mainBreadCrumb={{ name: "Admin Tools", url: "/admin-tools" }}
        subBreadCrumbs={[{ name: "Process Allocation", url: "/admin-tools/group" }]}
        content={
          <EdgeAdminContentLayout
            formComponent={
              <CreateGroupForm
                formTitle={formTitle}
                actionName={actionName}
                groupForUpdate={groupForUpdate}
                formReset={formReset}
                fetchProcessAllocationList={fetchProcessAllocationList}
              />
            }
            tableComponent={
              <>
                <TaskPadFilters handlePassFilters={handlePassFilters} />
                <ProcessAllocationTable
                  processAllocationList={processAllocationList}
                  unAllocate={unAllocate}
                />
              </>
            }
          />
        }
      />
    </>
  );
};

export default Groups;
