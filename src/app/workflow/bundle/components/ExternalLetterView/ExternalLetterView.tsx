import {
  Alert,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  TextField,
  RadioGroup,
  FormControlLabel,
  Radio,
} from "@mui/material";
import React from "react";
import EdgeSvgIcon from "../../../../../@core/ui/EdgeSvgIcon";
import Ve3FormHeader from "../../../../../@core/ui/Ve3FormHeader/Ve3FormHeader";
import { fetchPrintFile } from "../../../../../api/requests/common/DocumentFetchRequests";
import { TaskDetailInfo } from "../../../../core/types/TaskDetailInfo";
import { ChecklistInfo } from "../../../../core/types/ChecklistInfo";

interface ExternalLetterViewProps {
  task: TaskDetailInfo;
  externalVerificationChecklist: ChecklistInfo[];
  setExternalVerificationChecklist: React.Dispatch<
    React.SetStateAction<ChecklistInfo[]>
  >;
}

const ExternalLetterView: React.FC<ExternalLetterViewProps> = ({
  task,
  externalVerificationChecklist,
  setExternalVerificationChecklist,
}) => {
  const letterList: { name: string; code: string }[] = [
    { name: "SL Medical Council", code: "sl-medical-council" },
    { name: "Private Company", code: "private-company" },
    { name: "Individual No Resident Verify", code: "ind-no-resident" },
    { name: "Individual No Employment Verify", code: "ind-no-employment" },
  ];

  const printPDF = (blob: Blob) => {
    const url = window.URL.createObjectURL(blob);
    const newWindow = window.open(url, "_blank");
    if (newWindow) {
      newWindow.onload = () => {
        newWindow.print();
      };
    }
  };

  const handleValueChange = (
    itemIndex: number,
    subItemIndex: number,
    newValue: boolean | null
  ) => {
    setExternalVerificationChecklist((prevChecklist: ChecklistInfo[]) => {
      return prevChecklist.map((item, i) => {
        if (i === itemIndex) {
          return {
            ...item,
            checkListItems: item.checkListItems.map((subItem, j) => {
              if (j === subItemIndex) {
                return {
                  ...subItem,
                  itemCheckValue: newValue,
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
    setExternalVerificationChecklist((prevChecklist: ChecklistInfo[]) => {
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
      <Paper className="px-12 pb-10">
        <Ve3FormHeader
          icon="feather:check-square"
          title="External Verification Checklist"
        />
        <div className="grid grid-cols-3 gap-12">
          <div className="col-span-2">
            <TableContainer>
              <Table>
                <TableBody>
                  {externalVerificationChecklist &&
                    externalVerificationChecklist.map((item, index) => (
                      <React.Fragment key={index}>
                        {/* <TableRow key={index}>
                          <TableCell className="bg-gray-100">
                            {item.headingInfo.header}
                          </TableCell>
                          <TableCell className="bg-gray-100" />
                        </TableRow> */}
                        {item.checkListItems.map((subItem, subIndex) => (
                          <TableRow key={subIndex}>
                            <TableCell>
                              <p>{subItem.masterCheckListItemInfo.name}</p>
                            </TableCell>
                            <TableCell>
                              {subItem.masterCheckListItemInfo.type ===
                              "RADIO" ? (
                                <RadioGroup
                                  row
                                  value={
                                    subItem.itemCheckValue === true
                                      ? true
                                      : subItem.itemCheckValue === false
                                      ? false
                                      : null
                                  }
                                  onChange={(event) => {
                                    const newValue =
                                      event.target.value === "true";
                                    handleValueChange(
                                      index,
                                      subIndex,
                                      newValue
                                    );
                                  }}
                                >
                                  <FormControlLabel
                                    value={true}
                                    control={<Radio />}
                                    label="Successful"
                                  />
                                  <FormControlLabel
                                    value={false}
                                    control={<Radio />}
                                    label="Not Successful"
                                  />
                                </RadioGroup>
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
                                  // disabled={!editable}
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

          {/* Letter view section */}
          <div className="col-span-1 flex flex-col gap-12 border-l-2 pl-12">
            {letterList.map((letter, index) => (
              <Alert
                variant="standard"
                icon={false}
                key={index}
                className="hover:cursor-pointer flex items-center justify-center hover:bg-green-100"
                sx={(theme) => ({
                  fontWeight: "bold",
                  border: "0.5px solid",
                  borderColor: theme.palette.success.main,
                  borderRadius: "4px",
                })}
                onClick={async () => {
                  const blob = await fetchPrintFile(
                    task.processInstanceId,
                    letter.code
                  );

                  if (blob) {
                    printPDF(blob);
                  }
                }}
              >
                <div className="grid grid-cols-12 justify-between w-full">
                  <p className="font-bold col-span-11">{letter.name}</p>
                  <EdgeSvgIcon className="col-span-1">
                    feather:printer
                  </EdgeSvgIcon>
                </div>
              </Alert>
            ))}
          </div>
        </div>
      </Paper>
    </div>
  );
};

export default ExternalLetterView;
