"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ApiError {
    constructor(code, message) {
        this.code = code;
        this.message = message;
    }
    static badRequest(code, msg) {
        return new ApiError(code, msg);
    }
    static internalError(msg) {
        return new ApiError(500, msg);
    }
}
exports.default = ApiError;
