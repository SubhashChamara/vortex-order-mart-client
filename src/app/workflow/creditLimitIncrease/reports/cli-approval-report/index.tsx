import { useCallback, useEffect, useState } from "react";
// import { useNavbarState } from ".././../../../../@context/NavbarProvider";
import TaskPadFilters, { ReportFilters } from "./components/ReportFilters";
import { Api } from "../../../../../api/Api";
import moment from "moment";
import { Pageable } from "../../../../../api/types/Pageable";
import Logger from "../../../../../@helpers/Logger";
import { CliApprovalReportIf } from "../../../../core/types/reports/CliApprovalReport";
import Ve3LoadingScreen from "../../../../../@core/ui/Ve3LoadingScreen/Ve3LoadingScreen";
import CliReportTable from "./components/CliApprovalReportTable";

const CliApprovalReport = () => {
  // const { mobileOpen } = useNavbarState();

  const [page, setPage] = useState<number>(0);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [size, setSize] = useState<number>(10);
  const [startDate, setStartDate] = useState<String>();
  const [endDate, setEndDate] = useState<String>();
  const [cliReportList, setCliReportList] =
    useState<Pageable<CliApprovalReportIf> | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const defaultFilter: ReportFilters = {
    fromDate: moment().startOf("month").toDate(),
    toDate: moment().toDate(),
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
    setStartDate(startDate);
    const endDate = filter?.toDate
      ? moment(filter.toDate).format("YYYY-MM-DD")
      : moment().format("YYYY-MM-DD");
    setEndDate(endDate);
    const { data, err } = await Api.performRequest((r) =>
      r.reports.getCliApprovalReport(startDate, endDate, size, page)
    );
    Logger.debug(
      "(History Process List) => { DATA: " +
        JSON.stringify(data) +
        " , ERROR: " +
        JSON.stringify(err)
    );

    if (data !== null) {
      setCliReportList(data);
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
        title="CLI Approval"
      />
      {loading ? (
        <Ve3LoadingScreen />
      ) : (
        <>
          <CliReportTable
            cliReportList={cliReportList}
            startDate={startDate ?? null}
            endDate={endDate ?? null}
            setPage={setPage}
            page={page}
          />
        </>
      )}
    </div>
  );
};

export default CliApprovalReport;
