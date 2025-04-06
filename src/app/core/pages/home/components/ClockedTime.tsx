import { FC, memo } from "react";
import { Card, CardContent } from "@mui/material";
import LinearProgress, {
  linearProgressClasses,
} from "@mui/material/LinearProgress";
import { styled } from "@mui/material/styles";

import EdgeSvgIcon from "../../../../../@core/ui/EdgeSvgIcon";

const ClockedTime: FC = () => {
  const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
    height: 10,
    borderRadius: 5,
    [`&.${linearProgressClasses.colorPrimary}`]: {
      backgroundColor:
        theme.palette.grey[theme.palette.mode === "light" ? 200 : 800],
    },
    [`& .${linearProgressClasses.bar}`]: {
      borderRadius: 5,
      backgroundColor: theme.palette.mode === "light" ? "#FF181B" : "#FF181B",
    },
  }));

  return (
    <Card className="max-w-345 h-full">
      <CardContent>
        <div className="flex flex-row justify-start items-center">
          <EdgeSvgIcon
            className="text-12 icon-size-12 mr-4 cursor-pointer"
            color="error"
          >
            heroicons-outline:clock
          </EdgeSvgIcon>
          <div className="font-bold text-9 text-gray-800">Clocked Time</div>
        </div>
        <div className="font-bold text-20 text-center mx-auto self-center mt-6">
          <div className="font-600 text-20">4H:18M</div>
          <BorderLinearProgress variant="determinate" value={50} />
        </div>
      </CardContent>
    </Card>
  );
};

export default memo(ClockedTime);
