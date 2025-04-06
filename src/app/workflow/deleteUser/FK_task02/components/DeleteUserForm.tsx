import { zodResolver } from "@hookform/resolvers/zod";
import { FC, useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { z } from "zod";
import { Api } from "../../../../../api/Api";
// import EdgeTextInput from "../../../../@edgevantage/core/EdgeTextInput/EdgeTextInput";
import Logger from "../../../../../@helpers/Logger";
// import EdgeButton from "../../../../@edgevantage/core/EdgeButton/EdgeButton";
import { Avatar, Paper, TextField } from "@mui/material";
import { useNavbarState } from "../../../../../@context/NavbarProvider";
import EdgeSvgIcon from "../../../../../@core/ui/EdgeSvgIcon";
import { useThemeMediaQuery } from "../../../../../@edgevantage/hooks";
import RetriveFile from "../../../../../@helpers/RetriveFiles";
import { TaskDetailInfo } from "../../../../core/types/TaskDetailInfo";
import { UserDeleteRequest } from "../../../createNewUser/@types/UserDeleteRequest";
import { UserProcessInfo } from "../../../createNewUser/@types/UserProcessInfo";
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
};

const ModifyUserForm: FC<CreateUserFormProps> = (props) => {
  const { task, user } = props;

  // const [roleList, setRoleList] = useState([]);
  const [userList, setUserList] = useState([]);
  const [selectedUser, setselectedUser] = useState<UserProcessInfo | null>(
    null
  );
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

  // console.log(roleList);

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

    // const {firstName,lastName,email,telephone,userRole,designation,username } = formData;
    // Logger.debug("Form Submitted : " + JSON.stringify(formData));

    const request: UserDeleteRequest = {
      idUser: selectedUser.id,
      processInstance: task.processInstanceId,
    };

    console.log(request);
    const { data, err } = await Api.performRequest((r) =>
      r.admin.deleteUser(request)
    );

    Logger.debug(
      "(User Delete) => { DATA: " +
        JSON.stringify(data) +
        " , ERROR: " +
        JSON.stringify(err)
    );

    if (err == null) {
      let successMsg: string;
      toast.success("Saved Succesfully");
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

  const updateForm = (user: UserProcessInfo) => {
    console.log(user);
    setValue("firstName", user.firstName);
    setValue("lastName", user.lastName);
    setValue("email", user.email);
    // setValue("userRole", user.userRole.name);
    setValue("telephone", user.telephone);
    setValue("designation", user.designation);
  };

  useEffect(() => {
    if (user !== null) {
      setValue("firstName", user.firstName);
      setValue("lastName", user.lastName);
      setValue("username", user.username);
      setValue("email", user.email);
      // setValue("userRole", user.userRole.name);
      setValue("telephone", user.telephone);
      setValue("designation", user.designation);
    }
  }, [user]);

  return (
    <>
      <Paper className="p-9 pb-15">
        <div className="text-center mb-16 border-b-1 border-b-gray-200 py-6">
          <h1 className="text-12 font-600 text-left flex text-blue-gray-800">
            <div className="flex items-center">
              <EdgeSvgIcon
                className="icon-size-18 cursor-pointer mr-3"
                color="error"
              >
                feather:user-minus
              </EdgeSvgIcon>
            </div>
            <div>Selected Delete User</div>
          </h1>
        </div>
        <Controller
          name="username"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              className="mb-10"
              required
              disabled
              label="User Name"
              size="small"
              type="email"
              error={!!errors.email}
              helperText={errors?.email?.message}
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
                  disabled
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
                  disabled
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
                  disabled
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
              render={({ field }) => (
                <TextField
                  {...field}
                  required
                  disabled
                  label="User Role"
                  size="small"
                  type="text"
                  error={!!errors.lastName}
                  helperText={errors?.lastName?.message}
                />
              )}
            /> */}
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
                    disabled
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
                  disabled
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
                  disabled
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
        </form>
      </Paper>

      <Paper className="px-12 pb-12">
        <div className="text-center mb-16 border-b-1 border-b-gray-200 py-6">
          <h1 className="text-12 font-600 text-left flex text-blue-gray-800">
            <div className="flex items-center">
              <EdgeSvgIcon
                className="icon-size-18 cursor-pointer mr-3"
                color="error"
              >
                feather:aperture
              </EdgeSvgIcon>
            </div>
            <div>Profile Picture</div>
          </h1>
        </div>
        <div className="w-full flex justify-center pb-12">
          {user?.profile && (
            <div className="">
              <Avatar
                alt="uploaded-img"
                src={RetriveFile(user.profile.path)}
                sx={{ width: 128, height: 128 }}
              />
            </div>
          )}
        </div>
      </Paper>
    </>
  );
};

export default ModifyUserForm;
