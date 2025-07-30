"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
// const User = require('../models/user')
const taskSchema = new mongoose_1.default.Schema({
    content: {
        type: String,
        required: [true, 'please type in your task']
    },
    createdBy: {
        type: mongoose_1.default.Types.ObjectId,
        ref: 'User',
        required: true
    },
}, { timestamps: true });
exports.default = mongoose_1.default.model('Note', taskSchema, "notes");
