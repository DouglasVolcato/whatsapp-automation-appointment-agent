import GeneralDashboardPage from "./dashboards/general-dashboard";
import NotFoundPage from "@/components/pages/not-found-page";
import SessionSidebar from "./components/session-sidebar";
import ManageUsers from "./users/manage-users";
import { Route, Routes } from "react-router";
import LlmChat from "./chat/llmchat";

export default function SessionRouter() {
  return (
    <>
      <SessionSidebar />
      <Routes>
        <Route path="/general-dashboard" element={<GeneralDashboardPage />} />
        <Route path="/chat" element={<LlmChat />} />
        <Route path="/users" element={<ManageUsers />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </>
  );
}
