import { HttpMiddlewareResponse } from "../abstract/http/http-middleware-response";
import { ValidateLoginUseCase } from "../usecases/auth/validate-login-usecase";
import { HttpRequest } from "../abstract/http/http-request";
import { Middleware } from "../abstract/classes/middleware";

export class AuthMiddleware extends Middleware {
  private readonly validateLoginUseCase: ValidateLoginUseCase.Service

  public constructor() {
    super();
    this.validateLoginUseCase = new ValidateLoginUseCase.Service();
  }

  public async execute(input: HttpRequest): Promise<HttpMiddlewareResponse> {
    try {
      if (!('token' in input)) {
        return new Error('Acesso inválido');
      }

      const result: typeof ValidateLoginUseCase.Output | Error = await this.validateLoginUseCase.execute({ token: input.token });

      if (result instanceof Error || !result.valid) {
        return new Error('Acesso inválido');
      }

      input.accessId = result.accessId;

      return input;
    } catch (error) {
      return new Error('Acesso inválido');
    }
  }
}
