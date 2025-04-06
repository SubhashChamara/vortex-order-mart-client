import { Paper, TextField } from "@mui/material";
import React, { useState } from "react";
import Ve3FormHeader from "../../../../../@core/ui/Ve3FormHeader/Ve3FormHeader";
import { Controller, useFormContext } from "react-hook-form";
import Ve3SelectCard from "../../../../../@core/ui/Ve3SelectCard";

interface EyeBallingNameProps {
  reportedNames: string[];
}

const EyeBallingName: React.FC<EyeBallingNameProps> = ({ reportedNames }) => {
  const { setValue } = useFormContext();
  const [selectedCard, setSelectedCard] = useState<string | null>(null);
  const [nameInput, setNameInput] = useState<string>("");

  const handleSelectCard = (label: string, index: number) => {
    const uniqueId = `${label}-${index}`;
    setSelectedCard(uniqueId);
    setNameInput("");
    setValue("name", label);
  };

  const methods = useFormContext();
  const { control, formState } = methods;
  const { errors } = formState;

  return (
    <div>
      <Paper className="px-12 pb-10 w-full">
        <Ve3FormHeader icon="feather:user" title="Name" />

        <div className="flex flex-col gap-12">
          {reportedNames &&
            reportedNames.map((item, index) => (
              <Ve3SelectCard
                label={item}
                isSelected={selectedCard === `${item}-${index}` && !nameInput}
                onClick={() => handleSelectCard(item, index)}
                key={index}
              />
            ))}

          <Controller
            name="name"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label="Enter Name"
                size="small"
                type="text"
                helperText={<>{errors.name?.message}</>}
                error={!!errors.name}
              />
            )}
          />
        </div>
      </Paper>
    </div>
  );
};

export default EyeBallingName;
