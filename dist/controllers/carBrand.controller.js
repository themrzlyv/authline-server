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
const config_1 = require("../config/config");
const ApiError_1 = __importDefault(require("../middlewares/ApiError"));
class CarBrand {
    static allBrands(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const carBrands = yield config_1.prisma.carBrand.findMany({
                    orderBy: [{ brandName: 'asc' }],
                });
                res.status(200).json({ length: carBrands.length, carBrands });
            }
            catch (error) {
                next(error);
            }
        });
    }
    static singleBrand(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const carBrand = yield config_1.prisma.carBrand.findUnique({
                    where: { id: id },
                    include: {
                        models: { include: { post: true } },
                    },
                });
                res.status(200).json(carBrand);
            }
            catch (error) {
                next(error);
            }
        });
    }
    static createBrand(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { brandName } = req.body;
                if (!brandName)
                    return next(ApiError_1.default.badRequest(400, 'Please fill all inputs!'));
                const existBrand = yield config_1.prisma.carBrand.findUnique({ where: { brandName } });
                if (existBrand)
                    return next(ApiError_1.default.badRequest(400, 'This brand already exists!'));
                yield config_1.prisma.carBrand.create({
                    data: {
                        brandName,
                    },
                });
                res.status(201).json({ message: 'New brand was created!' });
            }
            catch (error) {
                next(error);
            }
        });
    }
    static updateBrand(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const { brandName } = req.body;
                if (!brandName)
                    return next(ApiError_1.default.badRequest(400, 'Please fill all inputs!'));
                const existNamedBrand = yield config_1.prisma.carBrand.findUnique({ where: { id: id } });
                if (!existNamedBrand)
                    return next(ApiError_1.default.badRequest(400, "Brand didn't find!"));
                if (brandName === (existNamedBrand === null || existNamedBrand === void 0 ? void 0 : existNamedBrand.brandName))
                    return next(ApiError_1.default.badRequest(400, 'The name same as older!'));
                yield config_1.prisma.carBrand.update({
                    where: { id: id },
                    data: {
                        brandName,
                    },
                });
                res.status(200).json({ message: 'Brand was updated!' });
            }
            catch (error) {
                next(error);
            }
        });
    }
    static deleteBrand(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                yield config_1.prisma.carBrand.delete({
                    where: { id: id },
                });
                res.status(200).json({ message: 'Selected brand deleted!' });
            }
            catch (error) {
                next(error);
            }
        });
    }
}
exports.default = CarBrand;
