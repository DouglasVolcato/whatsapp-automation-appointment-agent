import { config } from "dotenv";
import path from "path";

config();

export const Env = {
  PORT: process.env.PORT,
  DB_HOST: process.env.DB_HOST,
  DB_USER: process.env.DB_USER,
  DB_PASSWORD: process.env.DB_PASSWORD,
  DB_NAME: process.env.DB_NAME,
  DB_PORT: process.env.DB_PORT,
  OLLAMA_API_URL: process.env.OLLAMA_API_URL,
  OLLAMA_MODEL: process.env.OLLAMA_MODEL,
  OPENAI_KEY: process.env.OPENAI_KEY,
  OPENAI_MODEL: process.env.OPENAI_MODEL,
  SECRET_KEY: process.env.SECRET_KEY,
  ENABLE_LOGS: process.env.ENABLE_LOGS === "true",
  USE_OPENAI: process.env.USE_OPENAI === "true",
  STATIC_FILES_PATH: path.join(__dirname, "../../../public"),
  VIEWS_PATH: path.join(__dirname, "../../../views"),
  SERVER_DOMAIN: process.env.SERVER_DOMAIN,
  USE_WHATSAPP_API: process.env.USE_WHATSAPP_API === "true",
  WHATSAPP_API_URL: process.env.WHATSAPP_API_URL,
  WHATSAPP_TOKEN: process.env.WHATSAPP_TOKEN,
  WASENDER_API_KEY: process.env.WASENDER_API_KEY,
  WASENDER_PERSONAL_ACCESS_TOKEN: process.env.WASENDER_PERSONAL_ACCESS_TOKEN,
  WASENDER_WEBHOOK_SECRET: process.env.WASENDER_WEBHOOK_SECRET,
};
