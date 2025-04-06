import { useCallback, useEffect, useState } from "react";
// import { useNavbarState } from ".././../../../../@context/NavbarProvider";
import TaskPadFilters, { ReportFilters } from "./components/ReportFilters";
import { Api } from "../../../../../api/Api";
import moment from "moment";
import { Pageable } from "../../../../../api/types/Pageable";
import Logger from "../../../../../@helpers/Logger";
import Ve3LoadingScreen from "../../../../../@core/ui/Ve3LoadingScreen/Ve3LoadingScreen";
import BundleEODReportTable from "./components/BundleEODReportTable";
import { BundleEODIf } from "../../../../core/types/reports/BundleEOD";
import BundleStatsCard from "./components/BundleStatsCard";
import { BundledEODStats } from "../../../../core/types/reports/BundledEODStats";
import { set } from "react-hook-form";


const BundleEODReport = () => {
  // const { mobileOpen } = useNavbarState();

  const [page, setPage] = useState<number>(0);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [size, setSize] = useState<number>(10);
  const [bundleEODReportList, setBundleEODReportList] = useState<Pageable<BundleEODIf> | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [bundledEODStats, setBundledEODStats] = useState<BundledEODStats | null>(null);
  const [isStatsLoading, setIsStatsLoading] = useState<boolean>(true);

  const defaultFilter: ReportFilters = {
    fromDate: moment().startOf("month").toDate(),
    toDate: moment().toDate(),
    branch: { id: 0, name: "" },
  };
  const [filter, setFilter] = useState<ReportFilters | null>(defaultFilter);

  const handlePassFilters = (filters: ReportFilters) => {
    setFilter(filters);
  };

  const handleFetchBundleEODReportList = useCallback(async () => {
    setLoading(true);

    const startDate = filter?.fromDate ? moment(filter.fromDate).format("YYYY-MM-DD") : moment().format("YYYY-MM-DD");
    const endDate = filter?.toDate ? moment(filter.toDate).format("YYYY-MM-DD") : moment().format("YYYY-MM-DD");
    var branch = filter?.branch ? filter.branch?.id : 0;
    if (filter?.branch?.name === "ALL") {
      branch = 0;
    }
    const { data, err } = await Api.performRequest((r) =>
      r.reports.getBundleEODReport(
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
      setBundleEODReportList(data);
    }
    setLoading(false);
  }, [filter, size, page]);

  useEffect(() => {
    handleFetchBundleEODReportList();
  }, [page, filter, handleFetchBundleEODReportList]);

  const fetchEODStats = async () => {
    setIsStatsLoading(true);
    await Api.performRequest((r) =>
      r.reports.getBundledEODReportStats()
    ).then(({ data, err }) => {
      if (data !== null) {
        setBundledEODStats(data);
        setIsStatsLoading(false);
      }
    }).finally(() => {
      setIsStatsLoading(false);
    })
  }

  useEffect(() => {
    fetchEODStats();
  }, [])


  return (
    <div className="px-12 pb-12">
      <TaskPadFilters handlePassFilters={handlePassFilters} title="Bundle EOD" />
      {loading ? (
        <Ve3LoadingScreen />
      ) : (
        <>
          <BundleStatsCard reportStats={bundledEODStats} />
          <BundleEODReportTable
            bundleEODReportList={bundleEODReportList}
            setPage={setPage}
            page={page}
          />
        </>
      )}

    </div>
  );
};

export default BundleEODReport;
