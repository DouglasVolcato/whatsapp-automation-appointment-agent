import { ValidatorInterface } from "../../abstract/interfaces/validator-interface";
import { AccessesRepository } from "../../../infra/repositories/accesses-repository";
import { TokenHandler } from "../../utils/token-handler";
import { UseCase } from "../../abstract/classes/usecase";
import {
  ValidatorBuilder,
  ValidatorTypeEnum,
} from "../../utils/validator-builder";

export namespace MakeLoginUseCase {
  export const Input = { email: "", password: "" };

  export const Output = {
    message: "",
    token: "",
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
          .setField("email")
          .addType(ValidatorTypeEnum.REQUIRED)
          .addType(ValidatorTypeEnum.EMAIL)
          .setMessage("Email é inválido")
          .build(),
        new ValidatorBuilder()
          .setField("password")
          .addType(ValidatorTypeEnum.REQUIRED)
          .addType(ValidatorTypeEnum.STRING)
          .setMessage("Senha é inválida")
          .build(),
      ];
    }

    public async handle(input: typeof Input): Promise<typeof Output | Error> {
      const foundAccess = await this.accessesRepositorty.findOne({
        params: [
          {
            key: "email",
            value: input.email
          },
          {
            key: "password",
            value: input.password
          }
        ]
      })

      if (!foundAccess) {
        return new Error("Credenciais incorretas");
      }

      return {
        message: "Login efetuado com sucesso",
        token: this.tokenHandler.generateToken({
          id: foundAccess.id
        }),
      }
    }
  }
}
