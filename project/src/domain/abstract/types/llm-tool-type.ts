import { z } from "zod";

export type LlmToolType = {
  callback: (args: any) => Promise<string>;
  name: string;
  schema: z.ZodSchema;
  description: string;
};
