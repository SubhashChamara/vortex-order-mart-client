import { createTheme } from "@mui/material/styles";

export const VortexTheme = createTheme({
  palette: {
    primary:{
      main:"#003166",
    },
    secondary: {
      main: "#eb981f",
    },
  },
  components: {
    MuiAutocomplete: {
      defaultProps: {
        fullWidth: true,
      },
    },
    MuiTextField: {
      defaultProps: {
        variant: "outlined",
        fullWidth: true,
        InputLabelProps: {
          shrink: true,
        },
      },
      styleOverrides: {
        root: {
          "& .MuiOutlinedInput-root": {
            fontSize: "18px",
            "& .MuiOutlinedInput-notchedOutline": {
              borderRadius: "10px",
            },
            "&:hover .MuiOutlinedInput-notchedOutline": {
              borderColor: "#eb981f",
            },
            "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
              borderColor: "#003166",
            },
          },
          "& .MuiInputLabel-root": {
            fontSize: "18px",
            "&.Mui-focused": {
              color: "#1F2A44",
              fontWeight: 600,
            },
            "& .MuiFormLabel-asterisk": {
              color: "#1F2A44",
            },
          },
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          backgroundColor: "#1F2A44",
          color: "#FFF",
          borderRadius: "4px",
          padding: "6px 16px",
          fontWeight: "bold",
          "&:hover": {
            backgroundColor: "#1F2A44",
          },
          "&:focus": {
            backgroundColor: "#1F2A44",
            boxShadow: "0 0 0 3px rgba(235,152,31,254)",
          },
          "&:disabled": {
            backgroundColor: "#FF181B",
            opacity: 0.5,
            color: "#FFF",
          },
        },
      },
    },
    MuiRadio: {
      styleOverrides: {
        root: {
          color: "#1F2A44",
          "&.Mui-checked": {
            color: "#FF181B",
          },
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          boxShadow:
            "0px 3px 1px -2px rgba(0, 0, 0, 0.2), 0px 2px 2px 0px rgba(0, 0, 0, 0.14), 0px 1px 5px 0px rgba(0, 0, 0, 0.12)",
          overflow: "hidden",
        },
      },
    },
    MuiCheckbox: {
      styleOverrides: {
        root: {
          "&.Mui-checked": {
            color: "#1F2A44",
          },
        },
      },
    },
  },
});
