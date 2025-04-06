import { FC, memo, useEffect, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Controller, useForm } from "react-hook-form";
import { Autocomplete, Button, Paper, TextField } from "@mui/material";
import { toast } from "react-toastify";

import Logger from "../../../../../@helpers/Logger";
import { useNavbarState } from "../../../../../@context/NavbarProvider";
import useThemeMediaQuery from "../../../../../@hooks/useThemeMediaQuery";
import { Api } from "../../../../../api/Api";
import { TaskDetailInfo } from "../../../../core/types/TaskDetailInfo";
// import { UserRoleInfo } from "../../../../core/types/UserRoleInfo";
import { UserRequest } from "../../@types/UserRequest";
import { UserProcessInfo } from "../../@types/UserProcessInfo";
import EdgeSvgIcon from "../../../../../@core/ui/EdgeSvgIcon";

type FormType = {
  firstName: string;
  lastName: string;
  email: string;
  username: string;
  contactNo: string;
  password: string;
  rePassword: string;
  // userRole: UserRoleInfo | null;
  designation: string;
};

const defaultValues: FormType = {
  firstName: "",
  lastName: "",
  email: "",
  username: "",
  contactNo: "",
  password: "",
  rePassword: "",
  // userRole: null,
  designation: "",
};

const schema = z.object({
  firstName: z.string().min(1, "First name is mandatory."),
  lastName: z.string().min(1, "Last name is mandatory."),
  email: z.string().min(1, "Email is mandatory."),
  username: z.string().min(1, "Username is mandatory."),
  contactNo: z.string(),
  password: z.string().min(1, "Password is mandatory."),
  rePassword: z.string().min(1, "Please re enter Password."),
  // userRole: z
  //   .object({ id: z.string(), name: z.string() })
  //   .nullable()
  //   .refine((val) => val !== null, {
  //     message: "Please select user role",
  //   }),
  designation: z.string(),
});

type UserFormProps = {
  task: TaskDetailInfo;
  file: File | null;
  user: UserProcessInfo | null;
};

const UserForm: FC<UserFormProps> = (props) => {
  const { task, file, user } = props;

  // const [roleList, setRoleList] = useState([]);
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);

  const { mobileOpen } = useNavbarState();
  const isMobile = useThemeMediaQuery((theme) => theme.breakpoints.down("lg"));

  const { control, handleSubmit, formState, setError, setValue } =
    useForm<FormType>({
      mode: "onChange",
      defaultValues,
      resolver: zodResolver(schema),
    });
  const { errors } = formState;

  // const handleFetchUserRoles = async () => {
  //   try {
  //     const { data, err } = await Api.performRequest((r) =>
  //       r.admin.userRoleInfoList()
  //     );

  //     Logger.debug(
  //       "(User Role) => { DATA: " +
  //         JSON.stringify(data) +
  //         " , ERROR: " +
  //         JSON.stringify(err)
  //     );

  //     if (data !== null) {
  //       setRoleList(data);
  //     }
  //   } catch (err) {
  //     console.log(err);
  //   }
  // };

  const handleOnSubmit = async (formData: FormType) => {
    if (isSubmitted) {
      Logger.debug("Form Already Submitted");
      return;
    }

    /**
     * set submit true to identify form submitted already
     * help to prevent multiple submissions
     */
    setIsSubmitted(true);

    Logger.debug(`Form Submitted: ${JSON.stringify(formData)}`);

    const {
      username,
      firstName,
      lastName,
      email,
      contactNo,
      // userRole,
      password,
      rePassword,
      designation,
    } = formData;

    if (password !== rePassword) {
      Logger.debug("Passwords does not match");
      setError(
        "rePassword",
        { message: "Password not match" },
        { shouldFocus: true }
      );
      setIsSubmitted(false);

      return;
    }

    // if (userRole === null) {
    //   Logger.debug("User role cannot be null");
    //   setIsSubmitted(false);

    //   return;
    // }

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

    const request: UserRequest = {
      username,
      firstName,
      lastName,
      email,
      designation,
      telephone: contactNo,
      // idUserRole: userRole?.id,
      password,
      processInstance: task.processInstanceId,
      profile:
        doc !== null
          ? doc.id
          : user?.profile !== null
          ? user?.profile.id
          : null,
    };

    const { data, err } = await Api.performRequest((r) =>
      r.admin.saveUser(request)
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
  };

  // useEffect(() => {
  //   handleFetchUserRoles();
  // }, []);

  useEffect(() => {
    if (user !== null) {
      setValue("firstName", user.firstName);
      setValue("lastName", user.lastName);
      setValue("username", user.username);
      setValue("email", user.email);
      // setValue("userRole", user.userRole);
      setValue("contactNo", user.telephone);
      setValue("designation", user.designation);
    }
  }, [user]);

  return (
    <Paper className="px-12">
      <div className="text-center mb-16 border-b-1 border-b-gray-200 py-6">
        <h1 className="text-md font-600 text-left flex text-blue-gray-800">
          <div>
            <EdgeSvgIcon
              className="icon-size-18 cursor-pointer mr-3"
              color="error"
            >
              feather:user-plus
            </EdgeSvgIcon>
          </div>
          <div>User Creation Form</div>
        </h1>
      </div>
      <form onSubmit={handleSubmit(handleOnSubmit)} noValidate>
        <div
          className={`grid grid-cols-1 gap-9 ${
            mobileOpen && isMobile
              ? "sm:grid-cols-1 md:grid-cols-2"
              : "sm:grid-cols-2 md:grid-cols-1"
          } lg:grid-cols-2`}
        >
          <Controller
            name="username"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                required
                label="Username"
                size="small"
                type="text"
                error={!!errors.username}
                helperText={errors?.username?.message}
              />
            )}
          />

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
            name="contactNo"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label="Contact No"
                size="small"
                type="text"
                error={!!errors.contactNo}
                helperText={errors?.contactNo?.message}
              />
            )}
          />

          <Controller
            name="password"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                required
                label="Password"
                size="small"
                type="password"
                error={!!errors.password}
                helperText={errors?.password?.message}
              />
            )}
          />

          <Controller
            name="rePassword"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                required
                label="Retype Password"
                size="small"
                type="password"
                error={!!errors.rePassword}
                helperText={errors?.rePassword?.message}
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
        </div>

        <div className="flex justify-left my-6">
          <Button aria-label="Save" type="submit">
            <EdgeSvgIcon
              className="icon-size-12 cursor-pointer text-white mr-3"
              color="error"
            >
              feather:save
            </EdgeSvgIcon>
            Save
          </Button>
        </div>
      </form>
    </Paper>
  );
};

export default memo(UserForm);
