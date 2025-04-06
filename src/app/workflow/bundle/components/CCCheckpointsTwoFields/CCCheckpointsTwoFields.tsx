import {
  Button,
  Checkbox,
  FormControlLabel,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import React from "react";
import Ve3FormHeader from "../../../../../@core/ui/Ve3FormHeader/Ve3FormHeader";
import { ChecklistInfo } from "../../../../core/types/ChecklistInfo";
import { useFormContext } from "react-hook-form";

interface CCCheckpointsProps {
  ccChecklist: ChecklistInfo[] | null;
  isSalesEditable: boolean;
  isOperationsEditable: boolean;
  setCCChecklist: React.Dispatch<React.SetStateAction<ChecklistInfo[]>>;
}

const CCCheckpointsTwoFields: React.FC<CCCheckpointsProps> = ({
  ccChecklist,
  setCCChecklist,
  isSalesEditable,
  isOperationsEditable,
}) => {
  const { watch } = useFormContext();
  const sourceType = watch("sourceType");
  const handleCheckboxChange = (itemIndex: number, subItemIndex: number) => {
    setCCChecklist((prevChecklist: ChecklistInfo[]) => {
      return prevChecklist.map((item, i) => {
        if (i === itemIndex) {
          // Update the specific checkListItems entry
          return {
            ...item,
            checkListItems: item.checkListItems.map((subItem, j) => {
              if (j === subItemIndex) {
                return {
                  ...subItem,
                  itemCheckValue: !subItem.itemCheckValue, // Toggle the checkbox value
                };
              }
              return subItem;
            }),
          };
        }
        return item;
      });
    });
  };

  const handleOperationCheckboxChange = (
    itemIndex: number,
    subItemIndex: number
  ) => {
    setCCChecklist((prevChecklist: ChecklistInfo[]) => {
      return prevChecklist.map((item, i) => {
        if (i === itemIndex) {
          // Update the specific checkListItems entry
          return {
            ...item,
            checkListItems: item.checkListItems.map((subItem, j) => {
              if (j === subItemIndex) {
                return {
                  ...subItem,
                  itemCheckValueOperation: !subItem.itemCheckValueOperation, // Toggle the checkbox value
                };
              }
              return subItem;
            }),
          };
        }
        return item;
      });
    });
  };

  return (
    <div className="flex flex-col gap-12">
      <Paper className="px-12 pb-10 w-full flex flex-col">
        <Ve3FormHeader
          icon="feather:check-square"
          title="Checkpoints Credit Card"
        />
        <TableContainer component={Paper} className="max-w-screen">
          <Table className="max-w-screen">
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
                  sx={{ width: "90%" }} // Set width to 70%
                >
                  Checkpoints Credit Card
                </TableCell>
                <TableCell
                  className="border border-gray-300 bg-grey-200 font-bold"
                  sx={{ width: "5%" }} // Set width to 10%
                >
                  Sales
                </TableCell>
                <TableCell
                  className="border border-gray-300 bg-grey-200 font-bold"
                  sx={{ width: "5%" }} // Set width to 10%
                >
                  Operation
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {ccChecklist && ccChecklist.length > 0 ? (
                ccChecklist.map((item, index) => (
                  <>
                    <TableRow
                      key={index}
                      sx={{
                        height: "30px", // Adjust row height
                        "& .MuiTableCell-root": {
                          padding: "8px", // Default padding
                          paddingLeft: "16px", // Increased left padding
                        },
                      }}
                    >
                      <TableCell
                        className="bg-grey-200 border border-gray-300 font-bold"
                        colSpan={3}
                        sx={{ paddingLeft: "16px" }}
                      >
                        {item.headingInfo && item.headingInfo.header}
                      </TableCell>
                    </TableRow>
                    {item.checkListItems.map((subItem, subIndex) => (
                      <TableRow
                        key={subIndex}
                        sx={{
                          height: "30px", // Adjust row height
                          "& .MuiTableCell-root": {
                            padding: "4px", // Default padding
                            paddingLeft: "16px", // Increased left padding
                          },
                        }}
                      >
                        <TableCell
                          className="border"
                          sx={{ paddingLeft: "16px" }}
                        >
                          {subItem.masterCheckListItemInfo.name}
                        </TableCell>
                        <TableCell
                          className="border"
                          sx={{
                            paddingLeft: "16px",
                            textAlign: "center", // Center content horizontally
                            verticalAlign: "middle", // Center content vertically
                          }}
                        >
                          {subItem.showInSales && (
                            <FormControlLabel
                              disabled={!isSalesEditable}
                              control={
                                <Checkbox
                                  checked={!!subItem.itemCheckValue}
                                  onChange={() =>
                                    handleCheckboxChange(index, subIndex)
                                  }
                                  sx={{
                                    transform: "scale(0.8)", // Scale down the checkbox
                                    padding: "2px", // Adjust padding
                                  }}
                                />
                              }
                              label={""}
                            />
                          )}
                        </TableCell>
                        <TableCell
                          className="border"
                          sx={{
                            paddingLeft: "16px",
                            textAlign: "center", // Center content horizontally
                            verticalAlign: "middle", // Center content vertically
                          }}
                        >
                          {subItem.showInOperation && (
                            <FormControlLabel
                              disabled={!isOperationsEditable}
                              control={
                                <Checkbox
                                  checked={!!subItem.itemCheckValueOperation}
                                  onChange={() =>
                                    handleOperationCheckboxChange(
                                      index,
                                      subIndex
                                    )
                                  }
                                  sx={{
                                    transform: "scale(0.8)", // Scale down the checkbox
                                    padding: "2px", // Adjust padding
                                  }}
                                />
                              }
                              label={""}
                            />
                          )}
                        </TableCell>
                      </TableRow>
                    ))}
                  </>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={2} className="text-center">
                    <span>
                      No Checklist Data Available for the Source type:{" "}
                      <strong>{(sourceType && sourceType.name) || ""}</strong>
                    </span>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </div>
  );
};

export default CCCheckpointsTwoFields;
