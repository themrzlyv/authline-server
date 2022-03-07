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
class GearBoxType {
    static allGearBoxTypes(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const gearBoxTypes = yield config_1.prisma.gearBoxTypes.findMany({
                    orderBy: [{ gearBoxName: 'asc' }],
                });
                res.status(200).json({ length: gearBoxTypes.length, gearBoxTypes });
            }
            catch (error) {
                next(error);
            }
        });
    }
    static singleGearBoxType(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const gearBoxType = yield config_1.prisma.gearBoxTypes.findUnique({
                    where: { id: id },
                    include: {
                        posts: true,
                    },
                });
                res.status(200).json(gearBoxType);
            }
            catch (error) {
                next(error);
            }
        });
    }
    static createGearBoxType(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { gearBoxName } = req.body;
                if (!gearBoxName)
                    return next(ApiError_1.default.badRequest(400, 'Please fill all inputs!'));
                const existGearBoxType = yield config_1.prisma.gearBoxTypes.findUnique({ where: { gearBoxName } });
                if (existGearBoxType)
                    return next(ApiError_1.default.badRequest(400, 'This GearBox already exists!'));
                yield config_1.prisma.gearBoxTypes.create({
                    data: {
                        gearBoxName,
                    },
                });
                res.status(201).json({ message: 'New GearBox was created!' });
            }
            catch (error) {
                next(error);
            }
        });
    }
    static updateGearBoxType(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const { gearBoxName } = req.body;
                if (!gearBoxName)
                    return next(ApiError_1.default.badRequest(400, 'Please fill all inputs!'));
                const existGearBoxType = yield config_1.prisma.gearBoxTypes.findUnique({ where: { id: id } });
                if (!existGearBoxType)
                    return next(ApiError_1.default.badRequest(400, "GearBoxType didn't find!"));
                if (gearBoxName === (existGearBoxType === null || existGearBoxType === void 0 ? void 0 : existGearBoxType.gearBoxName))
                    return next(ApiError_1.default.badRequest(400, 'The name same as older!'));
                yield config_1.prisma.gearBoxTypes.update({
                    where: { id: id },
                    data: {
                        gearBoxName,
                    },
                });
                res.status(200).json({ message: 'GearBox was updated!' });
            }
            catch (error) {
                next(error);
            }
        });
    }
    static deleteGearBoxType(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                yield config_1.prisma.gearBoxTypes.delete({
                    where: { id: id },
                });
                res.status(200).json({ message: 'Selected GearBox deleted!' });
            }
            catch (error) {
                next(error);
            }
        });
    }
}
exports.default = GearBoxType;
