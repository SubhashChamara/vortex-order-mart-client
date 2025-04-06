import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import { FC, memo, useEffect, useState } from "react";
import { FrmActionPointRequest } from "../../@types/FrmActionPointResponse";
import EdgeSvgIcon from "../../../../../@core/ui/EdgeSvgIcon";

type FrmActionPointProps = {
  actionPoints: FrmActionPointRequest[] | null;
};

const FrmExpertOpinionForm: FC<FrmActionPointProps> = (props) => {
  const { actionPoints } = props;

  return (
    <Paper className="px-12 py-6 h-full flex flex-col space-y-6">
      <div className="text-center mb-6 border-b-1 border-b-gray-200 py-6">
        <h1 className="text-md font-600 text-left flex text-blue-gray-800">
          <div>
            <EdgeSvgIcon
              className="icon-size-18 cursor-pointer mr-3"
              color="error"
            >
              feather:user-plus
            </EdgeSvgIcon>
          </div>
          <div>ACTION POINTS</div>
        </h1>
      </div>

      <div className="col-span-2">
        <TableContainer component={Paper} className="max-w-screen-md">
          <Table className="max-w-screen-md">
            <TableHead>
              <TableRow>
                <TableCell className="border border-gray-300 bg-grey-200 text-center pt-6 pb-6 w-1/2">
                  Email
                </TableCell>
                <TableCell className="border border-gray-300 bg-grey-200 text-center pt-6 pb-6 w-1/2">
                  Action Point
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {actionPoints?.map((actionPoint) => (
                <TableRow>
                  <TableCell className="border border-gray-300 w-1/2">
                    {actionPoint.email}
                  </TableCell>
                  <TableCell className="border border-gray-300 pb-0 pt-0 w-1/2">
                    {actionPoint.actionPoint}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </Paper>

  )
}

export default memo(FrmExpertOpinionForm);