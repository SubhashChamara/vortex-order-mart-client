import React, { useEffect, useState } from "react";
import ReportFilters, {
  defaultValues,
  IReportFilters,
} from "./components/ReportFilters";
import WorkflowSummaryTable from "./components/WorkflowSummaryTable";
import DetailedReworkTable from "./components/DetailedReworkTable";

const ReworkReport: React.FC = () => {
  const [filter, setFilter] = useState<IReportFilters | null>(defaultValues);

  const handlePassFilters = (filters: IReportFilters) => {
    setFilter(filters);
  };

  useEffect(() => {
    if (!filter) {
      return;
    }
    handlePassFilters(filter);
  }, [filter]);

  return (
    <div className="p-12">
      <ReportFilters handlePassFilters={handlePassFilters} title="Rework" />

      <div className="grid grid-cols-5 gap-12">
        <WorkflowSummaryTable />
        <div className="col-span-4">
          <DetailedReworkTable />
        </div>
      </div>
    </div>
  );
};

export default ReworkReport;
