import React from "react";
import NoData from "../../../../public/assets/icons/common/TimeBox.png";
import { Box, BoxProps } from "@mui/system";

interface Ve3TimeBoxScreenProps extends BoxProps {
    message?: string;
}

const Ve3TimeBoxScreen: React.FC<Ve3TimeBoxScreenProps> = ({
    message,
    ...props
}) => {
    return (
        <Box
            {...props}
            className={`${props.className || ""
                } flex items-center justify-center w-full h-xs `}
        >
            <div className="flex flex-col gap-20 items-center justify-center">
                <img src={NoData} className="w-1/5" />
                <p className="text-md">{message}</p>
            </div>
        </Box>
    );
};

export default Ve3TimeBoxScreen;
