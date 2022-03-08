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
exports.logoutUser = exports.loginUser = exports.registrationUser = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const validator_1 = require("../services/helpers/validator");
const generateJwt_1 = require("../services/helpers/generateJwt");
const ApiError_1 = __importDefault(require("../middlewares/ApiError"));
const config_1 = require("../config/config");
const registrationUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, email, password, city, number, birthday } = req.body;
        const error = (0, validator_1.regValidator)(Object.assign({}, req.body));
        if (error)
            return next(ApiError_1.default.badRequest(400, error));
        const existUser = yield config_1.prisma.user.findUnique({ where: { email } });
        if (existUser)
            return next(ApiError_1.default.badRequest(400, 'This email is already registered!'));
        const hashedPassword = yield bcrypt_1.default.hash(password, 12);
        yield config_1.prisma.user.create({
            data: {
                email,
                name,
                password: hashedPassword,
                city,
                number,
                birthday,
            },
        });
        const user = yield config_1.prisma.user.findUnique({
            where: { email },
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
        if (!user)
            return next(ApiError_1.default.badRequest(400, 'Something went wrong!'));
        const token = (0, generateJwt_1.generateJwt)(user);
        return res.status(201).json({ token, user });
    }
    catch (error) {
        next(error);
    }
});
exports.registrationUser = registrationUser;
const loginUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        const error = (0, validator_1.loginValidator)(Object.assign({}, req.body));
        if (error)
            return next(ApiError_1.default.badRequest(400, error));
        const user = yield config_1.prisma.user.findUnique({
            where: { email },
            include: {
                posts: true,
            },
        });
        if (!user)
            return next(ApiError_1.default.badRequest(400, "This user doesn't exists"));
        const isMatch = yield bcrypt_1.default.compare(password, user.password);
        if (!isMatch)
            return next(ApiError_1.default.badRequest(400, 'Password is not valid'));
        const token = (0, generateJwt_1.generateJwt)(user);
        res.status(200).json({
            token,
            user: {
                id: user.id,
                name: user.name,
                email: user.email,
                city: user.city,
                number: user.number,
                birthday: user.birthday,
                posts: user.posts,
                role: user.role,
                createdAt: user.createdAt,
            },
        });
    }
    catch (error) {
        next(error);
    }
});
exports.loginUser = loginUser;
const logoutUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (!req.user)
            return next(ApiError_1.default.badRequest(403, 'Invalid Authentication.'));
        return res.status(200).json({ message: 'Logged out!' });
    }
    catch (error) {
        next(error);
    }
});
exports.logoutUser = logoutUser;
