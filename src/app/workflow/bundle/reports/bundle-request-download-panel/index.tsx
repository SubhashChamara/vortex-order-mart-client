import { Paper } from "@mui/material";
import React from "react";
import EdgeSvgIcon from "../../../../../@core/ui/EdgeSvgIcon";
import BundleDownloadPanelTable from "./components/BundleDownloadPanelTable";

const index = () => {
  return (
    <div className="px-12 pb-12">
      <Paper className="my-12 p-6 flex items-center">
        <div className="flex flex-row pb-6 items-center">
          <EdgeSvgIcon
            className="icon-size-28 cursor-pointer text-red-600"
            color="error"
          >
            feather:monitor
          </EdgeSvgIcon>
          <div className="text-red-600 font-bold flex-col pl-6">
            <div>Bundle Request Download Panel</div>
            <div className="text-[12px] text-gray">
              This provides information about the bundle request download panel.
            </div>
          </div>
        </div>
      </Paper>

      <BundleDownloadPanelTable />
    </div>
  );
};

export default index;
