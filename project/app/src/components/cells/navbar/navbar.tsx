import { useGetCurrentPage } from "@/hooks/use-get-current-page";
import { IconEnum } from "@/enums/icon-enum";
import { Menubar } from "primereact/menubar";
import { Env } from "@/config/env";

type Props = {
  menus: {
    label: string;
    icon: IconEnum;
    path: string;
  }[];
  start?: React.ReactNode;
  end?: React.ReactNode;
};

export const Navbar = ({ menus, start, end }: Props) => {
  const currentPage = useGetCurrentPage();

  return (
    <div
      id="navbar"
      style={{
        position: "fixed",
        top: "0",
        left: "0",
        right: "0",
        zIndex: "1000",
      }}
    >
      <>
        <Menubar
          model={menus.map((item) => ({
            className: currentPage() === item.path ? "bg-white-alpha-10" : "",
            label: item.label,
            icon: `pi ${item.icon}`,
            url: item.path,
          }))}
          start={
            <div className="flex align-items-center gap-2 flex-wrap mr-3">
              <img src={`${Env.BASE_URL}/enterprise/icon.png`} alt="hyper" height={50} />
              {start}
            </div>
          }
          end={
            <div className="flex align-items-center gap-2 flex-wrap">{end}</div>
          }
        />
      </>
    </div>
  );
};
