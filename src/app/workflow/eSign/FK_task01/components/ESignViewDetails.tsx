import { FC, memo } from "react";
import {
    Dialog,
    DialogTitle,
    DialogContent,
    Button,
    DialogActions,
  } from "@mui/material";
import { FormProvider, useForm } from "react-hook-form";

type VIEW_PROPS = {
    open: boolean;
    handleClose: () => void;
    filePassing: File | null;
  };

const ESignViewDetails: FC<VIEW_PROPS> = ({open, handleClose,filePassing}) => {
console.log("filePassing",filePassing)
const fileURL = filePassing ? URL.createObjectURL(filePassing) : null;
    return (
        <div>
      <Dialog open={open} onClose={handleClose} sx={{
    '& .MuiDialog-paper': {
        
      minWidth: '80%',
      height:'100%'
    },
  }}>
        <DialogTitle>View</DialogTitle>
        <DialogContent>
        <div className="flex flex-col gap-12">
          {fileURL ? (
            <iframe
              src={fileURL}
              width="100%"
              height="600px"
              title="Document Preview"
              style={{ border: "none" }}
            />
          ) : (
            <p>No document available for preview.</p>
          )}
        </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="secondary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </div>
    );
};

export default memo(ESignViewDetails);