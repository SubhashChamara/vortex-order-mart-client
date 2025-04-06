import { Paper } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import EdgeSvgIcon from "../../../../../@core/ui/EdgeSvgIcon";
import Logger from "../../../../../@helpers/Logger";
import { Api } from "../../../../../api/Api";
import { Report } from "../../../types/Report";
import { ReportsInfo } from "../../../types/ReportsInfo";
import CategoryCard from "../../admin/admin-tools/components/CategoryCard";

const Reports: React.FC = () => {
  const { process } = useParams();
  const navigate = useNavigate();

  if (!process) {
    navigate("/my-reports");
  }

  const [processName, setProcessName] = useState<string | null>("");
  const [reportProcesses, setReportProcesses] = useState<ReportsInfo[]>([]);
  const [currentProcessReports, setCurrentProcessReports] = useState<Report[]>(
    []
  );

  Logger.debug(process ?? "query param not available");

  const getReports = async () => {
    const { data, err } = await Api.performRequest((r) => r.admin.getReports());

    if (data !== null) {
      setReportProcesses(data);
    } else {
      console.log(err);
    }
  };

  const filterReportsByProcessDefKey = (processDefinitionKey: string) => {
    const process = reportProcesses.find(
      (item) => item.process.processDefinitionKey === processDefinitionKey
    );

    return process ? process.reports : [];
  };

  const filterReportsWithProcessNameByDefKey = (
    processDefinitionKey: string
  ) => {
    const process = reportProcesses.find(
      (item) => item.process.processDefinitionKey === processDefinitionKey
    );

    return process ? process.process.name : null;
  };

  useEffect(() => {
    getReports();
  }, []);

  useEffect(() => {
    if (process) {
      setCurrentProcessReports(filterReportsByProcessDefKey(process));
      setProcessName(filterReportsWithProcessNameByDefKey(process));
    }
  }, [reportProcesses]);

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
            <div>{processName} Reports</div>
            <div className="text-[12px] text-gray">manage master reports</div>
          </div>
        </div>
      </Paper>
      <div className="px-20">
        <div className="flex items-center gap-12 my-20">
          <img src="assets/icons/home/3.png" className="w-20" alt="" />
          <div className="text-12 font-bold text-gray-800">
            {processName} Reports ({currentProcessReports.length})
          </div>
        </div>
        <div
          className={`grid grid-cols-1  md:grid-cols-5 gap-12 p-12 md:p-0 pt-8 py-24 `}
        >
          {currentProcessReports.map((report, index) => (
            <CategoryCard
              title={report.name}
              icon="/assets/icons/admin/admin-tool-icons/report.png"
              link={`/my-reports/${process}/${report.path}`}
              key={index}
            />
          ))}
        </div>
      </div>
    </>
  );
};

export default Reports;
