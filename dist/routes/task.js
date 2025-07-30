"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// const express = require('express')
const express_1 = __importDefault(require("express"));
const tasks_1 = require("../controllers/tasks");
const router = express_1.default.Router();
router.route('/').get(tasks_1.getAllTasks).post(tasks_1.createNewTask);
router.route('/:id').get(tasks_1.getTask).patch(tasks_1.updateTask).delete(tasks_1.deleteTask);
exports.default = router;
