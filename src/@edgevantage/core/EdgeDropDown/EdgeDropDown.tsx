import { FC, forwardRef } from "react";
import { Autocomplete, TextField } from "@mui/material";

type AutocompleteSize = "small" | "medium";

interface OptionType {
  label: string;
  value: string | number;
}

interface EdgeDropDownProps {
  options: OptionType[];
  label?: string;
  placeholder?: string;
  error?: boolean;
  helperText?: string;
  required?: boolean;
  disabled?: boolean;
  value?: string | number | null | undefined;
  className?: string;
  shrink?: boolean;
  onChange?: (event: any, value: string | number | null) => void;
  size?: AutocompleteSize;
}

const EdgeDropDown: FC<EdgeDropDownProps> = forwardRef<
  HTMLDivElement,
  EdgeDropDownProps
>((props, ref) => {
  const {
    options,
    label,
    placeholder,
    error,
    helperText,
    required,
    disabled,
    value,
    onChange,
    className,
    size,
    shrink = true,
    ...otherProps
  } = props;

  const getValueFromOptions = (value: string | number | null | undefined) => {
    return options.find((option) => option.value === value) || null;
  };

  return (
    <Autocomplete
      {...otherProps}
      options={options}
      value={getValueFromOptions(value)}
      onChange={(event, newValue) =>
        onChange?.(event, newValue ? newValue.value : null)
      }
      disabled={disabled}
      ref={ref}
      className={className}
      getOptionLabel={(option: OptionType) => option.label}
      isOptionEqualToValue={(option: OptionType, value: OptionType | null) =>
        option.value === value?.value
      }
      renderInput={(params) => (
        <TextField
          {...params}
          placeholder={placeholder}
          label={label}
          error={error}
          helperText={helperText}
          required={required}
          variant="outlined"
          size={size}
          InputLabelProps={{
            sx: {
              "&.Mui-focused": {
                color: "#FF181B",
                fontWeight: 600,
              },
            },
            shrink: shrink,
          }}
          InputProps={{
            ...params.InputProps,
            sx: {
              "& .MuiOutlinedInput-notchedOutline": {
                borderRadius: 2,
              },
              "&:hover .MuiOutlinedInput-notchedOutline": {
                borderColor: "#FF181B",
              },
              "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                borderColor: "#FF181B",
              },
            },
          }}
        />
      )}
    />
  );
});

export default EdgeDropDown;
