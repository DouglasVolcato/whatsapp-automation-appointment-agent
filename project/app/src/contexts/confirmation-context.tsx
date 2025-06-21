import {
  Confirmation,
  ConfirmationProps,
} from "@/components/atoms/confirmation/confirmation";
import { createContext, useContext, useState } from "react";

const ConfirmationContext = createContext<{
  confirmation: ConfirmationProps;
  setConfirmation: (confirmation: ConfirmationProps) => void;
  clearConfirmation: () => void;
}>({
  confirmation: {
    show: false,
    title: "",
    message: "",
    acceptLabel: "",
    rejectLabel: "",
    onAccept: () => {},
    onReject: () => {},
  },
  setConfirmation: () => {},
  clearConfirmation: () => {},
});

export const ConfirmationProvider = ({ children }: any) => {
  const [confirmation, setConfirmation] = useState<ConfirmationProps>({
    show: false,
    title: "",
    message: "",
    acceptLabel: "",
    rejectLabel: "",
    onAccept: () => {},
    onReject: () => {},
  });

  const clearConfirmation = () => {
    setConfirmation({
      ...confirmation,
      show: false,
    });
  };

  return (
    <ConfirmationContext.Provider
      value={{ confirmation, setConfirmation, clearConfirmation }}
    >
      <Confirmation
        show={confirmation.show}
        title={confirmation.title}
        message={confirmation.message}
        acceptLabel={confirmation.acceptLabel}
        rejectLabel={confirmation.rejectLabel}
        onAccept={() => {
          confirmation.onAccept();
          clearConfirmation();
        }}
        onReject={() => {
          confirmation.onReject();
          clearConfirmation();
        }}
      />
      {children}
    </ConfirmationContext.Provider>
  );
};

export const useConfirmation = () => useContext(ConfirmationContext);
