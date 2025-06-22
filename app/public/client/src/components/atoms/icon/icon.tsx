import { IconEnum } from "@/enums/icon-enum";

type Props = {
  icon: IconEnum;
  fontSize: string;
  fontColor: string;
};

export function Icon({ icon, fontSize, fontColor }: Props) {
  return (
    <i
      className={`pi ${icon}`}
      style={{ fontSize: fontSize, color: fontColor }}
    ></i>
  );
}
