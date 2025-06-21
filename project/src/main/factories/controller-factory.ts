import { Controller } from "../../domain/controllers/controller";
import { UseCase } from "../../domain/abstract/classes/usecase";

export function makeController(usecase: UseCase) {
  return new Controller(usecase);
}
