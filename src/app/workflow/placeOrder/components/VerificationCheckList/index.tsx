import {
  Checkbox,
  Paper,
  Radio,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
} from "@mui/material";
import { ChangeEvent, FC, memo, useState } from "react";
import { Controller, useFormContext } from "react-hook-form";

import { useNavbarState } from "../../../../../@context/NavbarProvider";
import EdgeSvgIcon from "../../../../../@core/ui/EdgeSvgIcon";
import useThemeMediaQuery from "../../../../../@hooks/useThemeMediaQuery";
import { TaskDetailInfo } from "../../../../core/types/TaskDetailInfo";
import { CLIProcessCheckListInfo } from "../../../../core/types/creditlimitIincreaseProcess/CLIProcessCheckListInfo";
import MonthYearPicker from "../MonthYearPicker/MonthYearPicker";
import dayjs, { Dayjs } from "dayjs";
import { CliInfo } from "../../types/CliInfo";
import { formatInput } from "../../../../core/util/validationUtils";

type VerificationCheckListFormViewProps = {
  task: TaskDetailInfo;
  cliProcessData: CliInfo | null;
  verifyItems: CLIProcessCheckListInfo[];
  setVerifyItems: (verifyItems: CLIProcessCheckListInfo[]) => void;
  selectionCriteriaList: CLIProcessCheckListInfo[];
  setSelectionCriteriaList: (verifyItems: CLIProcessCheckListInfo[]) => void;
  editable?: boolean;
};

