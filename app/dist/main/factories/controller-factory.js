"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.makeController = makeController;
const controller_1 = require("../../domain/controllers/controller");
function makeController(usecase) {
    return new controller_1.Controller(usecase);
}
