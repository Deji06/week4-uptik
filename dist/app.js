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
//  @ts-ignore
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const connect_1 = __importDefault(require("./DB/connect"));
const user_1 = __importDefault(require("./routes/user"));
const task_1 = __importDefault(require("./routes/task"));
const NotFoundMiddleware_1 = __importDefault(require("./middleWare/NotFoundMiddleware"));
const errorHandler_1 = __importDefault(require("./middleWare/errorHandler"));
const authentication_1 = __importDefault(require("./middleWare/authentication"));
const helmet_1 = __importDefault(require("helmet"));
const cors_1 = __importDefault(require("cors"));
const express_rate_limit_1 = __importDefault(require("express-rate-limit"));
const config_1 = require("./config");
// security 
app.set('trust proxy', 1);
app.use((0, express_rate_limit_1.default)({
    windowMs: 15 * 60 * 1000,
    limit: 100,
    standardHeaders: 'draft-8',
    legacyHeaders: false,
}));
app.use(express_1.default.json());
app.use((0, helmet_1.default)());
app.use((0, cors_1.default)());
// app.use(xss())
// router
app.use('/api/v1/auth', user_1.default);
app.use('/api/v1/task', authentication_1.default, task_1.default);
// middleWare
app.use(NotFoundMiddleware_1.default);
app.use(errorHandler_1.default);
const PORT = process.env.PORT || 3000;
const start = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield (0, connect_1.default)(config_1.config.MONGO_URI);
        app.listen(PORT, () => {
            console.log(`app is listening in port: ${PORT}.....`);
        });
    }
    catch (error) {
        console.log(error);
    }
});
start();
