import { FC, memo } from "react";
import {
  Avatar,
  IconButton,
  TableCell,
  TableRow,
  Tooltip,
} from "@mui/material";
import { darken } from "@mui/material/styles";
import RetriveFile from "../../../../../../@helpers/RetriveFiles";
import formatDate, { formatDateAndTime } from "../../helpers/helper-functions";

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

interface UserTableProps {
  userList: User[];
}

const UserList: FC<UserTableProps> = (props) => {
  const { userList } = props;

  return (
    <div className="w-full overflow-hidden">
      <div className="w-full overflow-x-auto">
        <table className="w-full whitespace-no-wrap">
          <thead>
            <tr className="text-xs font-semibold tracking-wide text-left text-black uppercase border-b border-red-600 ">
              <th className="p-6">User</th>
              <th className="p-6">EMAIL</th>
              <th className="p-6">CONTACT NO.</th>
              <th className="p-6">Expiry Date</th>
              <th className="p-6">Account Status</th>
              {/* <th className="p-6 text-center">ACTIONS</th> */}
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-red-600">
            {userList && userList.length > 0 ? (
              userList?.map((user, index) => (
                <tr className="text-black h-full" key={index}>
                  <td className="p-6 align-middle">
                    <div className="flex items-center text-sm">
                      <div className="relative  mr-6 rounded-full">
                        {user?.profile ? (
                          <Avatar
                            sx={{
                              background: (theme) =>
                                theme.palette.background.default,
                              color: (theme) => theme.palette.text.secondary,
                            }}
                            alt="user photo"
                            src={RetriveFile(user?.profile.path)}
                          />
                        ) : (
                          <Avatar
                            sx={{
                              background: (theme) =>
                                darken(theme.palette.background.default, 0.05),
                              color: (theme) => theme.palette.text.secondary,
                            }}
                          >
                            {user.firstName?.[0]}
                          </Avatar>
                        )}
                        <div
                          className="absolute inset-0 rounded-full shadow-inner"
                          aria-hidden="true"
                        ></div>
                      </div>
                      <div>
                        <p className="font-semibold">
                          {user?.firstName} {user?.lastName}
                        </p>
                        <p className="text-xs text-gray-600">
                          {user?.username}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="p-6 align-middle text-sm">{user?.email}</td>
                  <td className="p-6 align-middle text-sm">
                    {user?.telephone}
                  </td>
                  <td className="p-6 align-middle text-sm">
                    {formatDateAndTime(user?.expiryDate?.toString())}
                  </td>
                  <td className="p-6 align-middle text-center text-sm">
                    {user?.accountStatus}
                  </td>
                  {/* <td className="p-6 align-middle text-center">
                  <div className="flex items-center space-x-4 text-sm justify-center">
                    <Tooltip title="Edit User">
                      <IconButton>
                        <button
                          className="flex items-center justify-between text-sm font-medium leading-5 text-red-600 focus:outline-none focus:shadow-outline-red"
                          aria-label="Edit User"
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

                    <Tooltip title="Delete User">
                      <IconButton>
                        <button
                          className="flex items-center justify-between text-sm font-medium leading-5 text-red-600 rounded-lg focus:outline-none focus:shadow-outline-red"
                          aria-label="Delete User"
                          onClick={() => { }}
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
                    </Tooltip>
                  </div>
                </td> */}
                </tr>
              ))
            ) : (
              <tr>
                <div className="text-11 font-600 text-center text-red">
                  No data available
                </div>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      <div className="p-12 text-xs font-semibold tracking-wide text-red-600 uppercase border-t border-red-600 bg-gray-50 flex justify-between">
        <span className="flex items-center col-span-3">
          1-10 of {userList.length}
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

export default UserList;
