import { zodResolver } from "@hookform/resolvers/zod";
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
import { z } from "zod";
import { useThemeMediaQuery } from "../../../../@edgevantage/hooks";
import Logger from "../../../../@helpers/Logger";
import { Api } from "../../../../api/Api";
import { GroupAllocationRequest } from "../../../core/types/GroupAllocationRequest";
import { GroupInfo } from '../../../core/types/GroupInfo';
import { TaskDetailInfo } from "../../../core/types/TaskDetailInfo";
import { UserRoleInfo } from '../../../core/types/UserRoleInfo';
import { useNavbarState } from ".././../../../@context/NavbarProvider";
import { ProcessInfo } from "../../../core/types/ProcessInfo";

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

const schema = z.object({
  userRole: z
    .object({ id: z.string(), name: z.string() })
    .nullable()
    .refine((val) => val !== null, {
      message: "Please select user role",
    }),
  processLeft: z.object({ id: z.string(), name: z.string() }).nullable(),
  processRight: z.object({ id: z.string(), name: z.string() }).nullable(),
});

function not(a: GroupInfo[], b: GroupInfo[]) {
  return a.filter((value) => b.indexOf(value) === -1);
}


function intersection(a: GroupInfo[], b: GroupInfo[]) {
  return a.filter((value) => b.indexOf(value) !== -1);
}

type FK_Task01Props = {
  task: TaskDetailInfo;
};

