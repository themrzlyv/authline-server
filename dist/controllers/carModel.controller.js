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
class CarModel {
    static allModels(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const carModels = yield config_1.prisma.carModel.findMany({
                    orderBy: [{ modelName: 'asc' }],
                });
                res.status(200).json({ length: carModels.length, carModels });
            }
            catch (error) {
                next(error);
            }
        });
    }
    static singleModel(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const carModel = yield config_1.prisma.carModel.findUnique({
                    where: { id: id },
                    include: {
                        post: true,
                    },
                });
                res.status(200).json(carModel);
            }
            catch (error) {
                next(error);
            }
        });
    }
    static createModel(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { modelName, carBrandId } = req.body;
                if (!modelName || !carBrandId)
                    return next(ApiError_1.default.badRequest(400, 'Please fill all inputs!'));
                const existModel = yield config_1.prisma.carModel.findUnique({ where: { modelName } });
                if (existModel)
                    return next(ApiError_1.default.badRequest(400, 'This category already exists!'));
                yield config_1.prisma.carModel.create({
                    data: {
                        modelName,
                        carBrandId,
                    },
                });
                res.status(201).json({ message: 'New Model was created!' });
            }
            catch (error) {
                next(error);
            }
        });
    }
    static updateModel(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const { modelName } = req.body;
                if (!modelName)
                    return next(ApiError_1.default.badRequest(400, 'Please fill all inputs!'));
                const existNameModel = yield config_1.prisma.carModel.findUnique({ where: { id: id } });
                if (!existNameModel)
                    return next(ApiError_1.default.badRequest(400, "Model didn't find!"));
                if (modelName === (existNameModel === null || existNameModel === void 0 ? void 0 : existNameModel.modelName))
                    return next(ApiError_1.default.badRequest(400, 'The name same as older!'));
                yield config_1.prisma.carModel.update({
                    where: { id: id },
                    data: {
                        modelName,
                    },
                });
                res.status(200).json({ message: 'Model was updated!' });
            }
            catch (error) {
                next(error);
            }
        });
    }
    static deleteModel(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                yield config_1.prisma.carModel.delete({
                    where: { id: id },
                });
                res.status(200).json({ message: 'Selected Model deleted!' });
            }
            catch (error) {
                next(error);
            }
        });
    }
}
exports.default = CarModel;
