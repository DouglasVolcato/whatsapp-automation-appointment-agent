import { useNavigate } from "react-router";
import { ReactNode } from "react";

type Props = {
  children: ReactNode;
  href: string;
  className?: string;
  onClick?: (event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => void;
  targetBlank?: boolean;
};

export function Anchor({
  children,
  href,
  className,
  onClick,
  targetBlank,
}: Props) {
  const navigate = useNavigate();

  function handleClick(event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) {
    event.preventDefault();
    navigate(href);
  }

  return (
    <a
      className={
        className ||
        "font-medium no-underline ml-2 text-blue-500 cursor-pointer"
      }
      href={href}
      target={'_blank'}
      onClick={(e) => {
        !targetBlank && handleClick(e);
        onClick && onClick(e);
      }}
    >
      {children}
    </a>
  );
}
