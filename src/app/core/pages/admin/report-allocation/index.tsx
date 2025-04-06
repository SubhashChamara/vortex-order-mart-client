import { Autocomplete, TextField } from "@mui/material";
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import Grid from '@mui/material/Grid';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Paper from '@mui/material/Paper';
import { FC, useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { useNavbarState } from "../../../../../@context/NavbarProvider";
import { useThemeMediaQuery } from "../../../../../@edgevantage/hooks";
import Logger from "../../../../../@helpers/Logger";
import { ProcessInfo } from "../../../types/ProcessInfo";
import { TaskDetailInfo } from "../../../types/TaskDetailInfo";
import { UserRoleInfo } from "../../../types/UserRoleInfo";
import { Api } from "../../../../../api/Api";
import { Report } from "../../../types/Report";
import { ReportAllocationRequestIf } from "../../../types/ReportAllocationRequest";
import EdgeSimplePage from "../../../../../@layout/EdgeSimplePage";


type FormType = {
    userRole: UserRoleInfo | null;
    processLeft: ProcessInfo | null;
    processRight: ProcessInfo | null;

};

const defaultValues: FormType = {
    userRole: null,
    processLeft: null,
    processRight: null
};

function not(a: Report[], b: Report[]) {
    return a.filter((value) => b.indexOf(value) === -1);
}


function intersection(a: Report[], b: Report[]) {
    return a.filter((value) => b.indexOf(value) !== -1);
}


const ReportAllocation = () => {
    const [roleList, setRoleList] = useState<UserRoleInfo[]>([]);
    const [checked, setChecked] = useState<Report[]>([]);
    const [left, setLeft] = useState<Report[]>([]);
    const [right, setRight] = useState<Report[]>([]);
    const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
    const [processList, setProcessList] = useState<ProcessInfo[]>([]);
    const leftChecked = intersection(checked, left);
    const rightChecked = intersection(checked, right);

    const handleToggle = (value: Report) => () => {
        const currentIndex = checked.indexOf(value);
        const newChecked = [...checked];

        if (currentIndex === -1) {
            newChecked.push(value);
        } else {
            newChecked.splice(currentIndex, 1);
        }

        setChecked(newChecked);
    };

    const handleAllRight = () => {
        setRight(right.concat(left));
        setLeft([]);
    };

    const handleCheckedRight = () => {
        setRight(right.concat(leftChecked));
        setLeft(not(left, leftChecked));
        setChecked(not(checked, leftChecked));
    };

    const handleCheckedLeft = () => {
        setLeft(left.concat(rightChecked));
        setRight(not(right, rightChecked));
        setChecked(not(checked, rightChecked));
    };

    const handleAllLeft = () => {
        setLeft(left.concat(right));
        setRight([]);
    };

    const fetchProcessList = async () => {
        const { data, err } = await Api.performRequest((r) =>
            r.admin.processInfoList()
        );
        if (data != null) {
            setProcessList(data)
        }
    }

    const fetchAllocatedReportList = async (roleId: string) => {
        const { data, err } = await Api.performRequest((r) =>
            r.admin.getAllocatedReports(roleId)
        );

        if (data !== null) {
            setRight(data);
        }
    };

    const fetchUnAllocatedReportList = async (roleId: string) => {
        const { data, err } = await Api.performRequest((r) =>
            r.admin.getUnAllocatedReports(roleId)
        );

        if (data !== null) {
            setLeft(data);
        }
    };

    const fetchRoleList = async () => {
        const { data, err } = await Api.performRequest((r) =>
            r.admin.userRoleInfoList()
        );

        Logger.debug(
            "(Role List) => { DATA: " +
            JSON.stringify(data) +
            " , ERROR: " +
            JSON.stringify(err)
        );

        if (data !== null) {
            setRoleList(data);
        }
    };


    useEffect(() => {
        fetchRoleList();
        fetchProcessList();
    }, [])

    const fetchReports = (role: UserRoleInfo | null) => {
        fetchAllocatedReportList(role?.id || "");
        fetchUnAllocatedReportList(role?.id || "");
    }



    const searchLeftVal = (defKey: string) => {
        setLeft(left?.map(report => {
            if (report?.processDefKey?.includes(defKey)) {
                report.isDisabled = false
            } else {
                report.isDisabled = true

            }
            return report
        }));
    }

    const searchRightVal = (defKey: string) => {
        setRight(right?.map(report => {
            if (report?.processDefKey?.includes(defKey)) {
                report.isDisabled = false
            } else {
                report.isDisabled = true

            }
            return report
        }));
    }




    const customList = (title: string, reports: Report[], side: string) => (
        <>
            <div className=" border-gray-700 bg-white border-1 p-4 pl-20 mb-10 rounded-sm">{title}</div>
            {(side === "left") && (
                <Controller
                    name="processLeft"
                    control={control}
                    render={({ field: { onChange, value } }) => (
                        <Autocomplete
                            options={processList}
                            getOptionLabel={(option) => (option ? option.name : "")}
                            isOptionEqualToValue={(option, val) => option.id === val.id}
                            value={value}
                            onChange={(event, newValue) => {
                                onChange(newValue);
                                searchLeftVal(newValue?.defKey || "");
                            }}
                            renderInput={(params) => (
                                <TextField
                                    className="bg-white"
                                    {...params}
                                    label="Process"
                                    placeholder="Select Process"
                                    size="small"
                                    error={!!errors.userRole}
                                    helperText={errors?.userRole?.message}
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                />
                            )}
                        />
                    )}
                />
            )}
            {(side === "right") && (
                <Controller
                    name="processRight"
                    control={control}
                    render={({ field: { onChange, value } }) => (
                        <Autocomplete
                            options={processList}
                            getOptionLabel={(option) => (option ? option.name : "")}
                            isOptionEqualToValue={(option, val) => option.id === val.id}
                            value={value}
                            onChange={(event, newValue) => {
                                onChange(newValue);
                                searchRightVal(newValue?.defKey || "");
                            }}
                            renderInput={(params) => (
                                <TextField
                                    className="bg-white"
                                    {...params}
                                    label="Process"
                                    placeholder="Select Process"
                                    size="small"
                                    error={!!errors.userRole}
                                    helperText={errors?.userRole?.message}
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                />
                            )}
                        />
                    )}
                />
            )}


            <Paper className='min-h-screen' sx={{ width: '32vw', height: 230, overflow: 'auto', mt: 1 }}>
                <List dense component="div" role="list">
                    {reports?.map((report: Report) => {
                        const labelId = `transfer-list-item-${report.name}-label`;
                        return (
                            (!report.isDisabled) &&
                            <ListItemButton
                                key={report.id}
                                onClick={handleToggle(report)}
                            >
                                <ListItemIcon>
                                    <Checkbox
                                        checked={checked.indexOf(report) !== -1}
                                        tabIndex={-1}
                                        disableRipple
                                        inputProps={{
                                            'aria-labelledby': labelId,
                                        }}
                                    />
                                </ListItemIcon>
                                <ListItemText id={labelId} primary={`${report.name}`} />
                            </ListItemButton>

                        )
                    })

                    }
                </List>
            </Paper>
        </>
    );

    const { mobileOpen } = useNavbarState();
    const isMobile = useThemeMediaQuery((theme) => theme.breakpoints.down("lg"));

    const { control, handleSubmit, formState } = useForm<FormType>({
        mode: "onChange",
        defaultValues,
        // resolver: zodResolver(schema),
    });
    const { errors } = formState;

    const handleOnSubmit = async (formData: FormType) => {
        const { userRole } = formData;

        if (isSubmitted) {
            Logger.debug("Form Already Submitted");
            return;
        }
        setIsSubmitted(true);

        if (userRole === null) {
            Logger.debug("User Role cannot be null");
            setIsSubmitted(false);
            return;
        }

        const request: ReportAllocationRequestIf = {
            userRole: userRole.id,
            reports: right.map(report => report.id),

        };

        const { data, err } = await Api.performRequest((r) =>
            r.admin.createReportAllocation(request)
        );

        if (err === null) {
            toast.success("Successfully Saved Allocation Details");
            setIsSubmitted(false);
        } else {
            toast.error(err.msg);
            setTimeout(() => setIsSubmitted(false), 3000);
        }

        Logger.debug(`Form Submitted: ${JSON.stringify(formData)}`);

        Logger.debug(`Form Submitted: ${JSON.stringify(formData)}`);
    };

    return (
        <>
            <EdgeSimplePage
                title="Report Allocation"
                icon="/assets/icons/admin/admin-tool-icons/report-allocation.png"
                mainBreadCrumb={{ name: "Admin Tools", url: "/admin-tools" }}
                subBreadCrumbs={[{ name: "Report Allocation", url: "/admin-tools/report-allocation" }]}
                content={

                    <form onSubmit={handleSubmit(handleOnSubmit)}>
                        <Grid className='min-h-screen p-10' container spacing={2} justifyContent="center" alignItems="center">

                            <Grid item className="">
                                <Grid className="mb-20">
                                    <div
                                        className={`grid grid-cols-1 gap-9 ${mobileOpen && isMobile
                                            ? "sm:grid-cols-1 md:grid-cols-2"
                                            : "sm:grid-cols-2 md:grid-cols-1"
                                            } lg:grid-cols-1`}
                                    >
                                        <Controller
                                            name="userRole"
                                            control={control}
                                            render={({ field: { onChange, value } }) => (
                                                <Autocomplete
                                                    options={roleList}
                                                    getOptionLabel={(option) => (option ? option.name : "")}
                                                    isOptionEqualToValue={(option, val) => option.id === val.id}
                                                    value={value}
                                                    onChange={(event, newValue) => {
                                                        onChange(newValue);
                                                        fetchReports(newValue);
                                                    }}
                                                    renderInput={(params) => (
                                                        <TextField
                                                            className="bg-white"

                                                            {...params}
                                                            label="User Role"
                                                            required
                                                            placeholder="Select User Role"
                                                            size="small"
                                                            error={!!errors.userRole}
                                                            helperText={errors?.userRole?.message}
                                                            InputLabelProps={{
                                                                shrink: true,
                                                            }}
                                                        />
                                                    )}
                                                />
                                            )}
                                        />


                                    </div>
                                </Grid >

                                {customList("Un-Allocated Reports", left, "left")}
                                <div className="flex justify-center my-6">

                                </div>
                            </Grid>
                            <Grid item>
                                <Grid container direction="column" alignItems="center">
                                    <Button
                                        sx={{
                                            my: 0.5,
                                            borderColor: 'red',
                                            color: 'white',
                                            '&:hover': {
                                                backgroundColor: 'red',
                                                borderColor: 'red',
                                                color: 'white'
                                            },
                                        }}
                                        variant="outlined"
                                        size="small"
                                        onClick={handleAllRight}
                                        disabled={left.length === 0}
                                        aria-label="move all right"
                                    >
                                        ≫
                                    </Button>
                                    <Button
                                        sx={{
                                            my: 0.5,
                                            borderColor: 'red',
                                            color: 'white',
                                            '&:hover': {
                                                backgroundColor: 'red',
                                                borderColor: 'red',
                                                color: 'white'
                                            },
                                        }}
                                        variant="outlined"
                                        size="small"
                                        onClick={handleCheckedRight}
                                        disabled={leftChecked.length === 0}
                                        aria-label="move selected right"
                                    >
                                        &gt;
                                    </Button>
                                    <Button
                                        sx={{
                                            my: 0.5,
                                            borderColor: 'red',
                                            color: 'white',
                                            '&:hover': {
                                                backgroundColor: 'red',
                                                borderColor: 'red',
                                                color: 'white'
                                            },
                                        }}
                                        variant="outlined"
                                        size="small"
                                        onClick={handleCheckedLeft}
                                        disabled={rightChecked.length === 0}
                                        aria-label="move selected left"
                                    >
                                        &lt;
                                    </Button>
                                    <Button
                                        sx={{
                                            my: 0.5,
                                            borderColor: 'red',
                                            color: 'white',
                                            '&:hover': {
                                                backgroundColor: 'red',
                                                borderColor: 'red',
                                                color: 'white'
                                            },
                                        }}
                                        variant="outlined"
                                        size="small"
                                        onClick={handleAllLeft}
                                        disabled={right.length === 0}
                                        aria-label="move all left"
                                    >
                                        ≪
                                    </Button>
                                </Grid>
                            </Grid>
                            <Grid item className="mt-28">
                                <Grid className="mb-20 flex justify-end">
                                    <div
                                        className={`grid grid-cols-1 gap-9 ${mobileOpen && isMobile
                                            ? "sm:grid-cols-1 md:grid-cols-2"
                                            : "sm:grid-cols-2 md:grid-cols-1"
                                            } lg:grid-cols-1`}
                                    >
                                        <Button
                                            variant="contained"
                                            color="error"
                                            className=" w-100"
                                            aria-label="Sign in"
                                            type="submit"
                                            size="large"
                                        >
                                            Save
                                        </Button>
                                    </div>
                                </Grid >
                                <Grid className="mb-44">

                                    {customList("Allocated Reports", right, "right")}
                                </Grid>

                            </Grid>
                        </Grid>
                    </form>
                }
            />
        </>

    );

}

export default ReportAllocation;

