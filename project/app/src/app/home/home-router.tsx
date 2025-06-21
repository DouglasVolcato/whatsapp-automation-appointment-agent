import NotFoundPage from "@/components/pages/not-found-page";
import { Route, Routes } from "react-router";
import LoginPage from "./login/login-page";

export default function HomeRouter() {
  return (
    <>
      <Routes>
        <Route path="" element={<LoginPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </>
  );
}
