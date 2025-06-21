type Props = {
  children: React.ReactNode;
};

export function PageBody({ children }: Props) {
  return (
    <div className="min-h-screen flex flex-column">
      <div className="p-5 flex flex-column flex-auto mt-6">{children}</div>
    </div>
  );
}
