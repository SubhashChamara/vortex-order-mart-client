import {
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

interface ALPLCheckpointsProps {
  salesEditable: boolean;
  operationEditable: boolean;
  alplChecklist: ChecklistInfo[] | null;
  setALPLChecklist: React.Dispatch<React.SetStateAction<ChecklistInfo[]>>;
}

const ALPLCheckpointsTwoFields: React.FC<ALPLCheckpointsProps> = ({
  salesEditable,
  operationEditable,
  alplChecklist,
  setALPLChecklist,
}) => {
  const handleCheckboxChange = (itemIndex: number, subItemIndex: number) => {
    setALPLChecklist((prevChecklist: ChecklistInfo[]) => {
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
    setALPLChecklist((prevChecklist: ChecklistInfo[]) => {
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
          icon="material-outline:request_quote"
          title="Checkpoints ALPL"
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
                  Checkpoints ALPL
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
              {alplChecklist && alplChecklist.length > 0 ? (
                alplChecklist.map((item, index) => (
                  <>
                    <TableRow
                      key={index}
                      sx={{
                        height: "30px", // Adjust row height
                        "& .MuiTableCell-root": {
                          padding: "4px", // Default padding
                          paddingLeft: "16px", // Increased left padding
                        },
                      }}
                    >
                      <TableCell
                        className="bg-grey-200 font-bold border"
                        sx={{ paddingLeft: "16px" }}
                        colSpan={3}
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
                              disabled={!salesEditable}
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
                              disabled={!operationEditable}
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
                  {/* <TableCell colSpan={2} className="text-center">
                    <span>
                      No Checklist Data Available for the Source type:{" "}
                      <strong>{(sourceType && sourceType.name) || ""}</strong>
                    </span>
                  </TableCell> */}
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </div>
  );
};

export default ALPLCheckpointsTwoFields;
