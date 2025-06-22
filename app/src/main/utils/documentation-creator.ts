import { ApiRoute } from "../abstract/api-route";
import { Request, Response } from "express";
import swaggerUi from "swagger-ui-express";
import { Env } from "./env";

export class DocumentationCreator {
  private app: any;

  constructor(app: any) {
    this.app = app;
  }

  public addDocumentation(routes: ApiRoute[]) {
    const generateOpenApiSpec = () => {
      const paths: Record<string, any> = {};

      for (const route of routes) {
        const method = route.method.toLowerCase();

        if (!paths[route.path]) {
          paths[route.path] = {};
        }

        const isGetMethod = route.method === "GET";

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

        const operationObject: any = {
          summary: route.description || '',
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

        if (isGetMethod) {
          if (route.input && typeof route.input === "object") {
            operationObject.parameters = Object.keys(route.input).map(
              (key) => ({
                name: key,
                in: "query",
                required: false,
                schema: {
                  type: typeof route.input[key],
                  example: route.input[key],
                },
              })
            );
          }
        } else {
          operationObject.requestBody = {
            required: true,
            content: {
              "application/json": {
                schema: {
                  example: route.input || {},
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
          title: "Dynamic API Documentation",
          version: "1.0.0",
          description: "Generated automatically from route definitions.",
        },
        servers: [
          {
            url: `http://localhost:${Env.PORT}`,
          },
        ],
        paths,
      };
    };

    this.app.get("/openapi.json", (req: Request, res: Response) => {
      res.json(generateOpenApiSpec());
    });

    this.app.use(
      "/docs",
      swaggerUi.serve,
      swaggerUi.setup(generateOpenApiSpec())
    );
  }
}
