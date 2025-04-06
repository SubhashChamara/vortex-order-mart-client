import { FC, memo } from "react";
import { Box, CircularProgress } from "@mui/material";
import { VortexTheme } from "../../theme/VortexTheme";

const EdgeLoading: FC = () => {
  return (
    <div id="edge-splash-screen">
      <div className="logo">
        <img width="256" src="assets/logo/ordermart.png" alt="logo" />
      </div>
      <Box
        id="spinner"
        sx={{
          "& > div": {
            backgroundColor: "#F9A825 !important",
          },
        }}
      >
        <CircularProgress disableShrink sx={{ color: VortexTheme.palette.secondary.main}} />

      </Box>
    </div>
  );
};

export default memo(EdgeLoading);
