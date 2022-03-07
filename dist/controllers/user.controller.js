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
exports.updateUser = exports.getUser = void 0;
const ApiError_1 = __importDefault(require("middlewares/ApiError"));
const config_1 = require("config/config");
const bcrypt_1 = __importDefault(require("bcrypt"));
const getUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        return res.status(200).json({ user: req.user });
    }
    catch (error) {
        next(error);
    }
});
exports.getUser = getUser;
const updateUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (!req.user)
            return next(ApiError_1.default.badRequest(403, 'Invalid Authentication.'));
        const { name, email, city, birthday, number, oldPassword, newPassword } = req.body;
        const existedEmail = yield config_1.prisma.user.findUnique({ where: { email } });
        if (existedEmail)
            return next(ApiError_1.default.badRequest(400, 'This email already registered!'));
        const currentUser = yield config_1.prisma.user.findUnique({ where: { id: req.user.id } });
        if (!currentUser)
            return next(ApiError_1.default.badRequest(403, 'Invalid Authentication.'));
        if (newPassword === oldPassword)
            return next(ApiError_1.default.badRequest(400, 'New password can not be same old password!'));
        const isMatch = yield bcrypt_1.default.compare(oldPassword, currentUser.password);
        if (!isMatch)
            return next(ApiError_1.default.badRequest(400, 'Old password is not valid!'));
        const hashedPassword = yield bcrypt_1.default.hash(newPassword, 12);
        yield config_1.prisma.user.update({
            where: { id: req.user.id },
            data: { name, email, password: hashedPassword, city, birthday, number },
        });
        const user = yield config_1.prisma.user.findUnique({
            where: { id: req.user.id },
            select: {
                id: true,
                email: true,
                name: true,
                city: true,
                number: true,
                birthday: true,
                posts: true,
                role: true,
                createdAt: true,
            },
        });
        return res.status(200).json({ user });
    }
    catch (error) {
        next(error);
    }
});
exports.updateUser = updateUser;
