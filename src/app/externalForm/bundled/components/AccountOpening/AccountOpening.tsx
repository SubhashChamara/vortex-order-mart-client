import {
  Paper,
  FormControlLabel,
  Checkbox,
  Button,
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
import EdgeSvgIcon from "../../../../../@core/ui/EdgeSvgIcon";

interface AccountOpeningProps {
  editable: boolean;
  accountOpenChecklist?: ChecklistInfo[];
  setAccountOpenChecklist?: React.Dispatch<
    React.SetStateAction<ChecklistInfo[]>
  >;
}

const AccountOpening: React.FC<AccountOpeningProps> = ({
  editable,
  accountOpenChecklist,
  setAccountOpenChecklist,
}) => {
  const handleValueChange = (itemIndex: number, subItemIndex: number) => {
    setAccountOpenChecklist &&
      setAccountOpenChecklist((prevChecklist: ChecklistInfo[]) => {
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

  return (
    <div>
      <Paper className="px-12 pb-10 h-full">
        <Ve3FormHeader
          icon="feather:check-square"
          title="Account Opening Checklist"
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
                    sx={{ width: "95%" }} // Set width to 70%
                  >
                    Checkpoints - Account Opening
                  </TableCell>
                  <TableCell
                    sx={{ width: "5%" }} // Set width to 70%
                    className="border border-gray-300 bg-grey-200 text-start pt-6 pb-6"
                  ></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {accountOpenChecklist &&
                  accountOpenChecklist.map((item, index) => (
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
                          className="bg-grey-200 border border-gray-300 font-bold"
                          colSpan={2}
                          sx={{ paddingLeft: "16px" }}
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
                            <p>
                              {subItem.masterCheckListItemInfo.name}
                              {subItem.masterCheckListItemInfo.required && (
                                <span className="text-primary">*</span>
                              )}
                            </p>
                          </TableCell>
                          <TableCell>
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
      {editable && (
        <div className="flex justify-end pt-12">
          <Button type="submit">
            <EdgeSvgIcon>feather:save</EdgeSvgIcon> Save
          </Button>
        </div>
      )}
    </div>
  );
};

export default AccountOpening;
