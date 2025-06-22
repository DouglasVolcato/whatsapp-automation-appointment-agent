import { AccessCredentialsStorage } from "@/utils/access-credentials-storage";
import { AccessTypeEnum } from "@/abstract/enums/access-type-enum";
import { Sidebar } from "@/components/cells/sidebar/sidebar";
import { IconEnum } from "@/enums/icon-enum";

export default function SessionSidebar() {
  const accessCredentials = AccessCredentialsStorage.get();
  return (
    <Sidebar
      menus={[
        {
          label: "Dashboard geral",
          path: "/session/general-dashboard",
          icon: IconEnum.chart_line,
          show: accessCredentials.access_type === AccessTypeEnum.admin,
        },
        {
          label: "Dashboard da imobiliária",
          path: "/session/agency-dashboard",
          icon: IconEnum.chart_line,
          show: accessCredentials.access_type === AccessTypeEnum.agency,
        },
        {
          label: "Credenciais de acesso",
          path: "/session/access-credentials",
          icon: IconEnum.lock,
          show: accessCredentials.access_type === AccessTypeEnum.admin,
        },
        {
          label: "Chat",
          path: "/session/chat",
          icon: IconEnum.send,
          show: accessCredentials.access_type === AccessTypeEnum.admin,
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