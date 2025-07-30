"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthenticationError = void 0;
const CustomApiError_1 = require("./CustomApiError");
const http_status_codes_1 = require("http-status-codes");
class AuthenticationError extends CustomApiError_1.CustomApiError {
    constructor(message) {
        super(message),
            this.statusCode = http_status_codes_1.StatusCodes.UNAUTHORIZED;
    }
}
exports.AuthenticationError = AuthenticationError;
