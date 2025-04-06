import { useCallback, useEffect, useState } from "react";
// import { useNavbarState } from ".././../../../../@context/NavbarProvider";
import TaskPadFilters, { ReportFilters } from "./components/ReportFilters";
import { Api } from "../../../../../api/Api";
import moment from "moment";
import { Pageable } from "../../../../../api/types/Pageable";
import Logger from "../../../../../@helpers/Logger";
import Ve3LoadingScreen from "../../../../../@core/ui/Ve3LoadingScreen/Ve3LoadingScreen";
import { CribPullEODIf } from "../../../../core/types/reports/CribPullEOD";
import CribPullEODReportTable from "./components/CribPullEODReportTable";


const CribPullEODReport = () => {
  // const { mobileOpen } = useNavbarState();

  const [page, setPage] = useState<number>(0);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [size, setSize] = useState<number>(10);
  const [cribPullEODReport, setCribPullEODReport] = useState<Pageable<CribPullEODIf> | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const defaultFilter: ReportFilters = {
    fromDate: moment().startOf("month").toDate(),
    toDate: moment().toDate(),
    branch: { id: 0, name: "" },
  };
  const [filter, setFilter] = useState<ReportFilters | null>(defaultFilter);

  const handlePassFilters = (filters: ReportFilters) => {
    setFilter(filters);
  };

  const handleFetchCribPullEODReportList = useCallback(async () => {
    setLoading(true);

    const startDate = filter?.fromDate ? moment(filter.fromDate).format("YYYY-MM-DD") : moment().format("YYYY-MM-DD");
    const endDate = filter?.toDate ? moment(filter.toDate).format("YYYY-MM-DD") : moment().format("YYYY-MM-DD");
    var branch = filter?.branch ? filter.branch?.id : 0;
    if (filter?.branch?.name === "ALL") {
      branch = 0;
    }
    const { data, err } = await Api.performRequest((r) =>
      r.reports.getCribPullEODReport(
        startDate,
        endDate,
        branch,
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
      setCribPullEODReport(data);
    }
    setLoading(false);
  }, [filter, size, page]);

  useEffect(() => {
    handleFetchCribPullEODReportList();
  }, [page, filter, handleFetchCribPullEODReportList]);


  return (
    <div className="px-12 pb-12">
      <TaskPadFilters handlePassFilters={handlePassFilters} title="Crib Pull EOD" />
      {loading ? (
        <Ve3LoadingScreen />
      ) : (
        <>
          <CribPullEODReportTable
            cribPullEODReport={cribPullEODReport}
            setPage={setPage}
            page={page}
          />
        </>
      )}

    </div>
  );
};

export default CribPullEODReport;
