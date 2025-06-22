"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UseCase = void 0;
class UseCase {
    async execute(input) {
        const validators = this.setValidators();
        for (const validator of validators) {
            const error = validator.validate(input);
            if (error) {
                return new Error(error);
            }
        }
        return this.handle(input);
    }
}
exports.UseCase = UseCase;
