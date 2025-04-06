import { useCallback, useEffect, useState } from "react";
import TaskPadFilters, { ReportFilters } from "./components/ReportFilter";
import { Api } from "../../../../../api/Api";
import moment from "moment";
import { Pageable } from "../../../../../api/types/Pageable";
import Logger from "../../../../../@helpers/Logger";
import Ve3LoadingScreen from "../../../../../@core/ui/Ve3LoadingScreen/Ve3LoadingScreen";
import ESignReportTable from "./components/ESignReportTable";
import { ESignReportInfo } from "./models/ESignReportInfo";

const ESignReport = () => {
  const [page, setPage] = useState<number>(0);
  const [size, setSize] = useState<number>(10);
  const [eSignReportList, setESignReportList] = useState<Pageable<ESignReportInfo> | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [branchList,setBranchList] =useState([
    { id: 0, name: "" }
  ]);

  const handleFetchBranchList = async () => {
    const { data, err } = await Api.performRequest((r) =>
      r.creditCard.getBranchList("BRANCH")
    );

    Logger.debug(
      "(User Process) => { DATA: " +
        JSON.stringify(data) +
        " , ERROR: " +
        JSON.stringify(err)
    );

    if (data !== null) {
        setBranchList(data);
    }
  };

  const defaultFilter: ReportFilters = {
    fromDate: moment().startOf("month").toDate(),
    toDate: moment().toDate(),
    branch: { id: null, name: "" },
    approver: "",
    wfRef: "",
    nic: "",
    customerAcNo: "",
    customerCardNo: "",
    invoker: "",
  };

  const [filter, setFilter] = useState<ReportFilters>(defaultFilter);

  const handlePassFilters = (filters: ReportFilters) => {
    setFilter(filters);
  };

  const fetchESignReportList = useCallback(async () => {
    setLoading(true);

    const parsedStartDate = filter?.fromDate ? moment(filter.fromDate).format("YYYY-MM-DD") : moment().format("YYYY-MM-DD");
    const parsedEndDate = filter?.toDate ? moment(filter.toDate).format("YYYY-MM-DD") : moment().format("YYYY-MM-DD");
    const branch = filter?.branch?.id || null;
    const approver = filter?.approver?.id || null;
    const wfRef = filter?.wfRef || null;
    const nic = filter?.nic || null;
    const customerAcNo = filter?.customerAcNo || null;
    const customerCardNo = filter?.customerCardNo || null;
    const invoker = filter?.invoker?.id || null;

    const { data, err } = await Api.performRequest((r) =>
      r.reports.getESignReportList(parsedStartDate, parsedEndDate, branch, approver, wfRef, nic, customerAcNo, customerCardNo, invoker, size, page)
    );

    Logger.debug("(E-Sign Report List) => { DATA: " + JSON.stringify(data) + " , ERROR: " + JSON.stringify(err) + " }");

    if (data) {
      setESignReportList(data);
    }
    setLoading(false);
  }, [filter, page, size]);

  useEffect(() => {
    fetchESignReportList();
    handleFetchBranchList();
  }, [fetchESignReportList]);

  return (
    <div className="px-12 pb-12">
      <TaskPadFilters handlePassFilters={handlePassFilters} title="E-Sign Report" />
      {loading ? (
        <Ve3LoadingScreen />
      ) : (
        <ESignReportTable branchList={branchList} eSignReportList={eSignReportList} setPage={setPage} page={page} />
      )}
    </div>
  );
};

export default ESignReport;
