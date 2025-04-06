import { zodResolver } from "@hookform/resolvers/zod";
import { Autocomplete, TextField } from "@mui/material";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import Paper from "@mui/material/Paper";
import { FC, useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { z } from "zod";
// import { UserInfo } from "../../createNewUser/@types/UserInfo";
import { UserInfo } from "../../../workflow/createNewUser/@types/UserInfo";
import { UserRoleInfo } from "../types/UserRoleInfo";
import { GroupAllocationRequest } from "../../../core/types/GroupAllocationRequest";
import { Api } from "../../../../api/Api";
import Logger from "../../../../@helpers/Logger";
import { useThemeMediaQuery } from "../../../../@edgevantage/hooks";
import { useNavbarState } from "../../../../@context/NavbarProvider";
import { ScoreBoardProcess } from "../../../core/types/ScoreBoardProcess";

type FormType = {
  user: UserInfo | null;
};

const defaultValues: FormType = {
  user: null,
};

const schema = z.object({
  user: z
    .object({ id: z.string(), name: z.string() })
    .nullable()
    .refine((val) => val !== null, {
      message: "Please select a user",
    }),
});

function not(a: UserRoleInfo[], b: UserRoleInfo[]) {
  return a.filter((value) => b.indexOf(value) === -1);
}

function intersection(a: UserRoleInfo[], b: UserRoleInfo[]) {
  return a.filter((value) => b.indexOf(value) !== -1);
}

type UserRoleAllocationFormProps = {
  process: ScoreBoardProcess | null;
};

const UserRoleAllocationForm: FC<UserRoleAllocationFormProps> = (props) => {
  const { process } = props;

  const [checked, setChecked] = useState<UserRoleInfo[]>([]);
  const [left, setLeft] = useState<UserRoleInfo[]>([]);
  const [right, setRight] = useState<UserRoleInfo[]>([]);
  const [allUserRoles, setAllUserRoles] = useState<UserRoleInfo[]>([]);
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);

  const [userList, setUserList] = useState<UserInfo[]>([]);
  const [selectedUser, setSelectedUser] = useState<UserInfo | null>(null);

  const leftChecked = intersection(checked, left);
  const rightChecked = intersection(checked, right);

  const fetchRightList = async (
    userId: string,
    newAllocatedList: UserRoleInfo[]
  ) => {
    try {
      const { data, err } = await Api.performRequest((r) =>
        r.admin.getAllocatedRoleList(userId)
      );

      Logger.debug(
        "(Allocated User Roles) => { DATA: " +
          JSON.stringify(data) +
          " , ERROR: " +
          JSON.stringify(err)
      );

      if (data !== null) {
        newAllocatedList.forEach((newRightItem) => {
          if (
            !data.some(
              (dataItem: UserRoleInfo) => dataItem.id === newRightItem.id
            )
          ) {
            newRightItem.isNew = true;
          } else {
            newRightItem.isNew = false;
          }
        });
        setRight(newAllocatedList);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const fetchLeftList = async (
    userId: string,
    allUserRoles: UserRoleInfo[],
    right: UserRoleInfo[]
  ) => {
    try {
      const newUnallocatedList = filterUserRoles(allUserRoles, right);
      const { data, err } = await Api.performRequest((r) =>
        r.admin.getUnallocatedRoleList(userId)
      );

      Logger.debug(
        "(Un-Allocated User Roles) => { DATA: " +
          JSON.stringify(data) +
          " , ERROR: " +
          JSON.stringify(err)
      );

      if (data !== null) {
        newUnallocatedList.forEach((newLeftItem) => {
          if (
            !data.some(
              (dataItem: UserRoleInfo) => dataItem.id === newLeftItem.id
            )
          ) {
            newLeftItem.isNew = true;
          } else {
            newLeftItem.isNew = false;
          }
        });
        setLeft(newUnallocatedList);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const fetchUserList = async () => {
    try {
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
        console.log(selectedUser);
      }
    } catch (err) {
      console.log(err);
    }
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
    try {
      if (!process) {
        return;
      }

      const { data, err } = await Api.performRequest((r) =>
        r.admin.getUserRoleAllocationByProcess(process.processInstance)
      );

      Logger.debug(
        "(Role Allocation Process) => { DATA: " +
          JSON.stringify(data) +
          " , ERROR: " +
          JSON.stringify(err)
      );

      if (data !== null) {
        setValue("user", data.userInfo);
        setSelectedUser(data.userInfo);
        fetchRightList(data.userInfo.id, data.userRoleInfo);
        setRight(data.userRoleInfo);
      }

      fetchAllUserRoles();
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (selectedUser) {
      fetchLeftList(selectedUser.id, allUserRoles, right);
    }
  }, [allUserRoles]);

  const filterUserRoles = (all: UserRoleInfo[], right: UserRoleInfo[]) => {
    return all.filter(
      (userRole) =>
        !right.some((rightUserRole) => rightUserRole.id === userRole.id)
    );
  };

  const fetchAllUserRoles = async () => {
    try {
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
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchUserList();
    fetchUserRoleAllocationData();
  }, []);

  const customList = (title: string, items: UserRoleInfo[]) => (
    <>
      <div className=" border-gray-700 bg-white border-1 p-4 pl-20 mb-10 rounded-sm">
        {title}
      </div>
      <Paper
        className="min-h-screen"
        sx={{ width: "24vw", height: 230, overflow: "auto" }}
      >
        <List dense component="div" role="list">
          {items.map((value: UserRoleInfo) => {
            const labelId = `transfer-list-item-${value}-label`;

            return (
              <ListItemButton
                key={value}
                role="listitem"
                aria-disabled
                className={
                  value.isNew
                    ? "bg-gray-700 border-4 border-black m-1 text-white"
                    : "bg-white m-1"
                }
              >
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
      Logger.debug("User cannot be null");
      setIsSubmitted(false);
      return;
    }

    const request: GroupAllocationRequest = {
      idUserRole: user.id,
      groupIds: right.map((group) => group.id),
      processInstance: process?.processInstance,
    };

    const { data, err } = await Api.performRequest((r) =>
      r.admin.createGroupAllocation(request)
    );

    if (err === null) {
      toast.success("Successfully Saved User Details");
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
          <Grid item>
            <Grid className="mb-20">
              <div
                className={`grid grid-cols-1 gap-9 ${
                  mobileOpen && isMobile
                    ? "sm:grid-cols-1 md:grid-cols-2"
                    : "sm:grid-cols-2 md:grid-cols-1"
                } lg:grid-cols-1`}
              >
                <Controller
                  name="user"
                  control={control}
                  disabled
                  render={({ field: { onChange, value } }) => (
                    <Autocomplete
                      options={userList}
                      disabled
                      getOptionLabel={(option) =>
                        option ? option.username : ""
                      }
                      isOptionEqualToValue={(option, val) =>
                        option.id === val.id
                      }
                      value={value}
                      onChange={(event, newValue) => {
                        onChange(newValue);
                        setSelectedUser(newValue);
                        fetchAllUserRoles();
                      }}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          label="User"
                          disabled
                          required
                          placeholder="Select User"
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
                disabled={true}
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
                disabled={true}
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
                disabled={true}
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
                disabled={true}
                aria-label="move all left"
              >
                ≪
              </Button>
            </Grid>
          </Grid>
          <Grid item>
            <Grid className="mb-44"></Grid>
            <Grid className="mb-10">
              {customList("Assigned User Roles", right)}
            </Grid>
          </Grid>
        </Grid>
      </form>
    </>
  );
};

export default UserRoleAllocationForm;
