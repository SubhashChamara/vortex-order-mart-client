import { Person, Upload } from "@mui/icons-material";
import {
  Grid,
  Card,
  CardMedia,
  CardContent,
  Avatar,
  TextField,
  IconButton,
  Button,
} from "@mui/material";
import { Box } from "@mui/system";
import { Controller, useForm } from "react-hook-form";
import EdgeButton from "../../../../../@edgevantage/core/EdgeButton/EdgeButton";
import CoverImage from "../../../../../../public/assets/images/login/profile-cover.jpg";
import UploadPhoto from "./UploadPhoto";
import { useEffect, useState } from "react";
import Ve3Popup from "../../../../../@core/ui/Ve3Popup/Ve3Popup";
import { UserDetailDto } from "../../../types/UserDetailDto";
import RetriveFile from "../../../../../@helpers/RetriveFiles";
import { darken } from "@mui/material/styles";
import { z } from "zod";
import { Api } from "../../../../../api/Api";
import { toast } from "react-toastify";
import { ProcessInfo } from "../../../types/ProcessInfo";
import { useAuthContext } from "../../../../../@context/AuthContext";
import UploadSignature from "./UploadSignature";

type FormType = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  designation: string;
  userName: string;
};

const defaultValues: FormType = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  designation: "",
  userName: "",
};

const schema = z.object({
  fisrtName: z.string().min(1, "First name is mandatory."),
  lastName: z.string().min(1, "Last name is mandatory."),
  email: z.string().min(1, "Email is mandatory."),
  userGroup: z.string().min(1, "User group is mandatory."),
  Phone: z.string().min(1, "Phone is mandatory."),
  userName: z.string().min(1, "User name is mandatory."),
});

export type PersonalInfoProps = {
  user: UserDetailDto | null;
  blobObj: Blob | null;
};

