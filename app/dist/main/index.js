"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const documentation_creator_factory_1 = require("./factories/documentation-creator-factory");
const database_connection_factory_1 = require("./factories/database-connection-factory");
const metrics_observer_factory_1 = require("./factories/metrics-observer-factory");
const whatsapp_interactor_1 = require("../domain/utils/whatsapp-interactor");
const message_handler_factory_1 = require("./factories/message-handler-factory");
const express_route_factory_1 = require("./factories/express-route-factory");
const dashboard_routes_1 = require("./routes/dashboard-routes");
const cronjob_manager_1 = require("./utils/cronjob-manager");
const user_routes_1 = require("./routes/user-routes");
const auth_routes_1 = require("./routes/auth-routes");
const ai_routes_1 = require("./routes/ai-routes");
const env_1 = require("./utils/env");
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const path_1 = __importDefault(require("path"));
const port = process.env.PORT;
const app = (0, express_1.default)();
const apiRoutes = [
    ...ai_routes_1.AiRoutes,
    ...user_routes_1.UserRoutes,
    ...auth_routes_1.AuthRoutes,
    ...dashboard_routes_1.DashboardRoutes,
];
const cronJobManager = new cronjob_manager_1.CronJobManager();
const whatsappInteractor = new whatsapp_interactor_1.WhatsappInteractor();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use(express_1.default.static(env_1.Env.STATIC_FILES_PATH));
app.set("view engine", "ejs");
app.disable('x-powered-by');
cronJobManager.addJob({
    name: "task_demo",
    schedule: "0 0 * * 0",
    task: () => {
    },
});
(0, database_connection_factory_1.makeDatabaseConnection)();
(0, documentation_creator_factory_1.makeDocumentationCreator)({
    app: app,
    appName: (`${env_1.Env.APP_NAME} API`).trim(),
    appDescription: env_1.Env.APP_DESCRIPTION,
    appVersion: '1.0.0'
}, apiRoutes);
(0, metrics_observer_factory_1.makeMetricsObserver)(app);
whatsappInteractor.observeMessages(app, (0, message_handler_factory_1.makeMessageHandler)());
app.use('/client', express_1.default.static(env_1.Env.APP_PATH));
app.get('/client/*\W', (req, res) => {
    res.sendFile(path_1.default.resolve(env_1.Env.APP_PATH, 'index.html'));
});
for (const route of apiRoutes) {
    (0, express_route_factory_1.makeExpressRoute)(app, route);
}
app.listen(port, () => {
    console.log(`Server running on ${env_1.Env.SERVER_DOMAIN}`);
    console.log(`Documentation on ${env_1.Env.SERVER_DOMAIN}/docs`);
    console.log(`Client on ${env_1.Env.SERVER_DOMAIN}/client`);
});
