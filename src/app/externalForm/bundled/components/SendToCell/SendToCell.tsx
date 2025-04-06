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
  TextField,
} from "@mui/material";
import React from "react";
import Ve3FormHeader from "../../../../../@core/ui/Ve3FormHeader/Ve3FormHeader";
import { ChecklistInfo } from "../../../../core/types/ChecklistInfo";

interface SendToCellProps {
  editable: boolean;
  sendToCellChecklist: ChecklistInfo[];
  setSendToCellChecklist: React.Dispatch<React.SetStateAction<ChecklistInfo[]>>;
}

const SendToCell: React.FC<SendToCellProps> = ({
  editable,
  sendToCellChecklist,
  setSendToCellChecklist,
}) => {
  const handleValueChange = (itemIndex: number, subItemIndex: number) => {
    setSendToCellChecklist((prevChecklist: ChecklistInfo[]) => {
      return prevChecklist.map((item, i) => {
        if (i === itemIndex) {
          return {
            ...item,
            checkListItems: item.checkListItems.map((subItem, j) => {
              if (j === subItemIndex) {
                return {
                  ...subItem,
                  itemCheckValue: !subItem.itemCheckValue,
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

  const handleTextChange = (
    itemIndex: number,
    subItemIndex: number,
    newValue: string
  ) => {
    setSendToCellChecklist((prevChecklist: ChecklistInfo[]) => {
      return prevChecklist.map((item, i) => {
        if (i === itemIndex) {
          return {
            ...item,
            checkListItems: item.checkListItems.map((subItem, j) => {
              if (j === subItemIndex) {
                return {
                  ...subItem,
                  itemTxtValue: newValue,
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
    <div>
      <Paper className="px-12 pb-10 h-full">
        <Ve3FormHeader
          icon="feather:check-square"
          title="Send to Cell Checklist"
        />
        <div className="flex flex-col gap-14">
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
                    sx={{ width: "65%" }} // Set width to 70%
                  >
                    Checkpoints Send to Cell
                  </TableCell>
                  <TableCell className="border border-gray-300 bg-grey-200 text-start pt-6 pb-6">
                    Operations
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {sendToCellChecklist &&
                  sendToCellChecklist.map((item, index) => (
                    <React.Fragment key={index}>
                      <TableRow
                        sx={{
                          height: "30px", // Adjust row height
                          "& .MuiTableCell-root": {
                            padding: "4px", // Default padding
                            paddingLeft: "16px", // Increased left padding
                          },
                        }}
                        key={index}
                      >
                        <TableCell
                          colSpan={2}
                          className="bg-grey-200 border border-gray-300 font-bold"
                        >
                          {item.headingInfo.header}
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
                          <TableCell>
                            <p>{subItem.masterCheckListItemInfo.name}</p>
                          </TableCell>
                          <TableCell sx={{ paddingLeft: "8px" }}>
                            {subItem.masterCheckListItemInfo.type ===
                            "CHECK" ? (
                              <FormControlLabel
                                disabled={!editable}
                                control={
                                  <Checkbox
                                    checked={!!subItem.itemCheckValue}
                                    onChange={() =>
                                      handleValueChange(index, subIndex)
                                    }
                                    sx={{
                                      transform: "scale(0.8)", // Scale down the checkbox
                                    }}
                                  />
                                }
                                label={""}
                              />
                            ) : (
                              <TextField
                                value={subItem.itemTxtValue || ""} // Adjust field name if needed
                                onChange={(e) =>
                                  handleTextChange(
                                    index,
                                    subIndex,
                                    e.target.value
                                  )
                                }
                                disabled={!editable}
                              />
                            )}
                          </TableCell>
                        </TableRow>
                      ))}
                    </React.Fragment>
                  ))}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      </Paper>
    </div>
  );
};

export default SendToCell;
