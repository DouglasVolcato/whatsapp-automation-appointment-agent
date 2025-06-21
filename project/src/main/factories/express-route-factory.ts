import { ExpressRoute } from "../utils/express-route";
import { ApiRoute } from "../abstract/api-route";

export function makeExpressRoute(app: any, route: ApiRoute) {
  return new ExpressRoute(app, route);
}
