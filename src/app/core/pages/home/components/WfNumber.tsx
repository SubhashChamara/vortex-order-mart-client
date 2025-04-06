import { FC, memo } from "react";
import { Button, CardContent, Card, TextField } from "@mui/material";
import useThemeMediaQuery from "../../../../../@hooks/useThemeMediaQuery";

const WfNumber: FC = () => {
  const isMobile = useThemeMediaQuery((theme) => theme.breakpoints.down("sm"));
  const isTablet = useThemeMediaQuery((theme) =>
    theme.breakpoints.between("md", "lg")
  );

  return (
    <Card className="min-w-64 md:min-w-175 rounded shadow-2 min-h-30 bg-grey-100 hover:bg-grey-200 text-[10px] lg:text-10">
      <CardContent className="flex flex-col gap-3">
        <p className="font-bold text-gray-800">WF Number</p>
        <div className="flex flex-row justify-start items-center w-full gap-3">
          <TextField
            className="max-w-130 min-w-90 w-full h-24 flex justify-center"
            id="outlined-size-small"
            placeholder="Enter Workflow Number"
            size="small"
            sx={{
              "& .MuiInputBase-root": { height: isTablet ? "32px" : "40px" },
              "& .MuiInputBase-input::placeholder": {
                fontSize: isTablet ? "10px" : "16px", // Adjust the size as needed
              },
            }}
          />

          <Button
            color="primary"
            variant="contained"
            size="small"
            // className="h-24"
            sx={{ height: isTablet ? "32px" : "40px" }} // Set the same height for the button.
          >
            Go
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default memo(WfNumber);
