```tsx
import { Button } from "./components/atoms/button/button";
import { Confirmation } from "./components/atoms/confirmation/confirmation";
import { useState } from "react";

export const App = () => {
  const [show, setShow] = useState(false);

  return (
    <>
      <Button label="Show" onClick={() => setShow(true)} />
      <Confirmation
        show={show}
        title="Confirmation"
        message="Are you sure?"
        onAccept={() => {
          alert("Accepted");
          setShow(false);
        }}
        onReject={() => {
          alert("Rejected");
          setShow(false);
        }}
        acceptLabel="Yes"
        rejectLabel="No"
      />
    </>
  );
};

```