type Props = {
  children: React.ReactNode;
  fontSize: string;
  fontColor?: string;
  bold?: boolean;
};

export function Span({ fontSize, fontColor, bold, children }: Props) {
  return (
    <span
      style={{
        fontSize: fontSize,
        color: fontColor,
        fontWeight: bold ? "bold" : "normal",
      }}
    >
      {children}
    </span>
  );
}
