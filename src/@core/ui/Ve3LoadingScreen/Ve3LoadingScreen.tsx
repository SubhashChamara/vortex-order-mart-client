import React from "react";
import { CircularProgress } from "@mui/material";
import { Box, BoxProps } from "@mui/system";

interface Ve3LoadingScreenProps extends BoxProps {}

const Ve3LoadingScreen: React.FC<Ve3LoadingScreenProps> = (props) => {
  return (
    <Box
      {...props}
      className={`${
        props.className || ""
      } flex items-center justify-center w-full h-xs `}
    >
      <CircularProgress className="mx-auto" color="error" />
    </Box>
  );
};

export default Ve3LoadingScreen;
