"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MakeLoginUseCase = void 0;
const accesses_repository_1 = require("../../../infra/repositories/accesses-repository");
const token_handler_1 = require("../../utils/token-handler");
const usecase_1 = require("../../abstract/classes/usecase");
const validator_builder_1 = require("../../utils/validator-builder");
var MakeLoginUseCase;
(function (MakeLoginUseCase) {
    MakeLoginUseCase.Input = { email: "", password: "" };
    MakeLoginUseCase.Output = {
        message: "",
        token: "",
    };
    class Service extends usecase_1.UseCase {
        constructor() {
            super();
            this.accessesRepositorty = new accesses_repository_1.AccessesRepository();
            this.tokenHandler = new token_handler_1.TokenHandler();
        }
        setValidators() {
            return [
                new validator_builder_1.ValidatorBuilder()
                    .setField("email")
                    .addType(validator_builder_1.ValidatorTypeEnum.REQUIRED)
                    .addType(validator_builder_1.ValidatorTypeEnum.EMAIL)
                    .setMessage("Email é inválido")
                    .build(),
                new validator_builder_1.ValidatorBuilder()
                    .setField("password")
                    .addType(validator_builder_1.ValidatorTypeEnum.REQUIRED)
                    .addType(validator_builder_1.ValidatorTypeEnum.STRING)
                    .setMessage("Senha é inválida")
                    .build(),
            ];
        }
        async handle(input) {
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
            });
            if (!foundAccess) {
                return new Error("Credenciais incorretas");
            }
            return {
                message: "Login efetuado com sucesso",
                token: this.tokenHandler.generateToken({
                    id: foundAccess.id
                }),
            };
        }
    }
    MakeLoginUseCase.Service = Service;
})(MakeLoginUseCase || (exports.MakeLoginUseCase = MakeLoginUseCase = {}));
