```tsx
import {
  Button,
  ButtonStyles,
  ButtonTypes,
} from "./components/atoms/button/button";
import { Modal } from "./components/atoms/modal/modal";
import { IconEnum } from "./enums/icon-enum";
import { useState } from "react";

export const App = () => {
  const [show, setShow] = useState(false);

  return (
    <>
      <Button label="Show" onClick={() => setShow(true)} />
      <Modal show={show} onClose={() => setShow(false)} label="Modal">
        <>
          <h1>Modal</h1>
          <Button
            label="Close"
            icon={IconEnum.times}
            style={[ButtonStyles.rounded]}
            type={ButtonTypes.warning}
            onClick={() => setShow(false)}
          />
        </>
      </Modal>
    </>
  );
};
```