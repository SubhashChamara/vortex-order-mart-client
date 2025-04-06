import {
  Paper,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from "@mui/material";
import React from "react";
import EdgeSvgIcon from "../../../../../@core/ui/EdgeSvgIcon";
import Ve3FormHeader from "../../../../../@core/ui/Ve3FormHeader/Ve3FormHeader";
import { odInfo } from "../../../../externalComponents/overDraftEform/OverdraftEform/@types/odInfo";
import { formatCurrency } from "../../../../workflow/bundle/@helpers/Common";

interface JointCustomerTableProps {
  data: odInfo[];
  setSelectedJointCustomerToEdit: (item: odInfo | null) => void;
  setSelectedJointCustomerToView?: (item: odInfo | null) => void;
  editable?: boolean;
}

const JointCustomerTable: React.FC<JointCustomerTableProps> = ({
  data,
  setSelectedJointCustomerToEdit,
  setSelectedJointCustomerToView,
  editable = true,
}) => {
  return (
    <Paper className="px-12 pb-10 h-full">
      <Ve3FormHeader icon="feather:users" title="Joint Applicants" />
      <div className="flex flex-col gap-14">
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell className="border border-gray-300 bg-grey-200 text-center pt-6 pb-6">
                  Title
                </TableCell>
                <TableCell className="border border-gray-300 bg-grey-200 text-center pt-6 pb-6">
                  Name
                </TableCell>
                <TableCell className="border border-gray-300 bg-grey-200 text-center pt-6 pb-6">
                  NIC
                </TableCell>
                <TableCell className="border border-gray-300 bg-grey-200 text-center pt-6 pb-6">
                  Mobile
                </TableCell>
                <TableCell className="border border-gray-300 bg-grey-200 text-center pt-6 pb-6">
                  Email
                </TableCell>
                <TableCell className="border border-gray-300 bg-grey-200 text-center pt-6 pb-6">
                  Address-1
                </TableCell>
                <TableCell className="border border-gray-300 bg-grey-200 text-center pt-6 pb-6">
                  Address-2
                </TableCell>
                <TableCell className="border border-gray-300 bg-grey-200 text-center pt-6 pb-6">
                  Address-3
                </TableCell>
                <TableCell className="border border-gray-300 bg-grey-200 text-center pt-6 pb-6">
                  Income
                </TableCell>
                <TableCell className="border border-gray-300 bg-grey-200 text-center pt-6 pb-6" />
              </TableRow>
            </TableHead>
            <TableBody>
              {data.map((item, index) => (
                <TableRow key={index}>
                  <TableCell>{item.title || ""}</TableCell>
                  <TableCell>{item.name || ""}</TableCell>
                  <TableCell align="center">{item.nic || ""}</TableCell>
                  <TableCell align="center">{item.mobileNo || ""}</TableCell>
                  <TableCell>{item.email}</TableCell>
                  <TableCell align="left">{item.resAdd1 || ""}</TableCell>
                  <TableCell align="left">{item.resAdd2 || ""}</TableCell>
                  <TableCell align="left">{item.resAdd3 || ""}</TableCell>
                  <TableCell align="right">
                    {item.income ? formatCurrency(item.income.toString()) : ""}
                  </TableCell>
                  <TableCell>
                    {editable ? (
                      <EdgeSvgIcon
                        size={20}
                        onClick={() => setSelectedJointCustomerToEdit(item)}
                        className="hover:cursor-pointer"
                      >
                        feather:edit
                      </EdgeSvgIcon>
                    ) : (
                      <EdgeSvgIcon
                        size={20}
                        onClick={() =>
                          setSelectedJointCustomerToView &&
                          setSelectedJointCustomerToView(item)
                        }
                        className="hover:cursor-pointer"
                      >
                        feather:eye
                      </EdgeSvgIcon>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </Paper>
  );
};

export default JointCustomerTable;
