import { useEffect, useState, useRef } from "react";

type Props = {
  children: React.ReactNode;
};

export function ScrollEffectDiv({ children, ...props }: Props) {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? "translateY(0)" : "translateY(40px)",
        transition: "opacity 1s ease-out, transform 1s ease-out",
      }}
      {...props}
    >
      {children}
    </div>
  );
}
