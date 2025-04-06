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
import Ve3LoadingScreen from "../../../../../@core/ui/Ve3LoadingScreen/Ve3LoadingScreen";

interface UnderwriterPendReasonsProps {
  editable: boolean;
  pendReasonsChecklist: ChecklistInfo[];
  setPendReasonsChecklist: React.Dispatch<
    React.SetStateAction<ChecklistInfo[]>
  >;
}

const UnderwriterPendReasons: React.FC<UnderwriterPendReasonsProps> = ({
  editable,
  pendReasonsChecklist,
  setPendReasonsChecklist,
}) => {
  const midPoint =
    (pendReasonsChecklist &&
      pendReasonsChecklist[0]?.checkListItems.length > 0 &&
      pendReasonsChecklist[0]?.checkListItems.length / 2) ||
    1;

  const [firstHalf, setFirstHalf] = useState<CheckListItem[]>([]);
  const [secondHalf, setSecondHalf] = useState<CheckListItem[]>([]);

  useEffect(() => {
    if (pendReasonsChecklist) {
      setFirstHalf(pendReasonsChecklist[0]?.checkListItems.slice(0, midPoint));
      setSecondHalf(pendReasonsChecklist[0]?.checkListItems.slice(midPoint));
    }
  }, [pendReasonsChecklist]);

  const handleValueChange = (itemIndex: number, subItemIndex: number) => {
    setPendReasonsChecklist((prevChecklist: ChecklistInfo[]) => {
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
    setPendReasonsChecklist((prevChecklist: ChecklistInfo[]) => {
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

  return pendReasonsChecklist ? (
    <Paper className="px-12 pb-10">
      <Ve3FormHeader
        icon="material-outline:hourglass_top"
        title={"Pending Reasons"}
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
                  Pending Reasons
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
                      {" "}
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
                  Pending Reasons
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
                    <TableCell
                      className="border"
                      sx={{
                        paddingLeft: "16px",

                        verticalAlign: "middle", // Center content vertically
                      }}
                    >
                      {" "}
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
                          onChange={(e) =>
                            handleTextChange(
                              0,
                              subIndex + midPoint,
                              e.target.value
                            )
                          }
                          disabled={!editable}
                          sx={{
                            height: 40,
                            "& .MuiInputBase-root": {
                              height: "100%",
                            },
                            "& .MuiOutlinedInput-input": {
                              padding: "4px 8px",
                            },
                          }}
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
  ) : (
    <Ve3LoadingScreen />
  );
};

export default UnderwriterPendReasons;
