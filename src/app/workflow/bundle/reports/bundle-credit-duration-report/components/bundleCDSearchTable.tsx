import { Button, Link, Paper, Tooltip } from "@mui/material";
import { FC } from "react";
import { useNavbarState } from "../../../../../../@context/NavbarProvider";
import useThemeMediaQuery from "../../../../../../@hooks/useThemeMediaQuery";
import EdgeSvgIcon from "../../../../../../@core/ui/EdgeSvgIcon";
import { BundleCDSearchData } from "../../../../../core/types/reports/BundleCD";

type ReportFiltersProps = {
  onValueClick: (role: string, duration: string) => void;
  getSearchData: BundleCDSearchData;
};

const bundleCDSearchTable: FC<ReportFiltersProps> = ({ onValueClick, getSearchData }) => {

  const { mobileOpen } = useNavbarState();
  const isMobile = useThemeMediaQuery((theme) => theme.breakpoints.down("lg"));

  return (
    <Paper elevation={3} style={{ padding: '16px', margin: '16px 0' }}>
      <div className="flex pb-6">
        <EdgeSvgIcon className="icon-size-28 cursor-pointer text-red-600" color="error">
          feather:file-text
        </EdgeSvgIcon>
        <div className="text-red-600 font-bold flex-col pl-6">
          <div>Credit Initiation Report</div>
          <div className="text-[12px] text-gray">
            This report provides Credit Initiation information
          </div>
        </div>
      </div>
      <div className="w-full overflow-x-auto">
        <table id="my-table" className="w-full whitespace-no-wrap">
          <thead>
            <tr className="whitespace-nowrap divide-x-1">
              <th className="p-6 text-left"></th>
              <th className="p-6 text-left">1 DAY</th>
              <th className="p-6 text-left">2 DAYS</th>
              <th className="p-6 text-left">3 DAYS</th>
              <th className="p-6 text-left">MORE THAN 3 DAYS</th>
            </tr>
          </thead>
          <tbody className="bg-white whitespace-nowrap">
            {Object.keys(getSearchData).map((key) => {
              const row = getSearchData[key];
              return (
                <tr key={key} className="text-black h-full bg-white shadow-2">
                  <td className="p-6 text-[12px] align-middle text-left">
                    <p className="text-[12px] text-gray font-bold">{row.label}</p>
                  </td>
                  <td className="p-6 text-[12px] align-middle text-left">
                    <Button
                      variant="outlined"
                      className="px-24 border-gray bg-grey-50 text-gray-800 cursor-pointer hover:bg-gray-200 focus:outline-none active:scale-95 active:bg-gray-300"
                      disabled={(row["1 Day"] === 0)}
                      onClick={(e) => {
                        e.preventDefault();
                        onValueClick(key, "1 Day");
                      }}>
                      {row["1 Day"]}
                    </Button>

                  </td>
                  <td className="p-6 text-[12px] align-middle text-left">
                    <Button variant="outlined" className="px-24 border-gray bg-grey-50 text-gray-800 cursor-pointer hover:bg-gray-200 focus:outline-none active:scale-95 active:bg-gray-300"
                      disabled={(row["2 Day"] === 0)} onClick={(e) => {
                        e.preventDefault();
                        onValueClick(key, "2 Day");
                      }}>
                      {row["2 Day"]}
                    </Button>
                  </td>
                  <td className="p-6 text-[12px] align-middle text-left">
                    <Button variant="outlined" className="px-24 border-gray bg-grey-50 text-gray-800 cursor-pointer hover:bg-gray-200 focus:outline-none active:scale-95 active:bg-gray-300"
                      disabled={(row["3 Day"] === 0)} onClick={(e) => {
                        e.preventDefault();
                        onValueClick(key, "3 Day");
                      }}>
                      {row["3 Day"]}
                    </Button>
                  </td>
                  <td className="p-6 text-[12px] align-middle text-left">
                    <Button variant="outlined" className="px-24 border-gray bg-grey-50 text-gray-800 cursor-pointer hover:bg-gray-200 focus:outline-none active:scale-95 active:bg-gray-300"
                      disabled={(row["More than 3 Days"] === 0)} onClick={(e) => {
                        e.preventDefault();
                        onValueClick(key, "More than 3 Days");
                      }}>
                      {row["More than 3 Days"]}
                    </Button>
                  </td>

                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </Paper>

  );
};

export default bundleCDSearchTable;
