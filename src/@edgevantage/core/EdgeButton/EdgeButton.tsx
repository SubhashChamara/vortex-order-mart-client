import { FC } from "react";
import { Button } from "@mui/material";
import EdgeSvgIcon from "../EdgeSvgIcon";

type EdgeButtonProps = {
  label: string;
  icon?:string;
  disabled?: boolean;
  onClick?: () => void;
  background?:string;
  textColor?:string;
  type?: "button" | "submit" | "reset";
};

const EdgeButton: FC<EdgeButtonProps> = (props) => {
  const { label,icon, onClick, type = "button", disabled,background= "#FF181B",textColor="#FFF"} = props;

  return (
    <Button
      onClick={onClick}
      type={type}
      disabled={disabled}
      sx={{
        backgroundColor: background,
        color: textColor,
        borderRadius: 1,
        padding: "8px 16px",
        fontWeight: "bold",
        "&:hover": {
          backgroundColor: '#d20c0c',
        },
        "&:focus": {
          backgroundColor: "#d20c0c",
          boxShadow: "0 0 0 3px rgba(255, 24, 27, 0.5)",
        },
        "&:disabled": {
          backgroundColor: "#d20c0c",
          opacity: 0.5,
          color: "#FFF",
        },
      }}
    > 
      {icon && <EdgeSvgIcon size={24} className="pr-3">
        {icon}
      </EdgeSvgIcon>}
      {label}
    </Button>
  );
};

export default EdgeButton;
