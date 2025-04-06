import React, { useEffect, useState } from "react";
import ReportFilters, {
  defaultValues,
  IReportFilters,
} from "./components/ReportFilters";
import SummaryTable from "./components/SummaryTable";
import DetailedStatusTable from "./components/DetailedStatusTable";

const SystemVUnderwriterCribReport: React.FC = () => {
  const [filter, setFilter] = useState<IReportFilters | null>(defaultValues);

  const handlePassFilters = (filters: IReportFilters | null) => {
    if (!filters) {
      return;
    }
    setFilter(filters);
  };

  useEffect(() => {
    handlePassFilters(filter);
  }, [filter]);

  return (
    <div className="px-12 pb-12">
      <ReportFilters
        handlePassFilters={() => handlePassFilters}
        title="System vs Underwriter Crib Details Report"
      />
      <div className="grid grid-cols-3 gap-12">
        <SummaryTable />
        <div className="col-span-2">
          <DetailedStatusTable />
        </div>
      </div>
    </div>
  );
};

export default SystemVUnderwriterCribReport;
