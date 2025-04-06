import React from "react";
import { TATTableProps } from "./CARDTatTable";

const LOANTatTable: React.FC<TATTableProps> = ({ tatTableData }) => {
  return (
    <div className="flex flex-col gap-12 pt-12">
      <div className="flex items-center">
        <p className="text-sm font-bold">LOAN</p>
        <div className="flex-grow border border-gray-300 ml-6"></div>
      </div>
      <div className="w-full overflow-x-auto">
        <table className="w-full whitespace-no-wrap">
          <thead>
            <tr className="whitespace-nowrap border divide-x-1">
              <th className="p-6 text-left border border-gray-300"></th>
              <th className="p-6 text-left border border-gray-300">
                Branch/SSU
              </th>
              <th className="p-6 text-left border border-gray-300">CDD Ops</th>
              <th className="p-6 text-left border border-gray-300">
                Credit returns
              </th>
              <th className="p-6 text-left border border-gray-300">
                Other returns
              </th>
              <th className="p-6 text-left border border-gray-300">
                CRIB user
              </th>
              <th className="p-6 text-left border border-gray-300">
                Doc Check
              </th>
              <th className="p-6 text-left border border-gray-300">
                Data Entry Maker
              </th>
              <th className="p-6 text-left border border-gray-300">
                Data Entry Checker
              </th>
              <th className="p-6 text-left border border-gray-300">Cell</th>
              <th className="p-6 text-left border border-gray-300">
                Eyeballing
              </th>
              <th className="p-6 text-left border border-gray-300">
                Verification & Underwriting
              </th>
              <th className="p-6 text-left border border-gray-300">Fraud</th>
              <th className="p-6 text-left border border-gray-300">
                External Verification
              </th>
              <th className="p-6 text-left border border-gray-300">L2 & L3</th>
              <th className="p-6 text-left border border-gray-300">
                E2E(Hours)
              </th>
              <th className="p-6 text-left border border-gray-300">
                E2E(Days)
              </th>
              <th className="p-6 text-left border border-gray-300">
                Total Tat
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="p-6 font-bold text-left border border-gray-300">
                Average
              </td>
              <td className="p-6 text-left border border-gray-300">
                {tatTableData.loanAverageDetails.avgBranchSSU || ""}
              </td>
              <td className="p-6 text-left border border-gray-300">
                {tatTableData.loanAverageDetails.avgCCDOps || ""}
              </td>
              <td className="p-6 text-left border border-gray-300">
                {tatTableData.loanAverageDetails.avgCreditReturns || ""}
              </td>
              <td className="p-6 text-left border border-gray-300">
                {tatTableData.loanAverageDetails.avgOtherReturns || ""}
              </td>
              <td className="p-6 text-left border border-gray-300">
                {tatTableData.loanAverageDetails.avgCribUser || ""}
              </td>
              <td className="p-6 text-left border border-gray-300">
                {tatTableData.loanAverageDetails.avgDocCheck || ""}
              </td>
              <td className="p-6 text-left border border-gray-300">
                {tatTableData.loanAverageDetails.avgDataEntryMaker || ""}
              </td>
              <td className="p-6 text-left border border-gray-300">
                {tatTableData.loanAverageDetails.avgDataEntryChecker || ""}
              </td>
              <td className="p-6 text-left border border-gray-300">
                {tatTableData.loanAverageDetails.avgCell || ""}
              </td>
              <td className="p-6 text-left border border-gray-300">
                {tatTableData.loanAverageDetails.avgEyeBalling || ""}
              </td>
              <td className="p-6 text-left border border-gray-300">
                {tatTableData.loanAverageDetails.avgUnderwriting || ""}
              </td>
              <td className="p-6 text-left border border-gray-300">
                {tatTableData.loanAverageDetails.avgFraud || ""}
              </td>
              <td className="p-6 text-left border border-gray-300">
                {tatTableData.loanAverageDetails.avgExVeri || ""}
              </td>
              <td className="p-6 text-left border border-gray-300">
                {tatTableData.loanAverageDetails.avgL2L3 || ""}
              </td>
              <td className="p-6 text-left border border-gray-300">
                {tatTableData.loanAverageDetails.hours || ""}
              </td>
              <td className="p-6 text-left border border-gray-300">
                {tatTableData.loanAverageDetails.days || ""}
              </td>
              <td className="p-6 text-left border border-gray-300">
                {tatTableData.loanAverageDetails.total || ""}
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className="w-full overflow-x-auto">
        <table className="w-full whitespace-no-wrap">
          <thead>
            <tr className="whitespace-nowrap border divide-x-1">
              <th className="p-6 text-left border border-gray-300"></th>
              <th className="p-6 text-left border border-gray-300">
                Branch/SSU
              </th>
              <th className="p-6 text-left border border-gray-300">CDD Ops</th>
              <th className="p-6 text-left border border-gray-300">
                Credit returns
              </th>
              <th className="p-6 text-left border border-gray-300">
                Other returns
              </th>
              <th className="p-6 text-left border border-gray-300">
                CRIB user
              </th>
              <th className="p-6 text-left border border-gray-300">
                Doc Check
              </th>
              <th className="p-6 text-left border border-gray-300">
                Data Entry Maker
              </th>
              <th className="p-6 text-left border border-gray-300">
                Data Entry Checker
              </th>
              <th className="p-6 text-left border border-gray-300">Cell</th>
              <th className="p-6 text-left border border-gray-300">
                Eyeballing
              </th>
              <th className="p-6 text-left border border-gray-300">
                Verification & Underwriting
              </th>
              <th className="p-6 text-left border border-gray-300">Fraud</th>
              <th className="p-6 text-left border border-gray-300">
                External Verification
              </th>
              <th className="p-6 text-left border border-gray-300">L2 & L3</th>
              <th className="p-6 text-left border border-gray-300">
                E2E(Hours)
              </th>
              <th className="p-6 text-left border border-gray-300">
                E2E(Days)
              </th>
              <th className="p-6 text-left border border-gray-300">
                Total Tat
              </th>
              <th className="p-6 text-left border border-gray-300">Segment </th>
              <th className="p-6 text-left border border-gray-300">DSR Name</th>
              <th className="p-6 text-left border border-gray-300">
                Start Date
              </th>
              <th className="p-6 text-left border border-gray-300">End Date</th>
            </tr>
          </thead>
          <tbody>
            {tatTableData.loanDetails.map((item, index) => (
              <>
                <tr key={index}>
                  <td
                    className="p-6 font-bold text-left border border-gray-300"
                    colSpan={22}
                  >
                    {item.branchName}
                  </td>
                </tr>
                {item.records.map((subItem, subIndex) => (
                  <tr key={subIndex}>
                    <td className="p-6 text-left border border-gray-300">
                      {subItem.businessKey || ""}
                    </td>
                    <td className="p-6 text-left border border-gray-300">
                      {subItem.branchSSU || ""}
                    </td>
                    <td className="p-6 text-left border border-gray-300">
                      {subItem.CDDOps || ""}
                    </td>
                    <td className="p-6 text-left border border-gray-300">
                      {subItem.creditReturns || ""}
                    </td>
                    <td className="p-6 text-left border border-gray-300">
                      {subItem.otherReturns || ""}
                    </td>
                    <td className="p-6 text-left border border-gray-300">
                      {subItem.cribUser || ""}
                    </td>
                    <td className="p-6 text-left border border-gray-300">
                      {subItem.docCheck || ""}
                    </td>
                    <td className="p-6 text-left border border-gray-300">
                      {subItem.dataEntryMaker || ""}
                    </td>
                    <td className="p-6 text-left border border-gray-300">
                      {subItem.dataEntryChecker || ""}
                    </td>
                    <td className="p-6 text-left border border-gray-300">
                      {subItem.cell || ""}
                    </td>
                    <td className="p-6 text-left border border-gray-300">
                      {subItem.eyeballing || ""}
                    </td>
                    <td className="p-6 text-left border border-gray-300">
                      {subItem.veriAndUnder || ""}
                    </td>
                    <td className="p-6 text-left border border-gray-300">
                      {subItem.fraud || ""}
                    </td>
                    <td className="p-6 text-left border border-gray-300">
                      {subItem.exVeri || ""}
                    </td>
                    <td className="p-6 text-left border border-gray-300">
                      {subItem.L2L3 || ""}
                    </td>
                    <td className="p-6 text-left border border-gray-300">
                      {subItem.hours || ""}
                    </td>
                    <td className="p-6 text-left border border-gray-300">
                      {subItem.days || ""}
                    </td>
                    <td className="p-6 text-left border border-gray-300">
                      {subItem.total || ""}
                    </td>
                    <td className="p-6 text-left border border-gray-300">
                      {subItem.segment || ""}
                    </td>
                    <td className="p-6 text-left border border-gray-300">
                      {subItem.dsrName || ""}
                    </td>
                    <td className="p-6 text-left border border-gray-300 text-nowrap">
                      {subItem.StartDate || ""}
                    </td>
                    <td className="p-6 text-left border border-gray-300 text-nowrap">
                      {subItem.EndDate || ""}
                    </td>
                  </tr>
                ))}
              </>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default LOANTatTable;
