import { Sidebar } from "@/components/cells/sidebar/sidebar";
import { IconEnum } from "@/enums/icon-enum";

export default function SessionSidebar() {
  return (
    <Sidebar
      menus={[
        {
          label: "Dashboard geral",
          path: "/session/general-dashboard",
          icon: IconEnum.chart_line,
          show: true,
        },
        {
          label: "Usuários",
          path: "/session/users",
          icon: IconEnum.users,
          show: true,
        },
        {
          label: "Chat",
          path: "/session/chat",
          icon: IconEnum.send,
          show: true,
        },
        {
          label: "Logout",
          path: '/',
          icon: IconEnum.sign_out,
          show: true,
        },
      ]}
    />
  );
}