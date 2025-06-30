import { UserLastMessagesRepositorty } from "../../../infra/repositories/user-last-messages-repository";
import { ValidatorBuilder, ValidatorTypeEnum } from "../../utils/validator-builder";
import { ValidatorInterface } from "../../abstract/interfaces/validator-interface";
import { ConversationState } from "../../abstract/enums/conversation-state-enum";
import { UsersRepositorty } from "../../../infra/repositories/users-repository";
import { UserEntity } from "../../abstract/entities/user-entity";
import { UuidGenerator } from "../../utils/uuid-generator";
import { UseCase } from "../../abstract/classes/usecase";


export namespace ManageUsersUseCase {
    export const CreateInput = {
        name: "",
        email: "",
        phone: "",
        relation_with_master: "",
        what_likes: "",
        what_knows: "",
        what_does: ""
    };
    export const UpdateInput = {
        id: "",
        name: "",
        email: "",
        phone: "",
        relation_with_master: "",
        what_likes: "",
        what_knows: "",
        what_does: "",
    };
    export const DeleteInput = {
        id: "",
    };
    export const GetOneInput = {
        id: "",
    };
    export const GetManyInput = {
        limit: 20,
        offset: 0
    };

    export const CreateOutput = { message: "" };
    export const UpdateOutput = { message: "" };
    export const DeleteOutput = { message: "" };
    export const GetOneOutput: UserEntity | null = {
        id: "",
        name: "",
        email: "",
        phone: "",
        relation_with_master: "",
        what_likes: "",
        what_knows: "",
        what_does: "",
        conversation_state: ConversationState.getting_info,
        created_at: "",
        updated_at: "",
    };
    export const GetManyOutput: UserEntity[] = [];

    export class CreateService extends UseCase {
        private readonly usersRepository: UsersRepositorty;

        public constructor() {
            super();
            this.usersRepository = new UsersRepositorty();
        }

        public setValidators(): ValidatorInterface[] {
            return [
                new ValidatorBuilder()
                    .setField("name")
                    .addType(ValidatorTypeEnum.REQUIRED)
                    .addType(ValidatorTypeEnum.STRING)
                    .setMessage("Nome é inválido")
                    .build(),
                new ValidatorBuilder()
                    .setField("email")
                    .addType(ValidatorTypeEnum.REQUIRED)
                    .addType(ValidatorTypeEnum.EMAIL)
                    .setMessage("Email é inválido")
                    .build(),
                new ValidatorBuilder()
                    .setField("phone")
                    .addType(ValidatorTypeEnum.REQUIRED)
                    .addType(ValidatorTypeEnum.STRING)
                    .setMessage("Número é inválido")
                    .build(),
            ];;
        }

        public async handle(input: typeof CreateInput): Promise<typeof CreateOutput | Error> {
            await this.usersRepository.insert({
                fields: [
                    {
                        key: "id",
                        value: UuidGenerator.generate(),
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

    export class UpdateService extends UseCase {
        private readonly usersRepository: UsersRepositorty;

        public constructor() {
            super();
            this.usersRepository = new UsersRepositorty();
        }

        public setValidators(): ValidatorInterface[] {
            return [
                new ValidatorBuilder()
                    .setField("id")
                    .addType(ValidatorTypeEnum.REQUIRED)
                    .addType(ValidatorTypeEnum.STRING)
                    .setMessage("Usuário é inválido")
                    .build(),
            ];;
        }

        public async handle(input: typeof UpdateInput): Promise<typeof UpdateOutput | Error> {
            const foundUser: UserEntity =
                await this.usersRepository.findOne({
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

    export class DeleteService extends UseCase {
        private readonly userLastMesages: UserLastMessagesRepositorty;
        private readonly usersRepository: UsersRepositorty;

        public constructor() {
            super();
            this.userLastMesages = new UserLastMessagesRepositorty();
            this.usersRepository = new UsersRepositorty();
        }

        public setValidators(): ValidatorInterface[] {
            return [
                new ValidatorBuilder()
                    .setField("id")
                    .addType(ValidatorTypeEnum.REQUIRED)
                    .addType(ValidatorTypeEnum.STRING)
                    .setMessage("Usuário é inválido")
                    .build(),
            ];;
        }

        public async handle(input: typeof DeleteInput): Promise<typeof DeleteOutput | Error> {
            await this.userLastMesages.delete({params: [
                {
                    key: "user_id",
                    value: input.id
                }
            ]});
            await this.usersRepository.delete({
                params: [{
                    key: "id",
                    value: input.id
                }]
            })

            return { message: "Usuário removido com sucesso" };
        }
    }

    export class GetOneService extends UseCase {
        private readonly usersRepository: UsersRepositorty;

        public constructor() {
            super();
            this.usersRepository = new UsersRepositorty();
        }

        public setValidators(): ValidatorInterface[] {
            return [
                new ValidatorBuilder()
                    .setField("id")
                    .addType(ValidatorTypeEnum.REQUIRED)
                    .addType(ValidatorTypeEnum.STRING)
                    .setMessage("Usuário é inválido")
                    .build(),
            ];;
        }

        public async handle(input: typeof GetOneInput): Promise<typeof GetOneOutput | Error> {
            return await this.usersRepository.findOne({
                params: [{
                    key: "id",
                    value: input.id
                }]
            })
        }
    }

    export class GetManyService extends UseCase {
        private readonly usersRepository: UsersRepositorty;

        public constructor() {
            super();
            this.usersRepository = new UsersRepositorty();
        }

        public setValidators(): ValidatorInterface[] {
            return [
                new ValidatorBuilder()
                    .setField("limit")
                    .addType(ValidatorTypeEnum.REQUIRED)
                    .addType(ValidatorTypeEnum.NUMBER)
                    .setMessage("Limite é inválido")
                    .build(),
                new ValidatorBuilder()
                    .setField("offset")
                    .addType(ValidatorTypeEnum.REQUIRED)
                    .addType(ValidatorTypeEnum.NUMBER)
                    .setMessage("Offset é inválido")
                    .build(),
            ];;
        }

        public async handle(input: typeof GetManyInput): Promise<typeof GetManyOutput | Error> {
            return await this.usersRepository.findMany({
                limit: input.limit,
                offset: input.offset,
                orderByAsc: true
            })
        }
    }
}
