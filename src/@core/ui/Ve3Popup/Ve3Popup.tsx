import React, { FC, ReactNode, memo } from "react";
import {
  styled,
  IconButton,
  DialogContent,
  Dialog,
  DialogProps,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

const BootstrapDialog = styled(Dialog, {
  shouldForwardProp: (prop) => prop !== "customWidth",
})<{ customWidth?: string }>(({ theme, customWidth }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(5, 2, 2, 2),
    display: "flex",
    flexDirection: "column",
    width: "100%",
    height: "100%",
    boxSizing: "border-box",
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(0),
  },
  ...(customWidth && {
    "& .MuiPaper-root": {
      maxWidth: "none",
      width: customWidth,
    },
  }),
}));

interface BootstrapDialogTitleProps {
  children?: React.ReactNode;
  onClose: () => void;
}

const BootstrapDialogTitle: React.FC<BootstrapDialogTitleProps> = ({
  children,
  onClose,
}) => {
  return (
    <>
      {children}
      {onClose ? (
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            zIndex: 50,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </>
  );
};

interface Ve3PopupProps extends DialogProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  body: ReactNode;
  customWidth?: string;
  className?: string; // New optional prop for custom Tailwind CSS classes
}

const Ve3Popup: FC<Ve3PopupProps> = ({
  open,
  setOpen,
  body,
  maxWidth = "lg",
  customWidth,
  className,
  ...dialogProps
}) => {
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <BootstrapDialog
      onClose={handleClose}
      open={open}
      fullWidth
      maxWidth={customWidth ? false : maxWidth}
      customWidth={customWidth}
      className={className}
      {...dialogProps}
    >
      <BootstrapDialogTitle onClose={handleClose} />
      <DialogContent dividers>{body}</DialogContent>
    </BootstrapDialog>
  );
};

export default memo(Ve3Popup);
