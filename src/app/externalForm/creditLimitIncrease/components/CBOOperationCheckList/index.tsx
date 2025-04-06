import {
  Checkbox,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { ChangeEvent, FC, memo, useState } from "react";
import { useForm } from "react-hook-form";

import dayjs, { Dayjs } from "dayjs";
import useThemeMediaQuery from "../../../../../@hooks/useThemeMediaQuery";
import { CLIProcessCheckListInfo } from "../../../../core/types/creditlimitIincreaseProcess/CLIProcessCheckListInfo";

type UserFormProps = {
  operationFirstCheckList: CLIProcessCheckListInfo[];
  operationSecondCheckList: CLIProcessCheckListInfo[];
  setOperationFirstCheckList: (
    operationFirstCheckList: CLIProcessCheckListInfo[]
  ) => void;
  setOperationSecondCheckList: (
    operationSecondCheckList: CLIProcessCheckListInfo[]
  ) => void;
  editable: boolean;
};

const UserForm: FC<UserFormProps> = (props) => {
  const {
    operationFirstCheckList,
    operationSecondCheckList,
    setOperationFirstCheckList,
    setOperationSecondCheckList,
    editable,
  } = props;

  const [midIndex, setMidIndex] = useState<number>(0);

  const isMobile = useThemeMediaQuery((theme) => theme.breakpoints.down("sm"));

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

  const handleFirstList = (
    index: number,
    event: ChangeEvent<HTMLInputElement>
  ) => {
    const newOperationList = [...operationFirstCheckList];
    newOperationList[index].itemCheckValue = event.target.checked;
    setOperationFirstCheckList(newOperationList);
  };

  const handleSecondList = (
    index: number,
    event: ChangeEvent<HTMLInputElement>
  ) => {
    const newOperationList = [...operationSecondCheckList];
    newOperationList[index].itemCheckValue = event.target.checked;
    setOperationSecondCheckList(newOperationList);
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
    <div className="grid grid-cols-1 gap-8">
      <div className="px-4 pb-10">
        <Paper>
          <div className="flex gap-4 px-12 pt-16 pb-16">
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
                  {operationFirstCheckList.map((item, index) => (
                    <TableRow key={index}>
                      <TableCell className="border border-gray-300">
                        {item.itemName}
                      </TableCell>
                      <TableCell className="border border-gray-300 pb-0 pt-0 w-1">
                        {item.itemType === "chk" && (
                          <Checkbox
                            checked={item.itemCheckValue}
                            disabled={!editable}
                            onChange={(event) => handleFirstList(index, event)}
                          />
                        )}
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
                  {operationSecondCheckList.map((item, index) => (
                    <TableRow key={index}>
                      <TableCell className="border border-gray-300">
                        {item.itemName}
                      </TableCell>
                      <TableCell className="border border-gray-300 pb-0 pt-0 w-1">
                        {item.itemType === "chk" && (
                          <Checkbox
                            checked={item.itemCheckValue}
                            disabled={!editable}
                            onChange={(event) =>
                              handleSecondList(index + midIndex, event)
                            }
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
      </div>
    </div>
  );
};

export default memo(UserForm);
