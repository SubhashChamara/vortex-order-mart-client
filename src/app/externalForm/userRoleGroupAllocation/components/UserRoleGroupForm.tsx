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
import { useNavbarState } from "../../../../@context/NavbarProvider";
import { useThemeMediaQuery } from "../../../../@edgevantage/hooks";
import Logger from "../../../../@helpers/Logger";
import { Api } from "../../../../api/Api";
import { GroupAllocationRequest } from "../../../core/types/GroupAllocationRequest";
import { ScoreBoardProcess } from "../../../core/types/ScoreBoardProcess";
import { UserRoleInfo } from "../../../core/types/UserRoleInfo";
import { GroupInfo } from "../../../workflow/userRoleGroupAllocation/types/GroupInfo";
import Ve3LoadingScreen from "../../../../@core/ui/Ve3LoadingScreen/Ve3LoadingScreen";

type FormType = {
  userRole: UserRoleInfo | null;
};

const defaultValues: FormType = {
  userRole: null,
};

const schema = z.object({
  userRole: z
    .object({ id: z.string(), name: z.string() })
    .nullable()
    .refine((val) => val !== null, {
      message: "Please select user role",
    }),
});

function not(a: GroupInfo[], b: GroupInfo[]) {
  return a.filter((value) => b.indexOf(value) === -1);
}

function intersection(a: GroupInfo[], b: GroupInfo[]) {
  return a.filter((value) => b.indexOf(value) !== -1);
}

type UserRoleGroupProps = {
  task: ScoreBoardProcess | null;
};

const UserRoleGroupForm: FC<UserRoleGroupProps> = (props) => {
  const { task } = props;
  const [roleList, setRoleList] = useState<UserRoleInfo[]>([]);
  const [checked, setChecked] = useState<GroupInfo[]>([]);
  const [left, setLeft] = useState<GroupInfo[]>([]);
  const [right, setRight] = useState<GroupInfo[]>([]);
  const [allGroups, setAllGroups] = useState<GroupInfo[]>([]);
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [selectedUserRole, setSelectedUserRole] = useState<UserRoleInfo | null>(
    null
  );
  const [loading, setLoading] = useState<boolean>(true);
  const leftChecked = intersection(checked, left);
  const rightChecked = intersection(checked, right);

  const fetchRightList = async (
    roleId: string,
    newAllocatedList: GroupInfo[]
  ) => {
    setLoading(true);
    try {
      const { data, err } = await Api.performRequest((r) =>
        r.admin.allocatedgroupList(roleId)
      );

      Logger.debug(
        "(Allocated Groups) => { DATA: " +
        JSON.stringify(data) +
        " , ERROR: " +
        JSON.stringify(err)
      );

      if (data !== null) {
        newAllocatedList.forEach((newRightItem) => {
          if (
            !data.some((dataItem: GroupInfo) => dataItem.id === newRightItem.id)
          ) {
            newRightItem.isNew = true;
          } else {
            newRightItem.isNew = false;
          }
        });
        console.log(newAllocatedList);
        setRight(newAllocatedList);
      }
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  const fetchLeftList = async (
    roleId: string,
    allGroups: GroupInfo[],
    right: GroupInfo[]
  ) => {
    setLoading(true);
    try {
      const newUnallocatedList = filterGroups(allGroups, right);
      const { data, err } = await Api.performRequest((r) =>
        r.admin.unAllocatedgroupList(roleId)
      );

      Logger.debug(
        "(Un-Allocated Groups) => { DATA: " +
        JSON.stringify(data) +
        " , ERROR: " +
        JSON.stringify(err)
      );

      if (data !== null) {
        newUnallocatedList.forEach((newLeftItem) => {
          if (
            !data.some((dataItem: GroupInfo) => dataItem.id === newLeftItem.id)
          ) {
            newLeftItem.isNew = true;
          } else {
            newLeftItem.isNew = false;
          }
        });
        console.log(newUnallocatedList);
        setLeft(newUnallocatedList);
      }
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  const fetchRoleList = async () => {
    try {
      const { data, err } = await Api.performRequest((r) =>
        r.admin.userRoleInfoList()
      );

      Logger.debug(
        "(Role) => { DATA: " +
        JSON.stringify(data) +
        " , ERROR: " +
        JSON.stringify(err)
      );

      if (data !== null) {
        setRoleList(data);
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

  const fetchGroupAllocationData = async () => {
    if (!task) {
      return;
    }
    const { data, err } = await Api.performRequest((r) =>
      r.admin.getGroupAllocationByProcess(task.processInstance)
    );

    Logger.debug(
      "(Role Allocation Process) => { DATA: " +
      JSON.stringify(data) +
      " , ERROR: " +
      JSON.stringify(err)
    );

    if (data !== null) {
      setValue("userRole", data.userRoleInfo);
      setSelectedUserRole(data.userRoleInfo);
      fetchRightList(data.userRoleInfo.id, data.groupInfoList);
      setRight(data.groupInfoList);
    }

    fetchAllGroups();
  };

  useEffect(() => {
    if (selectedUserRole) {
      fetchLeftList(selectedUserRole.id, allGroups, right);
    }
  }, [allGroups]);

  const filterGroups = (all: GroupInfo[], right: GroupInfo[]) => {
    return all.filter(
      (group) => !right.some((rightGroup) => rightGroup.id === group.id)
    );
  };

  const fetchAllGroups = async () => {
    console.log("call");
    const { data, err } = await Api.performRequest((r) =>
      r.admin.groupInfoList()
    );

    Logger.debug(
      "(All Groups) => { DATA: " +
      JSON.stringify(data) +
      " , ERROR: " +
      JSON.stringify(err)
    );

    if (data !== null) {
      setAllGroups(data);
    }
  };

  useEffect(() => {
    fetchRoleList();
    fetchGroupAllocationData();
  }, []);

  const customList = (title: string, items: GroupInfo[]) => (
    <>
      <div className=" border-gray-700 bg-white border-1 p-4 pl-20 mb-10 rounded-sm">
        {title}
      </div>
      <Paper
        className="min-h-screen"
        sx={{ width: "24vw", height: 230, overflow: "auto" }}
      >
        <List dense component="div" role="list">
          {items.map((value: GroupInfo) => {
            const labelId = `transfer-list-item-${value}-label`;

            return (
              <ListItemButton
                {...value}
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

  const { control, handleSubmit, setValue } = useForm<FormType>({
    mode: "onChange",
    defaultValues,
    resolver: zodResolver(schema),
  });

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
      groupIds: right.map((group) => group.id),
      processInstance: task?.processInstance,
    };

    const { err } = await Api.performRequest((r) =>
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
      {loading ? (
        <Ve3LoadingScreen />
      ) : (
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
                        isOptionEqualToValue={(option, val) =>
                          option.id === val.id
                        }
                        value={value}
                        disabled
                        onChange={(event, newValue) => {
                          onChange(newValue);
                        }}
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            label="User Role"
                            required
                            disabled
                            placeholder="Select User Role"
                            size="small"
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
              {customList("Un-Assigned Groups", left)}
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
                {customList("Assigned Groups", right)}
              </Grid>
            </Grid>
          </Grid>
        </form>
      )}
    </>
  );
};

export default UserRoleGroupForm;
