import { FC } from "react";
import {
    Box,
    Typography,
    Grid,
    TextField,
    Button,
    Paper,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Divider,
  } from "@mui/material";
  import InfoIcon from '@mui/icons-material/Warning';

type SaveDialogBoxProps = {
    open: boolean;
    handleClose: () => void;
    saveData: ()=>void;
    type:string;
    // data: { frmInvestigationProcessInstance: string,
    //     frmProcess: string,}
  };

const SaveDialogBox: FC<SaveDialogBoxProps> = ({
    open,handleClose,saveData,type
  }) => {

    // const saveData=()=>{
    //     console.log("data=",data)
    // }

    return (
        <Dialog
      open={open}
      onClose={handleClose}
      fullWidth
      maxWidth="sm"
      sx={{
        '& .MuiDialog-paper': {
          width: '500px',
          padding: '20px',
          borderRadius: '8px',
          boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.1)',
        },
      }}
    >
      <DialogContent>
        <div className="flex items-center space-x-3 mb-4">
         
        </div>
        <Typography
  variant="body2"
  sx={{
    textAlign: 'center',
    color: '#666',
    marginTop: '19px',
    fontWeight: 'bold',  // Make text bold
    fontSize: '1.2rem',  // Increase font size (adjust value as needed)
  }}
>
  Do you want to Invoke an {type} flow
</Typography>
      </DialogContent>

      <Divider sx={{ margin: '20px 0' }} />

      <DialogActions
        sx={{
          padding: '10px',
          justifyContent: 'center',
          gap: '12px',
        }}
      >
        <Button
          onClick={handleClose}
          sx={{
            fontWeight: 'bold',
            textTransform: 'uppercase',
            borderRadius: '4px',
            padding: '8px 24px',
            backgroundColor: '#e5e7eb',
            color: '#374151',
            '&:hover': {
              backgroundColor: '#d1d5db',
            },
          }}
        >
          Cancel
        </Button>
        <Button
          onClick={saveData}
          sx={{
            fontWeight: 'bold',
            textTransform: 'uppercase',
            borderRadius: '4px',
            padding: '8px 24px',
            backgroundColor: '#dc2626',
            color: '#fff',
            '&:hover': {
              backgroundColor: '#b91c1c',
            },
          }}
        >
          Invoke
        </Button>
      </DialogActions>
    </Dialog>
      

    );

  };

  export default SaveDialogBox;