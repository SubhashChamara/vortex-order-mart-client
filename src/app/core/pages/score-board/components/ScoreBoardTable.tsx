import { ChangeEvent, FC } from "react";
import moment from "moment";
import { Avatar, Pagination, Paper, Tooltip } from "@mui/material";

import { darken } from "@mui/material/styles";
import { ScoreBoardProcess } from "../../../types/ScoreBoardProcess";
import { Pageable } from "../../../../../api/types/Pageable";
import RetriveFile from "../../../../../@helpers/RetriveFiles";
import EdgeSvgIcon from "../../../../../@core/ui/EdgeSvgIcon";
import useThemeMediaQuery from "../../../../../@hooks/useThemeMediaQuery";

interface ProcessTableProps {
  processList: Pageable<ScoreBoardProcess> | null;
  setPage: (v: number) => void;
  page: number;
  handleFetchDocumentList: (proc: ScoreBoardProcess) => void;
  handleFetchTaskList: (proc: ScoreBoardProcess) => void;
  handleFetchExternalForm: (proc: ScoreBoardProcess) => void;
}

const ProcessList: FC<ProcessTableProps> = (props) => {
  const {
    processList,
    setPage,
    page,
    handleFetchDocumentList,
    handleFetchTaskList,
    handleFetchExternalForm,
  } = props;

  const handlePageChange = (event: ChangeEvent<unknown>, page: number) => {
    setPage(page - 1);
  };

  const isMobile = useThemeMediaQuery((theme) => theme.breakpoints.down("sm"));

  if (processList === null) {
    return;
  }

  console.log("photo", processList);

  return (
    <Paper className="w-full overflow-hidden p-12">
      <div className="w-full overflow-x-auto">
        {isMobile ? (
          <table>
            <thead>
              <tr className="text-xs font-semibold tracking-wide text-left border-b">
                <th colSpan={4} className="pb-6">
                  <div className="text-sm text-red-600">Search Results</div>
                  <div className="text-[12px] font-600 text-gray">
                    Below lists a top level view of the workflows that matched
                    the search criteria.
                  </div>
                </th>
              </tr>
            </thead>
            <tbody className="flex flex-col bg-white gap-6">
              {processList.content.map((process, index) => (
                <div
                  key={index}
                  className="flex flex-col p-10 border rounded-sm w-full gap-10 shadow-inner"
                >
                  <div className="flex justify-between items-start w-full">
                    <div className="flex flex-col">
                      <p className="font-bold text-[14px] text-[#476496]">
                        {process.businessKey}
                      </p>
                      <p className="text-[12px] text-gray font-bold">
                        {process.tat}
                      </p>
                    </div>
                    <div className="flex flex-col items-end">
                      <p
                        className={`text-10 font-bold ${
                          process.status === "Completed"
                            ? "text-green-700"
                            : process.status === "Pending"
                            ? "text-yellow-800"
                            : "text-red-600"
                        }`}
                      >
                        {process.status}
                      </p>
                    </div>
                  </div>

                  <div className="text-sm">
                    <p className="font-semibold text-[14px] text-[#476496]">
                      {process.invokedGroup}
                    </p>
                    <p className="text-gray text-[14px] font-bold">
                      {process.processName}
                    </p>
                  </div>

                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-6">
                      <div className="relative rounded-full">
                        {process.invokedUserProfile ? (
                          <Avatar
                            alt="process photo"
                            src={RetriveFile(process.processLogo)}
                            sx={{ width: 30, height: 30 }}
                          />
                        ) : (
                          <Avatar
                            sx={{
                              background: (theme) =>
                                darken(theme.palette.background.default, 0.05),
                              color: (theme) => theme.palette.text.secondary,
                              width: 30,
                              height: 30,
                            }}
                          >
                            {process.invokedUser?.[0]}
                          </Avatar>
                        )}
                      </div>
                      <div>
                        <p className="font-semibold text-[12px]">
                          {process.invokedUser}
                        </p>
                        <p className="text-[10px] text-gray font-bold">
                          {moment(process.invokedDate).format(
                            "DD MMM YYYY, HH:mm:ss"
                          )}
                        </p>
                      </div>
                    </div>
                    <div className="flex gap-3 text-sm">
                      <button
                        className="text-sm font-medium text-red-600 rounded-lg focus:outline-none"
                        aria-label="External Form"
                        onClick={() => handleFetchExternalForm(process)}
                      >
                        <img
                          className="h-24 p-6 border rounded-md border-gray-200 bg-grey-50"
                          src="/assets/icons/scoreboard/forms.png"
                        />
                      </button>
                      <button
                        className="text-sm font-medium text-red-600 rounded-lg focus:outline-none"
                        aria-label="View process"
                        onClick={() => handleFetchTaskList(process)}
                      >
                        <img
                          className="h-24 p-6 border rounded-md border-gray-200 bg-grey-50"
                          src="/assets/icons/scoreboard/process.png"
                        />
                      </button>
                      <button
                        className="text-sm font-medium text-red-600 rounded-lg focus:outline-none"
                        aria-label="Attachments"
                        onClick={() => handleFetchDocumentList(process)}
                      >
                        <img
                          className="h-24 p-6 border rounded-md border-gray-200 bg-grey-50"
                          src="/assets/icons/scoreboard/attachments.png"
                        />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
              <div className="flex items-center justify-center">
                <Pagination
                  count={processList.totalPages}
                  siblingCount={0}
                  page={page + 1}
                  onChange={handlePageChange}
                />
              </div>
            </tbody>
          </table>
        ) : (
          <table className="w-full whitespace-no-wrap">
            <thead>
              <tr className="text-xs font-semibold tracking-wide text-left border-b">
                <th colSpan={4} className="pb-6 pl-6">
                  <div className="text-sm text-red-600">Search Results</div>
                  <div className="text-[12px] font-600 text-gray">
                    Below lists a top level view of the workflows that matched
                    the search criteria.
                  </div>
                </th>
                <th colSpan={1} className=" h-full">
                  <div className="flex justify-end items-center h-full">
                    <Pagination
                      count={processList.totalPages}
                      siblingCount={0}
                      page={page + 1}
                      onChange={handlePageChange}
                    />
                  </div>
                </th>
              </tr>
            </thead>
            <tbody className="bg-white">
              {processList?.content.map((process, index) => (
                <tr
                  className="text-black h-full bg-white shadow-2"
                  key={index}
                  style={{ borderSpacing: "10px" }}
                >
                  <td className="p-6 align-middle">
                    <div className="flex items-center gap-6 text-sm">
                      <div className="relative  mr-6 rounded-full">
                        {process.invokedUserProfile ? (
                          <Avatar
                            alt="process photo"
                            src={process.processLogo}
                          />
                        ) : (
                          <Avatar
                            sx={{
                              background: (theme) =>
                                darken(theme.palette.background.default, 0.05),
                              color: (theme) => theme.palette.text.secondary,
                            }}
                          >
                            {process.invokedUser?.[0]}
                          </Avatar>
                        )}
                        <div
                          className="absolute inset-0 rounded-full shadow-inner"
                          aria-hidden="true"
                        ></div>
                      </div>
                      <div>
                        <p className="font-semibold text-10 ">
                          {process.invokedUser}
                        </p>
                        <p className="text-[12px] text-gray">
                          {moment(process.invokedDate).format(
                            "DD MMM YYYY, HH:mm:ss"
                          )}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="p-6">
                    <p className="font-bold text-10 text-black flex items-center">
                      {process.businessKey}
                      {process.priorityProcess && (
                        <Tooltip title="Urgent Flow">
                          <span className="flex items-center justify-center ml-5">
                            <EdgeSvgIcon className="text-red-600" size={16}>
                              heroicons-solid:flag
                            </EdgeSvgIcon>
                          </span>
                        </Tooltip>
                      )}
                    </p>

                    <p className="text-[12px] text-gray">{process.tat}</p>
                  </td>
                  <td
                    className={`p-6 text-left text-10 font-semibold text-black
                      ${
                        ""
                        // process.status === "Completed"
                        //   ? "text-green-700"
                        //   : process.status === "Pending"
                        //   ? "text-yellow-800"
                        //   : "text-primary"
                      }
                    `}
                  >
                    {process.status === "Completed" ? (
                      <Tooltip
                        title={`Competed Date: ${moment(
                          process.completedDate
                        ).format("DD MMM YYYY, HH:mm:ss")}`}
                      >
                        <div className="flex flex-row items-center cursor-default">
                          <div
                            className={`${
                              process.status === "Completed"
                                ? "bg-green-700"
                                : process.status === "Pending"
                                ? "bg-yellow-800"
                                : "bg-primary"
                            } w-6 h-6 rounded-full mr-9`}
                          />
                          {process.status}
                        </div>
                      </Tooltip>
                    ) : (
                      <div className="flex flex-row items-center">
                        <div
                          className={`${
                            process.status === "Completed"
                              ? "bg-green-700"
                              : process.status === "Pending"
                              ? "bg-yellow-800"
                              : "bg-primary"
                          } w-6 h-6 rounded-full mr-9`}
                        />
                        {process.status}
                      </div>
                    )}
                  </td>
                  <td className="p-6 align-middle text-sm">
                    <p className=" text-[14px] text-black">
                      {process.invokedGroup}
                    </p>
                    <p className="text-gray text-[14px]">
                      {process.processName}
                    </p>
                  </td>
                  <td className="align-middle">
                    <div className="flex items-center flex-col md:flex-row gap-9 text-sm justify-end p-6 pr-24">
                      <Tooltip title="External Form">
                        <button
                          className="flex items-center justify-between text-sm font-medium leading-5 text-red-600 rounded-lg focus:outline-none focus:shadow-outline-red"
                          aria-label="External Form"
                          onClick={() => {
                            handleFetchExternalForm(process);
                          }}
                        >
                          <img
                            className="h-32 p-6 border rounded-md border-gray-200 bg-grey-50"
                            src="/assets/icons/scoreboard/forms.png"
                          />
                        </button>
                      </Tooltip>

                      <Tooltip title="View Process">
                        <button
                          className="flex items-center justify-between text-sm font-medium leading-5 text-red-600 rounded-lg focus:outline-none focus:shadow-outline-red"
                          aria-label="View process"
                          onClick={() => {
                            handleFetchTaskList(process);
                          }}
                        >
                          <img
                            className="h-32 p-6 border rounded-md border-gray-200 bg-grey-50"
                            src="/assets/icons/scoreboard/process.png"
                          />
                        </button>
                      </Tooltip>

                      <Tooltip title="Attachments">
                        <button
                          className="flex items-center justify-between text-sm font-medium leading-5 text-red-600 rounded-lg focus:outline-none focus:shadow-outline-red"
                          aria-label="Attachments"
                          onClick={() => {
                            handleFetchDocumentList(process);
                          }}
                        >
                          <img
                            className="h-32 p-6 border rounded-md border-gray-200 bg-grey-50"
                            src="/assets/icons/scoreboard/attachments.png"
                          />
                        </button>
                      </Tooltip>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </Paper>
  );
};

export default ProcessList;
