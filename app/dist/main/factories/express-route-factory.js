"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.makeExpressRoute = makeExpressRoute;
const express_route_1 = require("../utils/express-route");
function makeExpressRoute(app, route) {
    return new express_route_1.ExpressRoute(app, route);
}