const FK_Task01: FC<FK_Task01Props> = (props) => {
  const { task } = props;
  const [roleList, setRoleList] = useState<UserRoleInfo[]>([]);
  const [checked, setChecked] = useState<GroupInfo[]>([]);
  const [left, setLeft] = useState<GroupInfo[]>([]);
  const [right, setRight] = useState<GroupInfo[]>([]);
  const [allGroups, setAllGroups] = useState<GroupInfo[]>([]);
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [processList, setProcessList] = useState<ProcessInfo[]>([]);
  const leftChecked = intersection(checked, left);
  const rightChecked = intersection(checked, right);


  const handleToggle = (value: GroupInfo) => () => {
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
    console.log("process list", data)
    if (data != null) {
      setProcessList(data)
    }
  }

  const fetchAllocatedGroupList = async (roleId: string | null) => {
    const { data, err } = await Api.performRequest((r) =>
      r.admin.allocatedgroupList(roleId || "")
    );

    Logger.debug(
      "(Allocated Groups) => { DATA: " +
      JSON.stringify(data) +
      " , ERROR: " +
      JSON.stringify(err)
    );

    if (data !== null) {
      // data.map((group: { isDisabled: boolean; }) => group.isDisabled = true);
      setRight(data);
    }
  };

  const fetchUnAllocatedGroupList = async (roleId: string | null) => {
    const { data, err } = await Api.performRequest((r) =>
      r.admin.unAllocatedgroupList(roleId || "")
    );

    Logger.debug(
      "(Un-Allocated Groups) => { DATA: " +
      JSON.stringify(data) +
      " , ERROR: " +
      JSON.stringify(err)
    );

    if (data !== null) {
      // data.map((group: { isDisabled: boolean; }) => group.isDisabled = true);
      setLeft(data);
      console.log("left intital allocated", left)
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


  const fetchGroupAllocationData = async () => {
    const { data, err } = await Api.performRequest((r) =>
      r.admin.getGroupAllocationByProcess(task.processInstanceId)
    );

    Logger.debug(
      "(Role Allocation Process) => { DATA: " +
      JSON.stringify(data) +
      " , ERROR: " +
      JSON.stringify(err)
    )

    if (data !== null) {
      // data.map((group: { isDisabled: boolean; }) => group.isDisabled = true);
      setValue("userRole", data.userRoleInfo);
      setRight(data.groupInfoList);
      fetchAllGroups();
    }

  }

  useEffect(() => {
    setLeft(filterGroups(allGroups, right));
  }, [allGroups])

  const filterGroups = (all: GroupInfo[], right: GroupInfo[]) => {
    return all.filter(group => !right.some(rightGroup => rightGroup.id === group.id));
  };

  const fetchAllGroups = async () => {
    console.log('call')
    const { data, err } = await Api.performRequest((r) =>
      r.admin.groupInfoList()
    );

    Logger.debug(
      "(All Groups) => { DATA: " +
      JSON.stringify(data) +
      " , ERROR: " +
      JSON.stringify(err)
    )

    if (data !== null) {
      setAllGroups(data);
    }
  }

  useEffect(() => {
    fetchRoleList();
    fetchProcessList();
    fetchGroupAllocationData();
  }, [])

  const fetchGroups = (role: UserRoleInfo | null) => {
    fetchAllocatedGroupList(role?.id || null);
    fetchUnAllocatedGroupList(role?.id || null);
  }



  const searchLeftVal = (defKey: string) => {
    console.log("search left", defKey)
    //search left  groups and defkey is equal to search set isDissabled value as false in that group otherwise set it as true
    setLeft(left.map(group => {
      if (group.processInfo?.defKey?.includes(defKey)) {
        group.isDisabled = false
      } else {
        group.isDisabled = true

      }
      return group
    }));
    console.log("new left	", left)
  }

  const searchRightVal = (defKey: string) => {
    console.log("search right", defKey)
    //search left  groups and defkey is equal to search set isDissabled value as false in that group otherwise set it as true
    setRight(right.map(group => {
      if (group.processInfo?.defKey?.includes(defKey)) {
        group.isDisabled = false
      } else {
        group.isDisabled = true

      }
      return group
    }));
    console.log("new right	", right)
  }



  const customList = (title: string, items: GroupInfo[], side: string) => (
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
          {items.map((value: GroupInfo) => {
            const labelId = `transfer-list-item-${value}-label`;
            // console.log("show component", value?.isDisabled)
            return (
              //return if  group is not disabled

              (!value.isDisabled) && (

                <ListItemButton
                  // disabled={value.isDisabled}
                  key={value.id}
                  role="listitem"
                  onClick={handleToggle(value)}
                >
                  <ListItemIcon>
                    <Checkbox
                      checked={checked.indexOf(value) !== -1}
                      tabIndex={-1}
                      disableRipple
                      inputProps={{
                        'aria-labelledby': labelId,
                      }}
                    />
                  </ListItemIcon>
                  <ListItemText id={labelId} primary={`${value.name}`} />
                </ListItemButton>
              )
            )
          })}
        </List>
      </Paper>
    </>
  );

  const { mobileOpen } = useNavbarState();
  const isMobile = useThemeMediaQuery((theme) => theme.breakpoints.down("lg"));

  const { control, handleSubmit, formState, setValue, watch } = useForm<FormType>({
    mode: "onChange",
    defaultValues,
    // resolver: zodResolver(schema),
  });
  const { errors } = formState;

  console.log("items", left, right)

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

    const request: GroupAllocationRequest = {
      idUserRole: userRole.id,
      groupIds: right.map(group => group.id),
      processInstance: task.processInstanceId,

    };

    const { data, err } = await Api.performRequest((r) =>
      r.admin.createGroupAllocation(request)
    );

    if (err === null) {
      toast.success("Successfully Saved Allocation Details");
      setIsSubmitted(false);
    } else {
      toast.error(err.msg);
      /**
       * set submit false to identify form submitted but failed
       * help to resubmit
       * and timeout prevent double clicks
       */
      setTimeout(() => setIsSubmitted(false), 3000);
    }

    Logger.debug(`Form Submitted: ${JSON.stringify(formData)}`);

    Logger.debug(`Form Submitted: ${JSON.stringify(formData)}`);
  };
  return (
    <>
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
                        fetchGroups(newValue);
                      }}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          className="bg-white"

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

            {customList("Un-Assigned Groups", left, "left")}
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
                  sx={{ mt: 1 }}

                >
                  Save
                </Button>
              </div>
            </Grid >
            <Grid className="mb-44">

              {customList("Assigned Groups", right, "right")}
            </Grid>

          </Grid>
        </Grid>
      </form>
    </>

  );

}

export default FK_Task01;

