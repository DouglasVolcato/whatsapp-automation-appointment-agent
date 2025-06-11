import { DocumentationCreator } from "../utils/documentation-creator";
import { ApiRoute } from "../abstract/api-route";

export function makeDocumentationCreator(app: any, routes: ApiRoute[]) {
  return new DocumentationCreator(app).addDocumentation(routes);
}
