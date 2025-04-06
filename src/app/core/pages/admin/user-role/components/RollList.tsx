import { IconButton, Switch, TableCell, Tooltip } from "@mui/material";
import { FC, useState } from "react";
import { UserRoleInfo } from "../../../../types/UserRoleInfo";
import { formatDateAndTime } from "../../helpers/helper-functions";
import Ve3Popup from "../../../../../../@core/ui/Ve3Popup/Ve3Popup";
import EdgeSvgIcon from "../../../../../../@core/ui/EdgeSvgIcon";
import { GroupInfo } from "../../../../types/GroupInfo";
import Ve3LoadingScreen from "../../../../../../@core/ui/Ve3LoadingScreen/Ve3LoadingScreen";

interface RollTableProps {
  rollList: UserRoleInfo[];
  selectUserRole: (userRoleInfo: UserRoleInfo) => void;
  // deleteUserRole: (userRoleInfo: UserRoleInfo) => void;
  setgroups: (userRoleInfo: UserRoleInfo) => void;
  groupInfoList: GroupInfo[];
  changeStatus: (groupInfo: UserRoleInfo) => void;
  isLoading: boolean

}

const RollList: FC<RollTableProps> = (props) => {
  const { rollList, selectUserRole, setgroups, groupInfoList, changeStatus, isLoading } = props;
  // State to track activation status for each group by ID or name
  const [activatedRoles, setActivatedRoles] = useState<{
    [key: string]: boolean;
  }>(
    rollList.reduce((acc, role) => {
      acc[role.name] = role.active; // Initial status from `isDisabled`
      return acc;
    }, {} as { [key: string]: boolean })
  );

  const [viewingRow, setViewingRow] = useState<number | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const toggleViewingRow = (index: number) => {
    setIsOpen(!isOpen);
    setViewingRow(viewingRow === index ? null : index);
  };

  const handleToggle = (role: UserRoleInfo) => {
    // Toggle the state for the specific group
    setActivatedRoles((prev) => ({
      ...prev,
      [role.name]: !prev[role.name],
    }));
    changeStatus(role);
  };


  return (
    <>
      <div className="w-full overflow-hidden">
        <div className="w-full overflow-x-auto">
          <table className="w-full whitespace-no-wrap">
            <thead>
              <tr className="text-10 font-semibold tracking-wide text-left text-black uppercase border-b border-red-600 ">
                <th className="p-6">Role</th>
                <th className="p-6">View Groups</th>
                <th className="p-6">Created Date</th>
                <th className="p-6 text-center">Edit User</th>
                <th className="p-6">Status</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-red-600">
              {rollList.map((roll, index) => (
                <tr className="text-black h-full" key={index}>
                  <td className="p-6 align-middle text-sm ">
                    {roll.name}
                  </td>
                  <td className="p-6 align-middle justify-center flex">
                    <TableCell className="p-6 text-sm">
                      <IconButton
                        aria-label="View Crib"
                        type="button"
                        className="bg-white"
                        onClick={() => {
                          toggleViewingRow(index);
                          setgroups(roll);
                        }}
                      >
                        <EdgeSvgIcon className="icon-size-12 cursor-pointer text-primary mr-3">
                          feather:eye
                        </EdgeSvgIcon>
                      </IconButton>
                    </TableCell>
                  </td>
                  <td className="p-6 align-middle text-sm">{formatDateAndTime(roll.createdDate?.toString())}</td>
                  {/* <td className="p-6 align-middle text-sm">{roll.status}</td> */}
                  <td className="p-6 align-middle">
                    <div className="flex items-center space-x-4 text-sm justify-center">
                      <Tooltip title="Edit Roll">
                        <IconButton>
                          <button
                            className="flex items-center justify-between text-sm font-medium leading-5 text-red-600 focus:outline-none focus:shadow-outline-red"
                            aria-label="Edit Roll"
                            onClick={() => { selectUserRole(roll) }}
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



                      {/* <Tooltip title="Delete Roll">
                        <IconButton>
                          <button
                            className="flex items-center justify-between text-sm font-medium leading-5 text-red-600 rounded-lg focus:outline-none focus:shadow-outline-red"
                            aria-label="Delete Roll"
                            onClick={() => { deleteUserRole(roll) }}
                          >
                            <svg
                              className="w-16 h-16"
                              aria-hidden="true"
                              fill="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path d="M20 6h-4V5c0-.55-.45-1-1-1h-4c-.55 0-1 .45-1 1v1H4c-.55 0-1 .45-1 1v1c0 .55.45 1 1 1h1v11c0 .55.45 1 1 1h12c.55 0 1-.45 1-1V9h1c.55 0 1-.45 1-1V7c0-.55-.45-1-1-1zm-8 0h-4V5h4v1z" />
                              <path fill="none" d="M0 0h24v24H0z" />
                            </svg>
                          </button>
                        </IconButton>
                      </Tooltip> */}
                    </div>
                  </td>
                  <td className="p-6 align-middle justify-center">

                    <Tooltip title={roll?.active ? "Deactivate Role" : "Activate Role"}>
                      <Switch
                        checked={roll.active}
                        onClick={() => handleToggle(roll)}
                        inputProps={{ "aria-label": "controlled" }}
                        color="error"
                      />
                    </Tooltip>

                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="p-12 text-xs font-semibold tracking-wide text-red-600 uppercase border-t border-red-600 bg-gray-50 flex justify-between">
          <span className="flex items-center col-span-3">
            1-10 of {rollList.length}
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

      <Ve3Popup
        open={isOpen}
        fullWidth={true}
        onClose={() => {
          setIsOpen(false);
        }}
        customWidth="50%"
        body={
          <div className="flex flex-col items-left h-full">
            <div className="flex flex-row items-center justify-between mb-4">
              <h1 className="text-14 font-500 text-left flex">
                <div>Group List</div>
              </h1>
            </div>
            {(isLoading) && <Ve3LoadingScreen />}
            {(groupInfoList && groupInfoList.length > 0) ? (groupInfoList?.map(
              (item, index) =>
                <div
                  key={index}
                  className="bg-white rounded-md border-2 m-4 p-4 px-12 flex gap-3"
                >
                  {item.name}
                </div>
            )) : (
              <div className="text-11 font-600 text-center  text-red">
                No Allocated Groups For  This Role

              </div>
            )}
          </div>
        }
        setOpen={setIsOpen}
      />
    </>

  );
};

export default RollList;
