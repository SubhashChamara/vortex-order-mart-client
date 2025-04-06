import React, { useEffect } from "react";
import ApplicantInformation from "../ApplicantInformation/ApplicantInformation";
import CompanyInformation from "../CompanyInformation/CompanyInformation";
import ApplicantIdentitity from "../ApplicantIdentity/ApplicantIdentitity";
import { useFormContext } from "react-hook-form";
import { DropDownItem } from "../../../../core/types/DropDown";

export interface ClientBasicInformationProps {
  editable: boolean;
  onCribPullClick?: () => void;
  sourceTypeDropdowns?: DropDownItem[];
  cardTypeDropdowns?: DropDownItem[];
  titleTypeDropdowns?: DropDownItem[];
  companyDropdowns?: DropDownItem[];
}

const ClientBasicInformation: React.FC<ClientBasicInformationProps> = ({
  editable,
  onCribPullClick,
  sourceTypeDropdowns,
  cardTypeDropdowns,
  titleTypeDropdowns,
  companyDropdowns,
}) => {
  const { watch, setValue } = useFormContext();
  // const isCC = watch("isCC");

  useEffect(() => {
    setValue("currentStep", 1);
  }, []);

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-9">
        <div className="col-span-2">
          <ApplicantInformation
            editable={editable}
            sourceTypeDropdowns={sourceTypeDropdowns}
            cardTypeDropdowns={cardTypeDropdowns}
            titleTypeDropdowns={titleTypeDropdowns}
          />
        </div>
        <div className="col-span-1 flex h-full">
          <ApplicantIdentitity editable={editable} />
        </div>
        <div className="col-span-1 flex h-full">
          <CompanyInformation
            editable={editable}
            companyDropdowns={companyDropdowns}
          />
        </div>
      </div>
    </div>
  );
};

export default ClientBasicInformation;
