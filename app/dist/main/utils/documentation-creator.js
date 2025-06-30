"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DocumentationCreator = void 0;
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
const env_1 = require("./env");
class DocumentationCreator {
    constructor(input) {
        this.app = input.app;
        this.appName = input.appName;
        this.appDescription = input.appDescription;
        this.appVersion = input.appVersion;
    }
    addDocumentation(routes) {
        const generateOpenApiSpec = () => {
            const paths = {};
            for (const route of routes) {
                const method = route.method.toLowerCase();
                if (!paths[route.path]) {
                    paths[route.path] = {};
                }
                const isGetMethod = route.method === "GET";
                const isDeleteMethod = route.method === "DELETE";
                const errorOutput = {
                    error: "message",
                };
                const returnContent = route.templatePath
                    ? {
                        "text/html": {
                            schema: {
                                example: "<html></html>",
                            },
                        },
                    }
                    : {
                        "application/json": {
                            schema: {
                                example: route.output || {},
                            },
                        },
                    };
                const operationObject = {
                    summary: route.description || "",
                    responses: {
                        200: {
                            description: "Successful Response",
                            content: returnContent,
                        },
                        400: {
                            description: "Bad Request",
                            content: {
                                "application/json": {
                                    schema: {
                                        example: errorOutput,
                                    },
                                },
                            },
                        },
                        401: {
                            description: "Unauthorized",
                            content: {
                                "application/json": {
                                    schema: {
                                        example: errorOutput,
                                    },
                                },
                            },
                        },
                        500: {
                            description: "Error Response",
                            content: {
                                "application/json": {
                                    schema: {
                                        example: errorOutput,
                                    },
                                },
                            },
                        },
                    },
                };
                let input = route.input || {};
                if (route.useAuthentication) {
                    input = {
                        ...input,
                        token: "",
                    };
                }
                if (isGetMethod || isDeleteMethod) {
                    if (route.input && typeof route.input === "object") {
                        operationObject.parameters = Object.keys(input).map((key) => ({
                            name: key,
                            in: "query",
                            required: false,
                            schema: {
                                type: typeof route.input[key],
                                example: route.input[key],
                            },
                        }));
                    }
                }
                else {
                    operationObject.requestBody = {
                        required: true,
                        content: {
                            "application/json": {
                                schema: {
                                    example: input || {},
                                },
                            },
                        },
                    };
                }
                paths[route.path][method] = operationObject;
            }
            return {
                openapi: "3.0.0",
                info: {
                    title: this.appName,
                    version: this.appVersion,
                    description: this.appDescription,
                },
                servers: [
                    {
                        url: `http://localhost:${env_1.Env.PORT}`,
                    },
                ],
                paths,
            };
        };
        this.app.get("/openapi.json", (req, res) => {
            res.json(generateOpenApiSpec());
        });
        this.app.use("/docs", swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(generateOpenApiSpec()));
    }
}
exports.DocumentationCreator = DocumentationCreator;
