import { Button as PrimeButton } from "primereact/button";
import { IconEnum } from "@/enums/icon-enum";
import { useState } from "react";
import "./styles.css";

export enum ButtonTypes {
  secondary = "secondary",
  success = "success",
  info = "info",
  warning = "warning",
  help = "help",
}

export enum ButtonStyles {
  rounded = "rounded",
  outlined = "outlined",
}

export enum ButtonIconPosition {
  left = "left",
  right = "right",
}

type Props = {
  type?: ButtonTypes;
  style?: ButtonStyles[];
  icon?: IconEnum;
  iconPosition?: ButtonIconPosition;
  label: string;
  loading?: boolean;
  onClick: () => void;
};

export const Button = ({
  label,
  onClick,
  type,
  style,
  icon,
  iconPosition = ButtonIconPosition.left,
  loading = false,
}: Props) => {
  const [loadingOnClick, setLoadingOnClick] = useState(false);

  const handleClick = () => {
    setLoadingOnClick(true);
    setTimeout(() => {
      setLoadingOnClick(false);
    }, 1000);
    onClick();
  };

  return (
    <PrimeButton
      loading={loading || loadingOnClick}
      style={{
        maxWidth: "min(280px, 90vw)"
      }}
      className="button-hover"
      severity={type}
      label={label}
      onClick={handleClick}
      icon={icon ? `pi ${icon}` : undefined}
      iconPos={iconPosition}
      raised
      outlined={style?.includes(ButtonStyles.outlined)}
      rounded={style?.includes(ButtonStyles.rounded)}
    />
  );
};
