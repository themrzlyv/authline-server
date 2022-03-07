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
const config_1 = require("config/config");
const ApiError_1 = __importDefault(require("middlewares/ApiError"));
class BanType {
    static allBanTypes(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const carBanTypes = yield config_1.prisma.banTypes.findMany({
                    orderBy: [{ banName: 'asc' }],
                });
                res.status(200).json({ length: carBanTypes.length, carBanTypes });
            }
            catch (error) {
                next(error);
            }
        });
    }
    static singleBanType(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const carBanType = yield config_1.prisma.banTypes.findUnique({
                    where: { id: id },
                    include: {
                        posts: true,
                    },
                });
                res.status(200).json(carBanType);
            }
            catch (error) {
                next(error);
            }
        });
    }
    static createBanType(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { banName } = req.body;
                if (!banName)
                    return next(ApiError_1.default.badRequest(400, 'Please fill all inputs!'));
                const existBanType = yield config_1.prisma.banTypes.findUnique({ where: { banName } });
                if (existBanType)
                    return next(ApiError_1.default.badRequest(400, 'This Ban already exists!'));
                yield config_1.prisma.banTypes.create({
                    data: {
                        banName,
                    },
                });
                res.status(201).json({ message: 'New Ban was created!' });
            }
            catch (error) {
                next(error);
            }
        });
    }
    static updateBanType(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const { banName } = req.body;
                if (!banName)
                    return next(ApiError_1.default.badRequest(400, 'Please fill all inputs!'));
                const existBanType = yield config_1.prisma.banTypes.findUnique({ where: { id: id } });
                if (!existBanType)
                    return next(ApiError_1.default.badRequest(400, "BanType didn't find!"));
                if (banName === (existBanType === null || existBanType === void 0 ? void 0 : existBanType.banName))
                    return next(ApiError_1.default.badRequest(400, 'The name same as older!'));
                yield config_1.prisma.banTypes.update({
                    where: { id: id },
                    data: {
                        banName,
                    },
                });
                res.status(200).json({ message: 'Ban was updated!' });
            }
            catch (error) {
                next(error);
            }
        });
    }
    static deleteBanType(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                yield config_1.prisma.banTypes.delete({
                    where: { id: id },
                });
                res.status(200).json({ message: 'Selected Ban deleted!' });
            }
            catch (error) {
                next(error);
            }
        });
    }
}
exports.default = BanType;
