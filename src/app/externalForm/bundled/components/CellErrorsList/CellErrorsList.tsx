import {
  Paper,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Checkbox,
  FormControlLabel,
} from "@mui/material";
import React from "react";
import Ve3FormHeader from "../../../../../@core/ui/Ve3FormHeader/Ve3FormHeader";
import { ChecklistInfo } from "../../../../core/types/ChecklistInfo";

interface CellErrorsListProps {
  editable: boolean;
  cellErrorChecklist: ChecklistInfo[];
  setCellErrorChecklist: React.Dispatch<React.SetStateAction<ChecklistInfo[]>>;
}

const CellErrorsList: React.FC<CellErrorsListProps> = ({
  editable,
  cellErrorChecklist,
  setCellErrorChecklist,
}) => {
  const handleCheckboxChange = (itemIndex: number, subItemIndex: number) => {
    setCellErrorChecklist((prevChecklist: ChecklistInfo[]) => {
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

  return (
    <div className="">
      <Paper className="px-12 pb-10 w-full flex flex-col">
        <Ve3FormHeader
          icon="feather:check-square"
          title="Cell Errors Checklist"
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
                  sx={{ width: "95%" }} // Set width to 70%
                >
                  Cell Error List
                </TableCell>
                <TableCell
                  className="border border-gray-300 bg-grey-200 font-bold"
                  sx={{ width: "5%" }} // Set width to 10%
                ></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {cellErrorChecklist &&
                cellErrorChecklist.map((item, index) => (
                  <>
                    {/* <TableRow key={index}>
                      <TableCell className="bg-grey-200 font-bold">
                        {item.headingInfo && item.headingInfo.header}
                      </TableCell>
                      <TableCell className="bg-grey-200 font-bold" />
                    </TableRow> */}
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
                        <TableCell key={subIndex} className="border">
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
                          {/* {subItem.showInSales && ( */}
                          <FormControlLabel
                            disabled={!editable}
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
                          {/* )} */}
                        </TableCell>
                      </TableRow>
                    ))}
                  </>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </div>
  );
};

export default CellErrorsList;
