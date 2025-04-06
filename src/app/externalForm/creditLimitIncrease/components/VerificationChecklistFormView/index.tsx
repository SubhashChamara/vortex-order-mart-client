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
import { memo, useEffect } from "react";
import { Controller, useForm } from "react-hook-form";

import { CLIProcessCheckListInfo } from "../../../../core/types/creditlimitIincreaseProcess/CLIProcessCheckListInfo";
import { CliInfo } from "../../../../workflow/creditLimitIncrease/types/CliInfo";
import { useNavbarState } from "../../../../../@context/NavbarProvider";
import useThemeMediaQuery from "../../../../../@hooks/useThemeMediaQuery";
import EdgeSvgIcon from "../../../../../@core/ui/EdgeSvgIcon";
import MonthYearPicker from "../../../../workflow/creditLimitIncrease/components/MonthYearPicker/MonthYearPicker";
import dayjs, { Dayjs } from "dayjs";

type VerificationCheckListFormViewProps = {
  cliProcessData: CliInfo | null;
  verifyItems: CLIProcessCheckListInfo[];
  selectionCriteriaList: CLIProcessCheckListInfo[];
};

const VerificationCheckListFormView: React.FC<
  VerificationCheckListFormViewProps
> = (props) => {
  const { cliProcessData, verifyItems, selectionCriteriaList } = props;

  const { mobileOpen } = useNavbarState();
  const isMobile = useThemeMediaQuery((theme) => theme.breakpoints.down("lg"));

  const methods = useForm();
  const { control, setValue, formState } = methods;

  const { errors } = formState;

  function createDayjsFromYearMonth(year: number, month: number): Dayjs | null {
    if (!isNaN(year) && !isNaN(month) && month >= 1 && month <= 12) {
      return dayjs()
        .set("year", year)
        .set("month", month - 1);
    }
    return null;
  }

  useEffect(() => {
    setValue(
      "cribNicNumber",
      cliProcessData?.cribNicNumber ? cliProcessData?.cribNicNumber : ""
    );
    setValue(
      "contactNumber",
      cliProcessData?.contactNumber ? cliProcessData?.contactNumber : ""
    );
    setValue(
      "cribAccountNumber",
      cliProcessData?.cribAccountNumber ? cliProcessData?.cribAccountNumber : ""
    );
    setValue(
      "customer",
      cliProcessData?.customer ? cliProcessData?.customer : ""
    );
    setValue(
      "employment",
      cliProcessData?.employment ? cliProcessData?.employment : ""
    );
    setValue(
      "yearMonth",
      cliProcessData?.cardSinceYear && cliProcessData.cardSinceMonth
        ? createDayjsFromYearMonth(
            cliProcessData.cardSinceYear,
            cliProcessData.cardSinceMonth
          )
        : null
    );
    setValue(
      "relationshipDuration",
      cliProcessData?.relationshipDuration
        ? cliProcessData?.relationshipDuration
        : ""
    );
  }, [cliProcessData]);

  return (
    <>
      <div className="grid grid-cols-1 gap-8">
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
                  disabled
                  size="small"
                  type="text"
                  error={!!errors.cribNicNumber}
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
                  disabled
                  size="small"
                  type="text"
                  error={!!errors.contactNumber}
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
                  disabled
                  size="small"
                  type="text"
                  error={!!errors.cribAccountNumber}
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
            <TableContainer component={Paper} className="max-w-screen">
              <Table className="max-w-screen">
                <TableHead>
                  <TableRow>
                    <TableCell className="border border-gray-300 bg-grey-200 pt-6 pb-6 w-2/3">
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
                      </TableCell>
                      <TableCell className="border border-gray-300 pb-0 pt-0">
                        {item.itemType === "chk" ? (
                          <Checkbox checked={!!item.itemCheckValue} disabled />
                        ) : item.itemType === "txt" ? (
                          <TextField
                            variant="outlined"
                            size="small"
                            value={item.itemTxtValue}
                            disabled
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
            <TableContainer component={Paper} className="max-w-screen">
              <Table className="max-w-screen">
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
                      </TableCell>
                      <TableCell className="border border-gray-300 text-center p-0">
                        {item.itemType === "chk" && (
                          <Radio
                            checked={item.itemCheckValue === true}
                            disabled
                            value="yes"
                            name={`radio-button-yes-${index}`}
                          />
                        )}
                      </TableCell>
                      <TableCell className="border border-gray-300 text-center p-0">
                        {item.itemType === "chk" && (
                          <Radio
                            checked={item.itemCheckValue === false}
                            disabled
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
              name="customer"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  required
                  label="Customer"
                  disabled
                  size="small"
                  type="text"
                  error={!!errors.customer}
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
                  disabled
                  size="small"
                  type="text"
                  error={!!errors.employment}
                />
              )}
            />
            <Controller
              name="yearMonth"
              control={control}
              render={({ field: { value } }) => (
                <MonthYearPicker
                  value={value}
                  label="Card Since"
                  disable
                  onChange={() => {}}
                  error={!!errors.yearMonth}
                />
              )}
            />

            <Controller
              name="relationshipDuration"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  disabled
                  label="Duration"
                  size="small"
                  type="text"
                  error={!!errors.relationshipDuration}
                />
              )}
            />
          </div>
        </div>
      </div>
      <div className="flex justify-left my-6"></div>
    </>
  );
};

export default memo(VerificationCheckListFormView);
