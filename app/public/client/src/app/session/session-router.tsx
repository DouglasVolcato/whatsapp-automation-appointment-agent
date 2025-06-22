import AccessCredentialsPage from "./access-credentials/access-credentials";
import GeneralDashboardPage from "./dashboards/general-dashboard";
import AgencyDashboardPage from "./dashboards/agency-dashboard";
import NotFoundPage from "@/components/pages/not-found-page";
import SessionSidebar from "./components/session-sidebar";
import { Route, Routes } from "react-router";
import LlmChat from "./chat/llmchat";

export default function SessionRouter() {
  return (
    <>
      <SessionSidebar />
      <Routes>
        <Route path="/general-dashboard" element={<GeneralDashboardPage />} />
        <Route path="/agency-dashboard" element={<AgencyDashboardPage />} />
        <Route path="/access-credentials" element={<AccessCredentialsPage />} />
        <Route path="/chat" element={<LlmChat />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </>
  );
}
