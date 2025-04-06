import { useCallback, useEffect, useState } from "react";
import Logger from "../../../../@helpers/Logger";
import { Api } from "../../../../api/Api";
import { ProcessInfo } from "../../../core/types/ProcessInfo";
import { TaskDetailInfo } from "../../../core/types/TaskDetailInfo";
import ReworkReportTable from "./components/reworkSearch";
import ReworkWorkflowDataTable from "./components/reworkWorkflowDataTable";
import ReworkWorkflowTable from "./components/reworkWorkflowTable";
import moment from "moment";
import ReworkCountDto from "./@types/ReworkCountDto";
import Ve3LoadingScreen from "../../../../@core/ui/Ve3LoadingScreen/Ve3LoadingScreen";
import ReworkDetailsDto from "./@types/ReworkDetailsDto";
import { Pageable } from "../../../../api/types/Pageable";



const ReworkReport = () => {

    type FK_Task01Props = {
        task: TaskDetailInfo;
    };

    const [processInfo, setProcessInfo] = useState<ProcessInfo[]>([]);
    const [getReworkCountData, setReworkCountData] = useState<ReworkCountDto[]>([]);
    const [getCountLoader, setCountLoader] = useState<boolean | null>(false);
    const [getReworkData, setReworkData] = useState<Pageable<ReworkDetailsDto> | null>(null);
    const [getReworkLoader, setReworkLoader] = useState<boolean | null>(false);
    const [page, setPage] = useState<number>(0);
    const [size, setSize] = useState<number>(10);
    const [getDefKey, setDefKey] = useState<string>("");
    const [getRework, setRework] = useState<boolean | null>(false);
    const [getReworkCount, setReworkCount] = useState<boolean | null>(false);

    useEffect(() => {
        fetchProcessList();
    }, [])


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

    const handleSearchData = async (payload: {
        startDate: Date | null;
        endDate: Date | null;
        defKey: string | '';
    }) => {
        await loadReworkCountData(payload.startDate, payload.endDate, payload.defKey);
    };

    const onClickDef = async (payload: { defKey: string | "" }) => {
        setDefKey(payload.defKey);
        setPage(0);
    };

    const loadReworkCountData = async (
        startDate: Date | null,
        endDate: Date | null,
        defKey: string | ''
    ) => {
        setCountLoader(true);
        const formattedStartDate = startDate ? moment(startDate).format("YYYY-MM-DD") : moment().format("YYYY-MM-DD");
        const formattedEndDate = endDate ? moment(endDate).format("YYYY-MM-DD") : moment().format("YYYY-MM-DD");
        const defKeyVal = defKey === '' ? null : defKey;
        const { data, err } = await Api.performRequest((r) =>
            r.reports.getReworkCountData(formattedStartDate, formattedEndDate, defKeyVal)
        );

        Logger.debug(
            "(Search Data) => { DATA: " +
            JSON.stringify(data) +
            " , ERROR: " +
            JSON.stringify(err)
        );

        if (err) {
            setCountLoader(false);
        }

        if (data) {
            setReworkCountData(data);
            setCountLoader(false);
            setReworkCount(true);
            setRework(false);
        }
    }

    const loadReworkData = async () => {
        try {
            setReworkLoader(true);
            const defKeyVal = getDefKey === "" ? null : getDefKey;

            const { data, err } = await Api.performRequest((r) =>
                r.reports.getReworkReportData(defKeyVal, size, page)
            );

            if (err) {
                console.error("Error: ", err);
                return;
            }

            if (data) {
                setReworkData(data);
                setRework(true);
            }
        } catch (error) {
            console.error("Unexpected Error: ", error);
        } finally {
            setReworkLoader(false);
        }
    };


    useEffect(() => {
        if (getDefKey) {
            loadReworkData();
        }
    }, [getDefKey, page, size]);


    return (
        <div className="px-12 pb-12">
            <ReworkReportTable onSearchData={handleSearchData} processInfo={processInfo} />
            {getCountLoader ? (
                <Ve3LoadingScreen />
            ) : (
                <>
                    {getReworkCount ? (
                        <ReworkWorkflowTable countData={getReworkCountData} onClickDef={onClickDef} />

                    ) : null}
                </>
            )}
            {getReworkLoader ? (
                <Ve3LoadingScreen />
            ) : (
                <>
                    {getRework ? (
                        <ReworkWorkflowDataTable
                            reworkData={getReworkData}
                            setPage={setPage}
                            page={page}
                        />
                    ) : null}
                </>
            )}


        </div>
    );
};

export default ReworkReport;