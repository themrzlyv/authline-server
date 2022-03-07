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
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const cors_1 = __importDefault(require("cors"));
const morgan_1 = __importDefault(require("morgan"));
const mainRoutes_1 = __importDefault(require("routes/mainRoutes"));
const errorHandler_1 = __importDefault(require("middlewares/errorHandler"));
const config_1 = require("config/config");
dotenv_1.default.config();
(0, config_1.prismaConnect)()
    .then(() => console.log('Prisma connection is successful'))
    .catch((error) => console.log(error));
const startServer = () => __awaiter(void 0, void 0, void 0, function* () {
    const app = (0, express_1.default)();
    app.use((0, cors_1.default)());
    app.use(express_1.default.json());
    app.use(express_1.default.urlencoded({ extended: false }));
    if (process.env.NODE_ENV === 'development') {
        app.use((0, morgan_1.default)('tiny'));
        console.log('Morgan logger is activated');
    }
    app.use('/v1', mainRoutes_1.default);
    app.use(errorHandler_1.default);
    const port = Number(process.env.PORT) || 4000;
    app.listen(port, () => console.log(`Server is running on ${port}`));
});
startServer().catch((err) => console.log(err));
