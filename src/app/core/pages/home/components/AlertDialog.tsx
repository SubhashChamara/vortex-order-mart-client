import React, { ReactNode } from "react";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import TaskAltIcon from "@mui/icons-material/TaskAlt";

export type AlertDialogProps = {
  title: string;
  message: ReactNode;
  isOpen: boolean;
  buttonText?: string;
  onButtonClick: () => void;
  backgroundOpacity?: number;
  imagePath?: string;
};

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(4),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

const AlertDialog: React.FC<AlertDialogProps> = (props) => {
  const {
    title,
    message,
    isOpen,
    buttonText = "OK",
    onButtonClick,
    backgroundOpacity = 0.9,
  } = props;

  return (
    <div className="flex">
      <BootstrapDialog
        disableEscapeKeyDown
        aria-labelledby="customized-dialog-title"
        open={isOpen}
        slotProps={{
          backdrop: {
            sx: {
              backgroundColor: `rgba(0, 0, 0, ${backgroundOpacity})`,
            },
          },
        }}
        PaperProps={{ sx: { borderRadius: "19.2px", width: "450px" } }}
      >
        <DialogContent
          dividers
          className="flex flex-col items-center justify-center gap-12 border-t-[10px] border-t-[#2F7C31]"
        >
          <div className="flex flex-col gap-4 items-center justify-center">
            <TaskAltIcon fontSize={"large"} color="success" />
            <p className="font-bold text-12">{title}</p>
          </div>
          <p className="flex text-justify text-[12px]">{message}</p>
          <Button autoFocus className="w-full bg-black" onClick={onButtonClick}>
            {buttonText}
          </Button>
        </DialogContent>
      </BootstrapDialog>
    </div>
  );
};

export default AlertDialog;
