import { ChangeEvent, FC, useState } from "react";
import { Pagination, Paper } from "@mui/material";
import { BundledUserWiseActivityTracker } from "../../../../../core/types/reports/BundledUserWiseActivityTracker";


interface valueTableProps {
  userWiseActivityTrackerList: Map<string, BundledUserWiseActivityTracker> | null;
  setPage: (v: number) => void;
  page: number;
}

const UserWiseActivityTrackerReportTable: FC<valueTableProps> = (props) => {
  const { userWiseActivityTrackerList, setPage, page } = props;
  const [pageSize, setPageSize] = useState<number>(10);

  const handlePageChange = (_event: ChangeEvent<unknown>, page: number) => {
    setPage(page - 1);
  };

  if (userWiseActivityTrackerList === null) {
    return null;
  }

  const userListMap = new Map(Object.entries(userWiseActivityTrackerList || {}))
  const userListArray = userListMap ? Array.from(userListMap?.entries()) : [];
  const pagedData = userListArray.slice(
    page*pageSize,
    (page+1)*pageSize
  );



  const numberOfPages = Math.ceil(userWiseActivityTrackerList?.size /pageSize)
  

  return (
    <Paper className="w-full overflow-hidden p-12">
      {pagedData && pagedData?.length > 0 ? (
                  <div>
                  <div className="flex justify-between items-center mb-4">
                    <div>
                      <div className="text-sm text-red-600 font-600">Search Results</div>
                      <div className="text-[12px] font-600 text-gray">
                        Bundled User wise Activity Tracker Report for the selected date range
                      </div>
                    </div>
                  </div>
                  <div className="w-full overflow-x-auto">
                    <table className="w-full whitespace-no-wrap">
                      <thead>
                        <tr className="whitespace-nowrap divide-x-1">
                          <th className="p-6 text-left">User</th>
                          <th className="p-6 text-left">Doc Check</th>
                          <th className="p-6 text-left">AIP Doc<br/> Check</th>
                          <th className="p-6 text-left">EB Data<br/> Entry</th>
                          <th className="p-6 text-left">FRM Alert<br/> Checker</th>
                          <th className="p-6 text-left">Create Relationship<br/> Maker</th>
                          <th className="p-6 text-left">Create Relationship<br/> Checker</th>
                          <th className="p-6 text-left">CCPL Data<br/> Entry Maker</th>
                          <th className="p-6 text-left">CCPL Data<br/> Entry Checker</th>
                          <th className="p-6 text-left">Underwriter<br/> (1st ,2nd , Crib Authorizer)</th>
                          <th className="p-6 text-left">CBO AL<br/> Checker 1,2,3</th>
                          <th className="p-6 text-left">CBO AL<br/> Maker 1,2,3</th>
                          <th className="p-6 text-left">CBO PL<br/> Checker 1,2 </th>
                          <th className="p-6 text-left">CBO PL<br/> Maker 1,2</th>
                          <th className="p-6 text-left">CBO Top-up<br/> Checker 1,2,3</th>
                          <th className="p-6 text-left">CBO Top-up<br/> aker 1,2,3</th>
                          <th className="p-6 text-left">Pend User</th>
                          <th className="p-6 text-left">Cell User</th>
                        </tr>
                      </thead>
      
                      <tbody className="bg-white whitespace-nowrap divide-x-1">
                        {pagedData?.map(([user, value], index) => (
                          <tr
                            className="text-black h-full bg-white shadow-2"
                            key={index}
                            style={{ borderSpacing: "10px" }}
                          >
                            <td className="p-6 text-[12px] align-middle text-left">
                              <p className="text-[12px] text-gray font-bold text-left">
                                {user}
                              </p>
                            </td>
                            <td className="p-6 align-middle text-right">
                              <p className="text-[12px] text-gray font-bold text-right">
                                {value.docCheck}
                              </p>
                            </td>
                            <td className="p-6 align-middle text-right">
                              <p className="text-[12px] text-gray font-bold text-right">
                                {value.aipDocCheck}
                              </p>
                            </td>
                            <td className="p-6 align-middle text-right">
                              <p className="text-[12px] text-gray font-bold text-right">
                                {value.ebDataEntry}
                              </p>
                            </td>
                            <td className="p-6 align-middle text-right">
                              <p className="text-[12px] text-gray font-bold text-right">
                                {value.frmAlertChecker}
                              </p>
                            </td>
                            <td className="p-6 align-middle text-right">
                              <p className="text-[12px] text-gray font-bold text-right">
                                {value.relationshipMaker}
                              </p>
                            </td>
                            <td className="p-6 align-middle text-right">
                              <p className="text-[12px] text-gray font-bold text-right">
                                {value.relationshipChecker}
                              </p>
                            </td>
                            <td className="p-6 align-middle text-right">
                              <p className="text-[12px] text-gray font-bold text-right">
                                {value.ccplEntryMaker}
                              </p>
                            </td>
                            <td className="p-6 align-middle text-right">
                              <p className="text-[12px] text-gray font-bold text-right">
                                {value.ccplEntryChecker}
                              </p>
                            </td>
                            <td className="p-6 align-middle text-right">
                              <p className="text-[12px] text-gray font-bold text-right">
                                {value.underwriter}
                              </p>
                            </td>
                            <td className="p-6 align-middle text-right">
                              <p className="text-[12px] text-gray font-bold text-right">
                                {value.cboAlChecker}
                              </p>
                            </td>
                            <td className="p-6 align-middle text-right">
                              <p className="text-[12px] text-gray font-bold text-right">
                                {value.cboAlMaker}
                              </p>
                            </td>
                            <td className="p-6 align-middle text-right">
                              <p className="text-[12px] text-gray font-bold text-right">
                                {value.cboPlChecker}
                              </p>
                            </td>
                            <td className="p-6 align-middle text-right">
                              <p className="text-[12px] text-gray font-bold text-right">
                                {value.cboPlMaker}
                              </p>
                            </td>
                            <td className="p-6 align-middle text-right">
                              <p className={`text-[12px] text-gray font-bold text-right`}>
                                {value.topUpChecker}
                              </p>
                            </td>
                            <td className="p-6 align-middle text-right">
                              <p className={`text-[12px] text-grey font-bold text-right`}>
                                {value.topUpMaker}
                              </p>
                            </td>
                            <td className="p-6 align-middle text-right">
                              <p className={`text-[12px] text-grey font-bold text-right`} >
                                {value.pendUser}
                              </p>
                            </td>
                            <td className="p-6 align-middle text-right">
                              <p className={`text-[12px] text-grey font-bold text-right`}>
                                {value.cellUser}
                              </p>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                  <div className="flex items-center justify-center mt-4">
                    <Pagination
                      count={numberOfPages}
                      siblingCount={0}
                      page={page + 1}
                      onChange={handlePageChange}
                    />
                  </div>
                </div>
        
      ) :
        (
          <div className="flex items-center justify-center">
            <p className="text-red-600 text-14 font-bold">
              No records found for the selected date range
            </p>
          </div>
        )
      }
    </Paper >

  );
};

export default UserWiseActivityTrackerReportTable;



