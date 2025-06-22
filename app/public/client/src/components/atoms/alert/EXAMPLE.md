```tsx
import { Button, ButtonTypes } from "./components/atoms/button/button";
import { Alert, MessageType } from "./components/atoms/alert/alert";
import { useState } from "react";

export const App = () => {
  const [message, setMessage] = useState<MessageType>({
    title: "",
    message: "",
    type: undefined,
  });

  return (
    <>
      <Alert message={message} />
      <Button
        label="Success"
        type={ButtonTypes.success}
        onClick={() =>
          setMessage({ title: "Success", message: "Success", type: "success" })
        }
      />
      <Button
        label="Info"
        type={ButtonTypes.info}
        onClick={() =>
          setMessage({ title: "Info", message: "Info", type: "info" })
        }
      />
      <Button
        label="Warn"
        type={ButtonTypes.warning}
        onClick={() =>
          setMessage({ title: "Warn", message: "Warn", type: "warn" })
        }
      />
      <Button
        label="Error"
        type={ButtonTypes.info}
        onClick={() =>
          setMessage({ title: "Error", message: "Error", type: "error" })
        }
      />
    </>
  );
};

```