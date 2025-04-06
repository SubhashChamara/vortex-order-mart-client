// EyeBallingNIC Component
import { Paper, TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
import Ve3FormHeader from "../../../../../@core/ui/Ve3FormHeader/Ve3FormHeader";
import { Controller, useFormContext } from "react-hook-form";
import Ve3SelectCard from "../../../../../@core/ui/Ve3SelectCard";

interface EyeBallingNICProps {
  nicCribFile1: string | null;
  nicCribFile2: string | null;
  nicDataEntry: string | null;
  setNewNic: () => void;
}

const EyeBallingNIC: React.FC<EyeBallingNICProps> = ({
  nicCribFile1,
  nicCribFile2,
  nicDataEntry,
  setNewNic
}) => {
  const { setValue } = useFormContext();
  const [selectedCard, setSelectedCard] = useState<string | null>(null);
  const [nicPPInput, setNicPPInput] = useState<string>("");

  const handleSelectCard = (label: string, source: string) => {
    const uniqueId = `${label}-${source}`;
    setSelectedCard(uniqueId);
    setNicPPInput("");
    setValue("nicPP", label);
  };

  const methods = useFormContext();
  const { formState, control } = methods;
  const { errors } = formState;


  return (
    <div>
      <Paper className="px-12 pb-10 w-full">
        <Ve3FormHeader
          icon="heroicons-outline:identification"
          title="NIC/PP Number"
        />

        <div className="flex flex-col gap-9">
          {nicCribFile1 && (
            <Ve3SelectCard
              label={nicCribFile1}
              isSelected={
                selectedCard === `${nicCribFile1}-File 1` && !nicPPInput
              }
              onClick={() => handleSelectCard(nicCribFile1, "File 1")}
              source="Crib File 1"
            />
          )}

          {nicCribFile2 && (
            <Ve3SelectCard
              label={nicCribFile2}
              isSelected={
                selectedCard === `${nicCribFile2}-File 2` && !nicPPInput
              }
              onClick={() => handleSelectCard(nicCribFile2, "File 2")}
              source="Crib File 2"
            />
          )}

          {nicDataEntry && (
            <Ve3SelectCard
              label={nicDataEntry}
              isSelected={
                selectedCard === `${nicDataEntry}-Data Entry` && !nicPPInput
              }
              onClick={() => handleSelectCard(nicDataEntry, "Data Entry")}
              source="Data Entry"
            />
          )}

          <Controller
            name="nicPP"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label="Enter NIC/PP Number"
                size="small"
                type="text"
                helperText={<>{errors.nicPP?.message}</>}
                error={!!errors.nicPP}
              />
            )}
          />

          <Controller
            name="newNic"
            control={control}
            render={({ field }) => (
              <TextField
                onClick={() => setNewNic()}
                disabled
                {...field}
                label="New NIC Number"
                size="small"
                type="text"
                helperText={<>{errors.newNicPP?.message}</>}
                error={!!errors.newNicPP}
              />
            )}
          />
        </div>
      </Paper>
    </div>
  );
};

export default EyeBallingNIC;
