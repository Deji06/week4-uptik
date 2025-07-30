"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NotFoundError = void 0;
// import {Response} from 'express'
const CustomApiError_1 = require("./CustomApiError");
const http_status_codes_1 = require("http-status-codes");
class NotFoundError extends CustomApiError_1.CustomApiError {
    constructor(message) {
        super(message);
        this.statusCode = http_status_codes_1.StatusCodes.NOT_FOUND;
    }
}
exports.NotFoundError = NotFoundError;
