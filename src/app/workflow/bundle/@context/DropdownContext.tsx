import React, { createContext, useContext, useState } from "react";
import { DropDownItem } from "../../../core/types/DropDown";

type DropdownContextType = {
  sourceTypeDropdowns: DropDownItem[];
  cardTypeDropdowns: DropDownItem[];
  branchDropdowns: DropDownItem[];
  setSourceTypeDropdowns: React.Dispatch<React.SetStateAction<DropDownItem[]>>;
  setCardTypeDropdowns: React.Dispatch<React.SetStateAction<DropDownItem[]>>;
  setBranchDropdowns: React.Dispatch<React.SetStateAction<DropDownItem[]>>;
};

export const DropdownContext = createContext<DropdownContextType | undefined>(
  undefined
);

export const DropdownProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [sourceTypeDropdowns, setSourceTypeDropdowns] = useState<
    DropDownItem[]
  >([]);
  const [cardTypeDropdowns, setCardTypeDropdowns] = useState<DropDownItem[]>(
    []
  );
  const [branchDropdowns, setBranchDropdowns] = useState<DropDownItem[]>([]);

  return (
    <DropdownContext.Provider
      value={{
        sourceTypeDropdowns,
        cardTypeDropdowns,
        branchDropdowns,
        setSourceTypeDropdowns,
        setCardTypeDropdowns,
        setBranchDropdowns,
      }}
    >
      {children}
    </DropdownContext.Provider>
  );
};
