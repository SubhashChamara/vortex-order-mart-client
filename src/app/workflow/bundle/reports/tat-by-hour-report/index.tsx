import { Paper } from "@mui/material";
import moment from "moment";
import { useEffect, useState } from "react";
import Ve3LoadingScreen from "../../../../../@core/ui/Ve3LoadingScreen/Ve3LoadingScreen";
import Logger from "../../../../../@helpers/Logger";
import { Api } from "../../../../../api/Api";
import { Pageable } from "../../../../../api/types/Pageable";
import { TaskDetailInfo } from "../../../../core/types/TaskDetailInfo";
import TatAppRAHSearch from "./components/tatByHourSearch";
import TatAppRAHTable from "./components/tatByHourTable";

const TatByHourReport = () => {

    type FK_Task01Props = {
        task: TaskDetailInfo;
    };

    const [isTimeRestricted, setIsTimeRestricted] = useState(false);
    const [getLoader, setLoader] = useState<boolean | null>(false);
    const [getData, setData] = useState<Pageable<Object | null>>();

    const handleSearchData = async (payload: {
        startDate: Date | null;
        endDate: Date | null;
        workflow: string;
    }) => {
        await loadReportData(payload.startDate, payload.endDate, payload.workflow);
    };

    const checkTimeRestriction = () => {
        const currentTime = new Date();
        const currentHours = currentTime.getHours();
        const currentMinutes = currentTime.getMinutes();
        const currentTotalMinutes = currentHours * 60 + currentMinutes;

        const morningEndMinutes = 9 * 60 + 30; 
        const eveningStartMinutes = 17 * 60 + 30; 

        if (
            currentTotalMinutes > eveningStartMinutes ||
            currentTotalMinutes < morningEndMinutes
        ) {
            setIsTimeRestricted(true);
        } else {
            setIsTimeRestricted(false);
        }
    };

    useEffect(() => {
        checkTimeRestriction();
    }, []);


    const loadReportData = async (
        startDate: Date | null,
        endDate: Date | null,
        workflow: string
    ) => {
        setLoader(true);
        const formattedStartDate = startDate ? moment(startDate).format("YYYY-MM-DD") : moment().format("YYYY-MM-DD");
        const formattedEndDate = endDate ? moment(endDate).format("YYYY-MM-DD") : moment().format("YYYY-MM-DD");

        const { data, err } = await Api.performRequest((r) =>
            r.reports.getAppReceivedAtHourReport(formattedStartDate, formattedEndDate, workflow)
        );

        Logger.debug(
            "(Search Data) => { DATA: " +
            JSON.stringify(data) +
            " , ERROR: " +
            JSON.stringify(err)
        );

        if (err) {
            setLoader(false);
        }

        if (data) {
            setData(data);
            setLoader(false);
        }
    }

    return (
        <div className="px-12 pb-12">
            <TatAppRAHSearch onSearchData={handleSearchData} isTimeRestricted={isTimeRestricted} />
            {getLoader ? (
                <Ve3LoadingScreen />
            ) : (
                isTimeRestricted && getData?.hasOwnProperty && (
                    <TatAppRAHTable reportData={getData} />
                )
            )}

            {!isTimeRestricted && (
                <Paper className="w-full overflow-hidden p-12">
                    <div className="flex items-center justify-center">
                        <p className="text-red-600 text-14 font-bold">
                            You Can't Access This Report Now. Please Run This Report Before
                            9:30 A.M Or After 5:30 P.M
                        </p>
                    </div>
                </Paper>
            )}
        </div>
    );
};

export default TatByHourReport;