import { zodResolver } from "@hookform/resolvers/zod";
import { Autocomplete, TextField } from "@mui/material";
import { FC, useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { z } from "zod";
import { useNavbarState } from "../../../../../../@context/NavbarProvider";
import EdgeButton from "../../../../../../@edgevantage/core/EdgeButton/EdgeButton";
import EdgeTextInput from "../../../../../../@edgevantage/core/EdgeTextInput/EdgeTextInput";
import { useThemeMediaQuery } from "../../../../../../@edgevantage/hooks";
import Logger from "../../../../../../@helpers/Logger";
import { Api } from "../../../../../../api/Api";
import { GroupCreateRequest } from "../../../../types/GroupCreateRequest";
import { GroupInfo } from "../../../../types/GroupInfo";
import { ProcessInfo } from "../../../../types/ProcessInfo";
import EdgeSvgIcon from "../../../../../../@core/ui/EdgeSvgIcon";

type FormType = {
  name: string;
  process: string
};

const defaultValues: FormType = {
  name: "",
  process: "",
};

const schema = z.object({
  name: z.string().min(1, "Group name is mandatory."),
  process: z.object({ id: z.string(), name: z.string() }),
});

interface GroupCreationFormProps {
  formTitle: string;
  actionName: string
  groupForUpdate: GroupInfo | null;
  formReset: () => void;
  fetchGroupList: () => void;
}


const CreateGroupForm: FC<GroupCreationFormProps> = (props) => {
  const { formTitle, actionName, groupForUpdate, formReset, fetchGroupList } = props;
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [processList, setProcessList] = useState<ProcessInfo[]>([]);

  const { mobileOpen } = useNavbarState();
  const isMobile = useThemeMediaQuery((theme) => theme.breakpoints.down("lg"));

  const { control, handleSubmit, formState, setValue, watch } = useForm<FormType>({
    mode: "onChange",
    defaultValues,
    resolver: zodResolver(schema),
  });
  const { errors } = formState;



  const fetchProcessList = async () => {
    const { data, err } = await Api.performRequest((r) =>
      r.admin.processInfoList()
    );

    Logger.debug(
      "(Process List) => { DATA: " +
      JSON.stringify(data) +
      " , ERROR: " +
      JSON.stringify(err)
    );

    if (data !== null) {
      setProcessList(data);
    }
  };

  const handleOnSubmit = async (formData: FormType) => {

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

    const { name, process } = formData;
    Logger.debug("Form Submitted : " + JSON.stringify(formData));

    const request: GroupCreateRequest = {
      name: name,
      idProcess: process.id,
    };


    const { data, err } = actionName == "CREATE" ? await Api.performRequest((r) =>
      r.admin.createGroup(request))
      : await Api.performRequest((r) => r.admin.updateGroup(groupForUpdate.id, request));

    Logger.debug(
      "(Group Creation) => { DATA: " +
      JSON.stringify(data) +
      " , ERROR: " +
      JSON.stringify(err)
    );

    if (err == null) {
      let successMsg: string;
      actionName == "CREATE" ? successMsg = "Group created Successfully" : successMsg = "Group Updated Successfully";
      fetchGroupList();
      toast.success(successMsg);
    } else {
      toast.error(err?.msg);
    }
    /**
       * set submit false to identify form submitted but failed
       * help to resubmit
       * and timeout prevent double clicks
       */
    setTimeout(() => setIsSubmitted(false), 3000);
    formReset();
    clearForm();
  };

  useEffect(() => {
    fetchProcessList();
  }, []);

  const clearForm = () => {
    setValue("name", "");
    setValue("process", "");
  }

  useEffect(() => {
    setValue("name", groupForUpdate ? groupForUpdate.name : "");
    setValue("process", groupForUpdate ? groupForUpdate.processInfo : "");
  }, [groupForUpdate])

  return (
    <div>
      <div className="mb-12 border-b-1 border-b-gray-200 pb-6 flex items-end">
        <EdgeSvgIcon
          className="icon-size-24 cursor-pointer mr-6 text-primary"
          color="error"
        >
          feather:users
        </EdgeSvgIcon>
        <h1 className="text-md font-bold text-secondary">{formTitle}</h1>
      </div>
      <form onSubmit={handleSubmit(handleOnSubmit)}>
        <div
          className={`grid grid-cols-1 gap-9 ${mobileOpen && isMobile
              ? "sm:grid-cols-1 md:grid-cols-2"
              : "sm:grid-cols-2 md:grid-cols-1"
            } lg:grid-cols-1`}
        >
          <Controller
            name="name"
            control={control}
            render={({ field }) => (
              <EdgeTextInput
                {...field}
                required
                label="Group Name"
                size="small"
                type="text"
                error={!!errors.name}
                helperText={errors?.name?.message}
              />
            )}
          />

          <Controller
            name="process"
            control={control}
            render={({ field: { onChange, value } }) => (
              <Autocomplete
                options={processList}
                getOptionLabel={(option) => (option ? option.name : "")}
                isOptionEqualToValue={(option, val) => option.id === val.id}
                value={value}
                onChange={(event, newValue) => {
                  onChange(newValue);
                }}
                defaultValue={""}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Process"
                    variant="outlined"
                    required
                    size="small"
                    error={!!errors.process}
                    helperText={errors?.process?.message}
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
          />
        </div>

        <div className="flex justify-center my-6">
          <EdgeButton label={actionName} icon="feather:save" type="submit" />
        </div>
      </form>
    </div>
  );
};

export default CreateGroupForm;
