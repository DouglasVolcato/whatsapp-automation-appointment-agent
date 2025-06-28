"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppointmentRepositorty = void 0;
const repository_1 = require("../database/repository");
class AppointmentRepositorty extends repository_1.Repository {
    constructor() {
        super({
            tableName: "appointments",
            idField: "id",
            publicFields: [
                "id",
                "user_id",
                "date_time",
                "title",
                "description",
                "created_at",
                "updated_at",
            ],
            insertFields: ["id", "user_id", "date_time", "title", "description"],
            updateFields: ["user_id", "date_time", "title", "description"],
        });
    }
    async getManyByDay(input) {
        const query = `SELECT * FROM appointments WHERE date_time = $1;`;
        return await this.executeSql({ query: query, params: [input.day] });
    }
    async getAvailableHours(input) {
        const query = `
      WITH all_hours AS (
        SELECT generate_series(
          date_trunc('day', $1::timestamp),
          date_trunc('day', $1::timestamp) + interval '23 hours',
          interval '1 hour'
        ) AS hour
      ),
      scheduled_hours AS (
        SELECT date_trunc('hour', date_time) AS hour
        FROM appointments
        WHERE date_trunc('day', date_time) = date_trunc('day', $1::timestamp)
      ),
      busy_hours AS (
        SELECT generate_series(
          date_trunc('day', $1::timestamp) + interval '7 hours',
          date_trunc('day', $1::timestamp) + interval '19:00 hours',
          interval '1 hour'
        ) AS hour
        WHERE EXTRACT(dow FROM $1::timestamp) BETWEEN 1 AND 5
      ),
      sleeping_hours AS (
        SELECT generate_series(
          date_trunc('day', $1::timestamp) + interval '0 hours',
          date_trunc('day', $1::timestamp) + interval '7:00 hours',
          interval '1 hour'
        ) AS hour
      )
      SELECT hour FROM all_hours
      WHERE hour NOT IN (SELECT hour FROM sleeping_hours)
      and hour NOT IN (SELECT hour FROM busy_hours)
      and hour NOT IN (SELECT hour FROM scheduled_hours);
    `;
        return await this.executeSql({ query: query, params: [input.day] });
    }
    async checkIfDatetimeIsAvailable(input) {
        const query = `
      with 
      scheduled_hours AS (
        SELECT date_trunc('hour', date_time) AS hour
        FROM appointments
        WHERE date_trunc('day', $1::timestamp) between date_trunc('day', date_time) and date_trunc('day', date_time) + interval '1 hour'
      ),
      busy_hours AS (
        SELECT generate_series(
          date_trunc('day', $1::timestamp) + interval '7 hours',
          date_trunc('day', $1::timestamp) + interval '19:00 hours',
          interval '1 hour'
        ) AS hour
        WHERE EXTRACT(dow FROM $1::timestamp) BETWEEN 1 AND 5
      ),
      sleeping_hours AS (
        SELECT generate_series(
          date_trunc('day', $1::timestamp) + interval '0 hours',
          date_trunc('day', $1::timestamp) + interval '7:00 hours',
          interval '1 hour'
        ) AS hour
      )
      SELECT 
        (CASE
          WHEN $1 IN (SELECT hour FROM scheduled_hours) THEN false
          WHEN $1 IN (SELECT hour FROM busy_hours) THEN false
          WHEN $1 IN (SELECT hour FROM sleeping_hours) THEN false
          ELSE true
        END) as is_available
    `;
        return (await this.executeSql({ query: query, params: [input.date_time] }))[0];
    }
    async getManyByUser(input) {
        const query = `SELECT * FROM appointments WHERE user_id = $1;`;
        return await this.executeSql({ query: query, params: [input.user_id] });
    }
}
exports.AppointmentRepositorty = AppointmentRepositorty;
