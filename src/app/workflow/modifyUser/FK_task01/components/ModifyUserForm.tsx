import { FC, useEffect, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Controller, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { Api } from "../../../../../api/Api";
// import EdgeTextInput from "../../../../@edgevantage/core/EdgeTextInput/EdgeTextInput";
import Logger from "../../../../../@helpers/Logger";
// import EdgeButton from "../../../../@edgevantage/core/EdgeButton/EdgeButton";
import { useNavbarState } from "../../../../../@context/NavbarProvider";
import { useThemeMediaQuery } from "../../../../../@edgevantage/hooks";
import { Autocomplete, Button, Paper, TextField } from "@mui/material";
import { UserRequest } from "../../../createNewUser/@types/UserRequest";
import { TaskDetailInfo } from "../../../../core/types/TaskDetailInfo";
import { UserProcessInfo } from "../../../modifyUser/types/UserProcessInfo";
import { UserInfo } from "../../types/UserInfo";
import EdgeSvgIcon from "../../../../../@core/ui/EdgeSvgIcon";
// import { http } from "../../../../util/HttpHelper";

type FormType = {
  firstName: string;
  lastName: string;
  email: string;
  telephone: string;
  username: string;
  // password: string;
  // rePassword: string;
  // idUserRole: string;
  // userRole: string;
  designation: string;
};

const defaultValues: FormType = {
  firstName: "",
  lastName: "",
  username: "",
  email: "",
  telephone: "",
  // password: "",
  // rePassword: "",
  // idUserRole: "",
  // userRole: "",
  designation: "",
};

const schema = z.object({
  firstName: z.string().min(1, "First name is mandatory."),
  lastName: z.string().min(1, "Last name is mandatory."),
  email: z.string().min(1, "Email is mandatory."),
  designation: z.string().min(1, "Designation is mandatory."),
  telephone: z.string(),
  // password: z.string().min(1, "Password is mandatory."),
  // rePassword: z.string().min(1, "Please re enter Password."),
  // userRole: z.object({ id: z.string(), name: z.string() }),
});

type CreateUserFormProps = {
  task: TaskDetailInfo;
  user: UserProcessInfo | null;
  file: File | null;
  setUser: (user: UserProcessInfo) => void;
};

const ModifyUserForm: FC<CreateUserFormProps> = (props) => {
  const { task, user, setUser, file } = props;

  const [roleList, setRoleList] = useState([]);
  const [userList, setUserList] = useState<UserInfo[]>([]);
  const [selectedUser, setselectedUser] = useState(null);
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);

  Logger.debug("ModifyUserForm" + JSON.stringify(task));

  const { mobileOpen } = useNavbarState();
  const isMobile = useThemeMediaQuery((theme) => theme.breakpoints.down("lg"));

  const { control, handleSubmit, formState, setValue, watch } =
    useForm<FormType>({
      mode: "onChange",
      defaultValues,
      resolver: zodResolver(schema),
    });
  const { errors } = formState;

  // const handleFetchUserRoles = async () => {
  //   try {
  //     const res = await http.get("/admin/master/user-role");
  //     setRoleList(res.data);
  //   } catch (err) {
  //     console.log(err);
  //   }
  // };

  // const handleFetchUserRoles = async () => {
  //   const { data, err } = await Api.performRequest((r) =>
  //     r.admin.userRoleInfoList()
  //   );

  //   Logger.debug(
  //     "(Groups) => { DATA: " +
  //       JSON.stringify(data) +
  //       " , ERROR: " +
  //       JSON.stringify(err)
  //   );

  //   if (data !== null) {
  //     setRoleList(data);
  //   }
  // };

  const handleFetchUserList = async () => {
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

  // console.log(watch());

  console.log(roleList);

  // const handleOnSubmit = async (formData: FormType) => {
  //   Logger.debug(`Form Submitted: ${JSON.stringify(formData)}`);

  //   try {
  //     await http.put(`/admin/master/user/${selectedUser.id}`, {

  //       username: selectedUser.username,
  //       firstName: formData.firstName,
  //       lastName: formData.lastName,
  //       email: formData.email,
  //       designation: "",
  //       telephone: formData.telephone,
  //       idUserRole: formData?.userRole?.id,
  //       // password: formData.password,
  //       processInstance: data.processInstanceId,
  //     });
  //     toast.success("Successfully Saved User Modification Details");
  //   } catch (err:any) {
  //     toast.error(`Modification failed: ${err.response.data.message}`);
  //     console.log(err);
  //   }
  // };

  const handleOnSubmit = async (formData: FormType) => {
    console.log(task);
    Logger.debug(`Form Submitted: ${JSON.stringify(formData)}`);
    if (isSubmitted) {
      Logger.debug("Form Already Submitted");
      return;
    }

    /**
     * set submit true to identify form submitted already
     * help to prevent multiple submissions
     */
    setIsSubmitted(true);

    const { firstName, lastName, email, telephone, designation } = formData;
    Logger.debug("Form Submitted : " + JSON.stringify(formData));

    let doc = null;
    if (file !== null) {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("taskInstance", task.taskInstance);
      formData.append("processInstance", task.processInstanceId);

      const { data, err } = await Api.performRequest((r) =>
        r.document.upload(formData)
      );

      Logger.debug(
        "(Doc Upload) => { DATA: " +
          JSON.stringify(data) +
          " , ERROR: " +
          JSON.stringify(err)
      );

      if (data !== null) {
        doc = data;
        toast.success("Successfully Uploaded File");
      } else {
        toast.error(err?.msg);
      }
    }

    // const request: UserRequest = {
    //   username: selectedUser.username ,
    //   firstName: firstName,
    //   lastName: lastName,
    //   email: email,
    //   designation: designation,
    //   telephone: telephone,
    //   idUserRole: userRole.id,
    //   // password?: string | null,
    //   processInstance: task.processInstanceId,
    // };

    const request: UserRequest = {
      username: selectedUser.username,
      firstName,
      lastName,
      email,
      designation,
      telephone,
      // idUserRole: userRole?.id,
      processInstance: task.processInstanceId,
      profile:
        doc !== null
          ? doc.id
          : user?.profile !== null
          ? user?.profile.id
          : null,
    };

    console.log(request);
    const { data, err } = await Api.performRequest((r) =>
      r.admin.updateUser(request, selectedUser.id)
    );

    Logger.debug(
      "(User Mofidy) => { DATA: " +
        JSON.stringify(data) +
        " , ERROR: " +
        JSON.stringify(err)
    );

    if (err == null) {
      let successMsg: string;
      toast.success("User Updated Succesfully");
    } else {
      toast.error(err?.msg);
    }
    /**
     * set submit false to identify form submitted but failed
     * help to resubmit
     * and timeout prevent double clicks
     */
    setTimeout(() => setIsSubmitted(false), 3000);
  };

  useEffect(() => {
    // handleFetchUserRoles();
    handleFetchUserList();
  }, []);

  const updateForm = (user: any) => {
    console.log(user);
    setUser(user);
    setValue("username", user.user);
    setValue("firstName", user.firstName);
    setValue("lastName", user.lastName);
    setValue("email", user.telephone);
    // setValue("userRole", user.userRole);
    setValue("telephone", user.telephone);
    setValue("designation", user.designation);
  };

  useEffect(() => {
    if (user !== null) {
      console.log(user);
      setValue("firstName", user.firstName);
      setValue("lastName", user.lastName);
      setValue("username", user.user);
      setValue("email", user.email);
      // setValue("userRole", user.userRole);
      setValue("telephone", user.telephone);
      setValue("designation", user.designation);
    }
  }, [user]);

  return (
    <Paper className="p-9">
      <div className="text-center mb-16 border-b-1 border-b-gray-200 py-6">
        <h1 className="text-12 font-600 text-left flex text-blue-gray-800">
          <div className="flex items-center">
            <EdgeSvgIcon
              className="icon-size-18 cursor-pointer mr-3"
              color="error"
            >
              feather:user-check
            </EdgeSvgIcon>
          </div>
          <div>Modify User</div>
        </h1>
      </div>
      <Autocomplete
        className="mb-10"
        options={userList}
        getOptionLabel={(option) => (option ? option.username : "")}
        isOptionEqualToValue={(option, val) => option.id === val.id}
        value={selectedUser}
        onChange={(event, newValue) => {
          console.log(newValue);
          setselectedUser(newValue);
          updateForm(newValue);
        }}
        defaultValue={""}
        renderInput={(params) => (
          <TextField
            {...params}
            label="User Name"
            variant="outlined"
            required
            size="small"
            error={!!errors.username}
            helperText={errors?.username?.message}
            InputLabelProps={{
              sx: {
                "&.Mui-focused": {
                  color: "#FF181B",
                  fontWeight: 600,
                },
              },
              shrink: true,
            }}
            InputProps={{
              ...params.InputProps,
              sx: {
                "& .MuiOutlinedInput-notchedOutline": {
                  borderRadius: 2,
                },
                "&:hover .MuiOutlinedInput-notchedOutline": {
                  borderColor: "#FF181B",
                },
                "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                  borderColor: "#FF181B",
                },
              },
            }}
          />
        )}
      />
      <form onSubmit={handleSubmit(handleOnSubmit)}>
        <div
          className={`grid grid-cols-1 gap-9 ${
            mobileOpen && isMobile
              ? "sm:grid-cols-1 md:grid-cols-2"
              : "sm:grid-cols-2 md:grid-cols-1"
          } lg:grid-cols-2`}
        >
          {/* <Controller
            name="username"
            control={control}
            render={({ field: { onChange, value } }) => (
              <Autocomplete
                options={userList}
                getOptionLabel={(option) => (option ? option.username : "")}
                isOptionEqualToValue={(option, val) => option.id === val.id}
                value={value}
                onChange={(event, newValue) => {
                  onChange(newValue);
                  console.log(newValue)
                  updateForm(newValue);
                }}
                defaultValue={""}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="User Name"
                    variant="outlined"
                    required
                    size="small"
                    error={!!errors.username}
                    helperText={errors?.username?.message}
                    InputLabelProps={{
                      sx: {
                        "&.Mui-focused": {
                          color: "#FF181B",
                          fontWeight: 600,
                        },
                      },
                      shrink: true,
                    }}
                    InputProps={{
                      ...params.InputProps,
                      sx: {
                        "& .MuiOutlinedInput-notchedOutline": {
                          borderRadius: 2,
                        },
                        "&:hover .MuiOutlinedInput-notchedOutline": {
                          borderColor: "#FF181B",
                        },
                        "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                          borderColor: "#FF181B",
                        },
                      },
                    }}
                  />
                )}
              />
            )}
          /> */}

          {/* <Controller
            name="username"
            control={control}
            render={({ field }) => (
              <EdgeTextInput
                {...field}
                required
                label="Username"
                size="small"
                type="text"
                error={!!errors.username}
                helperText={errors?.username?.message}
              />
            )}
          /> */}

          <Controller
            name="email"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                required
                label="Email"
                size="small"
                type="email"
                error={!!errors.email}
                helperText={errors?.email?.message}
              />
            )}
          />

          <Controller
            name="firstName"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                required
                label="First Name"
                size="small"
                type="text"
                error={!!errors.firstName}
                helperText={errors?.firstName?.message}
              />
            )}
          />

          <Controller
            name="lastName"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                required
                label="Last Name"
                size="small"
                type="text"
                error={!!errors.lastName}
                helperText={errors?.lastName?.message}
              />
            )}
          />

          {/* <Controller
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
                }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="User Role"
                    required
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
          /> */}

          <Controller
            name="telephone"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                required
                label="Contact No"
                size="small"
                type="text"
                error={!!errors.telephone}
                helperText={errors?.telephone?.message}
              />
            )}
          />

          <Controller
            name="designation"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label="Designation"
                size="small"
                type="text"
                error={!!errors.designation}
                helperText={errors?.designation?.message}
              />
            )}
          />

          {/* <Controller
            name="password"
            control={control}
            render={({ field }) => (
              <EdgeTextInput
                {...field}
                required
                label="Password"
                size="small"
                type="password"
                error={!!errors.password}
                helperText={errors?.password?.message}
              />
            )}
          /> */}

          {/* <Controller
            name="rePassword"
            control={control}
            render={({ field }) => (
              <EdgeTextInput
                {...field}
                required
                label="Retype Password"
                size="small"
                type="password"
                error={!!errors.rePassword}
                helperText={errors?.rePassword?.message}
              />
            )}
          /> */}
        </div>

        <div className="flex justify-left my-6">
          <Button
            variant="contained"
            color="secondary"
            className=" mt-12 w-full"
            aria-label="Sign in"
            type="submit"
            size="large"
          >
            Update
          </Button>
        </div>
      </form>
    </Paper>
  );
};

export default ModifyUserForm;
