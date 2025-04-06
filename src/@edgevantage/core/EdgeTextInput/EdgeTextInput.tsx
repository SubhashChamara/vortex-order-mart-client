import { ChangeEventHandler, FC, ReactNode, forwardRef } from "react";
import { TextField } from "@mui/material";

type TextFieldType = "text" | "password" | "email" | "number";
type TextFieldSize = "small" | "medium";

interface EdgeTextInputProps {
  label?: string;
  type: TextFieldType;
  autoFocus?: boolean;
  error?: boolean;
  helperText?: string;
  required?: boolean;
  endAdornment?: ReactNode;
  multiline?: boolean;
  rows?: number;
  disabled?: boolean;
  value?: number | string;
  className?: string;
  onChange?: ChangeEventHandler;
  size?: TextFieldSize;
  shrink?: boolean;
}

const EdgeTextInput: FC<EdgeTextInputProps> = forwardRef<
  HTMLDivElement,
  EdgeTextInputProps
>((props, ref) => {
  const {
    type,
    label,
    autoFocus,
    error,
    helperText,
    required,
    endAdornment,
    multiline,
    rows,
    disabled,
    value,
    onChange,
    className,
    size,
    shrink = true,
    ...otherProps
  } = props;

  return (
    <TextField
      {...otherProps}
      inputRef={ref}
      className={className}
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
        endAdornment: <>{endAdornment}</>,
      }}
      label={label}
      type={type}
      autoFocus={autoFocus}
      error={error}
      helperText={helperText}
      variant="outlined"
      value={value}
      onChange={onChange}
      fullWidth
      required={required}
      multiline={multiline}
      rows={rows}
      disabled={disabled}
      size={size}
    />
  );
});

export default EdgeTextInput;
