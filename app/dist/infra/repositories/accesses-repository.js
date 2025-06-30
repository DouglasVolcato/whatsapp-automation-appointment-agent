"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AccessesRepository = void 0;
const repository_1 = require("../database/repository");
class AccessesRepository extends repository_1.Repository {
    constructor() {
        super({
            tableName: "accesses",
            idField: "id",
            publicFields: [
                "id",
                "email",
                "password",
                "created_at",
                "updated_at",
            ],
            insertFields: [
                "id",
                "email",
                "password",
            ],
            updateFields: [],
        });
    }
}
exports.AccessesRepository = AccessesRepository;
