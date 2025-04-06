import React, { useEffect, useState } from "react";
import { BranchInfo } from "../../../../core/types/BranchInfo";
import moment from "moment";
import ReportFilters from "./components/ReportFilters";
import { Paper } from "@mui/material";
import CARDTatTable from "./components/CARDTatTable";
import CASATatTable from "./components/CASATatTable";
import LOANTatTable from "./components/LOANTatTable";
import { Api } from "../../../../../api/Api";
import { BundledTATReportInfo } from "../../../../core/types/reports/BundledTATReportInfo";

type ReportFilters = {
  fromDate: Date | null;
  toDate: Date | null;
  productType: BranchInfo | null;
  branch: BranchInfo | null;
  segment: BranchInfo | null;
};

const BundleDepartmentTATReport: React.FC = () => {
  const defaultFilter: ReportFilters = {
    fromDate: moment().subtract(1, "months").toDate(),
    toDate: moment().toDate(),
    productType: { id: "", name: "" },
    branch: { id: "", name: "" },
    segment: { id: "ALL", name: "ALL" },
  };

  const [filter, setFilter] = useState<ReportFilters | null>(defaultFilter);
  const [bundledTatInfo, setBundledTatInfo] =
    useState<BundledTATReportInfo | null>(null);

  const handlePassFilters = (filters: ReportFilters) => {
    setFilter(filters);
  };

  const getDepartmentWiseTATData = async () => {
    if (!filter) {
      return;
    }
    const { data, err } = await Api.performRequest((r) =>
      r.reports.getDepartmentWiseTATData(
        filter?.fromDate
          ? moment(filter.fromDate).format("YYYY-MM-DD")
          : moment().format("YYYY-MM-DD"),
        filter?.toDate
          ? moment(filter.toDate).format("YYYY-MM-DD")
          : moment().format("YYYY-MM-DD"),
        filter?.branch?.id === "ALL" || !filter?.branch?.id
          ? null
          : filter.branch.id,
        filter.productType ? filter.productType.id : null,
        filter?.segment?.id ? filter.segment.id : null
      )
    );

    if (data !== null) {
      setBundledTatInfo(data);
    } else {
      console.error(err);
    }
  };

  useEffect(() => {
    getDepartmentWiseTATData();
  }, [filter]);

  return (
    <div className="px-12 pb-12">
      <ReportFilters
        handlePassFilters={handlePassFilters}
        title="Bundled Flow Report: Department Wise TAT Report"
      />
      <>
        <Paper className="w-full overflow-hidden p-12">
          <div className="flex justify-between items-center mb-4">
            <div>
              <div className="text-sm text-red-600 font-600">
                Search Results
              </div>
              <div className="text-[12px] font-600 text-gray">
                Bundled Flow Report: Department Wise TAT Report Report for
                selected date range
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-12">
            {bundledTatInfo && bundledTatInfo?.cardDetails?.length > 0 && (
              <CARDTatTable tatTableData={bundledTatInfo} />
            )}
            {bundledTatInfo && bundledTatInfo.loanDetails.length > 0 && (
              <LOANTatTable tatTableData={bundledTatInfo} />
            )}
            {bundledTatInfo && bundledTatInfo.casaDetails.length > 0 && (
              <CASATatTable tatTableData={bundledTatInfo} />
            )}
          </div>
        </Paper>
      </>
    </div>
  );
};

export default BundleDepartmentTATReport;
