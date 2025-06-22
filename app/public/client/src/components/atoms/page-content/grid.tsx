type Props = {
  children: React.ReactNode;
};

export function Grid({ children }: Props) {
  return <div className="grid">{children}</div>;
}
