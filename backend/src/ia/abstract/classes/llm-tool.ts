import { LlmToolType } from "../../../domain/abstract/types/llm-tool-type";

export abstract class LlmTool {
  public abstract getInstance(): LlmToolType;
}
