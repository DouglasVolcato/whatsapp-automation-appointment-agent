import { LoadingSpinner } from "@/components/atoms/loading-spinner/loading-spinner";
import { createContext, useContext, useState, ReactNode } from "react";

const LoadingContext = createContext<{
  loading: boolean;
  startLoading: () => void;
  stopLoading: () => void;
}>({ loading: false, startLoading: () => { }, stopLoading: () => { } });

export const LoadingProvider = ({ children }: { children: ReactNode }) => {
  const [loading, setLoading] = useState(false);

  const startLoading = () => setLoading(true);
  const stopLoading = () => setLoading(false);

  const LoadingContainer = () => (
    <div className="h-screen" style={{ position: "fixed", top: 0, left: 0, width: "100%", height: "100%", backgroundColor: "#ffffff30", zIndex: 9999, backdropFilter: "blur(4px)" }}>
      <LoadingSpinner loading={true} />
    </div>
  );

  return (
    <LoadingContext.Provider value={{ loading, startLoading, stopLoading }}>
      <>
        {loading && <LoadingContainer />}
        {children}
      </>
    </LoadingContext.Provider>
  );
};

export const useLoading = () => useContext(LoadingContext);
