"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ValidateLoginUseCase = void 0;
const accesses_repository_1 = require("../../../infra/repositories/accesses-repository");
const token_handler_1 = require("../../utils/token-handler");
const usecase_1 = require("../../abstract/classes/usecase");
const validator_builder_1 = require("../../utils/validator-builder");
var ValidateLoginUseCase;
(function (ValidateLoginUseCase) {
    ValidateLoginUseCase.Input = { token: "" };
    ValidateLoginUseCase.Output = {
        valid: true,
        accessId: "",
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
                    .setField("token")
                    .addType(validator_builder_1.ValidatorTypeEnum.REQUIRED)
                    .addType(validator_builder_1.ValidatorTypeEnum.STRING)
                    .setMessage("Acesso é inválido")
                    .build(),
            ];
        }
        async handle(input) {
            const payload = this.tokenHandler.verifyToken(input.token);
            const foundAccess = await this.accessesRepositorty.findOne({
                params: [
                    {
                        key: "id",
                        value: payload.id
                    },
                ]
            });
            if (!foundAccess) {
                return {
                    valid: false,
                    accessId: ""
                };
            }
            return {
                valid: true,
                accessId: foundAccess.id
            };
        }
    }
    ValidateLoginUseCase.Service = Service;
})(ValidateLoginUseCase || (exports.ValidateLoginUseCase = ValidateLoginUseCase = {}));
