import { Paper, TextField } from "@mui/material";
import React, { useState } from "react";
import Ve3FormHeader from "../../../../../@core/ui/Ve3FormHeader/Ve3FormHeader";
import { Controller, useFormContext } from "react-hook-form";
import Ve3SelectCard from "../../../../../@core/ui/Ve3SelectCard";

interface EyeBallingTPProps {
  title: string;
  name: string;
  resTelCrib1?: string | null;
  resTelCrib2?: string | null;
  mobTelCrib1?: string | null;
  mobTelCrib2?: string | null;
  offTelCrib1?: string | null;
  offTelCrib2?: string | null;
}

const EyeBallingTP: React.FC<EyeBallingTPProps> = ({
  title,
  name,
  resTelCrib1,
  resTelCrib2,
  mobTelCrib1,
  mobTelCrib2,
  offTelCrib1,
  offTelCrib2,
}) => {
  const methods = useFormContext();
  const { formState, setValue } = methods;
  const { errors } = formState;

  const [selectedCard, setSelectedCard] = useState<string | null>(null);
  const [nicPPInput, setNicPPInput] = useState<string>("");

  const handleSelectCard = (label: string) => {
    setSelectedCard(label);
    setNicPPInput(label);
    setValue(name, label);
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = event.target.value;

    setNicPPInput(inputValue);
    setSelectedCard(null);
    setValue(name, inputValue);
  };

  const valueFields = [
    resTelCrib1,
    resTelCrib2,
    mobTelCrib1,
    mobTelCrib2,
    offTelCrib1,
    offTelCrib2,
  ].filter((field) => field !== null && field !== undefined);

  return (
    <div>
      <Paper className="px-12 pb-10 w-full">
        <Ve3FormHeader icon="feather:phone" title={title} />

        <div className="flex flex-col gap-9">
          {valueFields.map((item, index) => (
            <Ve3SelectCard
              label={item as string}
              isSelected={selectedCard === item}
              onClick={() => handleSelectCard(item as string)}
              key={index}
              source="DE"
            />
          ))}

          <TextField
            label="Enter Telephone No."
            variant="outlined"
            value={nicPPInput}
            onChange={handleInputChange}
            fullWidth
            margin="normal"
            size="small"
            error={
              resTelCrib1
                ? !!errors.resTelephone
                : mobTelCrib1
                ? !!errors.mobTelephone
                : !!errors.officeTelephone
            }
            helperText={
              <>
                {resTelCrib1
                  ? errors.resTelephone?.message
                  : mobTelCrib1
                  ? errors.mobTelephone?.message
                  : errors.officeTelephone?.message}
              </>
            }
            inputProps={{
              maxLength: 10,
            }}
          />
        </div>
      </Paper>
    </div>
  );
};

export default EyeBallingTP;
