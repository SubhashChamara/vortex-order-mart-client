import { useNavbarState } from "../../../../@context/NavbarProvider";
import { Paper } from "@mui/material";
import { useEffect, useState } from "react";
import EdgeSvgIcon from "../../../../@core/ui/EdgeSvgIcon";
import RetriveFile from "../../../../@helpers/RetriveFiles";
import { Api } from "../../../../api/Api";
import { ReportsInfo } from "../../types/ReportsInfo";
import CategoryCard from "../admin/admin-tools/components/CategoryCard";

const ReportProcesses = () => {
  const { mobileOpen } = useNavbarState();
  const [reportProcesses, setReportProcesses] = useState<ReportsInfo[]>([]);

  const getReports = async () => {
    const { data, err } = await Api.performRequest((r) => r.admin.getReports());

    if (data !== null) {
      setReportProcesses(data);
    } else {
      console.log(err);
    }
  };

  useEffect(() => {
    getReports();
  }, []);

  return (
    <>
      <Paper className="my-12 p-6 mx-12">
        <div className="flex ">
          <EdgeSvgIcon
            className="icon-size-28 cursor-pointer text-red-600"
            color="error"
          >
            feather:file-text
          </EdgeSvgIcon>
          <div className="text-red-600 font-bold flex-col pl-6">
            <div>Reports</div>
            <div className="text-[12px] text-gray">manage master reports.</div>
          </div>
        </div>
      </Paper>
      <div className="px-20">
        <div className="flex items-center gap-12 my-20">
          <img src="assets/icons/home/3.png" className="w-20" alt="" />
          <div className="text-12 font-bold text-gray-800">
            Process flows ({reportProcesses.length})
          </div>
        </div>
        <div
          className={`grid grid-cols-1  md:grid-cols-5 gap-12 p-12 md:p-0 pt-8 py-24 ${
            mobileOpen
              ? "sm:grid-cols-1 md:grid-cols-3"
              : "sm:grid-cols-2 md:grid-cols-2"
          }`}
        >
          {reportProcesses.map((process, index) => (
            <CategoryCard
              title={process.process.name}
              icon={
                process.process.logo
                  ? RetriveFile(process.process.logo)
                  : "/assets/icons/workflow/PF (20).png"
              }
              link={`/my-reports/${process.process.processDefinitionKey}`}
              key={index}
            />
          ))}
        </div>
      </div>
    </>
  );
};

export default ReportProcesses;
