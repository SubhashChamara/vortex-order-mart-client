import { IconButton, Switch, Tooltip } from "@mui/material";
import { FC, useState } from "react";
import { GroupInfo } from "../../../../types/GroupInfo";
import moment from "moment";
interface GroupTableProps {
  groupList: GroupInfo[];
  changeStatus: (groupInfo: GroupInfo) => void;
  selectGroup: (groupInfo: GroupInfo) => void;
  // isActivated: boolean;
}

const GroupList: FC<GroupTableProps> = (props) => {
  const { groupList, changeStatus, selectGroup } = props;

  // State to track activation status for each group by ID or name
  const [activatedGroups, setActivatedGroups] = useState<{
    [key: string]: boolean;
  }>(
    groupList.reduce((acc, group) => {
      acc[group.name] = group.isActive; // Initial status from `isDisabled`
      return acc;
    }, {} as { [key: string]: boolean })
  );

  const formatDate = (date: string) => {
    if (date) {
      return moment(date).format("DD-MM-YYYY:HH:mm:ss");
    } else {
      return "----------";
    }
  };

  const handleToggle = (group: GroupInfo) => {
    // Toggle the state for the specific group
    setActivatedGroups((prev) => ({
      ...prev,
      [group.name]: !prev[group.name],
    }));
    changeStatus(group); // Call the parent handler
  };

  return (
    <div className="w-full overflow-hidden">
      {/*  <TaskPadFilters handlePassFilters={handlePassFilters} /> */}
      <div className="w-full overflow-x-auto">
        <table className="w-full whitespace-no-wrap">
          <thead>
            <tr className="text-xs font-semibold tracking-wide text-left text-black uppercase border-b border-red-600 ">
              <th className="p-6">Group Name</th>
              <th className="p-6">Process</th>
              <th className="p-6">Created Date</th>
              <th className="p-6">Created User</th>
              <th className="p-6">Status</th>
              {/* <th className="p-6">ACTIONS</th> */}
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-red-600">
            {groupList.map((group, index) => (
              <tr className="text-black h-full" key={index}>
                <td className="p-6 align-middle text-sm">{group?.name}</td>
                <td className="p-6 align-middle text-sm">
                  {group?.processInfo?.name}
                </td>
                <td className="p-6 align-middle text-sm">
                  {formatDate(group?.createdDate?.toString())}
                </td>
                <td className="p-6 align-middle text-sm">
                  {group?.createdUserFullName}
                </td>
                {/* <td className="p-6 align-middle text-sm">{group?.isActive ? "ACTIVE" : "INACTIVE"}</td> */}
                <td className="p-6 align-middle text-center">
                  <Tooltip title="Edit Group">
                    <IconButton>
                      <button
                        className="flex items-center justify-between text-sm font-medium leading-5 text-red-600 focus:outline-none focus:shadow-outline-red"
                        aria-label="Edit Group"
                        onClick={() => {
                          selectGroup(group);
                        }}
                      >
                        <svg
                          className="w-16 h-16"
                          aria-hidden="true"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z"></path>
                        </svg>
                      </button>
                    </IconButton>
                  </Tooltip>
                  <div className="flex items-center space-x-4 text-sm justify-center">
                    <Tooltip
                      title={
                        group?.isActive ? "Deactivate Group" : "Activate Group"
                      }
                    >
                      <Switch
                        checked={group.isActive}
                        onClick={() => handleToggle(group)}
                        inputProps={{ "aria-label": "controlled" }}
                        color="error"
                      />
                    </Tooltip>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="p-12 text-xs font-semibold tracking-wide text-red-600 uppercase border-t border-red-600 bg-gray-50 flex justify-between">
        <span className="flex items-center col-span-3">
          1-10 of {groupList.length}
        </span>
        <span className="col-span-2"></span>
        <span className="flex col-span-4 mt-2 sm:mt-auto sm:justify-end">
          <nav aria-label="Table navigation">
            <ul className="flex items-center space-x-2">
              <li>
                <button
                  className="rounded-md rounded-l-lg focus:outline-none focus:shadow-outline-red pt-3"
                  aria-label="Previous"
                >
                  <svg
                    className="w-12 h-12 fill-current"
                    aria-hidden="true"
                    viewBox="0 0 20 20"
                  >
                    <path
                      d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                      clipRule="evenodd"
                      fillRule="evenodd"
                    ></path>
                  </svg>
                </button>
              </li>
              <li>1 OF 1</li>
              <li>
                <button
                  className="rounded-md rounded-r-lg focus:outline-none focus:shadow-outline-red pt-3"
                  aria-label="Next"
                >
                  <svg
                    className="w-12 h-12 fill-current"
                    aria-hidden="true"
                    viewBox="0 0 20 20"
                  >
                    <path
                      d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                      clipRule="evenodd"
                      fillRule="evenodd"
                    ></path>
                  </svg>
                </button>
              </li>
            </ul>
          </nav>
        </span>
      </div>
    </div>
  );
};

export default GroupList;
