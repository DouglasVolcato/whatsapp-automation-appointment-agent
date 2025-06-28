"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserLastMessagesRepositorty = void 0;
const repository_1 = require("../database/repository");
class UserLastMessagesRepositorty extends repository_1.Repository {
    constructor() {
        super({
            tableName: "user_last_messages",
            idField: "id",
            publicFields: [
                "id",
                "user_id",
                "sender",
                "content",
                "created_at",
                "updated_at",
            ],
            insertFields: ["id", "user_id", "sender", "content"],
            updateFields: [],
        });
    }
    async deleteOldMessages(user_id) {
        const lastMessagesIds = await this.findMany({
            params: [
                {
                    key: "user_id",
                    value: user_id,
                },
            ],
            limit: 4,
            offset: 0,
        });
        await this.executeSql({
            query: `DELETE FROM user_last_messages WHERE user_id = $1 AND NOT (id = ANY($2::text[]))`,
            params: [user_id, lastMessagesIds.map((obj) => obj.id)],
        });
    }
}
exports.UserLastMessagesRepositorty = UserLastMessagesRepositorty;
