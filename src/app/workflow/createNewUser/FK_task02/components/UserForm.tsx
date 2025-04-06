import { FC, memo, useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import { Avatar, Paper, TextField } from "@mui/material";

import { UserProcessInfo } from "../../@types/UserProcessInfo";
import { useNavbarState } from "../../../../../@context/NavbarProvider";
import useThemeMediaQuery from "../../../../../@hooks/useThemeMediaQuery";
import RetriveFile from "../../../../../@helpers/RetriveFiles";
import EdgeSvgIcon from "../../../../../@core/ui/EdgeSvgIcon";

type UserFormProps = {
  user: UserProcessInfo | null;
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

const UserForm: FC<UserFormProps> = (props) => {
  const { user } = props;

  const { control, setValue } = useForm<FormType>({
    mode: "onChange",
    defaultValues,
  });

  const { mobileOpen } = useNavbarState();
  const isMobile = useThemeMediaQuery((theme) => theme.breakpoints.down("lg"));

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
      <Paper className="px-12 pb-12">
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
            <div>User Form</div>
          </h1>
        </div>
        <form noValidate>
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
                  disabled
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
                  disabled
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
                  disabled
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
                  disabled
                />
              )}
            />

            {/* <Controller
              name="userRole"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="User Role"
                  required
                  size="small"
                  type="text"
                  disabled
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
                  disabled
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
                  disabled
                />
              )}
            />
          </div>
        </form>
      </Paper>
      <Paper className="px-12 pb-12">
        <div className="text-center mb-16 border-b-1 border-b-gray-200 py-6">
          <h1 className="text-12 font-600 text-left flex text-blue-gray-800">
            <div>
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

export default memo(UserForm);
