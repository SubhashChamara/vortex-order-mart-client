import { FC } from "react";
import { Route, Routes, useLocation } from "react-router-dom";

import { isNonAuthRoutes } from "../../../@helpers/AuthRouteFilter";
import AdminTools from "../../../app/core/pages/admin/admin-tools";
import Groups from "../../../app/core/pages/admin/groups";
import Process from "../../../app/core/pages/admin/process";
import ProcessAllocation from "../../../app/core/pages/admin/process-allocation";
import UserManagement from "../../../app/core/pages/admin/user-management";
import UserRole from "../../../app/core/pages/admin/user-role";
import ExternalComponent from "../../../app/core/pages/external";
import Home from "../../../app/core/pages/home";
import KnowledgePortal from "../../../app/core/pages/knowledge-portal";
import KnowledgePortalDocuments from "../../../app/core/pages/knowledge-portal/knowledge-documents";
import ScoreBoard from "../../../app/core/pages/score-board";
import SignIn from "../../../app/core/pages/sign-in";
import TaskPad from "../../../app/core/pages/task-pad";
import Task from "../../../app/core/pages/task/Task";
import FrmInviestigationReport from "../../../app/workflow/FrmInvestigation/reports/frm-invest-report";
import ReportProcesses from "../../../app/core/pages/reports";
import Layout from "./Layout";
import Reports from "../../../app/core/pages/reports/process-reports";
import Report from "../../../app/core/pages/reports/process-reports/report";
import Profile from "../../../app/core/pages/profile";
import ReportAllocation from "../../../app/core/pages/admin/report-allocation";
import AddReport from "../../../app/core/pages/admin/add-report";
import InitiationReportMemo from "../../../app/workflow/bundle/reports/initiation-report/InitiationReport";
import BulkUpload from "../../../app/core/pages/admin/user-bulk-upload";
import QuickActionButton from "../../../app/core/pages/home/components/QuickActionButton"


const AuthLayout: FC = () => {
  const location = useLocation();

  return (
    <>
      {isNonAuthRoutes(location.pathname) ? (
        <Routes>
          <Route path="/sign-in" element={<SignIn />} />
          <Route path="/external/:process" element={<ExternalComponent />} />
        </Routes>
      ) : (
        <Routes>
          {/* Routes without the navbar */}
          <Route
            path="/my-reports/bundled/initiation-report"
            element={<InitiationReportMemo />}
          />

          {/* Routes with the navbar */}
          <Route
            path="*"
            element={
              <Layout>
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="apps/profile" element={<Profile />} />
                  <Route path="/task-pad" element={<TaskPad />} />
                  <Route path="/task/:id" element={<Task />} />
                  <Route path="/admin-tools" element={<AdminTools />} />
                  <Route path="/admin-tools/user-role" element={<UserRole />} />
                  <Route
                    path="/admin-tools/user-management"
                    element={<UserManagement />}
                  />
                  <Route path="/admin-tools/group" element={<Groups />} />
                  <Route path="/admin-tools/process" element={<Process />} />
                  <Route
                    path="/admin-tools/process-allocation"
                    element={<ProcessAllocation />}
                  />
                  <Route
                    path="/admin-tools/report-allocation"
                    element={<ReportAllocation />}
                  />
                  <Route
                    path="/admin-tools/add-report"
                    element={<AddReport />}
                  />
                   <Route
                    path="/admin-tools/bulk-upload"
                    element={<BulkUpload />}
                  />
                  <Route path="/scoreboard" element={<ScoreBoard />} />
                  <Route
                    path="/knowledge-portal"
                    element={<KnowledgePortal />}
                  />
                  <Route
                    path="/knowledge-portal/documents/:process"
                    element={<KnowledgePortalDocuments />}
                  />
                  <Route path="/my-reports" element={<ReportProcesses />} />
                  <Route path="/my-reports/:process" element={<Reports />} />
                  <Route
                    path="/my-reports/:process/:report"
                    element={<Report />}
                  />
                </Routes>
                
              </Layout>
            }
          />
          
        </Routes>
      )}
      
    </>
  );
};

export default AuthLayout;
