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
import React, { useEffect } from "react";
import Ve3FormHeader from "../../../../../@core/ui/Ve3FormHeader/Ve3FormHeader";
import { ChecklistInfo } from "../../../../core/types/ChecklistInfo";
import EdgeSvgIcon from "../../../../../@core/ui/EdgeSvgIcon";
import { useFormContext } from "react-hook-form";

interface UnderwriterChecklistProps {
  editable: boolean;
  underwriterChecklist: ChecklistInfo[];
  setUnderwriterChecklist: React.Dispatch<
    React.SetStateAction<ChecklistInfo[]>
  >;
}

const UnderwriterChecklist: React.FC<UnderwriterChecklistProps> = ({
  editable,
  underwriterChecklist,
  setUnderwriterChecklist,
}) => {
  const { setValue } = useFormContext();

  useEffect(() => {
    setValue("currentStep", 6);
  }, []);

  const handleCheckboxChange = (itemIndex: number, subItemIndex: number) => {
    setUnderwriterChecklist((prevChecklist: ChecklistInfo[]) => {
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
    <div>
      <Paper className="px-12 pb-10 h-full">
        <Ve3FormHeader
          icon="feather:check-square"
          title="Underwriter Checklist"
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
                    Type
                  </TableCell>
                  <TableCell className="border border-gray-300 bg-grey-200 text-start pt-6 pb-6">
                    Checklist
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {underwriterChecklist &&
                  underwriterChecklist.map((item, index) => (
                    <TableRow key={index}>
                      <TableCell className="border-r border-r-gray-300">
                        {item.headingInfo.header}
                      </TableCell>
                      <TableCell>
                        <div className="flex flex-row justify-between">
                          <div className="flex flex-col gap-3">
                            {item.checkListItems.map((subItem, subIndex) => (
                              <TableCell
                                key={subIndex}
                                className={`py-2 flex flex-row justify-between gap-12 ${
                                  subIndex === item.checkListItems.length - 1
                                    ? "border-b-0"
                                    : ""
                                }`}
                              >
                                <p>{subItem.masterCheckListItemInfo.name}</p>
                                <FormControlLabel
                                  disabled={!editable}
                                  control={
                                    <Checkbox
                                      checked={!!subItem.itemCheckValue}
                                      onChange={() =>
                                        handleCheckboxChange(index, subIndex)
                                      }
                                    />
                                  }
                                  label={""}
                                />
                              </TableCell>
                            ))}
                          </div>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </TableContainer>
          {/* <div className="flex justify-end">
            <Button type="submit" disabled={!editable}>
              <EdgeSvgIcon>feather:save</EdgeSvgIcon> Save Checklist
            </Button>
          </div> */}
        </div>
      </Paper>
    </div>
  );
};

export default UnderwriterChecklist;
