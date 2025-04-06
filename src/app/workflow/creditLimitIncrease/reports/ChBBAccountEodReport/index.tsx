import { useCallback, useEffect, useState } from "react";
import TaskPadFilters, { ReportFilters } from "./components/ReportFilters";
import { Api } from "../../../../../api/Api";
import moment from "moment";
import { Pageable } from "../../../../../api/types/Pageable";
import Logger from "../../../../../@helpers/Logger";
import ChAccEodReportTable from "./components/ChAccEodReportTable";
import Ve3LoadingScreen from "../../../../../@core/ui/Ve3LoadingScreen/Ve3LoadingScreen";
import { CHAccEodReportIf } from "../../../../core/types/reports/ChAccEodReport";

const ChBBAccEODReport = () => {
  const [page, setPage] = useState<number>(0);
  const [size, setSize] = useState<number>(10);
  const [startDate, setStartDate] = useState<String>();
  const [endDate, setEndDate] = useState<String>();
  const [getCHBBAccEODReportList, setCHBBAccEODReportList] = useState<Pageable<CHAccEodReportIf> | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const defaultFilter: ReportFilters = {
    fromDate: moment().startOf("month").toDate(),
    toDate: moment().toDate(),
    branch: {
      id: 'ALL',
      name: 'ALL'
    }
  };
  const [filter, setFilter] = useState<ReportFilters | null>(defaultFilter);

  const handlePassFilters = (filters: ReportFilters) => {
    setFilter(filters);
  };

  const handleFetchChAccEodReportList = useCallback(async () => {
    setLoading(true);
    
    const startDate = filter?.fromDate ? moment(filter.fromDate).format("YYYY-MM-DD") : moment().format("YYYY-MM-DD");
    const endDate = filter?.toDate ? moment(filter.toDate).format("YYYY-MM-DD") : moment().format("YYYY-MM-DD");
    setStartDate(startDate);
    setEndDate(endDate);

    const branchId = filter?.branch?.id || 'ALL';
    console.log(branchId);
    const { data, err } = await Api.performRequest((r) =>
      r.reports.getChAccEODReport(
        startDate,
        endDate,
        branchId,
        size,
        page
      )
    );
    Logger.debug(
      "(History Process List) => { DATA: " +
      JSON.stringify(data) +
      " , ERROR: " +
      JSON.stringify(err)
    );

    if (data !== null) {
        setCHBBAccEODReportList(data);
    }
    setLoading(false);
  }, [filter, size, page]);

  useEffect(() => {
    handleFetchChAccEodReportList();
  }, [page, filter, handleFetchChAccEodReportList]);

  return (
    <div className="px-12 pb-12">
      <TaskPadFilters handlePassFilters={handlePassFilters} title="Casa BB Account EOD" />
      {loading ? (
        <Ve3LoadingScreen />
      ) : (
        <>
          <ChAccEodReportTable
            getCHBBAccEODReportList={getCHBBAccEODReportList || null}
            setPage={setPage}
            page={page}
          />
        </>
      )}
    </div>
  );
};

export default ChBBAccEODReport;
