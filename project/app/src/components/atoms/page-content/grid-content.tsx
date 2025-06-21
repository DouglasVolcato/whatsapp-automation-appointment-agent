import { Button, ButtonStyles, ButtonTypes } from "@/components/atoms/button/button";
import { IconEnum } from "@/enums/icon-enum";

type ButtonProps = {
  icon?: IconEnum;
  onClick: () => void;
  style?: ButtonStyles[];
  type?: ButtonTypes;
};

type Props = {
  children: React.ReactNode;
  size: "small" | "medium" | "large";
  padding?: boolean;
  title?: string;
  buttton?: ButtonProps;
};

export function GridContent({
  children,
  title,
  buttton,
  size,
  padding = true,
}: Props) {
  return (
    <div
      className={`col-12 md:col-${size === "small" ? 6 : 12} lg:col-${
        size === "small" ? 3 : size === "medium" ? 6 : 12
      }`}
    >
      <div
        className={`surface-card border-round h-full ${padding ? "p-4" : ""}`}
      >
        {(title || buttton) && (
          <div className="flex align-items-center justify-content-between mb-3">
            {title && (
              <div className="text-900 font-medium text-xl">{title}</div>
            )}
            {buttton && (
              <Button
                icon={buttton.icon}
                label=""
                onClick={buttton.onClick}
                style={buttton.style}
                type={buttton.type}
              />
            )}
          </div>
        )}
        {children}
      </div>
    </div>
  );
}
