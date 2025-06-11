import { ApiRoute } from '../abstract/api-route';
import helmet from "helmet";

export class SecurityMiddlewares {
    public apply(app: any, route: ApiRoute) {
        app.use(route.path, helmet());
    }
}