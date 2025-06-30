"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DashboardsRepository = void 0;
const repository_1 = require("../database/repository");
class DashboardsRepository extends repository_1.Repository {
    constructor() {
        super({
            tableName: "",
            idField: "",
            publicFields: [],
            insertFields: [],
            updateFields: [],
        });
    }
    async getTotals() {
        const query = `
        select
            (select count(id) from users) as user_quantity,
            (select count(id) from appointments) as appointment_quantity
        `;
        return (await this.executeSql({ query: query, params: [] }))[0];
    }
    async getCreatedUsersByMonth() {
        const query = `
        select
            count(id) as quantity,
            extract(year from created_at) as year,
            extract(month from created_at) as month
        from users
        group by year, month
        order by year asc, month asc
        `;
        return await this.executeSql({ query: query, params: [] });
    }
    async getUpdatedUsersByMonth() {
        const query = `
        select
            count(id) as quantity,
            extract(year from updated_at) as year,
            extract(month from updated_at) as month
        from users
        group by year, month
        order by year asc, month asc
        `;
        return await this.executeSql({ query: query, params: [] });
    }
    async getCreatedAppointmentsByMonth() {
        const query = `
        select
            count(id) as quantity,
            extract(year from created_at) as year,
            extract(month from created_at) as month
        from appointments
        group by year, month
        order by year asc, month asc
        `;
        return await this.executeSql({ query: query, params: [] });
    }
}
exports.DashboardsRepository = DashboardsRepository;