const PersonalInfo = (props: PersonalInfoProps) => {
  const { blobObj } = props;
  const [file, setFile] = useState<File | null>(null);
  const [signatureFile, setSignatureFile] = useState<File | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenSignature, setIsOpenSignature] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { user, handleAutoLogin } = useAuthContext();

  const { control, formState, setValue, handleSubmit } = useForm<FormType>({
    mode: "onChange",
    defaultValues,
    // resolver: zodResolver(schema),
  });
  const { errors } = formState;

  useEffect(() => {
    setValue("firstName", user?.data?.firstName ?? "");
    setValue("lastName", user?.data?.lastName ?? "");
    setValue("email", user?.data?.email ?? "");
    setValue("phone", user?.data?.telephone ?? "");
    setValue("designation", user?.data?.designation ?? "");
    setValue("userName", user?.data?.userName ?? "");
  }, [user]);

  const handleOnSubmit = async () => {
    if (isSubmitted) {
      return;
    }
    setIsSubmitted(true);

    let doc = null;
    let signatureDoc = null;

    if (signatureFile !== null) {
      const image = new Image();
      const fileURL = URL.createObjectURL(signatureFile);

      image.src = fileURL;

      await new Promise((resolve, reject) => {
        image.onload = () => {
          if (image.width !== 228 || image.height !== 114) {
            toast.error(
              "Please Upload jpg or png with 228 x 114 (width x height) pixels images only."
            );
            setIsSubmitted(false);
            reject(new Error("Invalid signature dimensions."));
          } else {
            resolve(null);
          }
        };
        image.onerror = () => {
          toast.error("Failed to load the signature file.");
          setIsSubmitted(false);
          reject(new Error("Failed to load the signature file."));
        };
      });
    }

    if (file !== null) {
      const formData = new FormData();
      formData.append("file", file);

      const { data, err } = await Api.performRequest((r) =>
        r.document.upload(formData)
      );

      if (data !== null) {
        doc = data;
        toast.success("Successfully Uploaded File");
      } else {
        toast.error(err?.msg);
      }
    }

    if (signatureFile !== null) {
      console.log("signatureFile Calld");
      const formDataSIg = new FormData();
      formDataSIg.append("file", signatureFile);

      const { data, err } = await Api.performRequest((r) =>
        r.document.upload(formDataSIg)
      );

      if (data !== null) {
        signatureDoc = data;
        console.log("signatureFile Calld", signatureDoc);
        toast.success("Successfully Uploaded Signature");
      } else {
        toast.error(err?.msg);
      }
    }
    if (signatureFile !== null) {
      const formDataSIgUpload = new FormData();
      formDataSIgUpload.append("file", signatureFile);

      const { err: errSignature } = await Api.performRequest((r) =>
        r.admin.updateSignature(
          user?.uuid || "",
          signatureDoc?.id || "",
          formDataSIgUpload
        )
      );

      if (errSignature == null) {
        handleAutoLogin();
      } else {
        toast.error(errSignature?.msg);
      }
    }
    const { data, err } = await Api.performRequest((r) =>
      r.admin.updateUserProfile(user?.uuid || "", doc?.id || "")
    );

    if (err == null) {
      toast.success("User Updated Succesfully.");
      handleAutoLogin();
    } else {
      toast.error(err?.msg);
    }

    setTimeout(() => setIsSubmitted(false), 3000);
  };

  const handleUploadImage = () => {
    setIsOpen(!isOpen);
  };

  const handleUploadSignatureImage = () => {
    setIsOpenSignature(!isOpen);
  };

  useEffect(() => {
    if (file !== null) {
      setIsOpen(false);
      setIsOpenSignature(false);
    }
  }, [file]);

  return (
    <Grid item xs={12} md={4} marginBottom={4}>
      <Card className="rounded-md h-screen">
        <Box sx={{ height: "100%", overflow: "auto" }}>
          <form onSubmit={handleSubmit(handleOnSubmit)}>
            <Box
              sx={{
                height: 160,
                overflow: "hidden",
              }}
            >
              <CardMedia
                src={CoverImage}
                component="img"
                height="10"
                sx={{
                  height: "100%",
                  objectFit: "cover",
                }}
              />
            </Box>
            <CardContent sx={{ pt: 0, position: "relative" }}>
              <Grid container spacing={4} sx={{ mt: -11, alignItems: "start" }}>
                <Grid
                  item
                  xs={12}
                  md={6}
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                  }}
                >
                  <Box
                    borderRadius={2}
                    sx={{
                      width: 96,
                      height: 96,
                      position: "relative",
                      mb: 2, // Adds consistent margin below the image
                    }}
                  >
                    {user?.data.photoURL ? (
                      <Avatar
                        sx={{
                          background: (theme) =>
                            theme.palette.background.default,
                          color: (theme) => theme.palette.text.secondary,
                          width: 96,
                          height: 96,
                          borderRadius: 2,
                          border: "2px solid #d20c0c",
                          padding: 1,
                        }}
                        alt="user photo"
                        src={RetriveFile(user?.data.photoURL)}
                      />
                    ) : (
                      <Avatar
                        sx={{
                          background: (theme) =>
                            darken(theme.palette.background.default, 0.05),
                          color: (theme) => theme.palette.text.secondary,
                        }}
                      >
                        {user?.data.displayName?.[0]}
                      </Avatar>
                    )}
                  </Box>

                  <Box sx={{ textAlign: "center", mt: 2, mb: 2 }}>
                    <div className="text-[18px] text-black font-600">
                      Your Photo
                    </div>
                    {/* <div className="text-[12px] text-gray">
                      This will be displayed on your profile
                    </div> */}
                  </Box>

                  <Box sx={{ textAlign: "center", mb: 2 }}>
                    <div className="text-[12px] text-gray">
                      Upload new profile picture
                    </div>
                  </Box>

                  <Box
                    sx={{ display: "flex", justifyContent: "center", gap: 2 }}
                  >
                    <Box border={2} borderRadius={1} borderColor="red">
                      <IconButton
                        onClick={handleUploadImage}
                        className="bg-white text-red-500"
                      >
                        <Upload />
                        <div className="text-[14px] font-700">UPLOAD NEW</div>
                      </IconButton>
                    </Box>
                    <Ve3Popup
                      open={isOpen}
                      onClose={() => {
                        setIsOpen(false);
                      }}
                      setOpen={setIsOpen || isUploading}
                      body={
                        <UploadPhoto
                          isUploading={isUploading}
                          setIsUploading={setIsUploading}
                          file={file}
                          setFile={setFile}
                        />
                      }
                    />
                  </Box>
                </Grid>

                <Grid
                  item
                  xs={12}
                  md={6}
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                  }}
                >
                  <Box
                    borderRadius={2}
                    sx={{
                      width: 96,
                      height: 96,
                      position: "relative",
                      mb: 2, // Adds consistent margin below the image
                    }}
                  >
                    <Avatar
                      sx={{
                        background: (theme) => theme.palette.background.default,
                        color: (theme) => theme.palette.text.secondary,
                        width: 96,
                        height: 96,
                        borderRadius: 2,
                        border: "2px solid #d20c0c",
                        padding: 1,
                      }}
                      alt="user signature"
                      src={blobObj ? URL.createObjectURL(blobObj) : undefined}
                    />
                  </Box>

                  <Box sx={{ textAlign: "center", mt: 2, mb: 2 }}>
                    <div className="text-[18px] text-black font-600">
                      Your Signature
                    </div>
                    {/* <div className="text-[12px] text-gray">
                      This will be displayed on your profile
                    </div> */}
                  </Box>

                  <Box sx={{ textAlign: "center", mb: 2 }}>
                    <div className="text-[12px] text-gray">
                      Upload new signature
                    </div>
                  </Box>

                  <Box
                    sx={{ display: "flex", justifyContent: "center", gap: 2 }}
                  >
                    <Box border={2} borderRadius={1} borderColor="red">
                      <IconButton
                        onClick={handleUploadSignatureImage}
                        className="bg-white text-red-500"
                      >
                        <Upload />
                        <div className="text-[14px] font-700">UPLOAD NEW</div>
                      </IconButton>
                    </Box>

                    <Ve3Popup
                      open={isOpenSignature}
                      onClose={() => {
                        setIsOpenSignature(false);
                      }}
                      setOpen={setIsOpenSignature || isUploading}
                      body={
                        <UploadSignature
                          isUploading={isUploading}
                          setIsUploading={setIsUploading}
                          file={signatureFile}
                          setFile={setSignatureFile}
                        />
                      }
                    />
                  </Box>
                </Grid>
                <div className="flex justify-start ml-40 mt-14 mb-7">
                <EdgeButton
                  label="Save"
                  textColor="primary"
                  background="primary"
                  icon="material-solid:save"
                  type="submit"
                />
              </div>
              </Grid>
              
              <Box
                sx={{ mb: 4 }}
                className="flex bg-gray-400 p-6"
                borderRadius={2}
              >
                <Person className="ml-4" />
                <div className="text-[18px] text-black font-600">
                  Personal Information
                </div>
              </Box>

              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <Controller
                    name="firstName"
                    control={control}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        disabled
                        label="First Name"
                        size="small"
                        type="text"
                        error={!!errors.firstName}
                        helperText={errors?.firstName?.message}
                      />
                    )}
                  />
                </Grid>
                <Grid item xs={6}>
                  <Controller
                    name="lastName"
                    control={control}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        disabled
                        label="Last Name"
                        size="small"
                        type="text"
                        error={!!errors.lastName}
                        helperText={errors?.lastName?.message}
                      />
                    )}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Controller
                    name="designation"
                    control={control}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        disabled
                        label="Designation"
                        size="small"
                        type="text"
                        error={!!errors.designation}
                        helperText={errors?.designation?.message}
                      />
                    )}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Controller
                    name="phone"
                    control={control}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        disabled
                        label="Phone"
                        size="small"
                        type="text"
                        error={!!errors.phone}
                        helperText={errors?.phone?.message}
                      />
                    )}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Controller
                    name="email"
                    control={control}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        disabled
                        label="Email"
                        size="small"
                        type="text"
                        error={!!errors.email}
                        helperText={errors?.email?.message}
                      />
                    )}
                  />
                </Grid>
              </Grid>
            </CardContent>
          </form>
        </Box>
      </Card>
    </Grid>
  );
};

export default PersonalInfo;
