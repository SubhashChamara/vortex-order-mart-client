import { FC, useState } from "react";
import { useNavigate } from "react-router-dom";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { Button, InputAdornment, TextField } from "@mui/material";
import { toast } from "react-toastify";

import { useAuthContext } from "../../../../../@context/AuthContext";
import Logger from "../../../../../@helpers/Logger";
import { Api } from "../../../../../api/Api";

import { SignInRequest } from "../../../types/SignInRequest";
import EdgeSvgIcon from "../../../../../@core/ui/EdgeSvgIcon";
import { PersonOutline, LockOutlined } from "@mui/icons-material";
import { useMsal } from "@azure/msal-react";
// import { useMsal } from "@azure/msal-react";

/**
 * Form Validation Schema
 */
const schema = z.object({
  username: z.string().nonempty("Please enter your username"),
  password: z.string().nonempty("Please enter your password."),
});

type FormType = {
  username: string;
  password: string;
};

const defaultValues = {
  username: "",
  password: "",
};

const SignInForm: FC = () => {
  const { setSession } = useAuthContext();
  const navigate = useNavigate();

  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);

  const { control, formState, handleSubmit } = useForm<FormType>({
    mode: "onChange",
    defaultValues,
    resolver: zodResolver(schema),
  });

  const { errors } = formState;

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

    const { username, password } = formData;
    Logger.debug("Form Submitted : " + JSON.stringify(formData));

    const request: SignInRequest = {
      username,
      password,
    };

    const { data, err } = await Api.performRequest((r) =>
      r.auth.signin(request)
    );

    Logger.debug(
      "(Login) => { DATA: " +
        JSON.stringify(data) +
        " , ERROR: " +
        JSON.stringify(err)
    );

    if (data !== null) {
      setSession(data.user, data.accessToken);
      toast.success("Logged in Successfully");
      navigate("/");
    } else {
      toast.error(err?.msg);
      /**
       * set submit false to identify form submitted but failed
       * help to resubmit
       * and timeout prevent double clicks
       */
      setTimeout(() => setIsSubmitted(false), 3000);
    }
  };

    const { instance } = useMsal();

    const handleLogin = async () => {
      instance
        .loginPopup()
        .then(async (response) => {
          console.log("Response:", response);
          console.log("User authenticated:", response.account);
          const { data, err } = await Api.performRequest((r) =>
            r.auth.login(response.accessToken)
          );
          if (data !== null) {
            setSession(data.user, data.accessToken);
            toast.success("Logged in Successfully");
            navigate("/");
          } else {
            toast.error(err?.msg);
            /**
             * set submit false to identify form submitted but failed
             * help to resubmit
             * and timeout prevent double clicks
             */
            setTimeout(() => setIsSubmitted(false), 3000);
          }
        })
        .catch((error) => {
          console.error("Login error:", error);
        });
    };

  return (
    <>
      <form
        name="loginForm"
        noValidate
        className="flex w-full flex-col justify-center mt-12"
        onSubmit={handleSubmit(handleOnSubmit)}
      >
        <Controller
          name="username"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              label="Username"
              required
              autoFocus
              type="text"
              className="mb-9"
              autoComplete="username"
              error={!!errors.username}
              helperText={errors?.username?.message}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <PersonOutline
                      className="text-grey-700"
                      style={{ fontSize: 30, color: "#359CDF" }}
                    />
                  </InputAdornment>
                ),
              }}
            />
          )}
        />

        <Controller
          name="password"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              label="Password"
              required
              type="password"
              autoComplete="current-password"
              error={!!errors.password}
              helperText={errors?.password?.message}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <LockOutlined
                      className="text-grey-700"
                      style={{ fontSize: 30, color: "#359CDF" }}
                    />
                  </InputAdornment>
                ),
              }}
            />
          )}
        />

        <div className="flex justify-end mt-3 mr-3">
          <div className="text-[14px] text-[#555657] font-bold hover:cursor-pointer underline">
            Forgot Password?
          </div>
        </div>

        <Button
          variant="contained"
          color="secondary"
          className=" mt-12"
          aria-label="Sign in"
          type="submit"
          size="large"
        >
          <EdgeSvgIcon
            className="icon-size-24 cursor-pointer mr-6 p-3 text-white"
            color="error"
          >
            material-solid:fingerprint
          </EdgeSvgIcon>
          Login
        </Button>
      </form>
    </>
  );
};

export default SignInForm;
