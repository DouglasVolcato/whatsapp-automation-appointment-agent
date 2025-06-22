import { ReactNode } from "react";

type Props = {
  children: ReactNode;
  fitContent?: boolean;
  removePadding?: boolean;
};

export function FloatDiv({ children, fitContent, removePadding }: Props) {
  return (
    <div className={fitContent ? 'm-auto' : "w-full"} style={{ width: fitContent ? "fit-content" : "100%" }}>
      <div className={fitContent ? `surface-card ${removePadding ? "" : "p-4"} shadow-2 border-round w-full m-auto mt-8 m-auto` : `surface-card ${removePadding ? "" : "p-4"} shadow-2 border-round w-full md:w-5 lg:w-5 m-auto mt-8`}>
        {children}
      </div>
    </div>
  );
}
