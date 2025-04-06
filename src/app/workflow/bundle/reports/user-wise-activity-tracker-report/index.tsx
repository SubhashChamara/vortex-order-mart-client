import { useCallback, useEffect, useState } from "react";
import ReportFilters, {Filters} from "./components/ReportFilters";
import { Api } from "../../../../../api/Api";
import moment from "moment";
import Logger from "../../../../../@helpers/Logger";
import Ve3LoadingScreen from "../../../../../@core/ui/Ve3LoadingScreen/Ve3LoadingScreen";
import { BundledUserWiseActivityTracker } from "../../../../core/types/reports/BundledUserWiseActivityTracker";
import UserWiseActivityTrackerReportTable from "./components/UserWiseActivityTrackerReport";


const UserWiseActivityTrackerReport = () => {

  const [page, setPage] = useState<number>(0);
  const [UserWiseActivityTracker, setUserWiseActivityTracker] = useState<Map<string, BundledUserWiseActivityTracker> | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const defaultFilter: Filters = {
    fromDate: moment().startOf("month").toDate(),
    toDate: moment().toDate(),
  };
  const [filter, setFilter] = useState<Filters | null>(defaultFilter);

  const handlePassFilters = (filters: Filters) => {
    setFilter(filters);
  };

  const handleFetchBundledUserWiseActivityTrackerList = useCallback(async () => {
    setLoading(true);

    const startDate = filter?.fromDate ? moment(filter.fromDate).format("YYYY-MM-DD") : moment().format("YYYY-MM-DD");
    const endDate = filter?.toDate ? moment(filter.toDate).format("YYYY-MM-DD") : moment().format("YYYY-MM-DD");

    const { data, err } = await Api.performRequest((r) =>
      r.reports.getBundledUserWiseActivityTracker(
        startDate,
        endDate,
      )
    );
    Logger.debug(
      "(History Process List) => { DATA: " +
      JSON.stringify(data) +
      " , ERROR: " +
      JSON.stringify(err)
    );

    if (data !== null) {
      setUserWiseActivityTracker(data);
    }
    setLoading(false);
  }, [filter]);

  useEffect(() => {
    handleFetchBundledUserWiseActivityTrackerList();
  }, [filter]);



  return (
    <div className="px-12 pb-12">
      <ReportFilters handlePassFilters={handlePassFilters} title="User wise Activity Tracker" />
      {loading ? (
        <Ve3LoadingScreen />
      ) : (
        <>
          <UserWiseActivityTrackerReportTable
            userWiseActivityTrackerList={UserWiseActivityTracker}
            setPage={setPage}
            page={page}
          />
        </>
      )}

    </div>
  );
};

export default UserWiseActivityTrackerReport;
