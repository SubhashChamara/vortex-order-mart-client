import React, { useEffect, useState } from "react";
import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
} from "@mui/material";
import { FRMAlertInfo } from "../../@types/FRMAlertInfo";
import { Api } from "../../../../../api/Api";
import { TaskDetailInfo } from "../../../../core/types/TaskDetailInfo";
import { toast } from "react-toastify";

interface FRMAlertsProps {
  task: TaskDetailInfo;
  editable: boolean;
  frmAlerts: FRMAlertInfo[];
}

const FRMAlerts: React.FC<FRMAlertsProps> = ({
  task,
  editable,
  frmAlerts: initialFrmAlerts,
}) => {
  const [frmAlerts, setFrmAlerts] = useState<FRMAlertInfo[]>([]);

  // Sync state with initialFrmAlerts prop
  useEffect(() => {
    setFrmAlerts(initialFrmAlerts);
  }, [initialFrmAlerts]);

  const handleInputChange = (index: number, value: string) => {
    setFrmAlerts((prev) =>
      prev.map((alert, i) =>
        i === index ? { ...alert, authorizerNote: value } : alert
      )
    );
  };

  const handleSubmit = async (request: FRMAlertInfo) => {
    const { err } = await Api.performRequest((r) =>
      r.creditCard.saveFRMAlerts(task.processInstanceId, request)
    );

    if (!err) {
      toast.success("FRM alert updated");
    } else {
      toast.error(err.msg);
    }
  };

  return (
    <div>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow
              sx={{
                height: "40px", // Adjust row height
                "& .MuiTableCell-root": {
                  padding: "16px", // Default padding
                },
              }}
            >
              <TableCell
                className="border border-gray-300 bg-grey-200 font-bold"
                sx={{ width: "40%" }}
              >
                <p>Alert</p>
              </TableCell>
              <TableCell
                className="border border-gray-300 bg-grey-200 font-bold"
                sx={{ width: "20%" }}
              >
                <p>Databases</p>
              </TableCell>
              <TableCell
                className="border border-gray-300 bg-grey-200 font-bold"
                sx={{ width: "30%" }}
              >
                <p>Authorizer Comment</p>
              </TableCell>
              <TableCell
                className="border border-gray-300 bg-grey-200 font-bold"
                sx={{ width: "10%" }}
              ></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {frmAlerts.map((alert, index) => (
              <TableRow key={index}>
                <TableCell>{alert.alert}</TableCell>
                <TableCell>{alert.databases}</TableCell>
                <TableCell>
                  <TextField
                    disabled={!editable}
                    label="Comment"
                    size="small"
                    type="text"
                    value={alert.authorizerNote}
                    onChange={(e) => handleInputChange(index, e.target.value)}
                  />
                </TableCell>
                <TableCell>
                  <Button
                    disabled={!editable}
                    onClick={() => handleSubmit(alert)}
                  >
                    Update
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default FRMAlerts;
