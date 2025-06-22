type Props = {
  title: string;
  subtitle: string;
  imagePath?: string;
  fill?: boolean;
};

export function TitleSection({ title, subtitle, fill, imagePath }: Props) {
  return (
    <div
      className={`relative pb-8 pt-8 overflow-hidden ${
        fill ? "surface-section" : ""
      }`}
    >
      {imagePath && (
        <img
          src={imagePath}
          alt="hero-2"
          className="absolute top-0 left-0 h-full block w-full bg-cover"
          style={{
            backgroundSize: "cover",
            objectFit: "cover",
          }}
        />
      )}

      <div className="text-center my-6 relative">
        <div className="text-6xl text-primary font-bold mb-6">{title}</div>
        <p className="mt-0 text-2xl mb-4 line-height-3 text-center mx-auto text-white">
          {subtitle}
        </p>
      </div>
    </div>
  );
}
