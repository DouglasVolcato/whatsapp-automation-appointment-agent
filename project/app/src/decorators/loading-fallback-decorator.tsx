import { LoadingSpinner } from "@/components/atoms/loading-spinner/loading-spinner";
import { JSX, Suspense } from "react";

type Props = {
  children: JSX.Element;
  type: "PAGE" | "COMPONENT";
};

export function LoadingFallbackDecorator({ children, type }: Props) {
  return (
    <Suspense
      fallback={
        <div className={type == "PAGE" ? "h-screen" : "min-h-full"}>
          <LoadingSpinner loading />
        </div>
      }
    >
      {children}
    </Suspense>
  );
}
