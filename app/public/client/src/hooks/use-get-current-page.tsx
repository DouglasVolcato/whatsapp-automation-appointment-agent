import { useLocation } from "react-router";

export function useGetCurrentPage() {
  const location = useLocation();
  return () => {
    return location.pathname;
  };
}
