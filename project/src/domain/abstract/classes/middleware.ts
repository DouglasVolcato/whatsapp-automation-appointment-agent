import { HttpMiddlewareResponse } from "../http/http-middleware-response";
import { HttpRequest } from "../http/http-request";

export abstract class Middleware {
  public abstract execute(input: HttpRequest): Promise<HttpMiddlewareResponse>;
}
