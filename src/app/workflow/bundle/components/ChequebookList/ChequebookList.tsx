import {
  Paper,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  TextField,
  Autocomplete,
  Button,
} from "@mui/material";
import React from "react";
import { Controller, useFormContext } from "react-hook-form";
import Ve3FormHeader from "../../../../../@core/ui/Ve3FormHeader/Ve3FormHeader";
import EdgeSvgIcon from "../../../../../@core/ui/EdgeSvgIcon";
import { DropDownItem } from "../../../../core/types/DropDown";
import { ChequeBookInfo } from "../../@types/ChequeBookInfo";

interface ChequebookListProps {
  editable: boolean;
  bookTypeDropdowns: DropDownItem[];
  chequeBookData?: ChequeBookInfo[] | null;
  handleChequebookDelete: (id: number) => void; // Add this prop to the interface
}

const ChequebookList: React.FC<ChequebookListProps> = ({
  editable,
  bookTypeDropdowns,
  chequeBookData,
  handleChequebookDelete,
}) => {
  const methods = useFormContext();
  const { control } = methods;

  return (
    <Paper className="px-12 pb-10 w-full flex flex-col">
      <Ve3FormHeader
        icon="heroicons-outline:book-open"
        title="Cheque Book List"
      />
      <TableContainer component={Paper} className="max-w-screen">
        <Table className="max-w-screen">
          <TableHead>
            <TableRow>
              <TableCell
                className="border border-gray-300 bg-grey-200 font-bold"
                sx={{ width: "20%" }}
              >
                Customer Name
              </TableCell>
              <TableCell
                className="border border-gray-300 bg-grey-200 font-bold"
                sx={{ width: "15%" }}
              >
                Account Number
              </TableCell>
              <TableCell className="border border-gray-300 bg-grey-200 font-bold">
                Address
              </TableCell>
              <TableCell
                className="border border-gray-300 bg-grey-200 font-bold"
                sx={{ width: "10%" }}
              >
                Number of Cheque Leaves 25/50
              </TableCell>
              <TableCell
                className="border border-gray-300 bg-grey-200 font-bold"
                sx={{ width: "10%" }}
              >
                Number of Books
              </TableCell>
              <TableCell
                className="border border-gray-300 bg-grey-200 font-bold"
                sx={{ width: "10%" }}
              >
                Book Type
              </TableCell>
              {editable && (
                <TableCell
                  className="border border-gray-300 bg-grey-200 font-bold"
                  sx={{ width: "5%" }}
                >
                  Add / Delete
                </TableCell>
              )}
            </TableRow>
          </TableHead>
          <TableBody>
            {editable && (
              <TableRow>
                <TableCell>
                  {/* Applicant First Name Controller */}
                  <Controller
                    name="chequeApplicantName"
                    control={control}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        required
                        disabled={!editable}
                        label="Customer Name"
                        size="small"
                        type="text"

                        // required
                      />
                    )}
                  />
                </TableCell>
                <TableCell>
                  <Controller
                    name="chequeBookAccountNumber"
                    control={control}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        disabled={!editable}
                        required
                        label="A/C Number"
                        size="small"
                        type="number"
                        className="pr-10"
                        inputProps={{
                          inputMode: "numeric", // Ensures numeric keyboard on mobile devices
                        }}
                        onInput={(e) => {
                          const input = e.target as HTMLInputElement; // Cast to HTMLInputElement
                          if (input.value.length > 9) {
                            input.value = input.value.slice(0, 9); // Truncate input to 9 characters
                          }
                        }}
                        sx={{
                          "& input::-webkit-outer-spin-button, & input::-webkit-inner-spin-button":
                            {
                              display: "none",
                            },
                          "& input[type=number]": {
                            MozAppearance: "textfield",
                          },
                        }}
                      />
                    )}
                  />
                </TableCell>
                <TableCell>
                  {/* Address Controller */}
                  <Controller
                    name="residentialAddress"
                    control={control}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        required
                        disabled={!editable}
                        label="Residential Address"
                        size="small"
                        type="text"
                        onInput={(e) => {
                          const input = e.target as HTMLInputElement; // Cast to HTMLInputElement
                          if (input.value.length > 100) {
                            input.value = input.value.slice(0, 100); // Truncate input to 9 characters
                          }
                        }}
                      />
                    )}
                  />
                </TableCell>
                <TableCell>
                  {/* Num of leaves Controller */}
                  <Controller
                    name="numberOfLeaves"
                    control={control}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        disabled={!editable}
                        required
                        label="Number of Leaves"
                        size="small"
                        type="text"
                        inputProps={{
                          inputMode: "numeric",
                          pattern: "[0-9]*",
                          style: { textAlign: "right" },
                        }}
                        onChange={(e) => {
                          const value = e.target.value.replace(/\D/g, "");
                          field.onChange(value);
                        }}
                      />
                    )}
                  />
                </TableCell>
                <TableCell>
                  {/* Num of leaves Controller */}
                  <Controller
                    name="numberOfBooks"
                    control={control}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        disabled={!editable}
                        required
                        label="Number of Books"
                        size="small"
                        type="text"
                        inputProps={{
                          inputMode: "numeric",
                          pattern: "[0-9]*",
                          style: { textAlign: "right" },
                        }}
                        onChange={(e) => {
                          const value = e.target.value.replace(/\D/g, "");
                          field.onChange(value);
                        }}
                      />
                    )}
                  />
                </TableCell>
                <TableCell>
                  {/* Book Type Controller */}
                  <Controller
                    name="chequeBookType"
                    control={control}
                    render={({ field: { onChange, value } }) => (
                      <Autocomplete
                        options={bookTypeDropdowns}
                        disabled={!editable}
                        getOptionLabel={(option) => (option ? option.name : "")}
                        isOptionEqualToValue={(option, val) =>
                          option.id === val.id
                        }
                        value={value}
                        onChange={(event, newValue) => {
                          onChange(newValue);
                        }}
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            required
                            label="Book Type"
                            variant="outlined"
                            // required
                            size="small"
                          />
                        )}
                      />
                    )}
                  />
                </TableCell>
                {editable && (
                  <TableCell>
                    <div className="flex flex-row justify-center gap-9">
                      {/* add icon */}
                      <Button type="submit">
                        <EdgeSvgIcon>feather:plus-square</EdgeSvgIcon>
                      </Button>
                      {/* delete button */}
                      {/* <EdgeSvgIcon
                      className="icon-size-12 cursor-pointer mr-6"
                      color="error"
                      onClick={() => {}}
                    >
                      feather:trash-2
                    </EdgeSvgIcon> */}
                    </div>
                  </TableCell>
                )}
              </TableRow>
            )}
            {chequeBookData &&
              chequeBookData.map((item, index) => (
                <TableRow key={index}>
                  <TableCell>{item.customerName || ""}</TableCell>
                  <TableCell>{item.accountNumber || ""}</TableCell>
                  <TableCell>{item.address || ""}</TableCell>
                  <TableCell align="right">
                    {item.numberOfPages || ""}
                  </TableCell>
                  <TableCell align="right">
                    {item.numberOfBooks || ""}
                  </TableCell>
                  <TableCell align="center">
                    {item.chequeBookType || ""}
                  </TableCell>
                  {editable && (
                    <TableCell className="mx-auto">
                      <div className="flex flex-row justify-center gap-9">
                        <EdgeSvgIcon
                          className="icon-size-12 cursor-pointer mr-6"
                          color="error"
                          onClick={() => {
                            handleChequebookDelete(item.id);
                          }}
                        >
                          feather:trash-2
                        </EdgeSvgIcon>
                      </div>
                    </TableCell>
                  )}
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
};

export default ChequebookList;
