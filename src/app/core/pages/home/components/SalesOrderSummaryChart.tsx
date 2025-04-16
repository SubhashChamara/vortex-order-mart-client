import React from "react";
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Filler,
} from "chart.js";
import { Line } from "react-chartjs-2";
import {
  Box,
  Typography,
  Select,
  MenuItem,
  Card,
  CardContent,
} from "@mui/material";
import { VortexTheme } from "../../../../../@core/theme/VortexTheme";

ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement, Tooltip, Filler);

type DataPoint = {
  date: string;
  value: number;
};

interface SalesOrderSummaryChartProps {
  title?: string;
  filter?: string;
  onFilterChange?: (val: string) => void;
  filterOptions?: string[];
  data: DataPoint[];
}

const SalesOrderSummaryChart: React.FC<SalesOrderSummaryChartProps> = ({
  title = "Monthly Sales Order Summary (in LKR)",
  filter = "This Month",
  onFilterChange,
  filterOptions = ["This Month", "Last Month"],
  data,
}) => {
  const chartData = {
    labels: data.map((item) => item.date),
    datasets: [
      {
        label: "Sales",
        data: data.map((item) => item.value),
        fill: true,
        borderColor: "#42a5f5",
        backgroundColor: "rgba(66, 165, 245, 0.2)",
        tension: 0.4,
        pointRadius: 3,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      y: {
        ticks: {
          callback: (value: number) => `Rs.${value / 1000}k`,
        },
      },
    },
    plugins: {
      tooltip: {
        callbacks: {
          label: (context: any) => `Rs.${context.parsed.y.toLocaleString()}`,
        },
      },
    },
  };

  return (
    <Card>
      <CardContent>
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
          <Typography sx={{color:VortexTheme.palette.secondary.main}} fontWeight={600}>{title}</Typography>
          <Select
            size="small"
            value={filter}
            onChange={(e) => onFilterChange?.(e.target.value)}
            variant="standard"
            disableUnderline
            sx={{ fontSize: 14 }}
          >
            {filterOptions.map((opt) => (
              <MenuItem key={opt} value={opt}>
                {opt}
              </MenuItem>
            ))}
          </Select>
        </Box>
        <Box height={380}>
          <Line data={chartData} options={options} />
        </Box>
      </CardContent>
    </Card>
  );
};

export default SalesOrderSummaryChart;
