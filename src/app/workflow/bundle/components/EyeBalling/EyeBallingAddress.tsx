import { Paper, TextField } from "@mui/material";
import React, { useState } from "react";
import Ve3FormHeader from "../../../../../@core/ui/Ve3FormHeader/Ve3FormHeader";
import Ve3SelectCard from "../../../../../@core/ui/Ve3SelectCard";
import { useFormContext } from "react-hook-form";

interface EyeBallingAddressProps {
  mailingAddresses: string[];
  permanentAddresses: string[];
}

const EyeBallingAddress: React.FC<EyeBallingAddressProps> = ({
  mailingAddresses,
  permanentAddresses,
}) => {
  const { setValue } = useFormContext();
  const [selectedCard, setSelectedCard] = useState<string | null>(null);
  const [addressInput, setAddressInput] = useState<string>("");

  const handleSelectCard = (label: string) => {
    const parts = label.split(",").map((part) => part.trim());

    const address1 = parts[0] || "";
    const address2 = parts[1] || "";
    const address3 = parts[2] || "";
    const zipCode = parts[3]?.split(" ").pop() || "";

    setSelectedCard(label);
    setAddressInput("");
    setValue("address1", address1);
    setValue("address2", address2);
    setValue("address3", address3);
    setValue("zipCode", zipCode);
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = event.target.value;
    setAddressInput(inputValue);
    setSelectedCard(null);

    // Split and set values dynamically based on input
    const parts = inputValue.split(",").map((part) => part.trim());

    const address1 = parts[0] || "";
    const address2 = parts[1] || "";
    const address3 = parts[2] || "";
    const zipCode = parts[3]?.split(" ").pop() || "";

    setValue("address1", address1);
    setValue("address2", address2);
    setValue("address3", address3);
    setValue("zipCode", zipCode);
  };

  return (
    <div>
      <Paper className="px-12 pb-10 w-full">
        <Ve3FormHeader
          icon="material-outline:location_on"
          title="CRIB Address"
        />

        <div className="flex flex-col gap-12">
          <p>Mail Address:</p>
          {mailingAddresses.map((item, index) => (
            <Ve3SelectCard
              label={item}
              isSelected={selectedCard === item && !addressInput}
              onClick={() => {
                handleSelectCard(item);
              }}
              key={index}
            />
          ))}

          <p>Permanent Address:</p>
          {permanentAddresses.map((item, index) => (
            <Ve3SelectCard
              label={item}
              isSelected={selectedCard === item && !addressInput}
              onClick={() => {
                handleSelectCard(item);
              }}
              key={index}
            />
          ))}

          <TextField
            label="Enter Address"
            helperText="PLEASE SEPARATE THE ADDRESS LINE BY ADDING A COMMA DELIMITER."
            variant="outlined"
            value={addressInput}
            onChange={handleInputChange}
            fullWidth
            margin="normal"
            size="small"
          />
        </div>
      </Paper>
    </div>
  );
};

export default EyeBallingAddress;
