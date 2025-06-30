"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ManageUsersUseCase = void 0;
const user_last_messages_repository_1 = require("../../../infra/repositories/user-last-messages-repository");
const validator_builder_1 = require("../../utils/validator-builder");
const conversation_state_enum_1 = require("../../abstract/enums/conversation-state-enum");
const users_repository_1 = require("../../../infra/repositories/users-repository");
const uuid_generator_1 = require("../../utils/uuid-generator");
const usecase_1 = require("../../abstract/classes/usecase");
var ManageUsersUseCase;
(function (ManageUsersUseCase) {
    ManageUsersUseCase.CreateInput = {
        name: "",
        email: "",
        phone: "",
        relation_with_master: "",
        what_likes: "",
        what_knows: "",
        what_does: ""
    };
    ManageUsersUseCase.UpdateInput = {
        id: "",
        name: "",
        email: "",
        phone: "",
        relation_with_master: "",
        what_likes: "",
        what_knows: "",
        what_does: "",
    };
    ManageUsersUseCase.DeleteInput = {
        id: "",
    };
    ManageUsersUseCase.GetOneInput = {
        id: "",
    };
    ManageUsersUseCase.GetManyInput = {
        limit: 20,
        offset: 0
    };
    ManageUsersUseCase.CreateOutput = { message: "" };
    ManageUsersUseCase.UpdateOutput = { message: "" };
    ManageUsersUseCase.DeleteOutput = { message: "" };
    ManageUsersUseCase.GetOneOutput = {
        id: "",
        name: "",
        email: "",
        phone: "",
        relation_with_master: "",
        what_likes: "",
        what_knows: "",
        what_does: "",
        conversation_state: conversation_state_enum_1.ConversationState.getting_info,
        created_at: "",
        updated_at: "",
    };
    ManageUsersUseCase.GetManyOutput = [];
    class CreateService extends usecase_1.UseCase {
        constructor() {
            super();
            this.usersRepository = new users_repository_1.UsersRepositorty();
        }
        setValidators() {
            return [
                new validator_builder_1.ValidatorBuilder()
                    .setField("name")
                    .addType(validator_builder_1.ValidatorTypeEnum.REQUIRED)
                    .addType(validator_builder_1.ValidatorTypeEnum.STRING)
                    .setMessage("Nome é inválido")
                    .build(),
                new validator_builder_1.ValidatorBuilder()
                    .setField("email")
                    .addType(validator_builder_1.ValidatorTypeEnum.REQUIRED)
                    .addType(validator_builder_1.ValidatorTypeEnum.EMAIL)
                    .setMessage("Email é inválido")
                    .build(),
                new validator_builder_1.ValidatorBuilder()
                    .setField("phone")
                    .addType(validator_builder_1.ValidatorTypeEnum.REQUIRED)
                    .addType(validator_builder_1.ValidatorTypeEnum.STRING)
                    .setMessage("Número é inválido")
                    .build(),
            ];
            ;
        }
        async handle(input) {
            await this.usersRepository.insert({
                fields: [
                    {
                        key: "id",
                        value: uuid_generator_1.UuidGenerator.generate(),
                    },
                    {
                        key: "name",
                        value: "",
                    },
                    {
                        key: "email",
                        value: "",
                    },
                    {
                        key: "phone",
                        value: input.phone,
                    }
                ],
            });
            return { message: "Usuário inserido com sucesso" };
        }
    }
    ManageUsersUseCase.CreateService = CreateService;
    class UpdateService extends usecase_1.UseCase {
        constructor() {
            super();
            this.usersRepository = new users_repository_1.UsersRepositorty();
        }
        setValidators() {
            return [
                new validator_builder_1.ValidatorBuilder()
                    .setField("id")
                    .addType(validator_builder_1.ValidatorTypeEnum.REQUIRED)
                    .addType(validator_builder_1.ValidatorTypeEnum.STRING)
                    .setMessage("Usuário é inválido")
                    .build(),
            ];
            ;
        }
        async handle(input) {
            const foundUser = await this.usersRepository.findOne({
                params: [
                    {
                        key: "id",
                        value: input.id,
                    },
                ],
            });
            await this.usersRepository.update({
                id: input.id,
                fields: [
                    { key: 'name', value: input.name || foundUser.name || '' },
                    { key: 'phone', value: input.phone || foundUser.phone || '' },
                    { key: 'email', value: input.email || foundUser.email || '' },
                    { key: 'relation_with_master', value: input.relation_with_master || foundUser.relation_with_master || '' },
                    { key: 'what_likes', value: input.what_likes || foundUser.what_likes || '' },
                    { key: 'what_knows', value: input.what_knows || foundUser.what_knows || '' },
                    { key: 'what_does', value: input.what_does || foundUser.what_does || '' },
                ],
            });
            return { message: "Usuário atualizado com sucesso" };
        }
    }
    ManageUsersUseCase.UpdateService = UpdateService;
    class DeleteService extends usecase_1.UseCase {
        constructor() {
            super();
            this.userLastMesages = new user_last_messages_repository_1.UserLastMessagesRepositorty();
            this.usersRepository = new users_repository_1.UsersRepositorty();
        }
        setValidators() {
            return [
                new validator_builder_1.ValidatorBuilder()
                    .setField("id")
                    .addType(validator_builder_1.ValidatorTypeEnum.REQUIRED)
                    .addType(validator_builder_1.ValidatorTypeEnum.STRING)
                    .setMessage("Usuário é inválido")
                    .build(),
            ];
            ;
        }
        async handle(input) {
            await this.userLastMesages.delete({ params: [
                    {
                        key: "user_id",
                        value: input.id
                    }
                ] });
            await this.usersRepository.delete({
                params: [{
                        key: "id",
                        value: input.id
                    }]
            });
            return { message: "Usuário removido com sucesso" };
        }
    }
    ManageUsersUseCase.DeleteService = DeleteService;
    class GetOneService extends usecase_1.UseCase {
        constructor() {
            super();
            this.usersRepository = new users_repository_1.UsersRepositorty();
        }
        setValidators() {
            return [
                new validator_builder_1.ValidatorBuilder()
                    .setField("id")
                    .addType(validator_builder_1.ValidatorTypeEnum.REQUIRED)
                    .addType(validator_builder_1.ValidatorTypeEnum.STRING)
                    .setMessage("Usuário é inválido")
                    .build(),
            ];
            ;
        }
        async handle(input) {
            return await this.usersRepository.findOne({
                params: [{
                        key: "id",
                        value: input.id
                    }]
            });
        }
    }
    ManageUsersUseCase.GetOneService = GetOneService;
    class GetManyService extends usecase_1.UseCase {
        constructor() {
            super();
            this.usersRepository = new users_repository_1.UsersRepositorty();
        }
        setValidators() {
            return [
                new validator_builder_1.ValidatorBuilder()
                    .setField("limit")
                    .addType(validator_builder_1.ValidatorTypeEnum.REQUIRED)
                    .addType(validator_builder_1.ValidatorTypeEnum.NUMBER)
                    .setMessage("Limite é inválido")
                    .build(),
                new validator_builder_1.ValidatorBuilder()
                    .setField("offset")
                    .addType(validator_builder_1.ValidatorTypeEnum.REQUIRED)
                    .addType(validator_builder_1.ValidatorTypeEnum.NUMBER)
                    .setMessage("Offset é inválido")
                    .build(),
            ];
            ;
        }
        async handle(input) {
            return await this.usersRepository.findMany({
                limit: input.limit,
                offset: input.offset,
                orderByAsc: true
            });
        }
    }
    ManageUsersUseCase.GetManyService = GetManyService;
})(ManageUsersUseCase || (exports.ManageUsersUseCase = ManageUsersUseCase = {}));
