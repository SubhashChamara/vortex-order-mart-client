import { Button, Paper } from "@mui/material";
import React from "react";
import EdgeSvgIcon from "../../../../../../@core/ui/EdgeSvgIcon";

const BundleDownloadPanelTable: React.FC = () => {
  return (
    <Paper className="p-12">
      <div className="flex justify-between items-center mb-4">
        <div>
          <div className="text-sm text-red-600 font-600">Results</div>
          <div className="text-[12px] font-600 text-gray">
            Bundled EOD Report Report for the selected date range
          </div>
        </div>
      </div>

      <div className="w-full overflow-x-auto">
        <table className="w-full whitespace-no-wrap">
          <thead>
            <tr className="whitespace-nowrap border divide-x-1">
              <th className="p-6 text-left">File Name </th>
              <th className="p-6 text-left">Requester</th>
              <th className="p-6 text-left">Downloaded </th>
              <th className="p-6 text-left">From Date </th>
              <th className="p-6 text-left">To Date </th>
              <th className="p-6 text-left">Category Type </th>
              <th className="p-6 text-left">Flow Type </th>
              <th className="p-6 text-left">NIC/PP Number </th>
              <th className="p-6 text-left">Status </th>
              <th className="p-6 text-left">Card Type </th>
              <th className="p-6 text-left">Source Type </th>
              <th className="p-6 text-left">Approver </th>
              <th className="p-6 text-left">DSR </th>
              <th className="p-6 text-left"> </th>
            </tr>
          </thead>
          <tbody>
            <tr className="border">
              <td className="p-6 border text-xxs align-middle text-left">
                Sample.pdf
              </td>
              <td className="p-6 border text-xxs align-middle text-left">
                Miuru Abeysiriwardana
              </td>
              <td className="p-6 border text-xxs align-middle text-left">NO</td>
              <td className="p-6 border text-xxs align-middle text-left">
                2025-01-10
              </td>
              <td className="p-6 border text-xxs align-middle text-left">
                2025-01-20
              </td>
              <td className="p-6 border text-xxs align-middle text-left">
                ALL
              </td>
              <td className="p-6 border text-xxs align-middle text-left">
                ALL
              </td>
              <td className="p-6 border text-xxs align-middle text-left">
                200000000000
              </td>
              <td className="p-6 border text-xxs align-middle text-left">
                ALL
              </td>
              <td className="p-6 border text-xxs align-middle text-left">
                ALL
              </td>
              <td className="p-6 border text-xxs align-middle text-left">
                ALL
              </td>
              <td className="p-6 border text-xxs align-middle text-left">
                ALL
              </td>
              <td className="p-6 border text-xxs align-middle text-left">
                ALL
              </td>
              <td className="p-6 border text-xxs align-middle text-left">
                <EdgeSvgIcon className="text-primary hover:cursor-pointer">
                  feather:download
                </EdgeSvgIcon>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </Paper>
  );
};

export default BundleDownloadPanelTable;
