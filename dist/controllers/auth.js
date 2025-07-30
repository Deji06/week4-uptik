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
exports.login = exports.register = void 0;
const http_status_codes_1 = require("http-status-codes");
const index_1 = require("../errors/index");
const user_1 = __importDefault(require("../models/user"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const register = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { username, email, password } = req.body;
        if (!username || !email || !password) {
            throw new index_1.AuthenticationError('provide valid credentials');
        }
        const user = yield user_1.default.create(Object.assign({}, req.body));
        const token = user.createJwt();
        //  jwt.sign({userId:user._id}, process.env.JWT_SECRET, {expiresIn:"1d"})
        res.status(http_status_codes_1.StatusCodes.CREATED).json({ user: { name: user.username }, token });
    }
    catch (error) {
        console.log(error);
        next(error);
    }
});
exports.register = register;
const login = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            throw new index_1.AuthenticationError('please provide valid email or password');
            // return next(createCustomError('please provide email or password', StatusCodes.UNAUTHORIZED))
        }
        const user = yield user_1.default.findOne({ email });
        // authentication
        if (!user) {
            throw new index_1.CustomApiError('provide valid credentials');
        }
        // comparing password
        const isPasswordMatch = yield user.confirmPassword(password);
        if (!isPasswordMatch) {
            throw new index_1.AuthenticationError('password does not match');
        }
        const token = user.createJwt();
        // const token = jwt.sign({email},process.env.JWT_SECRET, {expiresIn:'30d'} )
        res.status(http_status_codes_1.StatusCodes.ACCEPTED).json({ user: { username: user.username }, token });
    }
    catch (error) {
        console.log(error);
        next(error);
    }
});
exports.login = login;
