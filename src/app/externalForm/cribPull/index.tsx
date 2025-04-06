import React from "react";
import { ScoreBoardProcess } from "../../core/types/ScoreBoardProcess";
import CribPullTable from "./components/CribPullTable";
type ExternalCribPullProps = {
  process: ScoreBoardProcess | null;
};

const ExternalFormCribPull: React.FC<ExternalCribPullProps> = ({ process }) => {

  return (
    <CribPullTable process={process} />
  );
};

export default ExternalFormCribPull;
