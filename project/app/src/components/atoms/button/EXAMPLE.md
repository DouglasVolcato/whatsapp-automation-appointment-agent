```tsx
import {
  Button,
  ButtonIconPosition,
  ButtonStyles,
  ButtonTypes,
} from "./components/atoms/button/button";
import { IconEnum } from "./enums/icon-enum";

export const App = () => {
  return (
    <>
      <Button label="Normal" onClick={() => alert("Normal")} />
      <Button
        label="Icon and Round"
        icon={IconEnum.user}
        style={[ButtonStyles.rounded]}
        type={ButtonTypes.secondary}
        onClick={() => alert("Icon and Round")}
      />
      <Button
        label="Icon at right and outline"
        icon={IconEnum.user}
        iconPosition={ButtonIconPosition.right}
        style={[ButtonStyles.outlined]}
        type={ButtonTypes.info}
        onClick={() => alert("Icon at right and outline")}
      />
      <Button
        label="Warning"
        icon={IconEnum.trash}
        iconPosition={ButtonIconPosition.right}
        type={ButtonTypes.warning}
        onClick={() => alert("Warning")}
      />
    </>
  );
};

```