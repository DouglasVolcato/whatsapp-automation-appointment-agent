import { DatabaseConnection } from "../../infra/database/connection";
import { UseCase } from "../abstract/classes/usecase";
import { HttpResponse } from "../abstract/http/http-response";
import { HttpRequest } from "../abstract/http/http-request";
import { Logger } from "../utils/logger";

export class Controller {
  private usecase: UseCase;

  public constructor(usecase: UseCase) {
    this.usecase = usecase;
  }

  public async execute(input: HttpRequest): Promise<HttpResponse> {
    try {
      await DatabaseConnection.startTransaction();
      const result = await this.usecase.execute(input);

      if (result instanceof Error) {
        await DatabaseConnection.rollback();
        return {
          status: 400,
          body: {
            error: result.message,
          },
        };
      }

      await DatabaseConnection.commit();
      return {
        status: 200,
        body: result,
      };
    } catch (error: any) {
      await DatabaseConnection.rollback();
      Logger.error(error);
      return {
        status: 500,
        body: {
          error: error.message,
        },
      };
    }
  }
}
