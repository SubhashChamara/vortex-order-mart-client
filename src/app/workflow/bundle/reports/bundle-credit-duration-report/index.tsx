import { useCallback, useEffect, useState } from "react";
import Ve3LoadingScreen from "../../../../../@core/ui/Ve3LoadingScreen/Ve3LoadingScreen";
import Logger from "../../../../../@helpers/Logger";
import { Api } from "../../../../../api/Api";
import { Pageable } from "../../../../../api/types/Pageable";
import { BundleCD, BundleCDSearchData } from "../../../../core/types/reports/BundleCD";
import { TaskDetailInfo } from "../../../../core/types/TaskDetailInfo";
import BundleCDReportTable from "./components/bundleCDReportTable";
import BundleCDSearchTable from "./components/bundleCDSearchTable";


const BundleCDReport = () => {

    type FK_Task01Props = {
        task: TaskDetailInfo;
    };

    const [getSearchData, setSearchData] = useState<BundleCDSearchData | null>(null);
    const [page, setPage] = useState<number>(0);
    const [size, setSize] = useState<number>(10);
    const [getBundledCDTableData, setBundledCDTableData] = useState<Pageable<BundleCD> | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [selectedRole, setSelectedRole] = useState<string>('');
    const [selectedDuration, setSelectedDuration] = useState<string>('');

    const loadReportSearchData = async () => {

        const { data, err } = await Api.performRequest((r) =>
            r.reports.getBundleCDSearchData()
        );

        Logger.debug(
            "(Search Data) => { DATA: " +
            JSON.stringify(data) +
            " , ERROR: " +
            JSON.stringify(err)
        );

        if (data !== null) {
            setSearchData(data);
        }
    }

    const handleValueClick = (role: string, duration: string) => {
        setSelectedRole(role);
        setSelectedDuration(duration);

    };

    const handleTableData = useCallback(async () => {
    setLoading(true);
    const { data, err } = await Api.performRequest((r) =>
        r.reports.getBundleCDTableData(selectedRole, selectedDuration, size, page)
    );

    Logger.debug(
        "(Search Data) => { DATA: " +
        JSON.stringify(data) +
        " , ERROR: " +
        JSON.stringify(err)
    );

    if (err) {
        setLoading(false);
    } else if (data !== null) {
        setBundledCDTableData(data);
        setLoading(false);
    }
}, [selectedRole, selectedDuration, size, page]);



    useEffect(() => {
        loadReportSearchData();
        handleTableData();
    }, [handleTableData]);


    return (
        <div className="px-12 pb-12">
        <BundleCDSearchTable
            onValueClick={handleValueClick}
            getSearchData={getSearchData || ({} as BundleCDSearchData)}
        />
        {loading ? (
            <Ve3LoadingScreen />
        ) : (
            getBundledCDTableData && (
                <BundleCDReportTable
                    getBundledCDTableData={getBundledCDTableData}
                    setPage={setPage}
                    page={page}
                />
            )
        )}
    </div>
    );
};

export default BundleCDReport;