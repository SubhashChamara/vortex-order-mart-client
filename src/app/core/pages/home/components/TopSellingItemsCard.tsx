import React from "react";
import {
  Box,
  Typography,
  Card,
  CardContent,
  Avatar,
  Divider,
  MenuItem,
  Select,
} from "@mui/material";

type Item = {
  image: string;
  title: string;
  quantity: number;
};

interface TopSellingItemsCardProps {
  title?: string;
  filter?: string;
  onFilterChange?: (val: string) => void;
  filterOptions?: string[];
  items: Item[];
}

const TopSellingItemsCard: React.FC<TopSellingItemsCardProps> = ({
  title = "Top Selling Items",
  filter = "This Month",
  onFilterChange,
  filterOptions = ["This Month", "Last Month"],
  items,
}) => {
  return (
    <Card>
      <CardContent>
        {/* Header */}
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
          <Typography variant="subtitle1" fontWeight={600}>
            {title}
          </Typography>
          <Select
            value={filter}
            size="small"
            onChange={(e) => onFilterChange?.(e.target.value)}
            variant="standard"
            disableUnderline
            sx={{ fontSize: 12 }}
          >
            {filterOptions.map((opt) => (
              <MenuItem key={opt} value={opt}>
                {opt}
              </MenuItem>
            ))}
          </Select>
        </Box>

        {/* Items list */}
        <Box display="flex" overflow="auto" gap={2}>
          {items.map((item, idx) => (
            <Box
              key={idx}
              minWidth={100}
              textAlign="center"
              display="flex"
              flexDirection="column"
              alignItems="center"
            >
              <Avatar
                variant="square"
                src={item.image}
                alt={item.title}
                sx={{ width: 60, height: 60, mb: 1 }}
              />
              <Typography
                variant="body2"
                sx={{
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  width: "100%",
                  fontSize: 12,
                }}
              >
                {item.title}
              </Typography>
              <Typography fontWeight={600} fontSize={14}>
                {item.quantity} <span style={{ fontWeight: 400 }}>pcs</span>
              </Typography>
            </Box>
          ))}
        </Box>
      </CardContent>
    </Card>
  );
};

export default TopSellingItemsCard;
