import React from "react";
import { Box, Typography, Divider, useTheme } from "@mui/material";
import * as MuiIcons from "@mui/icons-material";
import EdgeSvgIcon from "../EdgeSvgIcon";
import clsx from "clsx";

type SubStat = {
  label: string;
  value: string | number;
};

interface StatCardWithIconProps {
  title: string;
  count: string | number;
  subStats: SubStat[];
  icon: string|null; // Accept MUI icon name as string
  color?: string;
}

const StatCardWithIconHorizontal: React.FC<StatCardWithIconProps> = ({
  title,
  count,
  subStats,
  icon,
  color = "#d32f2f",
}) => {
  const theme = useTheme();

  return (
    <Box
      sx={{
        display: "flex",
        width: 300,
        borderRadius: 4,
        overflow: "hidden",
        boxShadow: theme.shadows[2],
        backgroundColor: color,
      }}
    >
      {/* Left: Icon */}
      <Box
        sx={{
          
          width: 80,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {icon && (
          <EdgeSvgIcon
            className={clsx("fuse-list-item-icon shrink-0 text-white")}
            size={40}
          >
            {icon}
          </EdgeSvgIcon>
        )}
      </Box>

      {/* Right: Content */}
      <Box sx={{ flex: 1, p: 2, display: "flex", flexDirection: "column", borderRadius: 4, backgroundColor: "#fff",}}>
        <Box>
            <Typography sx={{fontWeight: 700, fontSize: 24,}} className="text-center">{title}</Typography>
            <Typography sx={{ fontWeight: 700, fontSize: 30 }} className="text-center">{count}</Typography>
        </Box>
        <Divider orientation="horizontal" flexItem sx={{ mx: 1 }} />
        <Box display="flex" alignItems="center" justifyContent="center">
          {subStats.map((item, index) => (
            <React.Fragment key={item.label}>
              {index !== 0 && (
                <Divider orientation="vertical" flexItem sx={{ mx: 1 }} />
              )}
              <Box textAlign="center">
                <Typography variant="caption" fontWeight={700}>
                  {item.label}
                </Typography>
                <Typography variant="subtitle2">{item.value}</Typography>
              </Box>
            </React.Fragment>
          ))}
        </Box>
      </Box>
    </Box>
  );
};

export default StatCardWithIconHorizontal;
