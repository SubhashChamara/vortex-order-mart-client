import { useCallback, useEffect, useState } from "react";
import TaskPadFilters, { ReportFilters } from "./components/ReportFilters";
import { Api } from "../../../../../api/Api";
import moment from "moment";
import { Pageable } from "../../../../../api/types/Pageable";
import Logger from "../../../../../@helpers/Logger";
import ODCollateralReportTable from "./components/ODCollateralReportTable";
import Ve3LoadingScreen from "../../../../../@core/ui/Ve3LoadingScreen/Ve3LoadingScreen";
import { ODCollateralReportIf } from "../../../../core/types/reports/ODCollateralReport";

const ODCollateralReport = () => {
  const [page, setPage] = useState<number>(0);
  const [size, setSize] = useState<number>(10);
  const [startDate, setStartDate] = useState<String>();
  const [endDate, setEndDate] = useState<String>();
  const [ODCollateralReportList, setODCollateralReportList] =
    useState<Pageable<ODCollateralReportIf> | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const defaultFilter: ReportFilters = {
    fromDate: moment().startOf("month").toDate(),
    toDate: moment().toDate(),
    facilityAccNum: null,
    status: {
      id: "ALL",
      name: "ALL",
    },
  };
  const [filter, setFilter] = useState<ReportFilters | null>(defaultFilter);

  const handlePassFilters = (filters: ReportFilters) => {
    setFilter(filters);
  };

  const handleFetchCliReportList = useCallback(async () => {
    setLoading(true);

    const startDate = filter?.fromDate
      ? moment(filter.fromDate).format("YYYY-MM-DD")
      : moment().format("YYYY-MM-DD");
    const endDate = filter?.toDate
      ? moment(filter.toDate).format("YYYY-MM-DD")
      : moment().format("YYYY-MM-DD");
    setStartDate(startDate);
    setEndDate(endDate);

    const facilityAccNum = filter?.facilityAccNum || " ";
    const statusId = filter?.status?.id || "ALL";

    const { data, err } = await Api.performRequest((r) =>
      r.reports.getCollateralReport(
        startDate,
        endDate,
        facilityAccNum,
        statusId,
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
      setODCollateralReportList(data);
    }
    setLoading(false);
  }, [filter, size, page]);

  useEffect(() => {
    handleFetchCliReportList();
  }, [page, filter, handleFetchCliReportList]);

  return (
    <div className="px-12 pb-12">
      <TaskPadFilters
        handlePassFilters={handlePassFilters}
        title="Over Draft Collateral"
      />
      {loading ? (
        <Ve3LoadingScreen />
      ) : (
        <>
          <ODCollateralReportTable
            ODCollateralReportList={ODCollateralReportList || null}
            setPage={setPage}
            page={page}
          />
        </>
      )}
    </div>
  );
};

export default ODCollateralReport;
