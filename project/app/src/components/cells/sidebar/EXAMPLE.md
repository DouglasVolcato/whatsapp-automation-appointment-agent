```tsx
import { Sidebar } from "@/components/cells/sidebar/sidebar";
import { IconEnum } from "@/enums/icon-enum";

export default async function Dashboard() {
  return (
    <Sidebar
      menus={[
        {
          label: "Favorites",
          children: [
            {
              label: "Home",
              path: "/",
              icon: IconEnum.home,
            },
            {
              label: "Dashboard",
              path: "/dashboard",
              icon: IconEnum.chart_line,
            },
          ],
        },
        {
          label: "Settings",
          children: [
            {
              label: "Profile",
              path: "/profile",
              icon: IconEnum.user,
            },
          ],
        },
      ]}
    />
  );
}
```