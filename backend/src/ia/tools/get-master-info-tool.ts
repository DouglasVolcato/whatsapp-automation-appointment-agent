import { GetUserByNumberUseCase } from "../../domain/usecases/users/get-user-by-number-usecase";
import { LlmToolType } from "../../domain/abstract/types/llm-tool-type";
import { LlmTool } from "../abstract/classes/llm-tool";
import { z } from "zod";

export class GetMasterInfoTool extends LlmTool {
  public getInstance(): LlmToolType {
    return {
      callback: this.execute.bind(this),
      name: "buscar-informacoes-do-mestre",
      schema: z.object({}),
      description: `Busca as informações do mestre`,
    };
  }

  protected async execute(
    input: typeof GetUserByNumberUseCase.Input
  ): Promise<string> {
    return JSON.stringify({
      name: "Douglas",
      number: "+55 (51) 99977-2868",
      email: "douglasvolcato@gmail.com",
      linkedin: "https://www.linkedin.com/in/douglasvolcato/",
      github: "https://github.com/DouglasVolcato",
      profession: "Desenvolvedor Full Stack",
      habilities: [
        `Desenvolvimento de sistemas web`,
        `Desenvolvimento de sistemas mobile`,
        `Automação de tarefas`,
        `Web scraping`,
        `Análise de dados`,
        `Desenvolvimento de modelos de machine learning`,
        `Desenvolvimento de agentes de inteligência artificial`,
        `Arquitetura de software`,
        `Manutenção de sistemas legados`,
        `Deploy de aplicações`,
      ],
    });
  }
}
