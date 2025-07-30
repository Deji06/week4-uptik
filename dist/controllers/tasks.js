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
exports.deleteTask = exports.updateTask = exports.createNewTask = exports.getTask = exports.getAllTasks = void 0;
const http_status_codes_1 = require("http-status-codes");
const tasks_1 = __importDefault(require("../models/tasks"));
const index_1 = require("../errors/index");
const getAllTasks = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("user auth verification:", req.userDetail); // Log userDetail
    console.log("Request Headers in getAllTasks:", req.headers); // Log headers
    if (!req.userDetail) {
        return res.status(http_status_codes_1.StatusCodes.UNAUTHORIZED).json({ msg: "No user found in request" });
    }
    // console.log("user auth verification:" , req.userDetail);
    const getAll = yield tasks_1.default.find({ createdBy: req.userDetail }).sort('createdAt');
    res.status(http_status_codes_1.StatusCodes.OK).json({ getAll, count: getAll.length });
});
exports.getAllTasks = getAllTasks;
// req.params
const getTask = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { userDetail, params: { id: taskId } } = req;
    const getTask = yield tasks_1.default.findOne({ _id: taskId, createdBy: userDetail });
    if (!getTask) {
        throw new index_1.NotFoundError('task not found');
    }
    res.status(http_status_codes_1.StatusCodes.OK).json({ getTask });
});
exports.getTask = getTask;
const createNewTask = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    req.body.createdBy = req.userDetail;
    const task = yield tasks_1.default.create(req.body);
    res.status(http_status_codes_1.StatusCodes.CREATED).json({ task });
    // res.json(req.userDetail)
});
exports.createNewTask = createNewTask;
const updateTask = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userDetail, params: { id: taskId, body: content } } = req;
    if (content === '') {
        throw new index_1.BadRequestError('field cannot be empty');
    }
    const updateTask = yield tasks_1.default.findByIdAndUpdate({ createdBy: userDetail, _id: taskId }, req.body, { new: true, runValidators: true });
    if (!updateTask) {
        throw new index_1.NotFoundError('no task with id:taskId found');
    }
    res.status(http_status_codes_1.StatusCodes.OK).json({ updateTask });
    // res.send('update task')
});
exports.updateTask = updateTask;
const deleteTask = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userDetail, params: { id: taskId } } = req;
    const deleteTask = yield tasks_1.default.findByIdAndDelete({ _id: taskId, createdBy: userDetail });
    if (!deleteTask) {
        throw new index_1.NotFoundError('no task with id:taskId found');
    }
    res.status(http_status_codes_1.StatusCodes.OK).json({ msg: 'task successfully deleted' });
});
exports.deleteTask = deleteTask;
