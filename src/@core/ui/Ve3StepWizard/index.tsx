import { Box, styled, Typography } from "@mui/material";
import { FC, ReactNode, useEffect, useRef, useState } from "react";

// Define your steps here
// const steps = [
//   { label: "Step 1: Overview", content: "This is the overview section." },
//   { label: "Step 2: Details", content: "This is the details section." },
//   { label: "Step 3: Review", content: "This is the review section." },
// ];

// Styled component for step
const Step = styled(Box)(
  ({
    theme,
    active,
    completed,
    currrentstep,
  }: {
    active?: boolean | string;
    completed?: boolean | string;
    currrentstep?: boolean | string;
  }) => ({
    position: "relative",
    display: "flex",
    alignItems: "center",
    cursor: "pointer",
    userSelect: "none",
    justifyContent: "center",
    minWidth: "max-content",
    paddingLeft: "40px",
    paddingRight: "40px",
    height: "40px",
    borderRadius: theme.shape.borderRadius,
    borderTopRightRadius: 0,
    borderBottomRightRadius: 0,

    backgroundColor: active
      ? theme.palette.error.main
      : currrentstep
      ? theme.palette.grey[400]
      : completed
      ? theme.palette.grey[800]
      : theme.palette.warning.main,
    color: active || completed ? "white" : "black",
    [theme.breakpoints.down("sm")]: {
      width: "100%",
      height: "40px",
      fontSize: "0.875rem",
      padding: theme.spacing(1.5),
    },

    textAlign: "center",
    "&::after": {
      content: '""',
      position: "absolute",
      top: "50%",
      right: -40,
      transform: "translateY(-50%)",
      width: 0,
      height: 0,
      borderWidth: "20px",
      borderStyle: "solid",
      zIndex: 100,

      borderColor: `transparent transparent transparent ${
        active
          ? theme.palette.error.main
          : currrentstep
          ? theme.palette.grey[400]
          : completed
          ? theme.palette.grey[800]
          : theme.palette.warning.main
      }`,
    },
    "&::before": {
      content: '""',
      position: "absolute",
      top: "50%",
      right: -50,
      transform: "translateY(-50%)",
      width: 0,
      height: 0,
      borderWidth: "25px",
      borderStyle: "solid",
      zIndex: 100,

      borderColor: `transparent transparent transparent ${
        active ? theme.palette.grey[200] : theme.palette.grey[200]
      }`,
    },
  })
);

type StepNavigationProps = {
  steps: { label: string; content: ReactNode | null }[];
  selectStep: number;
  currentSteps?: number[];
  completedSteps?: number[];
  currentStep?: number;
  setCurrentStep?: (step: number) => void;
};

const StepNavigation: FC<StepNavigationProps> = (props) => {
  const {
    steps,
    selectStep,
    currentSteps,
    completedSteps,
    currentStep,
    setCurrentStep,
  } = props;
  const [activeStep, setActiveStep] = useState(0);
  const boxRef = useRef<HTMLDivElement | null>(null);

  // Handle step click
  const handleStepClick = (index: number) => {
    setActiveStep(index);
    setCurrentStep ? setCurrentStep(index) : null;
  };

  useEffect(() => {
    if (selectStep != null) {
      setActiveStep(selectStep);
    }
  }, [selectStep]);

  useEffect(() => {
    if (boxRef.current) {
      boxRef.current.scrollLeft = boxRef.current.scrollWidth;
    }
  }, [steps]);

  return (
    <Box sx={{ width: "100%" }}>
      {/* Horizontal Step Navigation */}
      <Box
        sx={{ display: "flex" }}
        ref={boxRef}
        className="h-fit flex-wrap gap-y-3 pb-12"
      >
        {steps.map((step, index) => {
          const completed = completedSteps
            ? completedSteps.includes(index)
            : false;
          const isCurrent = currentSteps ? currentSteps.includes(index) : false;
          return (
            <Step
              key={index}
              onClick={() => handleStepClick(index)}
              active={activeStep == index ? "true" : ""}
              completed={completed ? "true" : ""}
              currrentstep={isCurrent ? "true" : ""}
              // sx={{ marginRight: index < steps.length - 1 ? -2 : 0 }}
            >
              <p className="flex items-center justify-center w-full whitespace-nowrap ml-12 sm:m-0">
                {step.label}
              </p>
            </Step>
          );
        })}
      </Box>

      {/* Content of the Active Step */}
      <Box>
        {/* <Typography variant="h6">{steps[activeStep].label}</Typography> */}
        <div>{steps[activeStep]?.content}</div>
      </Box>
    </Box>
  );
};

export default StepNavigation;
