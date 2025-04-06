import { zodResolver } from "@hookform/resolvers/zod";
import { FC, useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";
import { useNavbarState } from "../../../../../@context/NavbarProvider";
import { useThemeMediaQuery } from "../../../../../@edgevantage/hooks";
import Logger from "../../../../../@helpers/Logger";
import { Avatar, Paper, TextField } from "@mui/material";
import EdgeSvgIcon from "../../../../../@core/ui/EdgeSvgIcon";
import RetriveFile from "../../../../../@helpers/RetriveFiles";
import { UserProcessInfo } from "../../../modifyUser/types/UserProcessInfo";

type UserDetailsFormProps = {
  user: UserProcessInfo;
};

type FormType = {
  firstName: string;
  lastName: string;
  email: string;
  username: string;
  contactNo: string;
  password: string;
  rePassword: string;
  // userRole: string;
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
  // userRole: "",
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
  // userRole: z.string(),
});

const UserDetailsForm: FC<UserDetailsFormProps> = (props) => {
  const { user } = props;
  Logger.debug("CreateUserForm" + JSON.stringify(user));

  const { mobileOpen } = useNavbarState();
  const isMobile = useThemeMediaQuery((theme) => theme.breakpoints.down("lg"));

  const { control, formState, setValue, watch } = useForm<FormType>({
    mode: "onChange",
    defaultValues,
    resolver: zodResolver(schema),
  });
  const { errors } = formState;

  useEffect(() => {
    if (user !== null) {
      setValue("firstName", user.firstName);
      setValue("lastName", user.lastName);
      setValue("username", user.username);
      setValue("email", user.email);
      // setValue("userRole", user.userRole.name);
      setValue("contactNo", user.telephone);
      setValue("designation", user.designation);
    }
  }, [user]);

  return (
    <>
      <Paper className="p-9">
        <div className="text-center mb-16 border-b-1 border-b-gray-200 py-6">
          <h1 className="text-12 font-600 text-left flex text-blue-gray-800">
            <div className="flex items-center ">
              <EdgeSvgIcon
                className="icon-size-18 cursor-pointer mr-3"
                color="error"
              >
                feather:user-check
              </EdgeSvgIcon>
            </div>
            <div>User Details</div>
          </h1>
        </div>
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
                disabled
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

          <Controller
            name="contactNo"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                disabled
                label="Contact No"
                size="small"
                type="text"
                error={!!errors.contactNo}
                helperText={errors?.contactNo?.message}
              />
            )}
          />

          {/* <Controller
          name="userRole"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              disabled
              label="User Role"
              size="small"
              type="text"
              error={!!errors.userRole}
              helperText={errors?.userRole?.message}
            />
          )}
        /> */}
        </div>
      </Paper>

      <Paper className="px-12 pb-12">
        <div className="text-center mb-16 border-b-1 border-b-gray-200 py-6">
          <h1 className="text-12 font-600 text-left flex text-blue-gray-800">
            <div className="flex items-center ">
              <EdgeSvgIcon
                className="icon-size-18 cursor-pointer mr-3"
                color="error"
              >
                feather:upload-cloud
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

export default UserDetailsForm;
