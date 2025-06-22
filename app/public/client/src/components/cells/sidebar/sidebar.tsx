import { useGetCurrentPage } from "@/hooks/use-get-current-page";
import { Sidebar as PrimeSidebar } from "primereact/sidebar";
import { Navbar } from "@/components/cells/navbar/navbar";
import { Anchor } from "@/components/atoms/anchor/anchor";
import { IconEnum } from "@/enums/icon-enum";
import React, { JSX, useState } from "react";
import { Ripple } from "primereact/ripple";
import { Env } from "@/config/env";
import {
  Button,
  ButtonStyles,
  ButtonTypes,
} from "@/components/atoms/button/button";

export type SubmenuType = {
  label: string;
  path: string;
  icon: IconEnum
  show: boolean;
}

export type MenuType = {
  label: string;
  children?: SubmenuType[];
  show: boolean;
}

type Props = {
  menus: MenuType[] | SubmenuType[];
  end?: React.ReactNode;
};

export function Sidebar({ menus, end }: Props) {
  const currentPage = useGetCurrentPage();
  const [visible, setVisible] = useState<boolean>(false);
  const [visibleMenus, setVisibleMenus] = useState<number[]>(
    menus.map((_, index) => index)
  );

  const toogleMenu = (index: number) => {
    const newVisibleMenus = [...visibleMenus];
    if (newVisibleMenus.includes(index)) {
      newVisibleMenus.splice(newVisibleMenus.indexOf(index), 1);
    } else {
      newVisibleMenus.push(index);
    }
    setVisibleMenus(newVisibleMenus);
  };

  const plotMenu = (menu: MenuType, index: number): JSX.Element => (
    <ul className="list-none pl-3 pr-3 pt-1 pb-1 m-0" key={index}>
      <li>
        <div onClick={() => toogleMenu(index)}>
          <div className={`border-round p-ripple p-3 flex align-items-center justify-content-between text-600 cursor-pointer hover:surface-100 transition-colors`}>
            <span className="font-medium">{menu.label}</span>
            <i className="pi pi-chevron-down"></i>
            <Ripple />
          </div>
        </div>
        {visibleMenus.includes(index) && (
          <ul className="list-none p-0 m-0 overflow-hidden">
            {'children' in menu && menu.children?.map(plotSubmenu)}
          </ul>
        )}
      </li>
    </ul>
  )

  const plotSubmenu = (submenu: SubmenuType, index: number): JSX.Element => (
    <li className="list-none pl-3 pr-3 pt-1 pb-1 m-0" key={index}>
      <Anchor
        href={submenu.path}
        className={`no-underline p-ripple flex align-items-center cursor-pointer p-3 border-round text-700 hover:surface-100 ${currentPage() === submenu.path ? 'surface-100' : ''} transition-colors w-full`}
      >
        <i className={`pi ${submenu.icon} mr-2`}></i>
        <span className="font-medium">
          {submenu.label}
        </span>
      </Anchor>
    </li>
  )

  const plotMenus = (menu: MenuType | SubmenuType, index: number): JSX.Element => {
    if (!menu.show) {
      return <></>
    };
    if ('children' in menu) {
      return plotMenu(menu as MenuType, index)
    } else {
      return plotSubmenu(menu as SubmenuType, index)
    }
  }

  return (
    <div className="card flex justify-content-center">
      <Navbar
        menus={[]}
        start={
          <div className="ml-3">
            <Button
              label=""
              type={ButtonTypes.success}
              onClick={() => setVisible(true)}
              icon={IconEnum.bars}
              style={[]}
            ></Button>
          </div>
        }
        end={end}
      />
      <PrimeSidebar
        visible={visible}
        onHide={() => setVisible(false)}
        content={() => (
          <div className="min-h-screen flex relative lg:static surface-ground">
            <div className="flex flex-column h-full w-full">
              <div className="flex align-items-center justify-content-between px-4 pt-3 pb-3 flex-shrink-0">
                <span className="inline-flex align-items-center gap-2 text-900 font-bold text-xl">
                  <img src={`${Env.BASE_URL}/enterprise/icon.png`} alt="hyper" height={50} /> VIZINHO
                </span>
                <span>
                  <Button
                    label=""
                    type={ButtonTypes.success}
                    onClick={() => setVisible(false)}
                    icon={IconEnum.times}
                    style={[ButtonStyles.rounded, ButtonStyles.outlined]}
                  ></Button>
                </span>
              </div>
              <div className="overflow-y-auto">
                {menus.map(plotMenus)}
              </div>
            </div>
          </div>
        )}
      ></PrimeSidebar>
    </div>
  );
}
