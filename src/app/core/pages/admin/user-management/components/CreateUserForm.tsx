import { FC } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Controller, useForm } from "react-hook-form";

import EdgeTextInput from "../../../../../../@edgevantage/core/EdgeTextInput/EdgeTextInput";
import EdgeDropDown from "../../../../../../@edgevantage/core/EdgeDropDown/EdgeDropDown";
import Logger from "../../../../../../@helpers/Logger";
import EdgeButton from "../../../../../../@edgevantage/core/EdgeButton/EdgeButton";
import { useNavbarState } from "../../../../../../@context/NavbarProvider";
import { useThemeMediaQuery } from "../../../../../../@edgevantage/hooks";

type FormType = {
  firstName: string;
  lastName: string;
  email: string;
  username: string;
  contactNo: string;
  password: string;
  rePassword: string;
  idUserRole: string;
};

const defaultValues: FormType = {
  firstName: "",
  lastName: "",
  email: "",
  username: "",
  contactNo: "",
  password: "",
  rePassword: "",
  idUserRole: "",
};

const schema = z.object({
  firstName: z.string().min(1, "First name is mandatory."),
  lastName: z.string().min(1, "Last name is mandatory."),
  email: z.string().min(1, "Email is mandatory."),
  username: z.string().min(1, "Username is mandatory."),
  contactNo: z.string(),
  password: z.string().min(1, "Password is mandatory."),
  rePassword: z.string().min(1, "Please re enter Password."),
  idUserRole: z.string().min(1, "User role is mandatory."),
});

const CreateUserForm: FC = () => {
  const { mobileOpen } = useNavbarState();
  const isMobile = useThemeMediaQuery((theme) => theme.breakpoints.down("lg"));

  const { control, handleSubmit, formState } = useForm<FormType>({
    mode: "onChange",
    defaultValues,
    resolver: zodResolver(schema),
  });
  const { errors } = formState;

  const handleOnSubmit = async (formData: FormType) => {
    Logger.debug(`Form Submitted: ${JSON.stringify(formData)}`);
  };

  return (
    <div>
      <div className="text-center mb-16 border-b-1 border-b-gray-200 py-6">
        <h1 className="text-md font-600">User Creation Form</h1>
      </div>
      <form onSubmit={handleSubmit(handleOnSubmit)}>
        <div
          className={`grid grid-cols-1 gap-9 ${
            mobileOpen && isMobile
              ? "sm:grid-cols-1 md:grid-cols-2"
              : "sm:grid-cols-2 md:grid-cols-1"
          } lg:grid-cols-1`}
        >
          <Controller
            name="firstName"
            control={control}
            render={({ field }) => (
              <EdgeTextInput
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
              <EdgeTextInput
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

          <Controller
            name="email"
            control={control}
            render={({ field }) => (
              <EdgeTextInput
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
          />

          <Controller
            name="contactNo"
            control={control}
            render={({ field }) => (
              <EdgeTextInput
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
              <EdgeTextInput
                {...field}
                required
                label="Password"
                size="small"
                type="text"
                error={!!errors.password}
                helperText={errors?.password?.message}
              />
            )}
          />

          <Controller
            name="rePassword"
            control={control}
            render={({ field }) => (
              <EdgeTextInput
                {...field}
                required
                label="Retype Password"
                size="small"
                type="text"
                error={!!errors.rePassword}
                helperText={errors?.rePassword?.message}
              />
            )}
          />

          {/* <Controller
            name="idUserRole"
            control={control}
            render={({ field }) => (
              <EdgeDropDown
                {...field}
                required
                label="User Role"
                size="small"
                options={[]}
                error={!!errors.idUserRole}
                helperText={errors?.idUserRole?.message}
              />
            )}
          /> */}
        </div>

        <div className="flex justify-center my-6">
          <EdgeButton label="Create" type="submit" />
        </div>
      </form>
    </div>
  );
};

export default CreateUserForm;
