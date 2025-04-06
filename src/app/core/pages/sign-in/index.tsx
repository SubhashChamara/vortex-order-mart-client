import { FC, useState } from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { Button, Paper, TextField, Typography } from "@mui/material";

import Logger from "../../../../@helpers/Logger";
import SignInForm from "./components/SignInForm";
import { color } from "highcharts";

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

const SignIn: FC = () => {
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);

  const { control, formState, handleSubmit } = useForm<FormType>({
    mode: "onChange",
    defaultValues,
    resolver: zodResolver(schema),
  });

  const { errors } = formState;

  const handleOnSubmit = (formData: FormType) => {
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
    Logger.debug("Form Submitted");
    Logger.debug(formData);
  };

  return (
    <div className="w-screen h-screen flex justify-center md:p-40 sm:items-center">
      <Paper className="flex min-h-full w-full overflow-hidden rounded-0 sm:min-h-auto sm:w-auto sm:rounded-2xl sm:shadow-2 md:w-full md:max-w-3xl">
        <div className="relative w-full min-h-full hidden md:flex rounded-0">
          <img
            src="assets/images/login/orderlogin.png"
            alt="cover"
            className="w-full h-full object-cover"
          />
        </div>
        </Paper>
        <div className="flex flex-col w-full p-24 sm:w-auto sm:p-32 md:p-32">
          <div className="mx-auto w-full sm:max-w-256 sm:mx-0 sm:w-192 lg:w-256">
          <div className="flex justify-center">
            <img
              className="h-112 hidden md:flex mb-16"
              src="assets/logo/ordermart.png"
              alt="logo"
            />
          </div>

            <Typography className="text-2xl font-bold leading-tight tracking-tight text-center mt-1" sx={{color: "#003166"}} >
              Welcome !
            </Typography>
            <Typography className="text-xsm font-extrabold leading-tight tracking-tight text-center text-yellow-800" sx={{color:"#eb981f"}} >
              Please login in to your account
            </Typography>

            <SignInForm/>

            <div className="flex justify-center mt-10">
            {/* <img
              className="h-32 hidden md:flex"
              src="assets/logo/customer-logo/login.png"
              alt="logo"
            /> */}

            </div>
          </div>
        </div>
        
      
    </div>
  );
};

export default SignIn;
