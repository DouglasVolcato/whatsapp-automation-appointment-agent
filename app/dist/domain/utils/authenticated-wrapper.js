"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authenticatedWrapper = authenticatedWrapper;
function authenticatedWrapper(data) {
    return {
        ...data,
        token: '',
    };
}
