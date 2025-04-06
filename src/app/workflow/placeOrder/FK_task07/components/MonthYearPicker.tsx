import React from 'react';
import { TextField } from '@mui/material';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { Dayjs } from 'dayjs';
import dayjs from 'dayjs'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

interface MonthYearPickerProps {
  value: Dayjs | null;
  onChange: (value: Dayjs | null) => void;
  error?: boolean;
  helperText?: string;
  label:string
}


const MonthYearPicker: React.FC<MonthYearPickerProps> = ({ value, onChange, error, helperText,label }) => {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DatePicker
        views={['year', 'month']}
        label={label}
        minDate={dayjs('2022-01-01')}
        maxDate={dayjs('2032-12-31')}
        value={value}
        onChange={(newValue) => {
          onChange(newValue);
        }}
        slotProps={{
          textField: {
            error: error,
            helperText: helperText,
            size: "small"
          }
        }}
      />
    </LocalizationProvider>
  );
};

export default MonthYearPicker;
