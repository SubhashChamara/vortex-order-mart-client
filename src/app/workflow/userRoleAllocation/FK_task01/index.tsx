import { zodResolver } from "@hookform/resolvers/zod";
import { Autocomplete, TextField } from "@mui/material";
import Button from "@mui/material/Button";
import Checkbox from "@mui/material/Checkbox";
import Grid from "@mui/material/Grid";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Paper from "@mui/material/Paper";
import { FC, useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { z } from "zod";
import { useThemeMediaQuery } from "../../../../@edgevantage/hooks";
import Logger from "../../../../@helpers/Logger";
import { Api } from "../../../../api/Api";

import { useNavbarState } from "../../../../@context/NavbarProvider";
import { TaskDetailInfo } from "../../../core/types/TaskDetailInfo";
import { UserRoleAllocationRequest } from "../../../core/types/UserRoleAllocationRequest";
import { UserInfo } from "../../createNewUser/@types/UserInfo";
import { UserRoleInfo } from "../types/UserRoleInfo";

type FormType = {
  user: UserInfo | null;
};

const defaultValues: FormType = {
  user: null,
};

const schema = z.object({
  user: z.unknown().refine((val) => val !== null, {
    message: "Please select a user",
  }),
});

function not(a: UserRoleInfo[], b: UserRoleInfo[]) {
  return a.filter((value) => b.indexOf(value) === -1);
}

function intersection(a: UserRoleInfo[], b: UserRoleInfo[]) {
  return a.filter((value) => b.indexOf(value) !== -1);
}

type FK_Task01Props = {
  task: TaskDetailInfo;
};

const FK_Task01: FC<FK_Task01Props> = (props) => {
  const { task } = props;

  const [userList, setUserList] = useState<UserInfo[]>([]);
  const [checked, setChecked] = useState<UserRoleInfo[]>([]);
  const [left, setLeft] = useState<UserRoleInfo[]>([]);
  const [right, setRight] = useState<UserRoleInfo[]>([]);
  const [allUserRoles, setAllUserRoles] = useState<UserRoleInfo[]>([]);
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const leftChecked = intersection(checked, left);
  const rightChecked = intersection(checked, right);

  const handleToggle = (value: UserRoleInfo) => () => {
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

  const fetchUserRoleAllocationData = async () => {
    const { data, err } = await Api.performRequest((r) =>
      r.admin.getUserRoleAllocationByProcess(task.processInstanceId)
    );

    Logger.debug(
      "(Role Allocation Process) => { DATA: " +
      JSON.stringify(data) +
      " , ERROR: " +
      JSON.stringify(err)
    );

    if (data !== null) {
      setValue("user", data.userInfo);
      setRight(data.userRoleInfo);
      fetchAllUserRoles();
    }
  };

  useEffect(() => {
    setLeft(filterUserRoles(allUserRoles, right));
  }, [allUserRoles]);

  const filterUserRoles = (all: UserRoleInfo[], right: UserRoleInfo[]) => {
    return all.filter(
      (userRole) =>
        !right.some((rightUserRole) => rightUserRole.id === userRole.id)
    );
  };

  const fetchAllUserRoles = async () => {
    console.log("call");
    const { data, err } = await Api.performRequest((r) =>
      r.admin.userRoleInfoList()
    );

    Logger.debug(
      "(All UserRoles) => { DATA: " +
      JSON.stringify(data) +
      " , ERROR: " +
      JSON.stringify(err)
    );

    if (data !== null) {
      setAllUserRoles(data);
    }
  };

  const fetchUserList = async () => {
    const { data, err } = await Api.performRequest((r) =>
      r.admin.getAllUsers()
    );

    Logger.debug(
      "(Users) => { DATA: " +
      JSON.stringify(data) +
      " , ERROR: " +
      JSON.stringify(err)
    );

    if (data !== null) {
      setUserList(data);
    }
  };

  const fetchUnallocatedUserRoleData = async (userId: string) => {
    const { data, err } = await Api.performRequest((r) =>
      r.admin.getUnallocatedRoleList(userId)
    );

    Logger.debug(
      "(Role Allocation Process) => { DATA: " +
      JSON.stringify(data) +
      " , ERROR: " +
      JSON.stringify(err)
    );

    if (data !== null) {
      setLeft(data);
    }
  };

  const fetchAllocatedUserRoleData = async (userId: string) => {
    const { data, err } = await Api.performRequest((r) =>
      r.admin.getAllocatedRoleList(userId)
    );

    Logger.debug(
      "(Role Allocation Process) => { DATA: " +
      JSON.stringify(data) +
      " , ERROR: " +
      JSON.stringify(err)
    );

    if (data !== null) {
      setRight(data);
    }
  };

  useEffect(() => {
    fetchUserList();
    fetchUserRoleAllocationData();
  }, []);

  const fetchUserRoles = (user: UserInfo | null) => {
    if (!user) {
      return;
    }
    fetchAllocatedUserRoleData(user.id);
    fetchUnallocatedUserRoleData(user.id);
  };

  const customList = (title: string, items: UserRoleInfo[]) => (
    <>
      <div className=" border-gray-700 bg-white border-1 p-4 pl-20 mb-10 rounded-sm">
        {title}
      </div>
      <Paper
        className="min-h-screen"
        sx={{ width: "32vw", height: 230, overflow: "auto" }}
      >
        <List dense component="div" role="list">
          {items.map((value: UserRoleInfo) => {
            const labelId = `transfer-list-item-${value}-label`;

            return (
              <ListItemButton
                key={value}
                role="listitem"
                onClick={handleToggle(value)}
              >
                <ListItemIcon>
                  <Checkbox
                    checked={checked.indexOf(value) !== -1}
                    tabIndex={-1}
                    disableRipple
                    inputProps={{
                      "aria-labelledby": labelId,
                    }}
                  />
                </ListItemIcon>
                <ListItemText id={labelId} primary={`${value.name}`} />
              </ListItemButton>
            );
          })}
        </List>
      </Paper>
    </>
  );

  const { mobileOpen } = useNavbarState();
  const isMobile = useThemeMediaQuery((theme) => theme.breakpoints.down("lg"));

  const { control, handleSubmit, formState, setValue } = useForm<FormType>({
    mode: "onChange",
    defaultValues,
    resolver: zodResolver(schema),
  });
  const { errors } = formState;

  const handleOnSubmit = async (formData: FormType) => {
    const { user } = formData;

    if (isSubmitted) {
      Logger.debug("Form Already Submitted");
      return;
    }
    setIsSubmitted(true);

    if (user === null) {
      Logger.debug("User Role cannot be null");
      setIsSubmitted(false);
      return;
    }

    const request: UserRoleAllocationRequest = {
      idUser: user.id,
      roleIds: right.map((userRole) => userRole.id),
      processInstance: task.processInstanceId,
    };

    const { data, err } = await Api.performRequest((r) =>
      r.admin.allocateUserRoles(request)
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
        <Grid
          className="min-h-screen p-10"
          container
          spacing={2}
          justifyContent="center"
          alignItems="center"
        >
          <Grid item className="">
            <Grid className="mb-20">
              <div
                className={`grid grid-cols-1 gap-9 ${mobileOpen && isMobile
                  ? "sm:grid-cols-1 md:grid-cols-2"
                  : "sm:grid-cols-2 md:grid-cols-1"
                  } lg:grid-cols-1`}
              >
                <Controller
                  name="user"
                  control={control}
                  render={({ field: { onChange, value } }) => (
                    <Autocomplete
                      options={userList}
                      getOptionLabel={(option) =>
                        option ? option.username : ""
                      }
                      isOptionEqualToValue={(option, val) =>
                        option.id === val.id
                      }
                      value={value}
                      onChange={(event, newValue) => {
                        onChange(newValue);
                        fetchUserRoles(newValue);
                      }}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          className="bg-white"
                          label="User"
                          required
                          placeholder="Select a User"
                          size="small"
                          error={!!errors.user}
                          helperText={errors?.user?.message}
                          InputLabelProps={{
                            shrink: true,
                          }}
                        />
                      )}
                    />
                  )}
                />
              </div>
            </Grid>
            {customList("Un-Assigned User Roles", left)}
            <div className="flex justify-center my-6"></div>
          </Grid>
          <Grid item>
            <Grid container direction="column" alignItems="center">
              <Button
                sx={{
                  my: 0.5,
                  borderColor: "red",
                  color: "white",
                  "&:hover": {
                    backgroundColor: "red",
                    borderColor: "red",
                    color: "white",
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
                  borderColor: "red",
                  color: "white",
                  "&:hover": {
                    backgroundColor: "red",
                    borderColor: "red",
                    color: "white",
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
                  borderColor: "red",
                  color: "white",
                  "&:hover": {
                    backgroundColor: "red",
                    borderColor: "red",
                    color: "white",
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
                  borderColor: "red",
                  color: "white",
                  "&:hover": {
                    backgroundColor: "red",
                    borderColor: "red",
                    color: "white",
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
            </Grid>
            <Grid className="mb-44">
              {customList("Assigned User Roles", right)}
            </Grid>
          </Grid>
        </Grid>
      </form>
    </>
  );
};

export default FK_Task01;
