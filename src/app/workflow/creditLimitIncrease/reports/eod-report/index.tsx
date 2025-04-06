import { useCallback, useEffect, useState } from "react";
// import { useNavbarState } from ".././../../../../@context/NavbarProvider";
import TaskPadFilters, { ReportFilters } from "./components/ReportFilters";
import { Api } from "../../../../../api/Api";
import moment from "moment";
import { Pageable } from "../../../../../api/types/Pageable";
import Logger from "../../../../../@helpers/Logger";
import { CliEodReportIf } from "../../../../core/types/CliEodReportIf";
import Ve3LoadingScreen from "../../../../../@core/ui/Ve3LoadingScreen/Ve3LoadingScreen";
import CliEodReportTable from "./components/CliEodReportTable";

const CliEodReport = () => {
  // const { mobileOpen } = useNavbarState();

  const [page, setPage] = useState<number>(0);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [size, setSize] = useState<number>(10);
  const [cliEodReportList, setCliEodReportList] =
    useState<Pageable<CliEodReportIf> | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const defaultFilter: ReportFilters = {
    fromDate: moment().startOf("month").toDate(),
    toDate: moment().toDate(),
  };
  const [filter, setFilter] = useState<ReportFilters | null>(defaultFilter);
  const handlePassFilters = (filters: ReportFilters) => {
    setFilter(filters);
  };

  const handleFetchCliEodReportList = useCallback(async () => {
    setLoading(true);

    const startDate = filter?.fromDate
      ? moment(filter.fromDate).format("YYYY-MM-DD")
      : moment().format("YYYY-MM-DD");
    const endDate = filter?.toDate
      ? moment(filter.toDate).format("YYYY-MM-DD")
      : moment().format("YYYY-MM-DD");
    const { data, err } = await Api.performRequest((r) =>
      r.reports.getCliEodReport(startDate, endDate, size, page)
    );
    Logger.debug(
      "(History Process List) => { DATA: " +
        JSON.stringify(data) +
        " , ERROR: " +
        JSON.stringify(err)
    );

    if (data !== null) {
      setCliEodReportList(data);
    }
    setLoading(false);
  }, [filter, size, page]);

  useEffect(() => {
    handleFetchCliEodReportList();
  }, [page, filter, handleFetchCliEodReportList]);

  return (
    <div className="px-12 pb-12">
      <TaskPadFilters
        title="CLI EOD Report"
        handlePassFilters={handlePassFilters}
      />
      {loading ? (
        <Ve3LoadingScreen />
      ) : (
        <>
          <CliEodReportTable
            cliEodReportList={cliEodReportList}
            setPage={setPage}
            page={page}
          />
          {/* 
          <Ve3Popup
            open={externalFormOpen}
            fullWidth={true}
            setOpen={setExternalFormOpen}
            body={<ExternalFormView process={process} />}
          /> */}
        </>
      )}
    </div>
  );
};

export default CliEodReport;
