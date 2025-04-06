import React from "react";
import { TATTableProps } from "./CARDTatTable";

const CASATatTable: React.FC<TATTableProps> = ({ tatTableData }) => {
  return (
    <div className="flex flex-col gap-12 pt-12">
      <div className="flex items-center">
        <p className="text-sm font-bold">CASA</p>
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
                Branch rework
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
              <th className="p-6 text-left border border-gray-300">
                Debit Card production
              </th>
              <th className="p-6 text-left border border-gray-300">Cell</th>
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
                {tatTableData.casaAverageDetails.avgBranchSSU || ""}
              </td>
              <td className="p-6 text-left border border-gray-300">
                {tatTableData.casaAverageDetails.avgCCDOps || ""}
              </td>
              <td className="p-6 text-left border border-gray-300">
                {tatTableData.casaAverageDetails.avgBranchRework || ""}
              </td>
              <td className="p-6 text-left border border-gray-300">
                {tatTableData.casaAverageDetails.avgDocCheck || ""}
              </td>
              <td className="p-6 text-left border border-gray-300">
                {tatTableData.casaAverageDetails.avgDataEntryMaker || ""}
              </td>
              <td className="p-6 text-left border border-gray-300">
                {tatTableData.casaAverageDetails.avgDataEntryChecker || ""}
              </td>
              <td className="p-6 text-left border border-gray-300">
                {tatTableData.casaAverageDetails.avgDebitCard || ""}
              </td>
              <td className="p-6 text-left border border-gray-300">
                {tatTableData.casaAverageDetails.avgCell || ""}
              </td>
              <td className="p-6 text-left border border-gray-300">
                {tatTableData.casaAverageDetails.hours || ""}
              </td>
              <td className="p-6 text-left border border-gray-300">
                {tatTableData.casaAverageDetails.days || ""}
              </td>
              <td className="p-6 text-left border border-gray-300">
                {tatTableData.casaAverageDetails.total || ""}
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
                Branch rework
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
              <th className="p-6 text-left border border-gray-300">
                Debit Card production
              </th>
              <th className="p-6 text-left border border-gray-300">Cell</th>
              <th className="p-6 text-left border border-gray-300">
                Definite / Indefinite
              </th>
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
            {tatTableData.casaDetails.map((item, index) => (
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
                    <td className="p-6 text-left font-bold border border-gray-300">
                      {subItem.businessKey || ""}
                    </td>
                    <td className="p-6 text-left border border-gray-300">
                      {subItem.branchSSU || ""}
                    </td>
                    <td className="p-6 text-left border border-gray-300">
                      {subItem.CDDOps || ""}
                    </td>
                    <td className="p-6 text-left border border-gray-300">
                      {subItem.branchRework || ""}
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
                      {subItem.debitCard || ""}
                    </td>
                    <td className="p-6 text-left border border-gray-300">
                      {subItem.cell || ""}
                    </td>
                    <td className="p-6 text-left border border-gray-300">
                      {subItem.status || ""}
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

export default CASATatTable;
