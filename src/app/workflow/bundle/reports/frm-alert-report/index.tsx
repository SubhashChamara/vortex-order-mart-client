import { useState, useEffect, useCallback } from "react";
import AlertStatusFilter, { AlertStatusFilters } from "./components/AlertStatusFilter";
import AlertStatusTable from "./components/AlertStatusTable";
import { Api } from "../../../../../api/Api";
import { Pageable } from "../../../../../api/types/Pageable";
import Ve3LoadingScreen from "../../../../../@core/ui/Ve3LoadingScreen/Ve3LoadingScreen";
import { Button } from "@mui/material";
import moment from "moment";

const AlertStatusBulkDownloadReport = () => {
  const [filters, setFilters] = useState<AlertStatusFilters | null>(null);
  const [data, setData] = useState<Pageable<any> | null>(null);
  const [page, setPage] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);
  const [size, setSize] = useState<number>(10);

  const startDate = filters?.startDate ? moment(filters.startDate).format("YYYY-MM-DD") : moment().format("YYYY-MM-DD");
  const endDate = filters?.endDate ? moment(filters.endDate).format("YYYY-MM-DD") : moment().format("YYYY-MM-DD");

  const fetchData = useCallback(async () => {
    if (!filters) return;
    setLoading(true);
    try {
      const { data: response } = await Api.performRequest((r) =>
        r.reports.getAlertStatusData(
          startDate,
          endDate,
          size,
          page
        )
      );
      setData(response);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  }, [filters,size, page]);

  const handleDownloadExcel = async () => {
    if (!filters) return;
    try {

      const { data: file } = await Api.performRequest((r) =>
        r.reports.downloadAlertStatusExcel(
          startDate,
          endDate,
        )
      );

      const blob = new Blob([file], { type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" });
      const url = window.URL.createObjectURL(blob);

      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "AlertStatusReport.xlsx");
      document.body.appendChild(link);
      link.click();
      link.parentNode?.removeChild(link);
    } catch (error) {
      console.error("Error downloading Excel file:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return (
    <div className="p-6">
      <AlertStatusFilter handleApplyFilters={setFilters} handleGenerate={handleDownloadExcel}/>
      {loading ? (
        <Ve3LoadingScreen />
      ) : (
        <AlertStatusTable data={data} page={page} setPage={setPage} />
      )}
    </div>
  );
};

export default AlertStatusBulkDownloadReport;
