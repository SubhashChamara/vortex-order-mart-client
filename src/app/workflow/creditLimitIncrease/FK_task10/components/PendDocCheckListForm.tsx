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
import { useFormContext } from "react-hook-form";

import dayjs, { Dayjs } from "dayjs";
import { useNavbarState } from "../../../../../@context/NavbarProvider";
import useThemeMediaQuery from "../../../../../@hooks/useThemeMediaQuery";
import { TaskDetailInfo } from "../../../../core/types/TaskDetailInfo";
import { CLIProcessCheckListInfo } from "../../../../core/types/creditlimitIincreaseProcess/CLIProcessCheckListInfo";
import { CliInfo } from "../../types/CliInfo";

type UserFormProps = {
  task: TaskDetailInfo;
  cliProcessData: CliInfo | null;
  pendReasonList: CLIProcessCheckListInfo[];
  setPendReasonList: (pendReasonList: CLIProcessCheckListInfo[]) => void;
  editable: boolean;
};

const UserForm: FC<UserFormProps> = (props) => {
  const { task, cliProcessData, pendReasonList, setPendReasonList, editable } =
    props;

  console.log("pendReason", pendReasonList);
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
  let isMobileScreenSize = window.matchMedia(
    "only screen and (max-width: 600px)"
  ).matches;

  const methods = useFormContext();
  const {
    control,
    handleSubmit,
    formState,
    setError,
    setValue,
    watch,
    getValues,
  } = methods;

  const { errors } = formState;

  // console.log(errors);
  // console.log(watch());

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
    const midIndex = Math.ceil(pendReasonList.length / 2);
    setMidIndex(midIndex);
    // Split the list into two halves
    setReasonFirstHalf(pendReasonList.slice(0, midIndex));
    setReasonSecondHalf(pendReasonList.slice(midIndex));
  };

  useEffect(() => {
    tableSeperate();
  }, [pendReasonList]);

  // const formatCardNumber = (value: string) => {
  //   return value
  //     .replace(/\s+/g, "")
  //     .replace(/(\d{4})(?=\d)/g, "$1 ")
  //     .trim();
  // };

  // const formatCurrency = (value: String) => {
  //   if (!value) return value;
  //   let cleanedValue = value.replace(/[^0-9.]/g, "");
  //   if (cleanedValue.includes(".")) {
  //     const [integer, decimal] = cleanedValue.split(".");
  //     cleanedValue = `${integer}.${decimal.slice(0, 2)}`;
  //   }
  //   const formattedValue = cleanedValue.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  //   return `${formattedValue}`;
  // };

  const handleSytemCheckboxChange = (
    index: number,
    event: ChangeEvent<HTMLInputElement>,
    column: number
  ) => {
    const newpendReasonList = [...pendReasonList];
    if (column == 1)
      newpendReasonList[index].itemCheckValue = event.target.checked;
    if (column == 2)
      newpendReasonList[index].itemReCheckValue = event.target.checked;
    setPendReasonList(newpendReasonList);
  };

  const handleSystemTextFieldChange = (
    index: number,
    event: ChangeEvent<HTMLInputElement>,
    column: number
  ) => {
    const newpendReasonList = [...pendReasonList];
    if (column == 1) newpendReasonList[index].itemTxtValue = event.target.value;
    if (column == 2)
      newpendReasonList[index].itemReTxtValue = event.target.value;
    setPendReasonList(newpendReasonList);
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

  // console.log(errors);

  return (
    <div className="grid grid-cols-1 gap-8">
      <div className="px-4 pb-10">
        <div className="gap-4 grid grid-cols-1 sm:grid-cols-2">
          <TableContainer component={Paper} className="max-w-screen-md">
            <Table className="max-w-screen-md">
              <TableHead>
                <TableRow>
                  <TableCell className="border border-gray-300 bg-grey-200 pt-6 pb-6 w-4/6">
                    Check Criteria
                  </TableCell>
                  <TableCell className="border border-gray-300 bg-grey-200 text-center pt-6 pb-6 w-1/6">
                    Value
                  </TableCell>
                  <TableCell className="border border-gray-300 bg-grey-200 text-center pt-6 pb-6 w-1/6">
                    New Status
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {(isMobileScreenSize ? pendReasonList : reasonFirstHalf).map(
                  (item, index) => (
                    <TableRow key={index}>
                      <TableCell className="border border-gray-300">
                        {item.itemName}
                      </TableCell>
                      <TableCell className="border border-gray-300 pb-0 pt-0 w-1 text-center">
                        {item.itemType === "chk" ? (
                          <Checkbox
                            checked={item.itemCheckValue}
                            disabled={!editable}
                            onChange={(event) =>
                              handleSytemCheckboxChange(index, event, 1)
                            }
                          />
                        ) : item.itemType === "txt" ? (
                          <TextField
                            variant="outlined"
                            size="small"
                            value={item.itemTxtValue}
                            disabled={!editable}
                            onChange={(event) =>
                              handleSystemTextFieldChange(index, event, 1)
                            }
                          />
                        ) : null}
                      </TableCell>
                      <TableCell className="border border-gray-300 pb-0 pt-0 w-1 text-center">
                        {item.itemType === "chk" ? (
                          <Checkbox
                            checked={item.itemReCheckValue}
                            onChange={(event) =>
                              handleSytemCheckboxChange(index, event, 2)
                            }
                          />
                        ) : item.itemType === "txt" ? (
                          <TextField
                            variant="outlined"
                            size="small"
                            value={item.itemReTxtValue}
                            onChange={(event) =>
                              handleSystemTextFieldChange(index, event, 2)
                            }
                          />
                        ) : null}
                      </TableCell>
                    </TableRow>
                  )
                )}
              </TableBody>
            </Table>
          </TableContainer>

          {/* Second half table */}
          <TableContainer
            component={Paper}
            className="max-w-screen-md hidden sm:block"
          >
            <Table className="max-w-screen-md">
              <TableHead>
                <TableRow>
                  <TableCell className="border border-gray-300 bg-grey-200 pt-6 pb-6">
                    Check Criteria
                  </TableCell>
                  <TableCell className="border border-gray-300 bg-grey-200 text-center pt-6 pb-6">
                    Value
                  </TableCell>
                  <TableCell className="border border-gray-300 bg-grey-200 text-center pt-6 pb-6">
                    New Status
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {reasonSecondHalf.map((item, index) => (
                  <TableRow key={index}>
                    <TableCell className="border border-gray-300">
                      {item.itemName}
                    </TableCell>
                    <TableCell className="border border-gray-300 pb-0 pt-0 w-auto ">
                      {item.itemType === "chk" ? (
                        <Checkbox
                          checked={item.itemCheckValue}
                          disabled={!editable}
                          onChange={(event) =>
                            handleSytemCheckboxChange(
                              index + midIndex,
                              event,
                              1
                            )
                          }
                        />
                      ) : item.itemType === "txt" ? (
                        <TextField
                          variant="outlined"
                          size="small"
                          value={item.itemTxtValue}
                          disabled={!editable}
                          onChange={(event) =>
                            handleSystemTextFieldChange(
                              index + midIndex,
                              event,
                              1
                            )
                          }
                        />
                      ) : null}
                    </TableCell>
                    <TableCell
                      className={`border border-gray-300 pb-0 pt-0 w-auto`}
                    >
                      {item.itemType === "chk" ? (
                        <Checkbox
                          checked={item.itemReCheckValue}
                          onChange={(event) =>
                            handleSytemCheckboxChange(
                              index + midIndex,
                              event,
                              2
                            )
                          }
                        />
                      ) : item.itemType === "txt" ? (
                        <TextField
                          variant="outlined"
                          size="small"
                          value={item.itemReTxtValue}
                          onChange={(event) =>
                            handleSystemTextFieldChange(
                              index + midIndex,
                              event,
                              2
                            )
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
  );
};

export default memo(UserForm);
