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
import React, { useEffect, useState } from "react";
import Ve3FormHeader from "../../../../../@core/ui/Ve3FormHeader/Ve3FormHeader";
import {
  ChecklistInfo,
  CheckListItem,
} from "../../../../core/types/ChecklistInfo";

interface UnderwriterRejectReasonsProps {
  editable: boolean;
  rejectReasonsChecklist: ChecklistInfo[];
  setRejectReasonsChecklist: React.Dispatch<
    React.SetStateAction<ChecklistInfo[]>
  >;
}

const UnderwriterRejectReasons: React.FC<UnderwriterRejectReasonsProps> = ({
  editable,
  rejectReasonsChecklist,
  setRejectReasonsChecklist,
}) => {
  const midPoint =
    (rejectReasonsChecklist &&
      rejectReasonsChecklist[0]?.checkListItems.length > 0 &&
      rejectReasonsChecklist[0]?.checkListItems.length / 2) ||
    1;

  const [firstHalf, setFirstHalf] = useState<CheckListItem[]>([]);
  const [secondHalf, setSecondHalf] = useState<CheckListItem[]>([]);

  useEffect(() => {
    if (
      rejectReasonsChecklist.length > 0 &&
      rejectReasonsChecklist[0]?.checkListItems
    ) {
      const midPoint = Math.floor(
        rejectReasonsChecklist[0]?.checkListItems.length / 2
      );
      setFirstHalf(
        rejectReasonsChecklist[0]?.checkListItems.slice(0, midPoint)
      );
      setSecondHalf(rejectReasonsChecklist[0]?.checkListItems.slice(midPoint));
    }
  }, [rejectReasonsChecklist]);

  const handleValueChange = (itemIndex: number, subItemIndex: number) => {
    setRejectReasonsChecklist((prevChecklist: ChecklistInfo[]) => {
      return prevChecklist.map((item, i) => {
        if (i === itemIndex) {
          return {
            ...item,
            checkListItems: item.checkListItems?.map((subItem, j) => {
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
    setRejectReasonsChecklist((prevChecklist: ChecklistInfo[]) => {
      return prevChecklist.map((item, i) => {
        if (i === itemIndex) {
          return {
            ...item,
            checkListItems: item.checkListItems?.map((subItem, j) => {
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
    <Paper className="px-12 pb-10">
      <Ve3FormHeader
        icon="material-outline:do_not_disturb"
        title={"Reject Reasons"}
      />

      <div className="grid grid-cols-2 gap-14">
        {/* First Table */}
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
                  Reject Reasons
                </TableCell>
                <TableCell
                  className="border border-gray-300 bg-grey-200 font-bold"
                  style={{ width: "35%" }}
                >
                  Check Criteria
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {firstHalf &&
                firstHalf.map((subItem, subIndex) => (
                  <TableRow
                    key={subIndex}
                    className="border"
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
                    <TableCell
                      className="border"
                      sx={{
                        paddingLeft: "16px",
                        verticalAlign: "middle", // Center content vertically
                      }}
                    >
                      {subItem.masterCheckListItemInfo.type === "CHECK" ? (
                        <FormControlLabel
                          disabled={!editable}
                          control={
                            <Checkbox
                              checked={!!subItem.itemCheckValue}
                              onChange={() => handleValueChange(0, subIndex)}
                              sx={{
                                transform: "scale(0.8)", // Scale down the checkbox
                                padding: "2px", // Adjust padding
                              }}
                            />
                          }
                          label={""}
                        />
                      ) : (
                        <TextField
                          value={subItem.itemTxtValue || ""}
                          onChange={(e) =>
                            handleTextChange(0, subIndex, e.target.value)
                          }
                          disabled={!editable}
                        />
                      )}
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>

        {/* Second Table */}
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
                  Reject Reasons
                </TableCell>
                <TableCell
                  className="border border-gray-300 bg-grey-200 font-bold"
                  style={{ width: "35%" }}
                >
                  Check Criteria
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {secondHalf &&
                secondHalf.map((subItem, subIndex) => (
                  <TableRow
                    key={subIndex}
                    className="border"
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
                    <TableCell className="border">
                      {subItem.masterCheckListItemInfo.type === "CHECK" ? (
                        <FormControlLabel
                          disabled={!editable}
                          control={
                            <Checkbox
                              checked={!!subItem.itemCheckValue}
                              onChange={() =>
                                handleValueChange(0, subIndex + midPoint)
                              }
                              sx={{
                                transform: "scale(0.8)", // Scale down the checkbox
                                padding: "2px", // Adjust padding
                              }}
                            />
                          }
                          label={""}
                        />
                      ) : (
                        <TextField
                          value={subItem.itemTxtValue || ""}
                          sx={{
                            height: 40,
                            "& .MuiInputBase-root": {
                              height: "100%",
                            },
                            "& .MuiOutlinedInput-input": {
                              padding: "4px 8px",
                            },
                          }}
                          onChange={(e) =>
                            handleTextChange(
                              0,
                              subIndex + midPoint,
                              e.target.value
                            )
                          }
                          disabled={!editable}
                        />
                      )}
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </Paper>
  );
};

export default UnderwriterRejectReasons;
