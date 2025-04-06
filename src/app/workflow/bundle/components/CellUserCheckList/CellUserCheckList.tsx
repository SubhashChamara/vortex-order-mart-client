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
  TextField,
} from "@mui/material";
import React from "react";
import Ve3FormHeader from "../../../../../@core/ui/Ve3FormHeader/Ve3FormHeader";
import { useFormContext } from "react-hook-form";
import { ChecklistInfo } from "../../../../core/types/ChecklistInfo";
import EdgeSvgIcon from "../../../../../@core/ui/EdgeSvgIcon";
// import { CellUserInfo } from "../../../../core/types/CellUserInfo";

interface CellUserCheckListProps {
  editable: boolean;
  cellUserChecklist: ChecklistInfo[];
  setCellUserChecklist: React.Dispatch<React.SetStateAction<ChecklistInfo[]>>;
}

const CellUser: React.FC<CellUserCheckListProps> = ({
  editable,
  cellUserChecklist,
  setCellUserChecklist,
}) => {
  const { control } = useFormContext();

  const handleValueChange = (itemIndex: number, subItemIndex: number) => {
    setCellUserChecklist((prevChecklist: ChecklistInfo[]) => {
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
    setCellUserChecklist((prevChecklist: ChecklistInfo[]) => {
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
          title="Cell User Checklist"
        />
        <div className="flex flex-col gap-14">
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell
                    className="border border-gray-300 bg-grey-200 text-start pt-6 pb-6"
                    style={{ borderRight: "1px solid #ccc" }}
                  >
                    Cell User Checkpoints
                  </TableCell>
                  <TableCell className="border border-gray-300 bg-grey-200 text-start pt-6 pb-6">
                    Operations
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {cellUserChecklist &&
                  cellUserChecklist.map((item, index) => (
                    <React.Fragment key={index}>
                      <TableRow key={index}>
                        <TableCell className="bg-gray-100">
                          {item.headingInfo.header}
                        </TableCell>
                        <TableCell className="bg-gray-100" />
                      </TableRow>
                      {item.checkListItems.map((subItem, subIndex) => (
                        <TableRow key={subIndex}>
                          <TableCell>
                            <p>{subItem.masterCheckListItemInfo.name}</p>
                          </TableCell>
                          <TableCell>
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

export default CellUser;
