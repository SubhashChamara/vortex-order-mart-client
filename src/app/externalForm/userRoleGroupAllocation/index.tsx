import React from "react";
import { ScoreBoardProcess } from "../../core/types/ScoreBoardProcess";
import UserRoleGroupForm from "./components/UserRoleGroupForm";

type ExternalFormUserRoleProps = {
  process: ScoreBoardProcess | null;
};

const ExternalFormUserRole: React.FC<ExternalFormUserRoleProps> = (props) => {
  const { process } = props;

  return (
    <div>
      <UserRoleGroupForm task={process} />
    </div>
  );
};

export default ExternalFormUserRole;
