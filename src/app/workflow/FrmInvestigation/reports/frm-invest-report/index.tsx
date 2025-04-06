import { useCallback, useEffect, useState } from "react";
import { Pageable } from "../../../../../api/types/Pageable";
import { FrmInvestReportIf } from "../../../../core/types/reports/FrmInvestReportIf";
import moment from "moment";
import Logger from "../../../../../@helpers/Logger";
import { Api } from "../../../../../api/Api";
import TaskPadFilters, { ReportFilters } from "./components/ReportFilter";
import Ve3LoadingScreen from "../../../../../@core/ui/Ve3LoadingScreen/Ve3LoadingScreen";
import FrmInvestReportTable from "./components/FrmInvestReportTable";
import { TaskDetailInfo } from "../../../../core/types/TaskDetailInfo";



const FrmInviestigationReport = () => {

  type FK_Task01Props = {
    task: TaskDetailInfo;
  };

    const [page, setPage] = useState<number>(0);
    const [size, setSize] = useState<number>(10);
    const [startDate, setStartDate] = useState<String>();
    const [endDate, setEndDate] = useState<String>();
    const [getFrmInvestReportList, setFrmInvestReportList] = useState<Pageable<FrmInvestReportIf> | null>(null);
    const [getCount, setCount] = useState({
      completedCount:0,
      pendingCount:0,
      totalCount:0
    });
    const [loading, setLoading] = useState<boolean>(true);
    const [refresh, setRefresh] = useState(false);

    const defaultFilter: ReportFilters = {
      fromDate: moment().startOf("month").toDate(),
      toDate: moment().toDate(),
      wfLabel: null,
      accountNo: null,
      status: "ALL",
      decision: "ALL",
      taskStatus: "",
    };

      const [filter, setFilter] = useState<ReportFilters | null>(defaultFilter);

      const handlePassFilters = (filters: ReportFilters) => {
        setFilter(filters);
      };

      const handleFrmIvestReportList = useCallback(async () => {
        setLoading(true);
        
        const startDate = filter?.fromDate ? moment(filter.fromDate).format("YYYY-MM-DD") : moment().format("YYYY-MM-DD");
        const endDate = filter?.toDate ? moment(filter.toDate).format("YYYY-MM-DD") : moment().format("YYYY-MM-DD");
        setStartDate(startDate);
        setEndDate(endDate);
    
        const wfLabelVal = filter?.wfLabel || '';
        const accountNumVal = filter?.accountNo || '';
        const decision = filter?.decision || "ALL"; 
        const status = filter?.status || "ALL";         
        const resultCategory= filter?.taskStatus || 'ALL';
      
        const { data, err } = await Api.performRequest((r) =>
          r.reports.getFrmInvestReport(
            startDate,
            endDate,
            wfLabelVal,
            accountNumVal,
            decision,
            status,
            resultCategory,
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
          console.log(data)
          setFrmInvestReportList(data);
          console.log('getFrmInvestReportList',data)
        }
        setLoading(false);
      }, [filter, size, page]);

      const getTaskDetails = useCallback(async () => {

        const startDate = filter?.fromDate ? moment(filter.fromDate).format("YYYY-MM-DD") : moment().format("YYYY-MM-DD");
        const endDate = filter?.toDate ? moment(filter.toDate).format("YYYY-MM-DD") : moment().format("YYYY-MM-DD");
        setStartDate(startDate);
        setEndDate(endDate);
        const accountNumVal = filter?.accountNo || '';
        const Status = filter?.status || 'ALL';
        const decision = filter?.decision || 'ALL';
        const wfLabelVal = filter?.wfLabel || '';

        const { data, err } = await Api.performRequest((r) =>
          r.reports.getTaskDetailz(
            startDate,
            endDate,
            accountNumVal,
            Status,
            decision,
            wfLabelVal
          )
        );

        Logger.debug(
          "(History Process List) => { DATA: " +
          JSON.stringify(data) +
          " , ERROR: " +
          JSON.stringify(err)
        );
    
        if (data !== null) {
          setCount(data);
          console.log('data',data)
          console.log('getCount',getCount)
        }

      },[filter, size, page]);

      useEffect(() => {
        handleFrmIvestReportList();
        getTaskDetails();
        setRefresh(false)
      }, [page, filter, handleFrmIvestReportList,refresh]);

    return (
        <div className="px-12 pb-12">
      <TaskPadFilters handlePassFilters={handlePassFilters} title="FRM Investigation" getCount={getCount}/>
      {loading ? (
        <Ve3LoadingScreen />
      ) : (
        <>
          <FrmInvestReportTable
            getFrmInverstReportList={getFrmInvestReportList || null}
            setPage={setPage}
            page={page}
            setRefresh={setRefresh}
          />
        </>
      )}
    </div>
    );
};

export default FrmInviestigationReport;