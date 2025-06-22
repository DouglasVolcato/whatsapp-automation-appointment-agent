import { PrimeReactProvider } from "primereact/api";
import { JSX, ReactNode } from "react";
import "primereact/resources/primereact.css";
import "primeicons/primeicons.css";
import "primeflex/primeflex.css";

import "primereact/resources/themes/bootstrap4-dark-blue/theme.css";
// import "primereact/resources/themes/lara-dark-green/theme.css";
// import "primereact/resources/themes/mira/theme.css";
// import "primereact/resources/themes/nano/theme.css";
// import "primereact/resources/themes/nova/theme.css";
// import "primereact/resources/themes/rhea/theme.css";
// import "primereact/resources/themes/saga-green/theme.css";
// import "primereact/resources/themes/soho-dark/theme.css";
// import "primereact/resources/themes/soho-light/theme.css";
// import "primereact/resources/themes/tailwind-light/theme.css";
// import "primereact/resources/themes/vela-green/theme.css";
// import "primereact/resources/themes/viva-dark/theme.css";
// import "primereact/resources/themes/viva-light/theme.css";
// import "primereact/resources/themes/luna-green/theme.css";

type Props = {
  children: ReactNode;
};

export const StylesConfigDecorator = ({ children }: Props): JSX.Element => {
  return <PrimeReactProvider>{children}</PrimeReactProvider>;
};
