import { HttpMiddlewareResponse } from "../abstract/http/http-middleware-response";
import { HttpRequest } from "../abstract/http/http-request";
import { Middleware } from "../abstract/classes/middleware";

export class AuthMiddleware extends Middleware {
  public async execute(input: HttpRequest): Promise<HttpMiddlewareResponse> {
    return input;
  }
}
