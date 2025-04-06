import { Paper, TextField } from "@mui/material";
import React from "react";
import Ve3FormHeader from "../../../../../@core/ui/Ve3FormHeader/Ve3FormHeader";
import dayjs from "dayjs";

interface EyeBallingPrecheckFieldsProps {
  preCheckNicOld: string;
  preCheckNicNew: string;
  preCheckDob: string;
  preCheckCustomerCategory: string;
  preCheckName: string;
  preCheckAge: string;
}

const EyeBallingPrecheckFields: React.FC<EyeBallingPrecheckFieldsProps> = ({
  preCheckNicOld,
  preCheckNicNew,
  preCheckDob,
  preCheckCustomerCategory,
  preCheckName,
  preCheckAge,
}) => {
  return (
    <div>
      <Paper className="px-12 pb-10 w-full">
        <Ve3FormHeader
          icon="material-outline:checklist"
          title="Eye Balling Pre-check"
        />

        <div className="grid grid-cols-6 gap-12">
          <TextField
            value={preCheckNicOld}
            label="Old NIC"
            disabled
            size="small"
            InputLabelProps={{
              shrink: true,
            }}
          />
          <TextField
            value={preCheckNicNew}
            label="New NIC"
            disabled
            size="small"
            InputLabelProps={{
              shrink: true,
            }}
          />
          <TextField
            value={dayjs(preCheckDob).format("DD-MM-YYYY")}
            label="Date of Birth"
            disabled
            size="small"
            InputLabelProps={{
              shrink: true,
            }}
          />
          <TextField
            value={preCheckCustomerCategory}
            label="Category"
            disabled
            size="small"
            InputLabelProps={{
              shrink: true,
            }}
          />
          <TextField
            value={preCheckName}
            label="Name"
            disabled
            size="small"
            InputLabelProps={{
              shrink: true,
            }}
          />
          <TextField
            value={preCheckAge}
            label="Age"
            disabled
            size="small"
            InputLabelProps={{
              shrink: true,
            }}
          />
        </div>
      </Paper>
    </div>
  );
};

export default EyeBallingPrecheckFields;
