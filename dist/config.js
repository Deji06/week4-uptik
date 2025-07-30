"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.config = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
function validateEnv() {
    const requiredVars = ['JWT_SECRET', 'PORT', 'MONGO_URI'];
    const missingVars = [];
    for (const key of requiredVars) {
        if (!process.env[key]) {
            missingVars.push(key);
        }
    }
    if (missingVars.length > 0) {
        throw new Error(`Missing required environment variables: ${missingVars.join(', ')}`);
    }
    return {
        JWT_SECRET: process.env.JWT_SECRET,
        PORT: process.env.PORT,
        MONGO_URI: process.env.MONGO_URI,
    };
}
exports.config = validateEnv();
