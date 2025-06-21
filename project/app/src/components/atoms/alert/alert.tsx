import { useEffect, useRef } from "react";
import { Toast } from "primereact/toast";

export type MessageType = {
  type: "success" | "info" | "warn" | "error" | undefined;
  title: string;
  message: string;
};

type Props = {
  message: MessageType;
};

export const Alert = ({ message }: Props) => {
  const toast = useRef<Toast>(null);

  useEffect(() => {
    if (message.message.trim() !== "") {
      toast.current?.show({
        severity: message.type,
        summary: message.title,
        detail: message.message,
        life: defineMessageLifeTime(message.message),
      });
    }
  }, [message]);

  const defineMessageLifeTime = (message: string) => {
    return message.split("").length * 200;
  };

  return <Toast position={"top-right"} ref={toast} />;
};
