import { LoadingFallbackDecorator } from "@/decorators/loading-fallback-decorator";
import { StylesConfigDecorator } from "@/decorators/styles-config-decorator";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ConfirmationProvider } from "@/contexts/confirmation-context";
import NotFoundPage from "@/components/pages/not-found-page";
import { LoadingProvider } from "./contexts/loading-context";
import { BrowserRouter, Route, Routes } from "react-router";
import { AlertProvider } from "@/contexts/alert-context";
import { createRoot } from "react-dom/client";
import { lazy, StrictMode } from "react";
import { Env } from "./config/env";
import "@/global.css";

const HomeRouter = lazy(() => import("@/app/home/home-router"));
const SessionRouter = lazy(() => import("@/app/session/session-router"));

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <LoadingProvider>
      <QueryClientProvider client={new QueryClient()}>
        <BrowserRouter basename={Env.BASE_URL} >
          <StylesConfigDecorator>
            <AlertProvider>
              <ConfirmationProvider>
                <Routes>
                  <Route
                    path={"/"}
                    element={
                      <LoadingFallbackDecorator type={"PAGE"}>
                        <HomeRouter />
                      </LoadingFallbackDecorator>
                    }
                  />
                  <Route
                    path={"/session/*"}
                    element={
                      <LoadingFallbackDecorator type={"PAGE"}>
                        <SessionRouter />
                      </LoadingFallbackDecorator>
                    }
                  />
                  <Route path={"*"} element={<NotFoundPage />} />
                </Routes>
              </ConfirmationProvider>
            </AlertProvider>
          </StylesConfigDecorator>
        </BrowserRouter>
      </QueryClientProvider>
    </LoadingProvider>
  </StrictMode>
);
