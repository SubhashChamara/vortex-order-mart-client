import React from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import ChartDataLabels from "chartjs-plugin-datalabels";
import { Pie } from "react-chartjs-2";
import { Box, Card, CardContent, Typography } from "@mui/material";
import { VortexTheme } from "../../../../../@core/theme/VortexTheme";

// Register chart.js components
ChartJS.register(ArcElement, Tooltip, Legend, ChartDataLabels);

export interface ExpenseItem {
  name: string;
  value: number;
  color: string;
  emphasize?: boolean;
}

interface ExpensePieChartProps {
  title?: string;
  data: ExpenseItem[];
}

const ExpensePieChart: React.FC<ExpensePieChartProps> = ({ title = "Expense Statistics", data }) => {
  const chartData = {
    labels: data.map((item) => item.name),
    datasets: [
      {
        data: data.map((item) => item.value),
        backgroundColor: data.map((item) => item.color),
        offset: data.map((item) => (item.emphasize ? 20 : 0)),
        borderWidth: 0,
      },
    ],
  };

  const options = {
    plugins: {
      datalabels: {
        color: "#fff",
        font: {
          weight: "bold" as const,
          size: 12,
        },
        formatter: (value: number, context: any) => {
          const label = context.chart.data.labels[context.dataIndex];
          return `${label}\n${value}%`;
        },
      },
      tooltip: {
        callbacks: {
          label: (context: any) => {
            const value = context.parsed;
            const label = context.label;
            return `${label}: ${value}`;
          },
        },
      },
      legend: {
        display: false,
      },
    },
  };

  return (
      <CardContent>
        <Typography variant="subtitle1" fontWeight={700} mb={2} className="text-center" color={VortexTheme.palette.secondary.main}>
          {title}
        </Typography>
        <Box height={300} display="flex" justifyContent="center" alignItems="center">
          <Pie data={chartData} options={options} />
        </Box>
      </CardContent>
  );
};

export default ExpensePieChart;
