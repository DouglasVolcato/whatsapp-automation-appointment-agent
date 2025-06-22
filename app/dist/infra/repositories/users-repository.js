"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersRepositorty = void 0;
const repository_1 = require("../database/repository");
class UsersRepositorty extends repository_1.Repository {
    constructor() {
        super({
            tableName: "users",
            idField: "id",
            publicFields: [
                "id",
                "name",
                "phone",
                "email",
                "relation_with_master",
                "what_likes",
                "what_knows",
                "what_does",
                "conversation_state",
                "created_at",
                "updated_at",
            ],
            insertFields: [
                "id",
                "name",
                "phone",
                "email",
                "relation_with_master",
                "what_likes",
                "what_knows",
                "what_does",
                "conversation_state",
            ],
            updateFields: [
                "name",
                "phone",
                "email",
                "relation_with_master",
                "what_likes",
                "what_knows",
                "what_does",
                "conversation_state",
            ],
        });
    }
}
exports.UsersRepositorty = UsersRepositorty;
