import { LlmChatTestUseCase } from "../../domain/usecases/chat/llm-chat-test-usecase";
import { ObserverMetricsEnum } from "../utils/metrics-observer";
import { ApiRoute } from "../abstract/api-route";

export const TestRoutes: ApiRoute[] = [
  {
    path: "/test/send-message",
    title: "Testar envio de mensagem",
    description: "Rota para testar o envio de mensagens para o agente de IA",
    method: "POST",
    usecase: new LlmChatTestUseCase.Service(),
    middlewares: [],
    input: LlmChatTestUseCase.Input,
    output: LlmChatTestUseCase.Output,
    oberverMetrics: [
      ObserverMetricsEnum.request_counter,
      ObserverMetricsEnum.llm_requests_total,
    ],
  },
];
