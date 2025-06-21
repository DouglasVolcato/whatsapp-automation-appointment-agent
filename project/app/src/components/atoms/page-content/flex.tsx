type Props = {
  children: React.ReactNode;
  type?: "row" | "column";
  justify?: "start" | "end" | "center" | "between" | "around" | "evenly";
  gap?: number;
};

export function Flex({ children, type, justify, gap }: Props) {
  return (
    <div
      className={` m-1 flex flex-wrap gap-${gap ? gap : 2} flex-${type ? type : "row"} ${
        justify ? `justify-content-${justify}` : "justify-content-center"
      }`}
    >
      {children}
    </div>
  );
}
