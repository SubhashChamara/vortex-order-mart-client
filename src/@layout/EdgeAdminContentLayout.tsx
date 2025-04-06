import { FC, ReactNode } from "react";
import { Paper } from "@mui/material";
import { motion } from "framer-motion";

import { useNavbarState } from "../@context/NavbarProvider";
import { useThemeMediaQuery } from "../@edgevantage/hooks";

type EdgeAdminContentLayoutProps = {
  formComponent?: ReactNode;
  tableComponent: ReactNode;
};

const EdgeAdminContentLayout: FC<EdgeAdminContentLayoutProps> = (props) => {
  const { formComponent, tableComponent } = props;
  const isMobile = useThemeMediaQuery((theme) => theme.breakpoints.down("lg"));
  const { mobileOpen } = useNavbarState();

  return (
    <div className="h-full w-full">
      <div
        className={`flex flex-col gap-24 ${
          !mobileOpen || !isMobile ? "md:flex-row" : ""
        }`}
      >
        <motion.div
          initial={{ y: -20 }}
          animate={{
            y: 0,
            transition: { delay: 0.4 },
          }}
        >
          {formComponent && <Paper
            className={`w-full h-full p-9 ${
              !mobileOpen || !isMobile ? "md:w-[400px]" : ""
            }`}
          >
            {formComponent}
          </Paper>}
        </motion.div>
        <motion.div
          initial={{ y: -20 }}
          animate={{
            y: 0,
            transition: { delay: 0.4 },
          }}
          className="w-full h-full"
        >
          <Paper className="w-full h-full p-9">{tableComponent}</Paper>
        </motion.div>
      </div>
    </div>
  );
};

export default EdgeAdminContentLayout;
