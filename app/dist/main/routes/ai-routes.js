"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AiRoutes = void 0;
const llm_chat_test_usecase_1 = require("../../domain/usecases/chat/llm-chat-test-usecase");
const metrics_observer_1 = require("../utils/metrics-observer");
exports.AiRoutes = [
    {
        path: "/ai/send-message",
        title: "Testar envio de mensagem",
        description: "Rota para testar o envio de mensagens para o agente de IA",
        method: "POST",
        usecase: () => new llm_chat_test_usecase_1.LlmChatTestUseCase.Service(),
        input: llm_chat_test_usecase_1.LlmChatTestUseCase.Input,
        output: llm_chat_test_usecase_1.LlmChatTestUseCase.Output,
        oberverMetrics: [
            metrics_observer_1.ObserverMetricsEnum.request_counter,
            metrics_observer_1.ObserverMetricsEnum.llm_requests_total,
        ],
        rateLimiterOptions: {
            hours: 1,
            maxRequests: 5,
        }
    },
];
