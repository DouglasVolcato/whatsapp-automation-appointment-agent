import { AccessesRepository } from "../../../infra/repositories/accesses-repository";
import { ValidatorInterface } from "../../abstract/interfaces/validator-interface";
import { TokenHandler } from "../../utils/token-handler";
import { UseCase } from "../../abstract/classes/usecase";
import {
  ValidatorBuilder,
  ValidatorTypeEnum,
} from "../../utils/validator-builder";

export namespace ValidateLoginUseCase {
  export const Input = { token: "" };

  export const Output = {
    valid: true,
    accessId: "",
  };

  export class Service extends UseCase {
    private readonly accessesRepositorty: AccessesRepository;
    private readonly tokenHandler: TokenHandler

    public constructor() {
      super();
      this.accessesRepositorty = new AccessesRepository();
      this.tokenHandler = new TokenHandler();
    }

    public setValidators(): ValidatorInterface[] {
      return [
        new ValidatorBuilder()
          .setField("token")
          .addType(ValidatorTypeEnum.REQUIRED)
          .addType(ValidatorTypeEnum.STRING)
          .setMessage("Acesso é inválido")
          .build(),
      ];
    }

    public async handle(input: typeof Input): Promise<typeof Output | Error> {
      const payload = this.tokenHandler.verifyToken(input.token);

      const foundAccess = await this.accessesRepositorty.findOne({
        params: [
          {
            key: "id",
            value: payload.id
          },
        ]
      })

      if (!foundAccess) {
        return {
          valid: false,
          accessId: ""
        }
      }

      return {
        valid: true,
        accessId: foundAccess.id
      }
    }
  }
}
