import {
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
import React from "react";
import Ve3FormHeader from "../../../../../@core/ui/Ve3FormHeader/Ve3FormHeader";
import { Controller, useFormContext } from "react-hook-form";
import EdgeSvgIcon from "../../../../../@core/ui/EdgeSvgIcon";
import dayjs from "dayjs";
import { odCollateralInfo } from "../../../../externalComponents/overDraftEform/OverdraftEform/@types/odCollateralInfo";
import { formatCurrency } from "../../../bundle/@helpers/Common";

interface NewCollateralTableProps {
  editable: boolean;
  collateralTableData: odCollateralInfo[];
  setSelectedLienItemToEdit: (item: odCollateralInfo | null) => void;
}

const NewCollateralTableView: React.FC<NewCollateralTableProps> = ({
  editable,
  collateralTableData,
  setSelectedLienItemToEdit,
}) => {
  const { control } = useFormContext();

  return (
    <div className="h-full">
      <Paper className="px-12 pb-10 h-full flex flex-col justify-between">
        <div className="flex flex-col">
          <Ve3FormHeader
            icon="material-outline:gavel"
            title="Details of the New Collateral"
          />
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
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
                  <TableCell className="border border-gray-300 bg-grey-200 text-center pt-6 pb-6" />
                </TableRow>
              </TableHead>
              <TableBody>
                {collateralTableData &&
                  collateralTableData.map((item, index) => (
                    <TableRow key={index}>
                      {/* <TableCell align="center">{item.id}</TableCell> */}
                      <TableCell align="right">{item.accountNo}</TableCell>
                      <TableCell align="right">{item.currencyId}</TableCell>
                      <TableCell align="center">{item.name}</TableCell>
                      <TableCell align="right">{item.interest}</TableCell>
                      <TableCell align="center">
                        {dayjs(item.maturityDate).format("DD-MM-YYYY")}
                      </TableCell>
                      <TableCell align="right">
                        {(item.currentBalance &&
                          formatCurrency(item.currentBalance.toString())) ||
                          ""}
                      </TableCell>
                      <TableCell>
                        <EdgeSvgIcon
                          onClick={() => setSelectedLienItemToEdit(item)}
                          className="hover: cursor-pointer"
                        >
                          {editable ? "feather:edit" : "feather:eye"}
                        </EdgeSvgIcon>
                      </TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
        <div className="flex flex-col gap-9 justify-end">
          {/* currency controller */}
          <Controller
            name="totalApplicableLimit"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                className="w-1/2 ms-auto mt-9"
                disabled={!editable}
                label="Total Applicable Limit"
                size="small"
                type="text"
              />
            )}
          />
          <div className="ms-auto">
            <Button
              type="submit"
              className="flex flex-row gap-3"
              disabled={!editable}
            >
              <EdgeSvgIcon>feather:save</EdgeSvgIcon>Save Applicable Limit
            </Button>
          </div>
        </div>
      </Paper>
    </div>
  );
};

export default NewCollateralTableView;
