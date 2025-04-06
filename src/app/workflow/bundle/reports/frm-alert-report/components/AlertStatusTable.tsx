import { FC, ChangeEvent, useState } from "react";
import { Pagination, Paper, Dialog, DialogActions, DialogContent, DialogTitle, Button } from "@mui/material";
import moment from "moment";
import { Api } from "../../../../../../api/Api";
import EdgeSvgIcon from "../../../../../../@core/ui/EdgeSvgIcon";

type AlertStatusTableProps = {
  data: {
    content: any[];
    totalPages: number;
  } | null;
  page: number;
  setPage: (value: number) => void;
};

const AlertStatusTable: FC<AlertStatusTableProps> = ({ data, page, setPage }) => {
  const [openAlertDialog, setOpenAlertDialog] = useState<boolean>(false);
  const [selectedAlerts, setSelectedAlerts] = useState<any>(null);

  const handlePageChange = (_: ChangeEvent<unknown>, newPage: number) => {
    setPage(newPage - 1);
  };

  const formatDate = (date: string) => {
    return date ? moment(date).format("DD/MM/YYYY HH:mm") : "--";
  };

  const handleViewAlerts = async (businessKey: string) => {
    const alerts = await fetchAlertsByBusinessKey(businessKey);
    setSelectedAlerts(alerts);
    setOpenAlertDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenAlertDialog(false);
    setSelectedAlerts(null);
  };

  if (data === null) {
    return null;
  }

  const fetchAlertsByBusinessKey = async (businessKey: string) => {
    try {
      const { data } = await Api.performRequest((r) =>
        r.reports.fetchAlertsByBusinessKey(businessKey)
      );
      return Array.isArray(data) ? data : [];
    } catch (error) {
      console.error("Error fetching alerts:", error);
      return [];
    }
  };



  return (
    <Paper className="w-full overflow-hidden p-12">
      {data.content.length === 0 ? (
        <div className="flex items-center justify-center">
          <p className="text-red-600 text-sm font-bold">No records found for the selected date range</p>
        </div>
      ) : (
        <div>
          <div className="text-xs font-semibold tracking-wide text-left border-b pb-6">
            <div className="flex justify-between items-center mb-4">
              <div>
                <p className="text-sm text-red-600 font-semibold">Search Results</p>
                <p className="text-xs font-semibold text-gray-600">Alert Status Bulk Download Report for the selected date range</p>
              </div>
            </div>
          </div>
          <div className="w-full overflow-x-auto">
            <table id="my-table" className="w-full whitespace-nowrap">
              <thead>
                <tr className="whitespace-nowrap divide-x-1">
                  <th className="p-6 text-left">WF Ref</th>
                  <th className="p-6 text-left">Submission Date</th>
                  <th className="p-6 text-left">Task Assigned</th>
                  <th className="p-6 text-left">Alert Decision</th>
                  <th className="p-6 text-left">Completed Date</th>
                  <th className="p-6 text-left">Alert Status</th>
                  <th className="p-6 text-left">Product</th>
                  <th className="p-6 text-left">WF Status</th>
                  <th className="p-6 text-left">View Alerts</th>
                </tr>
              </thead>
              <tbody className="bg-white whitespace-nowrap">
                {data.content.map((item, index) => (
                  <tr className="text-black h-full bg-white shadow-2" key={index}>
                    <td className="p-6 align-middle text-left"><p className="text-[12px] text-gray font-bold">{item.businessKey}</p></td>
                    <td className="p-6 align-middle text-left"><p className="text-[12px] text-gray font-bold">{formatDate(item.createdDate)}</p></td>
                    <td className="p-6 align-middle text-left"><p className="text-[12px] text-gray font-bold">{item.taskAssignedDate || "N/A"}</p></td>
                    <td className="p-6 align-middle text-left"><p className="text-[12px] text-gray font-bold">{item.alertDecision || "N/A"}</p></td>
                    <td className="p-6 align-middle text-left"><p className="text-[12px] text-gray font-bold">{formatDate(item.completedDate) || "N/A"}</p></td>
                    <td className="p-6 align-middle text-left"><p className="text-[12px] text-gray font-bold">{item.alertStatus || "N/A"}</p></td>
                    <td className="p-6 align-middle text-left"><p className="text-[12px] text-gray font-bold">{item.products || "N/A"}</p></td>
                    <td className="p-6 align-middle text-left"><p className="text-[12px] text-gray font-bold">{item.approved ? "Yes" : "No"}</p></td>
                    <td className="p-6 align-middle text-left">
                      {/* {item.alerts && item.alerts.length > 0 ? ( */}
                      <Button
                        variant="outlined"
                        color="primary"
                        onClick={() => handleViewAlerts(item.businessKey)}
                        className="px-10 border-gray bg-grey-50 cursor-pointer hover:bg-gray-200 focus:outline-none active:scale-95 active:bg-gray-300"
                      >
                        <EdgeSvgIcon className="text-red-500">heroicons-outline:document-text</EdgeSvgIcon>
                      </Button>
                      {/* ) : (
                        <span className="text-gray-400 text-sm"><p className="text-[12px] text-gray font-bold">No Alerts</p></span>
                      )} */}
                    </td>

                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="flex justify-center mt-4">
            <Pagination count={data.totalPages} siblingCount={0} page={page + 1} onChange={handlePageChange} />
          </div>
        </div>
      )}

      {/* Alerts Dialog */}
      <Dialog open={openAlertDialog} onClose={handleCloseDialog} fullWidth maxWidth="sm">
        <DialogTitle>Alert Details</DialogTitle>
        <DialogContent>
          <table className="w-full whitespace-nowrap">
            <thead>
              <tr className="whitespace-nowrap divide-x-1">
                <th className="p-6 text-left">Rule and Description</th>
                <th className="p-6 text-left">Action taken by FRM (Comments)</th>
              </tr>
            </thead>
            <tbody className="bg-white whitespace-nowrap">
              {Array.isArray(selectedAlerts) && selectedAlerts.length > 0 ? (
                selectedAlerts.map((alert: any, index: number) => (
                  <tr key={index}>
                    <td className="p-6 align-middle text-left">
                      <p className="text-[12px] text-gray font-bold">{alert.alert}</p>
                    </td>
                    <td className="p-6 align-middle text-left">
                      <p className="text-[12px] text-gray font-bold">{alert.authoriserNote}</p>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={2} className="p-6 text-center text-gray-500">
                    No alerts available.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="primary">Close</Button>
        </DialogActions>
      </Dialog>
    </Paper>
  );
};

export default AlertStatusTable;
