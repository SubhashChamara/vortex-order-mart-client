import { Button, Divider, Paper } from "@mui/material";
import { FC, useEffect } from "react";
import { useNavbarState } from "../../../../../@context/NavbarProvider";
import { useThemeMediaQuery } from "../../../../../@edgevantage/hooks";
import ReworkCountDto from "../@types/ReworkCountDto";


type ReportFiltersProps = {
    countData: ReworkCountDto[] | [];
    onClickDef: (payload: {
        defKey: string | "";
    }) => void;

};

const ReworkWorkflowTable: FC<ReportFiltersProps> = ({ countData, onClickDef }) => {
    const { mobileOpen } = useNavbarState();
    const isMobile = useThemeMediaQuery((theme) => theme.breakpoints.down("lg"));

    const handleClick = (defKey: string) => {
        onClickDef({ defKey });
    };

    useEffect(() => {

    }, []);

    return (
        <Paper elevation={3} style={{ padding: '16px', margin: '16px 0' }}>
            <div className="text-xs font-semibold tracking-wide text-left">
                <div className="flex justify-between items-center mb-4">
                    <div className="text-red-600 font-bold flex-col pl-6">
                        <div>Rework</div>
                        <div className="text-[12px] text-gray">
                            This provides rework workflow count information
                        </div>
                    </div>
                </div>
            </div>
            <Divider></Divider>
            <div className="w-full overflow-x-auto">
                {countData && countData.length > 0 ? (
                    <table id="my-table" className="w-full whitespace-no-wrap">
                        <thead>
                            <tr className="whitespace-nowrap divide-x-1">
                                <th className="p-6 text-left">Workflow</th>
                                <th className="p-6 text-left">Workflow Count</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white whitespace-nowrap">
                            {countData.map((item, index) => (
                                <tr key={index} className="text-black h-full bg-white shadow-2">
                                    <td className="p-6 text-[12px] align-middle text-left">
                                        <p className="text-[12px] text-gray font-bold">
                                            {item.workflowName}
                                        </p>
                                    </td>
                                    <td
                                        style={{

                                            padding: '12px',
                                            textAlign: 'left',
                                        }}

                                    >
                                        <Button
                                            variant="outlined"
                                            className="w-32 px-24 border-gray bg-grey-50 text-gray-800 cursor-pointer hover:bg-gray-200 focus:outline-none active:scale-95 active:bg-gray-300"
                                            disabled={item.count == 0}
                                            onClick={(e) => {
                                                e.preventDefault();
                                                handleClick(item.defKey);
                                            }}
                                        >
                                            {item.count}
                                        </Button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                ) : (
                    <div className="mt-4 flex items-center justify-center">
                        <p className="text-14 font-bold">
                            No records found for the selected date range
                        </p>
                    </div>
                )}
            </div>
        </Paper>

    );

};

export default ReworkWorkflowTable;
