"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.makeDocumentationCreator = makeDocumentationCreator;
const documentation_creator_1 = require("../utils/documentation-creator");
function makeDocumentationCreator(input, routes) {
    return new documentation_creator_1.DocumentationCreator(input).addDocumentation(routes);
}
