"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.makeDocumentationCreator = makeDocumentationCreator;
const documentation_creator_1 = require("../utils/documentation-creator");
function makeDocumentationCreator(app, routes) {
    return new documentation_creator_1.DocumentationCreator(app).addDocumentation(routes);
}
