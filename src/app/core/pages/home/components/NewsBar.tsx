import React, { useEffect, useState } from "react";
import { Box, Typography } from "@mui/material";

type NewsBarProps = {
  newsItems: string[];
};

const NewsBar: React.FC<NewsBarProps> = ({ newsItems }) => {
  const [currentTime, setCurrentTime] = useState<string>(new Date().toLocaleString());

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date().toLocaleString());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const newsString = newsItems.join("  ⚫  ");

  return (
    <Box
      sx={{
        position: "fixed",
        bottom: 0, // show always at bottom (or use top: 0 for top bar)
        left: 0,
        width: "100%",
        height: "40px",
        backgroundColor: "#1e293b",
        color: "white",
        display: "flex",
        alignItems: "center",
        paddingX: 2,
        zIndex: 9999,
        overflow: "hidden",
        borderTop: "1px solid #334155",
      }}
    >
      <Typography sx={{ marginRight: 3, whiteSpace: "nowrap", fontWeight: 500 }}>
        🕒 {currentTime}
      </Typography>

      <Box sx={{ flex: 1, overflow: "hidden", position: "relative" }}>
        <Box
          sx={{
            display: "inline-block",
            whiteSpace: "nowrap",
            animation: "scrollNews 60s linear infinite",
            color: "#f1f5f9",
            fontWeight: 400,
          }}
        >
          {newsString} &nbsp;&nbsp; {newsString} &nbsp;&nbsp; {newsString}
        </Box>
      </Box>

      {/* Scroll Animation Style */}
      <style>
        {`
          @keyframes scrollNews {
            0% { transform: translateX(100%); }
            100% { transform: translateX(-100%); }
          }
        `}
      </style>
    </Box>
  );
};

export default NewsBar;
