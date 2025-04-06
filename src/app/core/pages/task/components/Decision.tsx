import { zodResolver } from "@hookform/resolvers/zod";
import { Autocomplete, Button, Paper, Popper, TextField } from "@mui/material";
import { FC, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { z } from "zod";

import EdgeSvgIcon from "../../../../../@core/ui/EdgeSvgIcon";
import Logger from "../../../../../@helpers/Logger";
import { Api } from "../../../../../api/Api";
import { DecisionPathInfo } from "../../../types/DecisionPathInfo";
import { TaskSubmitRequest } from "../../../types/TaskSubmitRequest";

type FormType = {
  decision: DecisionPathInfo | null;
};

const defaultValues: FormType = {
  decision: null,
};

const schema = z.object({
  decision: z
    .object({ id: z.string(), decision: z.string() })
    .nullable()
    .refine((val) => val !== null, {
      message: "Please select decision",
    }),
});

type DecisionProps = {
  decisionList?: DecisionPathInfo[];
  serviceUrl?: string;
  taskInstance?: string;
  processInstance?: string;
  unAssignOption?: boolean;
};

const Decision: FC<DecisionProps> = (props) => {
  const {
    decisionList = [],
    serviceUrl,
    processInstance,
    taskInstance,
    unAssignOption,
  } = props;

  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  // const [isAlertOpen, setIsAlertOpen] = useState<boolean>(false);

  const navigate = useNavigate();

  const { control, handleSubmit, formState } = useForm<FormType>({
    mode: "onChange",
    defaultValues,
    resolver: zodResolver(schema),
  });
  const { errors } = formState;

  const handleFormSuccess = () => {
    toast.success("Successfully Submitted Task.");
    navigate("/task-pad");
  };

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

    const { decision } = formData;

    if (!serviceUrl || !taskInstance || !processInstance || !decision) {
      return;
    }

    const request: TaskSubmitRequest = {
      decision: decision?.id,
      decisionName: decision?.decision,
      processInstance,
      taskInstance,
    };

    const { data, err } = await Api.performRequest((r) =>
      r.activity.submitTask(request, serviceUrl)
    );

    if (err == null) {
      handleFormSuccess();
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

  const handleUnassignTask = async () => {
    if (!taskInstance) {
      return;
    }
    const request: { taskInstance: string } = {
      taskInstance: taskInstance,
    };

    const { err } = await Api.performRequest((r) =>
      r.workflow.unassignTask(request)
    );

    if (!err) {
      toast.success("Task Unassigned Successfully");
      navigate("/task-pad");
    } else {
      toast.error(err.msg);
    }
  };

  return (
    <Paper className="flex flex-col my-9 p-9 gap-9">
      <div className="text-gray font-bold text-[12px]">
        Please select your decision from below list and press 'PROCESS REQUEST'
      </div>
      <div className="flex gap-6">
        <form
          onSubmit={handleSubmit(handleOnSubmit)}
          className="flex items-center gap-6"
          noValidate
        >
          <Controller
            name="decision"
            control={control}
            render={({ field: { value, onChange } }) => (
              <Autocomplete
                options={decisionList}
                getOptionLabel={(option) => option.decision}
                isOptionEqualToValue={(option, val) => option.id === val.id}
                value={value}
                className=""
                componentsProps={{
                  popper: {
                    style: { width: "fit-content" },
                    sx: {
                      left: "33.6px !important",
                    },
                  },
                }}
                onChange={(event, newValue) => {
                  onChange(newValue);
                }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Decision"
                    required
                    size="small"
                    placeholder="SELECT"
                    InputLabelProps={{ shrink: true }}
                    error={!!errors.decision}
                    helperText={errors?.decision?.message}
                  />
                )}
              />
            )}
          />
          <Button
            type="submit"
            aria-label="Process Request"
            className="flex w-[350px]"
          >
            <EdgeSvgIcon
              className="icon-size-18 cursor-pointer sm:mr-6 text-white"
              color="error"
            >
              feather:coffee
            </EdgeSvgIcon>
            <p className="hidden sm:block text-nowrap">Process Request</p>
          </Button>
        </form>

        <div className="flex items-center">
          <Button
            type="button"
            disabled={!unAssignOption}
            aria-label="Unassign Task"
            onClick={handleUnassignTask}
          >
            <EdgeSvgIcon
              className="icon-size-18 cursor-pointer sm:mr-6 text-white"
              color="error"
            >
              feather:unlock
            </EdgeSvgIcon>
            <p className="hidden sm:block">Unassign Task</p>
          </Button>
        </div>
      </div>
      {/* <>
        <AlertDialog
          title={"Task Has Been Completed"}
          message="New Task Please check and confirm request is assigned to System Administrator. Please wait while we automatically take you to the task pad. In event you do not see the task pad in 5 seconds please press the button below"
          isOpen={isAlertOpen}
          buttonText={"OK"}
          onButtonClick={() => {
            setIsAlertOpen(false);
            navigate("/task-pad");
          }}
          imagePath={
            "https://www.smartsheet.com/sites/default/files/content-center/all-about-workflow-optimization.jpg"
          }
          backgroundOpacity={0.8}
        />
      </> */}
    </Paper>
  );
};

export default Decision;
