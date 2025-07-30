"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// import { StatusCodes } from 'http-status-codes'
const errors_1 = require("../errors");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const config_1 = require("../config");
const auth = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("🔍 Incoming Request Headers:", req.headers);
    const authHeader = req.headers.authorization;
    console.log("auth Header:", authHeader);
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        console.log("Missing or invalid Authorization header");
        throw new errors_1.CustomApiError('authentication failed, try again');
    }
    const token = authHeader.split(' ')[1];
    console.log("token", token);
    try {
        const tokenVerification = jsonwebtoken_1.default.verify(token, config_1.config.JWT_SECRET);
        req.userDetail = tokenVerification.userId;
        next();
    }
    catch (error) {
        throw new errors_1.CustomApiError('invalid token');
    }
});
exports.default = auth;
