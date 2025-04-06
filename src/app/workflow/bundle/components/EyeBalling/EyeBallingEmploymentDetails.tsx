import { Paper, TextField } from "@mui/material";
import React, { useState } from "react";
import Ve3FormHeader from "../../../../../@core/ui/Ve3FormHeader/Ve3FormHeader";
import Ve3SelectCard from "../../../../../@core/ui/Ve3SelectCard";
import { Controller, useFormContext } from "react-hook-form";

interface EyeBallingEmploymentDetailsProps {
  employeeNames: string[];
}

const EyeBallingEmploymentDetails: React.FC<
  EyeBallingEmploymentDetailsProps
> = ({ employeeNames }) => {
  const { setValue } = useFormContext();
  const [selectedCard, setSelectedCard] = useState<string | null>(null);
  const [addressInput, setAddressInput] = useState<string>("");

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = event.target.value;
    setAddressInput(inputValue);

    const parts = inputValue.split(",").map((part) => part.trim());

    const address1 = parts[0] || "";
    const address2 = parts[1] || "";
    const address3 = parts[2] || "";
    const zipCode = parts[3]?.split(" ").pop() || "";

    setValue("officeAddress1", address1);
    setValue("officeAddress2", address2);
    setValue("officeAddress3", address3);
    setValue("officeZipCode", zipCode);
  };

  const handleCompanySelect = (label: string, index: number) => {
    const uniqueId = `${label}-${index}`;
    setSelectedCard(uniqueId);
    setValue("company", label);
  };

  const methods = useFormContext();
  const { control } = methods;

  return (
    <div>
      <Paper className="px-12 pb-10 w-full">
        <Ve3FormHeader
          icon="material-outline:location_on"
          title="Employment Details"
        />

        <div className="flex flex-col gap-12">
          {employeeNames.map((item, index) => (
            <Ve3SelectCard
              label={item}
              isSelected={selectedCard === `${item}-${index}`}
              onClick={() => handleCompanySelect(item, index)}
              key={index}
            />
          ))}

          <Controller
            name="officeAddress"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label="Enter Office Address"
                helperText="PLEASE SEPARATE THE ADDRESS LINE BY ADDING A COMMA DELIMITER."
                variant="outlined"
                value={addressInput}
                onChange={handleInputChange}
                fullWidth
                margin="normal"
                size="small"
              />
            )}
          />
        </div>
      </Paper>
    </div>
  );
};

export default EyeBallingEmploymentDetails;
