import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs, { Dayjs } from 'dayjs';
import React from 'react';

interface MonthYearPickerProps {
  value: Dayjs | null;
  onChange: (value: Dayjs | null) => void;
  error?: boolean;
  helperText?: string;
  label:string
  disable?:boolean
}


const MonthYearPicker: React.FC<MonthYearPickerProps> = ({ value, onChange, error, helperText,label,disable }) => {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DatePicker
        views={['year', 'month']}
        label={label}
        disabled={disable}
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
