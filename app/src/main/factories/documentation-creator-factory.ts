import { DocumentationCreator } from "../utils/documentation-creator";
import { ApiRoute } from "../abstract/api-route";

export function makeDocumentationCreator(input: {
  app: any;
  appName: string;
  appDescription: string;
  appVersion: string;
}, routes: ApiRoute[]) {
  return new DocumentationCreator(
    input
  ).addDocumentation(routes);
}
