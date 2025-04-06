import { Pagination, Paper } from "@mui/material";
import { FC, useEffect, useState } from "react";
import { useNavbarState } from "../../../../../../@context/NavbarProvider";
import { useThemeMediaQuery } from "../../../../../../@edgevantage/hooks";

type ReportFiltersProps = {
    reportData: Object | null;

};

const TatAppRAHTable: FC<ReportFiltersProps> = ({ reportData }) => {

    const { mobileOpen } = useNavbarState();
    const isMobile = useThemeMediaQuery((theme) => theme.breakpoints.down("lg"));
    const [getData, setData] = useState<Object | null>(null);
    const [page, setPage] = useState(0);
    const itemsPerPage = 10;

    const dataEntries = Object.entries(getData || {});
    const totalPages = Math.ceil(dataEntries.length / itemsPerPage);

    const currentData = dataEntries.slice(
        page * itemsPerPage,
        (page + 1) * itemsPerPage
    );

    const handlePageChange = (event: any, value: any) => {
        setPage(value - 1);
    };
    useEffect(() => {
        if (reportData) {
            setData(reportData);
        }
        if (page >= totalPages) {
            setPage(0);
        }

    }, [reportData, totalPages, getData]);


    return (
        <Paper elevation={3} style={{ padding: '16px', margin: '16px 0' }}>

            <div className="w-full overflow-x-auto">
                <table id="my-table" className="w-full whitespace-no-wrap">
                    <thead>
                        <tr className="divide-x-1 h-full">
                            <th className="p-6 text-left">Task Category</th>
                            <th className="p-6 text-left">12:00am - 8:30am</th>
                            <th className="p-6 text-left">8:30am - 9:30am</th>
                            <th className="p-6 text-left">9:30am - 10:30am</th>
                            <th className="p-6 text-left">10:30am - 11:30am</th>
                            <th className="p-6 text-left">11:30am - 12:30pm</th>
                            <th className="p-6 text-left">12:30pm - 1:30pm</th>
                            <th className="p-6 text-left">1:30pm - 2:30pm</th>
                            <th className="p-6 text-left">2:30pm - 3:30pm</th>
                            <th className="p-6 text-left">3:30pm - 4:30pm</th>
                            <th className="p-6 text-left">4:30pm - 5:30pm</th>
                            <th className="p-6 text-left">5:30pm - 6:30pm</th>
                            <th className="p-6 text-left">6:30pm - 12:00am</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white whitespace-nowrap">
                        {currentData.length > 0 ? (
                            currentData.map(([groupName, timeslots], index) => (
                                <tr key={index} className="text-black h-full bg-white shadow-2">
                                    <td className="p-6 text-[12px] align-middle text-left">
                                        <p className="text-[12px] text-gray font-bold">{groupName}</p>
                                    </td>
                                    {Object.entries(timeslots).map(([timeslot, value], timeIndex) => (
                                        <td key={timeIndex} className="p-6 text-[12px] align-middle text-left">
                                            <p className="text-[12px] text-gray font-bold">{value}</p>
                                        </td>
                                    ))}
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="13" className="text-center p-6">
                                    No records found for the selected date range.
                                </td>
                            </tr>
                        )}
                    </tbody>

                </table>

            </div>
            <div className="flex items-center justify-center mt-4">
                <Pagination
                    count={totalPages}
                    siblingCount={0}
                    page={page + 1}
                    onChange={handlePageChange}
                />
            </div>
        </Paper>

    );

};

export default TatAppRAHTable;
