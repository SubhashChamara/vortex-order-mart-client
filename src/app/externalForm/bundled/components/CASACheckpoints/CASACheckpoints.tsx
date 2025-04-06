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

interface CASACheckpointsProps {
  editable: boolean;
  casaChecklist: ChecklistInfo[];
  setCasaChecklist: React.Dispatch<React.SetStateAction<ChecklistInfo[]>>;
}

const CASACheckpoints: React.FC<CASACheckpointsProps> = ({
  editable,
  casaChecklist,
  setCasaChecklist,
}) => {
  const handleCheckboxChange = (itemIndex: number, subItemIndex: number) => {
    setCasaChecklist((prevChecklist: ChecklistInfo[]) => {
      return prevChecklist.map((item, i) => {
        if (i === itemIndex) {
          // Update the specific checkListItems entry
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

  return (
    <div>
      <Paper className="px-12 pb-10 h-full">
        <Ve3FormHeader icon="feather:check-square" title="CASA Checklist" />
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
                    sx={{ width: "95%" }} // Set width to 70%
                  >
                    Checkpoints CASA
                  </TableCell>
                  <TableCell
                    className="border border-gray-300 bg-grey-200 text-start pt-6 pb-6"
                    sx={{ width: "5%" }} // Set width to 70%
                  />
                </TableRow>
              </TableHead>
              <TableBody>
                {casaChecklist &&
                  casaChecklist.map((item, index) => (
                    <React.Fragment key={index}>
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
                          <TableCell className="border">
                            <p>{subItem.masterCheckListItemInfo.name}</p>
                          </TableCell>
                          <TableCell
                            className="border"
                            sx={{
                              paddingLeft: "16px",
                              textAlign: "center", // Center content horizontally
                              verticalAlign: "middle", // Center content vertically
                            }}
                          >
                            {" "}
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

export default CASACheckpoints;
