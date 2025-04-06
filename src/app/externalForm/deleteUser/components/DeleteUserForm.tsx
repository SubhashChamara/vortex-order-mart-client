import { zodResolver } from "@hookform/resolvers/zod";
import { FC, useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";
import { useNavbarState } from "../../../../@context/NavbarProvider";
import { useThemeMediaQuery } from "../../../../@edgevantage/hooks";
import { UserProcessInfo } from "../../../workflow/createNewUser/@types/UserProcessInfo";

import { Avatar, Paper, TextField } from "@mui/material";
import EdgeSvgIcon from "../../../../@core/ui/EdgeSvgIcon";
import RetriveFile from "../../../../@helpers/RetriveFiles";

type FormType = {
  firstName: string;
  lastName: string;
  email: string;
  telephone: string;
  username: string;
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
  // idUserRole: "",
  // userRole: "",
  designation: "",
};

const schema = z.object({
  firstName: z.string().min(1, "First name is mandatory."),
  lastName: z.string().min(1, "Last name is mandatory."),
  email: z.string().min(1, "Email is mandatory."),
  telephone: z.string(),
});

type CreateUserFormProps = {
  user: UserProcessInfo | null;
};

const DeleteUserForm: FC<CreateUserFormProps> = (props) => {
  const { user } = props;

  const { mobileOpen } = useNavbarState();
  const isMobile = useThemeMediaQuery((theme) => theme.breakpoints.down("sm"));

  const { control, formState, setValue } = useForm<FormType>({
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
      setValue("telephone", user.telephone);
      setValue("designation", user.designation);
    }
  }, [user]);

  return (
    <>
      <Paper className="p-9">
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
            <div>Select Delete User</div>
          </h1>
        </div>
        <div className="flex flex-col gap-9">
          <Controller
            name="username"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label="User Name"
                variant="outlined"
                disabled
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
              />
            )}
          />

          <div
            className={`grid grid-cols-1 gap-9 ${
              mobileOpen && isMobile
                ? "sm:grid-cols-1 md:grid-cols-2"
                : "sm:grid-cols-2 md:grid-cols-1"
            } lg:grid-cols-2`}
          >
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
                />
              )}
            />
          </div>
        </div>
      </Paper>

      <Paper className="px-12 pb-12">
        <div className="text-center mb-16 border-b-1 border-b-gray-200 py-6">
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

export default DeleteUserForm;
