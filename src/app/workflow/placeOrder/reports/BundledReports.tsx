import { useNavbarState } from "../../../../@context/NavbarProvider";

import EdgeSvgIcon from "../../../../@core/ui/EdgeSvgIcon";
import { Paper } from "@mui/material";
// import ReportCard from "./components/ReportCard";

type Category = {
    icon: string;
    title: string;
    link: string;
};

const reportList: Category[] = [
    {
        icon: "/assets/icons/admin/admin-tool-icons/roll.png",
        title: "CASA BB ACCOUNT EOD REPORT",
        link: "/my-reports/bndld-reports/ch-bb-acc-eod-report",
    }
];


const Reports = () => {
    const { mobileOpen } = useNavbarState();
    return (
        <>
            <Paper className="my-12 p-6 mx-12">
                <div className="flex ">
                    <EdgeSvgIcon
                        className="icon-size-28 cursor-pointer text-red-600"
                        color="error"
                    >
                        feather:file-text
                    </EdgeSvgIcon>
                    <div className="text-red-600 font-bold flex-col pl-6">
                        <div>Reports</div>
                        <div className="text-[12px] text-gray">
                            manage master reports
                        </div>
                    </div>
                </div>
            </Paper>
            <div
                className={`grid grid-cols-1  md:grid-cols-5 gap-12 px-12 ${mobileOpen
                    ? "sm:grid-cols-1 md:grid-cols-3"
                    : "sm:grid-cols-2 md:grid-cols-2"
                    }`}
            >
                {/* {reportList.map((category, index) => (
                    <ReportCard
                        title={category.title}
                        icon={category.icon}
                        link={category.link}
                        key={index}
                    />
                ))} */}
            </div>
        </>
    );
};

export default Reports;
