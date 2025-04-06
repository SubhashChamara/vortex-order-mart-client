import React from "react";
import NoData from "../../../../public/assets/icons/common/NoData.png";
import { Box, BoxProps } from "@mui/system";

interface Ve3NoDataScreenProps extends BoxProps {
  message?: string;
}

const Ve3NoDataScreen: React.FC<Ve3NoDataScreenProps> = ({
  message = "No Results Found.",
  ...props
}) => {
  return (
    <Box
      {...props}
      className={`${
        props.className || ""
      } flex items-center justify-center w-full h-xs `}
    >
      <div className="flex flex-col gap-20 items-center justify-center">
        <img src={NoData} className="w-1/5" />
        <p className="text-md">{message}</p>
      </div>
    </Box>
  );
};

export default Ve3NoDataScreen;
