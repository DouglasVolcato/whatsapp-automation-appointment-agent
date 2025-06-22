import { IconEnum } from "@/enums/icon-enum";

type Props = {
  title: string;
  fill: boolean;
  itens_per_row: number;
  items: {
    title: string;
    description: string;
    icon: IconEnum;
  }[];
};

export function AdvantagesSection({
  title,
  fill,
  items,
  itens_per_row,
}: Props) {
  return (
    <div
      className={`${
        fill ? "surface-section" : ""
      } px-4 py-8 md:px-6 lg:px-8 text-center`}
    >
      <div className="grid">
        <div className="col-12 mb-4 px-5">
          <h2>{title}</h2>
        </div>
        {items.map((item, index) => (
          <div
            className={`col-12 md:col-${12 / itens_per_row} mb-4 px-5`}
            key={index}
          >
            <span
              className="p-3 shadow-2 mb-3 inline-block surface-card"
              style={{ borderRadius: "10px" }}
            >
              <i className={`pi ${item.icon} text-4xl text-blue-500`}></i>
            </span>
            <div className="text-900 text-xl mb-3 font-medium">
              {item.title}
            </div>
            <span className="text-700 line-height-3">{item.description}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
