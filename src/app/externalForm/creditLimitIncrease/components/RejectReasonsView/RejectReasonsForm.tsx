import {
  Checkbox,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
} from "@mui/material";
import { ChangeEvent, FC, memo, useEffect, useState } from "react";
import { useForm } from "react-hook-form";

import dayjs, { Dayjs } from "dayjs";
import { useNavbarState } from "../../../../../@context/NavbarProvider";
import useThemeMediaQuery from "../../../../../@hooks/useThemeMediaQuery";
import { CLIProcessCheckListInfo } from "../../../../core/types/creditlimitIincreaseProcess/CLIProcessCheckListInfo";

type UserFormProps = {
  rejectReasonList: CLIProcessCheckListInfo[];
  setRejectReasonList: (rejectReasonList: CLIProcessCheckListInfo[]) => void;
  editable?: boolean;
};

const UserForm: FC<UserFormProps> = (props) => {
  const { rejectReasonList, setRejectReasonList, editable = true } = props;

  const [reasonFirstHalf, setReasonFirstHalf] = useState<
    CLIProcessCheckListInfo[]
  >([]);
  const [reasonSecondHalf, setReasonSecondHalf] = useState<
    CLIProcessCheckListInfo[]
  >([]);
  const [midIndex, setMidIndex] = useState<number>(0);

  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);

  const { mobileOpen } = useNavbarState();
  const isMobile = useThemeMediaQuery((theme) => theme.breakpoints.down("lg"));

  const methods = useForm();
  const { setValue } = methods;

  function getMonthAndYear(yearMonth: Dayjs | null): {
    month: number | null;
    year: number | null;
  } {
    if (yearMonth) {
      return {
        month: yearMonth.month() + 1,
        year: yearMonth.year(),
      };
    } else {
      return {
        month: null,
        year: null,
      };
    }
  }

  const tableSeperate = () => {
    const midIndex = Math.ceil(rejectReasonList.length / 2);
    setMidIndex(midIndex);
    // Split the list into two halves
    setReasonFirstHalf(rejectReasonList.slice(0, midIndex));
    setReasonSecondHalf(rejectReasonList.slice(midIndex));
  };

  useEffect(() => {
    tableSeperate();
  }, [rejectReasonList]);

  const formatCardNumber = (value: string) => {
    return value
      .replace(/\s+/g, "")
      .replace(/(\d{4})(?=\d)/g, "$1 ")
      .trim();
  };

  const formatCurrency = (value: String) => {
    if (!value) return value;
    let cleanedValue = value.replace(/[^0-9.]/g, "");
    if (cleanedValue.includes(".")) {
      const [integer, decimal] = cleanedValue.split(".");
      cleanedValue = `${integer}.${decimal.slice(0, 2)}`;
    }
    const formattedValue = cleanedValue.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    return `${formattedValue}`;
  };

  const handleSytemCheckboxChange = (
    index: number,
    event: ChangeEvent<HTMLInputElement>
  ) => {
    const newRejectReasonList = [...rejectReasonList];
    newRejectReasonList[index].itemCheckValue = event.target.checked;
    setRejectReasonList(newRejectReasonList);
  };

  const handleSystemTextFieldChange = (
    index: number,
    event: ChangeEvent<HTMLInputElement>
  ) => {
    const newRejectReasonList = [...rejectReasonList];
    newRejectReasonList[index].itemTxtValue = event.target.value;
    setRejectReasonList(newRejectReasonList);
  };

  const updateDuration = (value: Dayjs | null) => {
    if (!value) {
      alert("No date selected");
      return;
    }

    const now = dayjs();
    if (value.isAfter(now)) {
      alert("Selected date is in the future. Please select a valid date.");
      setValue("yearMonth", null);
      setValue("relationshipDuration", "");
      return;
    }
    const diffYears = now.diff(value, "year");
    const diffMonths = now.diff(value, "month") % 12;

    let durationString = "";
    if (diffYears > 0)
      durationString += `${diffYears} year${diffYears > 1 ? "s" : ""} `;
    if (diffMonths > 0)
      durationString += `${diffMonths} month${diffMonths > 1 ? "s" : ""}`;

    setValue(
      "relationshipDuration",
      durationString.trim() || "Less than a month"
    );
  };

  return (
    <Paper>
      <div className="grid grid-cols-1 gap-8 p-12">
        <div className="px-4 pb-10">
          <div className="flex gap-4 ">
            <TableContainer className="max-w-screen-md">
              <Table className="max-w-screen-md">
                <TableHead>
                  <TableRow>
                    <TableCell className="border border-gray-300 bg-grey-200 pt-6 pb-6">
                      Check Criteria
                    </TableCell>
                    <TableCell className="border border-gray-300 bg-grey-200 text-center pt-6 pb-6">
                      Value
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {reasonFirstHalf.map((item, index) => (
                    <TableRow key={index}>
                      <TableCell className="border border-gray-300">
                        {item.itemName}
                      </TableCell>
                      <TableCell className="border border-gray-300 pb-0 pt-0 w-1">
                        {item.itemType === "chk" ? (
                          <Checkbox
                            checked={item.itemCheckValue}
                            disabled={!editable}
                            onChange={(event) =>
                              handleSytemCheckboxChange(index, event)
                            }
                          />
                        ) : item.itemType === "txt" ? (
                          <TextField
                            variant="outlined"
                            size="small"
                            value={item.itemTxtValue}
                            disabled={!editable}
                            onChange={(event) =>
                              handleSystemTextFieldChange(index, event)
                            }
                          />
                        ) : null}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>

            {/* Second half table */}
            <TableContainer className="max-w-screen-md">
              <Table className="max-w-screen-md">
                <TableHead>
                  <TableRow>
                    <TableCell className="border border-gray-300 bg-grey-200 pt-6 pb-6">
                      Check Criteria
                    </TableCell>
                    <TableCell className="border border-gray-300 bg-grey-200 text-center pt-6 pb-6">
                      Value
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {reasonSecondHalf.map((item, index) => (
                    <TableRow key={index}>
                      <TableCell className="border border-gray-300 flex items-center gap-10">
                        {item.itemName}
                        {item.itemType == "txt" && (
                          <TextField
                            variant="outlined"
                            size="small"
                            value={item.itemTxtValue}
                            disabled={!editable}
                            onChange={(event) =>
                              handleSystemTextFieldChange(
                                index + midIndex,
                                event
                              )
                            }
                          />
                        )}
                      </TableCell>
                      <TableCell className="border border-gray-300 pb-0 pt-0 w-1">
                        {item.itemType === "chk" ? (
                          <Checkbox
                            checked={item.itemCheckValue}
                            disabled={!editable}
                            onChange={(event) =>
                              handleSytemCheckboxChange(index + midIndex, event)
                            }
                          />
                        ) : null}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </div>
        </div>
      </div>
    </Paper>
  );
};

export default memo(UserForm);
