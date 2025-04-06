import React from "react";
import { ScoreBoardProcess } from "../../core/types/ScoreBoardProcess";
import UserRoleAllocationForm from "./components/UserRoleAllocationForm";

type ExternalFormUserRoleProps = {
  process: ScoreBoardProcess | null;
};

const ExternalFormUserRole: React.FC<ExternalFormUserRoleProps> = (props) => {
  const { process } = props;

  return (
    <div>
      <UserRoleAllocationForm process={process} />
    </div>
  );
};

export default ExternalFormUserRole;
