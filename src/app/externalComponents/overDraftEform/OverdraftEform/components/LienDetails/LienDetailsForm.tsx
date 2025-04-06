import {
  Autocomplete,
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
} from "@mui/material";
import React, { useEffect } from "react";
import Ve3FormHeader from "../../../../../../@core/ui/Ve3FormHeader/Ve3FormHeader";
import { Controller, useFormContext } from "react-hook-form";
import { LocalizationProvider, DatePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import { DropDownItem } from "../../../../../core/types/DropDown";
import { odCollateralInfo } from "../../@types/odCollateralInfo";
import { formatCurrency } from "../../../../../workflow/bundle/@helpers/Common";
import EdgeSvgIcon from "../../../../../../@core/ui/EdgeSvgIcon";

interface LienDetailsFormProps {
  currencyDropdowns: DropDownItem[];
  collateralTableData: odCollateralInfo[];
}

const LienDetailsForm: React.FC<LienDetailsFormProps> = ({
  currencyDropdowns,
  collateralTableData,
}) => {
  const { control, setValue, formState } = useFormContext();
  const { errors } = formState;

  useEffect(() => setValue("currentStep", 3), []);

  return (
    <div className="flex flex-col gap-14">
      <Paper className="px-12 pb-10 h-full">
        <Ve3FormHeader
          icon="heroicons-outline:document-currency-dollar"
          title="Lien Details"
        />
        <div className="flex flex-col gap-14">
          <div className="pb-14 border-b border-b-gray-300">
            <div className="flex flex-row gap-14">
              {/* Email phone Controller */}
              <Controller
                name="lienAccountNumber"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    required
                    label="Lien Account Number"
                    size="small"
                    type="text"
                    helperText={<>{errors.lienAccountNumber?.message}</>}
                    error={!!errors.lienAccountNumber}
                    inputProps={{
                      maxLength: 11, // Limit to 11 characters
                      inputMode: "numeric", // Suggests a numeric keyboard on mobile devices
                      pattern: "[0-9]*", // Only allows numeric input
                    }}
                    onInput={(e) => {
                      // Ensure only numbers are entered
                      const input = e.target as HTMLInputElement; // Type assertion
                      input.value = input.value.replace(/[^0-9]/g, "");
                    }}
                  />
                )}
              />

              <Controller
                name="lienAccountCurrency"
                control={control}
                render={({ field: { onChange, value } }) => (
                  <Autocomplete
                    options={currencyDropdowns}
                    className=""
                    getOptionLabel={(option) => (option ? option.name : "")}
                    isOptionEqualToValue={(option, val) => option.id === val.id}
                    value={value}
                    onChange={(event, newValue) => {
                      onChange(newValue);
                    }}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        required
                        label="Currency"
                        variant="outlined"
                        // required
                        size="small"
                        helperText={<>{errors.lienAccountCurrency?.message}</>}
                        error={!!errors.lienAccountCurrency}
                      />
                    )}
                  />
                )}
              />

              {/* arm code Controller */}
              <Controller
                name="lienAccountName"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    // disabled={!editable}
                    label="Name"
                    size="small"
                    type="text"
                    helperText={<>{errors.lienAccountName?.message}</>}
                    error={!!errors.lienAccountName}
                    // className="pr-10"
                    // required
                  />
                )}
              />

              {/* segment code Controller */}
              <Controller
                name="lienAccountInterest"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    // disabled={!editable}
                    label="Interest %"
                    size="small"
                    type="text"
                    inputProps={{
                      pattern: "^[0-9]*.?[0-9]{0,2}$", // Allows numbers followed by an optional decimal point with up to 2 decimal places
                    }}
                    onInput={(e) => {
                      // Ensure only numbers and a decimal point with at most two decimals are entered
                      const input = e.target as HTMLInputElement;
                      input.value = input.value
                        .replace(/[^0-9.]/g, "")
                        .replace(/^(\d*\.\d{2})\d+$/, "$1");
                    }}
                    helperText={<>{errors.lienAccountInterest?.message}</>}
                    error={!!errors.lienAccountInterest}
                    // className="pr-10"
                    // required
                  />
                )}
              />
            </div>
          </div>

          <div className="pb-14 ">
            <div className="flex flex-row gap-14">
              <Controller
                name="lienAccountMatureDate"
                control={control}
                render={({ field: { onChange, value } }) => (
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker
                      minDate={dayjs()}
                      views={["day", "month", "year"]}
                      format="DD-MM-YYYY"
                      value={value ? dayjs(value) : null}
                      label="Maturity Date"
                      onChange={(newValue) => {
                        const dateOnly = newValue
                          ? dayjs(newValue).endOf("day").toDate()
                          : null;
                        onChange(dateOnly);
                      }}
                      slotProps={{
                        textField: {
                          size: "small",
                          error: !!errors.lienAccountMatureDate,
                          helperText: (
                            <>{errors?.lienAccountMatureDate?.message || ""}</>
                          ),
                        },
                      }}
                    />
                  </LocalizationProvider>
                )}
              />

              {/* arm code Controller */}
              <Controller
                name="lienAccountBalance"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    // disabled={!editable}
                    label="Current Balance"
                    size="small"
                    type="text"
                    onChange={(e) =>
                      field.onChange(formatCurrency(e.target.value))
                    }
                    InputProps={{
                      inputProps: { style: { textAlign: "right" } },
                    }}
                    helperText={<>{errors.lienAccountBalance?.message}</>}
                    error={!!errors.lienAccountBalance}
                    // className="pr-10"
                    // required
                  />
                )}
              />

              {/* arm code Controller */}
              <Controller
                name="lienAccountAmount"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    // disabled={!editable}
                    required
                    label="Lien Amount"
                    size="small"
                    type="text"
                    onChange={(e) =>
                      field.onChange(formatCurrency(e.target.value))
                    }
                    InputProps={{
                      inputProps: { style: { textAlign: "right" } },
                    }}
                    helperText={<>{errors.lienAccountAmount?.message}</>}
                    error={!!errors.lienAccountAmount}
                    // className="pr-10"
                    // required
                  />
                )}
              />

              {/* arm code Controller */}
              <Controller
                name="lienAccountApplicableLtv"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    required
                    label="Applicable LTV %"
                    size="small"
                    type="text"
                    inputProps={{
                      pattern: "^[0-9]*.?[0-9]{0,2}$", // Allows numbers followed by an optional decimal point with up to 2 decimal places
                    }}
                    onInput={(e) => {
                      const input = e.target as HTMLInputElement;
                      input.value = input.value
                        .replace(/[^0-9.]/g, "")
                        .replace(/^(\d*\.\d{2})\d+$/, "$1");
                    }}
                    helperText={<>{errors.lienAccountApplicableLtv?.message}</>}
                    error={!!errors.lienAccountApplicableLtv}
                  />
                )}
              />
            </div>
          </div>
        </div>
        <div className="flex justify-end items-end">
          <Button type="submit" className="flex flex-row gap-3">
            <EdgeSvgIcon>feather:save</EdgeSvgIcon> Save Collateral
          </Button>
        </div>
      </Paper>

      <Paper className="px-12 pb-10 h-full">
        <Ve3FormHeader
          icon="heroicons-outline:document-currency-dollar"
          title="Lien and Collateral Details Overview"
        />
        <div className="flex flex-col gap-14">
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell className="border border-gray-300 bg-grey-200 text-center pt-6 pb-6">
                    #
                  </TableCell>
                  <TableCell className="border border-gray-300 bg-grey-200 text-center pt-6 pb-6">
                    Lien Account Number
                  </TableCell>
                  <TableCell className="border border-gray-300 bg-grey-200 text-center pt-6 pb-6">
                    Currency
                  </TableCell>
                  <TableCell className="border border-gray-300 bg-grey-200 text-center pt-6 pb-6">
                    Name
                  </TableCell>
                  <TableCell className="border border-gray-300 bg-grey-200 text-center pt-6 pb-6">
                    Interest %
                  </TableCell>
                  <TableCell className="border border-gray-300 bg-grey-200 text-center pt-6 pb-6">
                    Maturity Date
                  </TableCell>
                  <TableCell className="border border-gray-300 bg-grey-200 text-center pt-6 pb-6">
                    Current Balance
                  </TableCell>
                  <TableCell className="border border-gray-300 bg-grey-200 text-center pt-6 pb-6">
                    Lien Amount
                  </TableCell>
                  <TableCell className="border border-gray-300 bg-grey-200 text-center pt-6 pb-6">
                    Applicable LTV
                  </TableCell>
                  <TableCell className="border border-gray-300 bg-grey-200 text-center pt-6 pb-6">
                    A.A to be kept as collateral
                  </TableCell>
                  {/* <TableCell className="border border-gray-300 bg-grey-200 text-center pt-6 pb-6">
                    Total applicable limit
                  </TableCell> */}
                </TableRow>
              </TableHead>
              <TableBody>
                {collateralTableData &&
                  collateralTableData.map((item, index) => (
                    <TableRow key={index}>
                      <TableCell align="center">{item.id || ""}</TableCell>
                      <TableCell align="right">
                        {item.accountNo || ""}
                      </TableCell>
                      <TableCell align="right">
                        {(item.currencyId &&
                          currencyDropdowns.find(
                            (currency) => currency.id === item.currencyId
                          )?.name) ||
                          ""}
                      </TableCell>
                      <TableCell align="center">{item.name || ""}</TableCell>
                      <TableCell align="right">{item.interest || ""}</TableCell>
                      <TableCell align="center">
                        {dayjs(item.maturityDate).format("DD-MM-YYYY") || ""}
                      </TableCell>
                      <TableCell align="right">
                        {item.currentBalance
                          ? formatCurrency(
                              item.currentBalance.toFixed(2).toString()
                            )
                          : ""}
                      </TableCell>
                      <TableCell align="right">
                        {formatCurrency(
                          item.lienAmount.toFixed(2).toString()
                        ) || ""}
                      </TableCell>
                      <TableCell align="right">{item.applicableLTV}</TableCell>
                      <TableCell align="right">
                        {formatCurrency(
                          item.colApplicableAmount.toFixed(2).toString()
                        ) || ""}
                      </TableCell>
                      {/* <TableCell></TableCell> */}
                    </TableRow>
                  ))}
                <TableRow>
                  <TableCell colSpan={2} className="font-semibold">
                    Total applicable limit
                  </TableCell>
                  <TableCell colSpan={8} />
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
          <div className="flex flex-col gap-3">
            <p className="text-[12px]">
              * loan to value as per credit approvals document.
            </p>
            <p className="text-[12px]">
              ** this amount will be kept as security until the facility is
              fully settled.
            </p>
            <p className="text-[12px]">
              {`Borrower has the option to provide written instructions to the bank to convert the Lien over deposit accounts....... 
              in any {LKR, USD, GBP, AUD, EUR, JPY, CHF, SGD, CAD, NZD and HKD} currency equivalent to the lien amount (in LKR) 
              undertaken together with a General Letter of Set Off and Letter of Guarantee (if applicable) 
              in Bank's prescribed form duly signed`}
            </p>
          </div>
        </div>
      </Paper>
    </div>
  );
};

export default LienDetailsForm;
