import { LoadingSpinner } from "@/components/atoms/loading-spinner/loading-spinner";

export default function LoadingPage() {
  return (
    <div className="h-screen">
      <LoadingSpinner loading={true} />
    </div>
  );
}
