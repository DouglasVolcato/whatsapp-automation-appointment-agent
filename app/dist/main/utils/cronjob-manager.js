"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CronJobManager = void 0;
const logger_1 = require("../../domain/utils/logger");
const node_cron_1 = __importDefault(require("node-cron"));
class CronJobManager {
    constructor() {
        this.jobs = new Map();
    }
    addJob({ name, schedule, task }) {
        const job = node_cron_1.default.schedule(schedule, () => {
            logger_1.Logger.cronjob(`Cron job "${name}" ran.`);
            task();
        }, { scheduled: true });
        this.jobs.set(name, job);
        logger_1.Logger.cronjob(`Cron job "${name}" scheduled with pattern "${schedule}"`);
    }
    stopJob(name) {
        const job = this.jobs.get(name);
        if (job) {
            job.stop();
            logger_1.Logger.cronjob(`Cron job "${name}" stopped.`);
        }
    }
    startJob(name) {
        const job = this.jobs.get(name);
        if (job) {
            job.start();
            logger_1.Logger.cronjob(`Cron job "${name}" started.`);
        }
    }
    stopAllJobs() {
        this.jobs.forEach((job, name) => {
            job.stop();
            logger_1.Logger.cronjob(`Cron job "${name}" stopped.`);
        });
    }
}
exports.CronJobManager = CronJobManager;
