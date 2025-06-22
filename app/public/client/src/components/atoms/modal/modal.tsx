import { Dialog } from "primereact/dialog";
import { JSX } from "react";

type Props = {
  label: string;
  show: boolean;
  onClose: () => void;
  children?: JSX.Element;
};

export const Modal = ({ label, show, onClose, children }: Props) => {
  return (
    <Dialog
      maximizable
      header={label}
      visible={show}
      onHide={onClose}
      style={{ maxWidth: "100vw", overflow: "auto", minWidth: "270px" }}
      breakpoints={{ "960px": "75vw", "641px": "100vw" }}
    >
      {children}
    </Dialog>
  );
};
