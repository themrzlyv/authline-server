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
exports.accessUser = void 0;
const ApiError_1 = __importDefault(require("middlewares/ApiError"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = require("config/config");
const accessUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        if (!(req.headers.authorization && req.headers.authorization.startsWith('Bearer:'))) {
            return next(ApiError_1.default.badRequest(403, 'You are not authorized to access this page'));
        }
        const accessToken = (_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.split(' ')[1];
        if (!accessToken)
            return next(ApiError_1.default.badRequest(403, 'Invalid Authentication.'));
        const decoded = jsonwebtoken_1.default.verify(accessToken, `${process.env.ACCESS_TOKEN_SECRET}`);
        if (!decoded)
            return next(ApiError_1.default.badRequest(403, 'Invalid Authentication.'));
        const user = yield config_1.prisma.user.findUnique({
            where: { id: decoded.id },
            include: { posts: true },
        });
        if (!user)
            return next(ApiError_1.default.badRequest(403, 'User does not exist!'));
        req.user = {
            id: user.id,
            name: user.name,
            email: user.email,
            city: user.city,
            number: user.number,
            birthday: user.birthday,
            posts: user.posts,
            role: user.role,
            createdAt: user.createdAt,
        };
        next();
    }
    catch (error) {
        next(error);
    }
});
exports.accessUser = accessUser;
