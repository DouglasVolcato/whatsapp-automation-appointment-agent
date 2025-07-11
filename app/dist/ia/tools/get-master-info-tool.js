"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetMasterInfoTool = void 0;
const llm_tool_1 = require("../abstract/classes/llm-tool");
const zod_1 = require("zod");
class GetMasterInfoTool extends llm_tool_1.LlmTool {
    getInstance() {
        return {
            callback: this.execute.bind(this),
            name: "buscar-informacoes-do-mestre",
            schema: zod_1.z.object({}),
            description: `Busca as informações do mestre`,
        };
    }
    async execute(input = {}) {
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
exports.GetMasterInfoTool = GetMasterInfoTool;
