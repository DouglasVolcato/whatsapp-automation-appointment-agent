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

  public async execute(
    input = {}
  ): Promise<string> {
    return JSON.stringify({
      name: "Douglas Volcato",
      number: "+55 (51) 99977-2868",
      email: "douglasvolcato@gmail.com",
      linkedin: "https://www.linkedin.com/in/douglasvolcato/",
      github: "https://github.com/DouglasVolcato",
      instagram: "https://www.instagram.com/douglasvolcato/",
      profession: "Desenvolvedor Full Stack",
      busy_hours: "De segunda a sexta das 7h a 19:30h",
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
      hobbies: [
        `Desenvolvimento de sistemas`,
        `Solução de problemas`,
        `Empreendedorismo`,
        `Investimentos`,
        `Cripto moedas`,
        `Tecnologia`,
        `Esportes`,
        `Xadrez`,
        `Jogos RPG`,
      ]
    });
  }
}
