import { useEffect, useState } from "react";
import EdgeAdminContentLayout from "../../../../../@layout/EdgeAdminContentLayout";
import EdgeSimplePage from "../../../../../@layout/EdgeSimplePage";
import CreateRoleForm from "./components/CreateRoleForm";
import RollList from "./components/RollList";
import { toast } from "react-toastify";
import Logger from "../../../../../@helpers/Logger";
import { Api } from "../../../../../api/Api";
import { UserRoleInfo } from "../../../types/UserRoleInfo";
import { GroupInfo } from "../../../types/GroupInfo";

const UserRole = () => {
  const [userRoleInfoList, setRoleList] = useState<UserRoleInfo[]>([]);
  const [actionName, setActionName] = useState<string>("SAVE");
  const [formTitle, setFormTitle] = useState<string>("Create New User Role");
  const [roleForUpdate, setRoleForUpdate] = useState<UserRoleInfo | null>(null);
  const [groupInfoList, setGroupList] = useState<GroupInfo[]>([]);
  const [isActivated, setIsActivated] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const fetchRoleList = async () => {
    const { data, err } = await Api.performRequest((r) =>
      // r.admin.userRoleInfoList()
      r.admin.userAllRoleInfoList()
    );

    Logger.debug(
      "(User Roles) => { DATA: " +
      JSON.stringify(data) +
      " , ERROR: " +
      JSON.stringify(err)
    );

    if (data !== null) {
      setRoleList(data);
    }
  };

  useEffect(() => {
    fetchRoleList();
  }, []);

  const selectUserRole = (userRole: UserRoleInfo) => {
    setActionName("UPDATE");
    setFormTitle("Update User Role");
    console.log("role===> ", userRole);
    setRoleForUpdate(userRole);
  };
  const formReset = () => {
    setActionName("SAVE");
    setFormTitle("Create New User Role");
    setRoleForUpdate(null);
  };
  const deleteUserRole = async (userRole: UserRoleInfo) => {

    const { data, err } = await Api.performRequest((r) =>
      r.admin.deleteUserRole(userRole.id)
    );
    Logger.debug(
      "(User Role Delete) => { DATA: " +
      JSON.stringify(data) +
      " , ERROR: " +
      JSON.stringify(err)
    );

    if (err == null) {
      const newStatus = !userRole?.active;
      setIsActivated(newStatus);
      if (newStatus) {
        toast.success("Role Activated Successfully");
      } else {
        toast.success("Role Deactivated Successfully");
      }
      fetchRoleList();
    } else {
      toast.error(err?.msg);
    }
    formReset();
  };

  const fetchGroupListForUserRole = async (userRole: UserRoleInfo) => {
    try {
      setIsLoading(true);
      setGroupList([]);
      const { data, err } = await Api.performRequest((r) =>
        r.admin.allocatedgroupList(userRole.id));
      if (data !== null) {
        setGroupList(data);
      } else {
        setGroupList([]);
      }
    } catch (err) {
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    deleteUserRole;
  }, [isActivated]);


  return (
    <>
      <EdgeSimplePage
        title="User Role"
        icon="/assets/icons/admin/admin-tool-icons/roll.png"
        mainBreadCrumb={{ name: "Admin Tools", url: "/admin-tools" }}
        subBreadCrumbs={[{ name: "User Role", url: "/admin-tools/user-roll" }]}
        // headerContent={
        //   <EdgeButton
        //     icon='heroicons-solid:plus'
        //     label="New Role"
        //   />
        // }
        content={
          <EdgeAdminContentLayout
            formComponent={
              <CreateRoleForm
                formTitle={formTitle}
                actionName={actionName}
                roleForUpdate={roleForUpdate}
                formReset={formReset}
                fetchRoleList={fetchRoleList}
              />
            }
            tableComponent={
              <RollList
                rollList={userRoleInfoList}
                selectUserRole={selectUserRole}
                // deleteUserRole={deleteUserRole}
                setgroups={fetchGroupListForUserRole}
                groupInfoList={groupInfoList}
                isLoading={isLoading}
                changeStatus={(group) => deleteUserRole(group)}

              />
            }
          />
        }
      />
    </>
  );
};

export default UserRole;
