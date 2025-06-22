import { useNavigate } from "react-router";

export function usePageReturn() {
  const navigate = useNavigate();
  return () => {
    navigate(-1);
  };
}