const VerificationCheckListFormView: FC<VerificationCheckListFormViewProps> = (
  props
) => {
  const {
    task,
    cliProcessData,
    verifyItems,
    setVerifyItems,
    selectionCriteriaList,
    setSelectionCriteriaList,
    editable,
  } = props;

  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);

  const { mobileOpen } = useNavbarState();
  const isMobile = useThemeMediaQuery((theme) => theme.breakpoints.down("lg"));

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

  // function getMonthAndYear(yearMonth: Dayjs | null): {
  //   month: number | null;
  //   year: number | null;
  // } {
  //   if (yearMonth) {
  //     return {
  //       month: yearMonth.month() + 1,
  //       year: yearMonth.year(),
  //     };
  //   } else {
  //     return {
  //       month: null,
  //       year: null,
  //     };
  //   }
  // }

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
    event: ChangeEvent<HTMLInputElement>
  ) => {
    const newVerifyItems = [...verifyItems];
    newVerifyItems[index].itemCheckValue = event.target.checked;
    setVerifyItems(newVerifyItems);
  };

  // const handleSystemTextFieldChange = (
  //   index: number,
  //   event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  // ) => {
  //   const newVerifyItems = [...verifyItems];
  //   newVerifyItems[index].itemTxtValue = event.target.value;
  //   setVerifyItems(newVerifyItems);
  // };
  const handleSystemTextFieldChange = (
    index: number,
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const newValue = formatInput(
      event.target.value,
      verifyItems[index].validationType
    );
    // Perform state update here with the validated newValue
    // Example:
    const updatedItems = [...verifyItems];
    updatedItems[index].itemTxtValue = newValue;
    setVerifyItems(updatedItems);
  };

  const handleSelectionChange = (index: number, value: boolean) => {
    const updatedList = [...selectionCriteriaList];
    updatedList[index].itemCheckValue = value;
    setSelectionCriteriaList(updatedList);
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
    <>
      <div className="grid grid-cols-1 gap-8">
        <Paper className="px-12 pb-10">
          <div className="px-4 pb-10">
            <div className="text-center mb-16 border-b-1 border-b-gray-400 py-6">
              <h1 className="text-xsm font-600 text-left flex text-blue-gray-800">
                <div>
                  <EdgeSvgIcon
                    className="icon-size-14 cursor-pointer mr-3"
                    color="error"
                  >
                    feather:hard-drive
                  </EdgeSvgIcon>
                </div>
                <div>Crib Deatails</div>
              </h1>
            </div>
            <div
              className={`grid grid-cols-1 gap-9 ${
                mobileOpen && isMobile
                  ? "sm:grid-cols-1 md:grid-cols-3"
                  : "sm:grid-cols-3 md:grid-cols-1"
              } lg:grid-cols-3`}
            >
              <Controller
                name="cribNicNumber"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="NIC No"
                    disabled={!editable}
                    size="small"
                    type="text"
                    error={!!errors.cribNicNumber}
                    helperText={errors?.cribNicNumber?.message}
                  />
                )}
              />

              <Controller
                name="contactNumber"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Contact Number"
                    disabled={!editable}
                    size="small"
                    type="text"
                    error={!!errors.contactNumber}
                    helperText={errors?.contactNumber?.message}
                  />
                )}
              />
              <Controller
                name="cribAccountNumber"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Account Number"
                    disabled={!editable}
                    size="small"
                    type="text"
                    error={!!errors.cribAccountNumber}
                    helperText={errors?.cribAccountNumber?.message}
                  />
                )}
              />
            </div>
          </div>

          <div className="px-4 pb-10">
            <div className="text-center mb-16 border-b-1 border-b-gray-400 py-6">
              <h1 className="text-xsm font-600 text-left flex text-blue-gray-800">
                <div>
                  <EdgeSvgIcon
                    className="icon-size-14 cursor-pointer mr-3"
                    color="error"
                  >
                    feather:check-circle
                  </EdgeSvgIcon>
                </div>
                <div>System Checks</div>
              </h1>
            </div>
            <div>
              <TableContainer component={Paper} className="max-w-screen-md ">
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
                    {verifyItems.map((item, index) => (
                      <TableRow key={index}>
                        <TableCell className="border border-gray-300">
                          {item.itemName}
                          {(item.itemType === "txt" ||
                            item.itemType === "chk") && (
                            <span className=" ml-2 text-red">*</span>
                          )}
                        </TableCell>
                        <TableCell className="border border-gray-300 pb-0 pt-0">
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
            </div>
          </div>

          <div className="px-4 pb-10">
            <div className="text-center mb-16 border-b-1 border-b-gray-400 py-6">
              <h1 className="text-xsm font-600 text-left flex text-blue-gray-800">
                <div>
                  <EdgeSvgIcon
                    className="icon-size-14 cursor-pointer mr-3"
                    color="error"
                  >
                    feather:check-circle
                  </EdgeSvgIcon>
                </div>
                <div>Selection Criteria</div>
              </h1>
            </div>
            <div>
              <TableContainer component={Paper} className="max-w-screen-md">
                <Table className="max-w-screen-md">
                  <TableHead>
                    <TableRow>
                      <TableCell className="border border-gray-300 bg-grey-200 pt-6 pb-6">
                        Selection Criteria
                      </TableCell>
                      <TableCell className="border border-gray-300 text-center bg-grey-200 pt-6 pb-6">
                        YES
                      </TableCell>
                      <TableCell className="border border-gray-300 text-center bg-grey-200 pt-6 pb-6">
                        NO
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {selectionCriteriaList.map((item, index) => (
                      <TableRow key={index}>
                        <TableCell className="border border-gray-300">
                          {item.itemName}
                          {item.itemType === "chk" && (
                            <span className=" ml-2 text-red">*</span>
                          )}
                        </TableCell>
                        <TableCell className="border border-gray-300 text-center p-0">
                          {item.itemType === "chk" && (
                            <Radio
                              checked={item.itemCheckValue === true}
                              disabled={!editable}
                              onChange={() =>
                                handleSelectionChange(index, true)
                              }
                              value="yes"
                              name={`radio-button-yes-${index}`}
                            />
                          )}
                        </TableCell>
                        <TableCell className="border border-gray-300 text-center p-0">
                          {item.itemType === "chk" && (
                            <Radio
                              checked={item.itemCheckValue === false}
                              disabled={!editable}
                              onChange={() =>
                                handleSelectionChange(index, false)
                              }
                              value="no"
                              name={`radio-button-no-${index}`}
                            />
                          )}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </div>
          </div>

          <div className="px-4 pb-10">
            <div className="text-center mb-16 border-b-1 border-b-gray-400 py-6">
              <h1 className="text-xsm font-600 text-left flex text-blue-gray-800">
                <div>
                  <EdgeSvgIcon
                    className="icon-size-14 cursor-pointer mr-3"
                    color="error"
                  >
                    feather:check
                  </EdgeSvgIcon>
                </div>
                <div>Verification</div>
              </h1>
            </div>
            <div
              className={`grid grid-cols-1 gap-9 ${
                mobileOpen && isMobile
                  ? "sm:grid-cols-1 md:grid-cols-4"
                  : "sm:grid-cols-4 md:grid-cols-1"
              } lg:grid-cols-4`}
            >
              <Controller
                name="yearMonth"
                control={control}
                render={({ field: { onChange, value } }) => (
                  <MonthYearPicker
                    value={value}
                    label="Card Since"
                    disable={!editable}
                    onChange={(newValue) => {
                      onChange(newValue);
                      updateDuration(newValue);
                    }}
                    error={!!errors.yearMonth}
                    helperText={errors?.yearMonth?.message}
                  />
                )}
              />

              <Controller
                name="relationshipDuration"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    disabled={true}
                    label="Duration"
                    size="small"
                    type="text"
                    error={!!errors.relationshipDuration}
                    helperText={errors?.relationshipDuration?.message}
                  />
                )}
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-9 col-span-4 pt-9">
              <Controller
                name="customer"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    required
                    label="Customer"
                    disabled={!editable}
                    size="small"
                    multiline
                    rows={4}
                    inputProps={{ maxLength: 500 }}
                    error={!!errors.customer}
                    helperText={<>{errors?.customer?.message}</>}
                  />
                )}
              />

              <Controller
                name="employment"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Employment"
                    disabled={!editable}
                    size="small"
                    multiline
                    rows={4}
                    error={!!errors.employment}
                    helperText={<>{errors?.employment?.message}</>}
                  />
                )}
              />
            </div>
          </div>
        </Paper>
      </div>
      <div className="flex justify-left my-6"></div>
    </>
  );
};

export default memo(VerificationCheckListFormView);
