import React, { FC, useState } from "react";
import {
  Box,
  Card,
  CardContent,
  Typography,
  MenuItem,
  FormControl,
  Select,
  SelectChangeEvent,
  Stack,
} from "@mui/material";

type SummaryStatsProps = {
  data: {
    thisMonth: SummaryData;
    lastMonth: SummaryData;
    thisYear: SummaryData;
  };
};

type SummaryData = {
  income: number;
  expenditure: number;
  profit: number;
  loss: number;
};

const SummaryStats: FC<SummaryStatsProps> = ({ data }) => {
  const [filter, setFilter] = useState<"thisMonth" | "lastMonth" | "thisYear">("thisMonth");

  const handleChange = (event: SelectChangeEvent) => {
    setFilter(event.target.value as "thisMonth" | "lastMonth" | "thisYear");
  };

  const { income, expenditure, profit, loss } = data[filter];

  const renderCard = (label: string, value: number, color: string) => (
    <Card sx={{ backgroundColor: color, color: "#fff", borderRadius: 2 }}>
      <CardContent sx={{display:"flex",justifyContent:"space-between"}}>
        <Typography variant="subtitle1" fontWeight="bold">
          {label}
        </Typography>
        <Typography variant="h5">{value.toLocaleString()}</Typography>
      </CardContent>
    </Card>
  );

  return (
    <Card>
          <CardContent>
    <Box sx={{ padding: 2, maxWidth: 400 }}>
      <Box display="flex" justifyContent="flex-end" mb={2}>
        <FormControl size="small" fullWidth>
          <Select value={filter} onChange={handleChange}>
            <MenuItem value="thisMonth">This Month</MenuItem>
            <MenuItem value="lastMonth">Last Month</MenuItem>
            <MenuItem value="thisYear">This Year</MenuItem>
          </Select>
        </FormControl>
      </Box>

      <Stack spacing={2}>
        {renderCard("Total Income", income, "#2e7d32")}
        {renderCard("Total Expenditure", expenditure, "#c62828")}
        {renderCard("Total Loss", loss, "#f9a825")}
        {renderCard("Total Profit", profit, "#1565c0")}
      </Stack>
    </Box>
    </CardContent>
    </Card>
  );
};

export default SummaryStats;
