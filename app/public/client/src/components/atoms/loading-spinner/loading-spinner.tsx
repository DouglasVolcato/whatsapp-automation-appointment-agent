import { ProgressSpinner } from "primereact/progressspinner";
import React from "react";

type Props = {
  loading: boolean;
};

export const LoadingSpinner: React.FC<Props> = ({ loading }: Props) => {
  const randomId =
    Math.floor(Math.random() * 20) *
    Math.floor(Math.random() * 20) *
    Math.floor(Math.random() * 20);

  return (
    <>
      {loading && (
        <div
          id={`loading-spinner-${randomId}`}
          className="flex justify-content-center align-items-center h-full w-full"
        >
          <ProgressSpinner strokeWidth="4" animationDuration="1s" />
        </div>
      )}
    </>
  );
};
