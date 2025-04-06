import { useEffect, useState } from 'react';
import Logger from '../../../../../@helpers/Logger';
import EdgeAdminContentLayout from "../../../../../@layout/EdgeAdminContentLayout";
import EdgeSimplePage from "../../../../../@layout/EdgeSimplePage";
import { Api } from '../../../../../api/Api';
import CreateReport from './components/CreateReport';
import { Report } from '../../../types/Report';
import ReportList from './components/ReportList';
import { ProcessInfo } from '../../../types/ProcessInfo';
import { Pageable } from '../../../../../api/types/Pageable';

const AddReport = () => {
    const [actionName, setActionName] = useState<string>("CREATE");
    const [formTitle, setFormTitle] = useState<string>("Create New Report");
    const [reportInfoList, setReportInfoList] = useState<Pageable<Report> | null>(null);
    const [reportForUpdate, setReportForUpdate] = useState<Report | null>(null);
    const [processInfo, setProcessInfo] = useState<ProcessInfo[]>([]);
    const [page, setPage] = useState<number>(0);
    const [size, setSize] = useState<number>(10);

    const fetchProcessList = async () => {
        try {
            const { data, err } = await Api.performRequest((r) =>
                r.admin.processInfoList()
            );
            if (data != null) {
                setProcessInfo(data);
            }
        } catch (e) {
            Logger.error("Error while fetching process list");
        }
    }

    const fetchReportList = async () => {
        try {
            const { data, err } = await Api.performRequest((r) =>
                r.admin.getAllReports(size, page)
            );

            Logger.debug(
                "(Process List) => { DATA: " +
                JSON.stringify(data) +
                " , ERROR: " +
                JSON.stringify(err)
            );

            if (data !== null) {
                setReportInfoList(data);
            }
        } catch (e) {
            Logger.error("Error while fetching report list");
        }
    };

    useEffect(() => {
        fetchReportList()
    }, [size, page])


    useEffect(() => {
        fetchProcessList();
        fetchReportList();
    }, [])

    const selectedReport = (report: Report) => {
        setActionName("UPDATE");
        setFormTitle("Update Report");
        setReportForUpdate(report);
    }
    const formReset = () => {
        setActionName("CREATE");
        setFormTitle("Create New Report");
        setReportForUpdate(null);
    }


    return (
        <>
            <EdgeSimplePage
                title="Add Report"
                icon="/assets/icons/admin/admin-tool-icons/add-report.png"
                mainBreadCrumb={{ name: "Admin Tools", url: "/admin-tools" }}
                subBreadCrumbs={[
                    { name: "Add Report", url: "/admin-tools/add-report" },
                ]}
                content={
                    <>
                        <EdgeAdminContentLayout
                            formComponent={
                                <CreateReport
                                    formTitle={formTitle}
                                    actionName={actionName}
                                    reportForUpdate={reportForUpdate}
                                    formReset={formReset}
                                    fetchReportList={fetchReportList}
                                    processInfo={processInfo}
                                />}
                            tableComponent={
                                <>
                                    <ReportList
                                        reportList={reportInfoList}
                                        selectedReport={selectedReport}
                                        setPage={setPage}
                                        page={page}
                                    />
                                </>
                            }
                        />
                    </>
                }
            />
        </>
    );
};

export default AddReport;


