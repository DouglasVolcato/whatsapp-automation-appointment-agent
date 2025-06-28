import { makeDocumentationCreator } from "./factories/documentation-creator-factory";
import { makeDatabaseConnection } from "./factories/database-connection-factory";
import { makeMetricsObserver } from "./factories/metrics-observer-factory";
import { WhatsappInteractor } from "../domain/utils/whatsapp-interactor";
import { makeMessageHandler } from "./factories/message-handler-factory";
import { makeExpressRoute } from "./factories/express-route-factory";
import { CronJobManager } from "./utils/cronjob-manager";
import { UserRoutes } from "./routes/user-routes";
import { TestRoutes } from "./routes/test-routes";
import { ApiRoute } from "./abstract/api-route";
import { Env } from "./utils/env";
import express from "express";
import cors from "cors";
import path from "path";

const port = process.env.PORT;
const app = express();
const apiRoutes: ApiRoute[] = [
  ...TestRoutes,
  ...UserRoutes,
];
const cronJobManager = new CronJobManager();
const whatsappInteractor = new WhatsappInteractor();

app.use(cors());
app.use(express.json());
app.use(express.static(Env.STATIC_FILES_PATH));
app.set("view engine", "ejs");
app.disable('x-powered-by');

cronJobManager.addJob({
  name: "task_demo",
  schedule: "0 0 * * 0",
  task: () => {
  },
});

makeDatabaseConnection();
makeDocumentationCreator(app, apiRoutes);
makeMetricsObserver(app);
whatsappInteractor.observeMessages(app, makeMessageHandler());

app.use('/client', express.static(Env.APP_PATH));
app.get('/client/*\W', (req, res) => {
  res.sendFile(path.resolve(Env.APP_PATH, 'index.html'));
});

for (const route of apiRoutes) {
  makeExpressRoute(app, route);
}

app.listen(port, () => {
  console.log(`Server running on ${Env.SERVER_DOMAIN}`);
  console.log(`Documentation on ${Env.SERVER_DOMAIN}/docs`);
  console.log(`Client on ${Env.SERVER_DOMAIN}/client`);
});
