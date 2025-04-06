import React from "react";
import { Box, Typography, Divider, useTheme } from "@mui/material";

type SubStat = {
  label: string;
  value: string | number;
};

interface StatCardProps {
  title: string;
  count: string | number;
  subStats: SubStat[];
  color?: string; // optional override color
}

const StatCard: React.FC<StatCardProps> = ({ title, count, subStats, color }) => {
  const theme = useTheme();

  return (
    <Box
      sx={{
        width: `${subStats.length*20}`,
        borderRadius: 4,
        overflow: "hidden",
        boxShadow: theme.shadows[2],
        backgroundColor: "#f5f7fa",
      }}
    >
      {/* Top Section */}
      <Box
        sx={{
          backgroundColor: color || "#d32f2f",
          paddingY: 1,
          textAlign: "center",
        }}
      >
        <Typography sx={{ color: "#fff", fontWeight: 700 }}>{count}</Typography>
        <Typography sx={{ color: "#fff", fontSize: 12 }}>{title}</Typography>
      </Box>

      {/* Bottom Section */}
      <Box
        display="flex"
        bgcolor="#fff"
        justifyContent="space-around"
        alignItems="center"
        paddingY={1}
      >
        {subStats.map((item, index) => (
          <React.Fragment key={item.label}>
            {index !== 0 && (
              <Divider orientation="vertical" flexItem sx={{ mx: 1 }} />
            )}
            <Box textAlign="center">
              <Typography variant="caption" fontWeight={500}>
                {item.label}
              </Typography>
              <Typography variant="subtitle2">{item.value}</Typography>
            </Box>
          </React.Fragment>
        ))}
      </Box>
    </Box>
  );
};

export default StatCard;
