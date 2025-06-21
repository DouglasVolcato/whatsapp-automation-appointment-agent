import { createContext, useContext, useState, ReactNode } from "react";
import { MessageType, Alert } from "@/components/atoms/alert/alert";

const AlertContext = createContext<{
  message: MessageType;
  alert: (message: MessageType) => void;
}>({ message: { title: "", message: "", type: undefined }, alert: () => {} });

export const AlertProvider = ({ children }: { children: ReactNode }) => {
  const [message, setMessage] = useState<MessageType>({
    title: "",
    message: "",
    type: undefined,
  });

  const alert = (msg: MessageType) => setMessage(msg);

  return (
    <AlertContext.Provider value={{ message, alert }}>
      <>
        <Alert message={message} />
        {children}
      </>
    </AlertContext.Provider>
  );
};

export const useAlert = () => useContext(AlertContext);
