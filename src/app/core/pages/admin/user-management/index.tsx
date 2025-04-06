import { useEffect, useState } from 'react';
import EdgeButton from "../../../../../@edgevantage/core/EdgeButton/EdgeButton";
import EdgeAdminContentLayout from "../../../../../@layout/EdgeAdminContentLayout";
import EdgeSimplePage from "../../../../../@layout/EdgeSimplePage";
import UserManagementFilter from "./components/UserManagementFilter";
import { UserMgtFilters } from "./components/UserManagementFilter";
import { Api } from "../../../../../api/Api";
import Logger from '../../../../../@helpers/Logger';
import UserList from './components/UserList';

type User = {
  id: string;
  username: string;
  firstName: string;
  lastName: string;
  profile: {
    id: string;
    path: string;
  };
  email: string;
  telephone: string;
  expiryDate: string;
  accountStatus: string;
  designation: string;
};
const UserManagement = () => {
  const [userList, setUserList] = useState<User[]>([]);
  const [search, setSearch] = useState<string>('');

  const defaultFilter = {
    accountStatus: null
  }
  const [filter, setFilter] = useState<UserMgtFilters | null>(defaultFilter);
  const accountStatus = filter?.accountStatus ?? null;

  const fetchGroupList = async () => {
    console.log("accountStatus", accountStatus, "search", search);
    if (!search || search?.length >= 3) {
      const { data, err } = await Api.performRequest((r) =>
        // r.admin.getAllUsers()
        r.admin.getAllUsersByAccountStatus(accountStatus ?? null, search === "" ? null : search)

      );

      Logger.debug(
        "(Users) => { DATA: " +
        JSON.stringify(data) +
        " , ERROR: " +
        JSON.stringify(err)
      );

      if (data !== null) {
        setUserList(data);
      }
    }

  };

  useEffect(() => {
    fetchGroupList();
  }, [accountStatus, search]);

  const handlePassFilters = (filters: UserMgtFilters) => {
    setFilter(filters);
  };

  return (
    <>
      <EdgeSimplePage
        title="User Management"
        icon="/assets/icons/admin/admin-tool-icons/user.png"
        mainBreadCrumb={{ name: "Admin Tools", url: "/admin-tools" }}
        subBreadCrumbs={[
          { name: "User Management", url: "/admin-tools/user-management" },
        ]}
        headerContent={
          <EdgeButton
            icon='heroicons-solid:plus'
            label="New User"
            disabled={true}
          />
        }
        content={
          <EdgeAdminContentLayout
            tableComponent={
              <>
                <UserManagementFilter handlePassFilters={handlePassFilters} setSearch={setSearch} search={search} />
                {((userList && userList.length > 0) && <UserList userList={userList} />) ||
                  (
                    <div className="text-11 font-600 text-center  text-red">
                      No Data  Found
                    </div>
                  )}
              </>
            }
          />
        }
      />
    </>
  );
};

export default UserManagement;
