import { ConfirmDialog } from "primereact/confirmdialog";
import { Button } from "primereact/button";

export type ConfirmationProps = {
  show: boolean;
  title: string;
  message: string;
  acceptLabel: string;
  rejectLabel: string;
  onAccept: () => void;
  onReject: () => void;
};

export const Confirmation = ({
  show,
  title,
  message,
  acceptLabel,
  rejectLabel,
  onAccept,
  onReject,
}: ConfirmationProps) => {
  return (
    <ConfirmDialog
      visible={show}
      group={"templating"}
      header={title}
      accept={onAccept}
      reject={onReject}
      message={message}
      content={({ headerRef, contentRef, footerRef, hide, message }) => (
        <div className="flex flex-column align-items-center p-5 surface-overlay border-round">
          <div className="border-circle inline-flex justify-content-center align-items-center h-6rem w-6rem -mt-8 bg-primary">
            <i className="pi pi-question text-5xl"></i>
          </div>
          <span className="font-bold text-2xl block mb-2 mt-4" ref={headerRef}>
            {message.header}
          </span>
          <p className="mb-0" ref={contentRef as any}>
            {message.message}
          </p>
          <div
            className="flex align-items-center gap-2 mt-4"
            ref={footerRef as any}
          >
            <Button
              label={rejectLabel}
              outlined
              onClick={(event) => {
                hide(event);
                onReject();
              }}
              className="w-8rem"
            ></Button>
            <Button
              label={acceptLabel}
              onClick={(event) => {
                hide(event);
                onAccept();
              }}
              className="w-8rem"
            ></Button>
          </div>
        </div>
      )}
    />
  );
};
