import { Logger } from "../../domain/utils/logger";
import cron from "node-cron";

type ScheduledTask = {
  name: string;
  schedule: string; // e.g. '*/5 * * * * *' for every 5 seconds
  task: () => void;
};

export class CronJobManager {
  private jobs: Map<string, cron.ScheduledTask> = new Map();

  public addJob({ name, schedule, task }: ScheduledTask) {
    const job = cron.schedule(
      schedule,
      () => {
        Logger.cronjob(`Cron job "${name}" ran.`);
        task();
      },
      { scheduled: true }
    );
    this.jobs.set(name, job);
    Logger.cronjob(`Cron job "${name}" scheduled with pattern "${schedule}"`);
  }

  public stopJob(name: string) {
    const job = this.jobs.get(name);
    if (job) {
      job.stop();
      Logger.cronjob(`Cron job "${name}" stopped.`);
    }
  }

  public startJob(name: string) {
    const job = this.jobs.get(name);
    if (job) {
      job.start();
      Logger.cronjob(`Cron job "${name}" started.`);
    }
  }

  public stopAllJobs() {
    this.jobs.forEach((job, name) => {
      job.stop();
      Logger.cronjob(`Cron job "${name}" stopped.`);
    });
  }
}
