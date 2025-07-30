"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = require("../errors/index");
const http_status_codes_1 = require("http-status-codes");
const errorHandleMiddleWare = (err, req, res, next) => {
    if (err instanceof index_1.CustomApiError) {
        // StatusCode: StatusCodes
        return res.status(err.statusCode).json({ msg: err.message });
    }
    console.log(err);
    return res.status(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR).send('something went wrong, try again later');
};
exports.default = errorHandleMiddleWare;
