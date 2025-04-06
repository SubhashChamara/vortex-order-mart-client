import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import Logger from "../../../../../@helpers/Logger";
import EdgeAdminContentLayout from "../../../../../@layout/EdgeAdminContentLayout";
import EdgeSimplePage from "../../../../../@layout/EdgeSimplePage";
import { Api } from "../../../../../api/Api";
import { GroupInfo } from "../../../types/GroupInfo";
import CreateGroupForm from "./components/CreateGroupForm";
import GroupList from "./components/GroupList";
import TaskPadFilters from "../components/ProcessFilters";
import { ReportFilters } from "../components/ProcessFilters";
import Ve3LoadingScreen from "../../../../../@core/ui/Ve3LoadingScreen/Ve3LoadingScreen";

const Groups = () => {
  const [groupInfoList, setGroupList] = useState<GroupInfo[]>([]);
  const [actionName, setActionName] = useState<string>("CREATE");
  const [formTitle, setFormTitle] = useState<string>("Create New Group");
  const [groupForUpdate, setGroupForUpdate] = useState<GroupInfo | null>(null);
  const [isActivated, setIsActivated] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const fetchGroupListWithStatus = async () => {
    try {
      setIsLoading(true);

      const { data, err } = await Api.performRequest((r) =>
        r.admin.fetchGroupListWithStatus(processStatus ?? null)
      );

      Logger.debug(
        "(Groups) => { DATA: " +
          JSON.stringify(data) +
          " , ERROR: " +
          JSON.stringify(err)
      );

      if (data !== null) {
        setGroupList(data);
      }
    } catch (e) {
      console.log(e);
    } finally {
      setIsLoading(false);
    }
  };

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

  const changeGroupStatus = async (group: GroupInfo) => {
    const { data, err } = await Api.performRequest((r) =>
      r.admin.deleteGroup(group.id)
    );

    Logger.debug(
      "(Group Delete) => { DATA: " +
        JSON.stringify(data) +
        " , ERROR: " +
        JSON.stringify(err)
    );

    if (err == null) {
      const newStatus = !group?.isActive;
      setIsActivated(newStatus);
      if (newStatus) {
        toast.success("Group Activated Successfully");
      } else {
        toast.success("Group Deactivated Successfully");
      }
      fetchGroupListWithStatus();
    } else {
      toast.error(err?.msg);
    }
  };

  useEffect(() => {
    changeGroupStatus;
  }, [isActivated]);

  const defaultFilter: ReportFilters = {
    processStatus: null,
  };

  const [filter, setFilter] = useState<ReportFilters | null>(defaultFilter);

  const processStatus = filter?.processStatus ? filter?.processStatus : null;

  useEffect(() => {
    fetchGroupListWithStatus();
    // fetchGroupListWithStatus();
  }, [processStatus]);

  const handlePassFilters = (filters: ReportFilters) => {
    setFilter(filters);
  };

  Logger.debug(
    "(Process Status) => { DATA: " +
      JSON.stringify(processStatus) +
      " , ERROR: " +
      JSON.stringify("errors")
  );
  return (
    <div className="px-12 pb-12">
      <EdgeSimplePage
        title="Group"
        icon="/assets/icons/admin/admin-tool-icons/group.png"
        mainBreadCrumb={{ name: "Admin Tools", url: "/admin-tools" }}
        subBreadCrumbs={[{ name: "Group", url: "/admin-tools/group" }]}
        content={
          <EdgeAdminContentLayout
            formComponent={
              <CreateGroupForm
                formTitle={formTitle}
                actionName={actionName}
                groupForUpdate={groupForUpdate}
                formReset={formReset}
                fetchGroupList={fetchGroupListWithStatus}
              />
            }
            tableComponent={
              <>
                <TaskPadFilters handlePassFilters={handlePassFilters} />
                {isLoading ? (
                  <Ve3LoadingScreen />
                ) : (
                  <GroupList
                    groupList={groupInfoList}
                    changeStatus={(group) => changeGroupStatus(group)}
                    selectGroup={selectGroup}
                    // isActivated={isActivated}
                  />
                )}
              </>
            }
          />
        }
      />
    </div>
  );
};

export default Groups;
