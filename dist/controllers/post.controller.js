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
class Post {
    static allPosts(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const posts = yield config_1.prisma.post.findMany({
                    orderBy: [{ title: 'asc' }],
                });
                res.status(200).json({ length: posts.length, posts });
            }
            catch (error) {
                next(error);
            }
        });
    }
    static singlePost(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const post = yield config_1.prisma.post.findUnique({
                    where: { id: id },
                    include: {
                        author: { select: { name: true, number: true, city: true } },
                        carBrand: { select: { brandName: true } },
                        carModel: { select: { modelName: true } },
                        gearBox: { select: { gearBoxName: true } },
                        ban: { select: { banName: true } },
                    },
                });
                res.status(200).json(post);
            }
            catch (error) {
                next(error);
            }
        });
    }
    static createPost(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { title, content, userId, carBrandId, carModelId, gearBoxTypesId, banTypesId } = req.body;
                if (!title || !content || !carBrandId || !carModelId || !gearBoxTypesId || !banTypesId) {
                    return next(ApiError_1.default.badRequest(400, 'Please fill all inputs!'));
                }
                yield config_1.prisma.post.create({
                    data: {
                        title,
                        content,
                        userId,
                        carBrandId,
                        carModelId,
                        gearBoxTypesId,
                        banTypesId,
                    },
                });
                res.status(201).json({ message: 'Post was created!' });
            }
            catch (error) {
                next(error);
            }
        });
    }
    static updatePost(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const { title, content, carModelId, gearBoxTypesId, banTypesId } = req.body;
                if (!title || !content || !carModelId || !gearBoxTypesId || !banTypesId) {
                    return next(ApiError_1.default.badRequest(400, 'Please fill all inputs!'));
                }
                yield config_1.prisma.post.update({
                    where: { id: id },
                    data: {
                        title,
                        content,
                        carModelId,
                        gearBoxTypesId,
                        banTypesId,
                    },
                });
                res.status(200).json({ message: 'Post was updated!' });
            }
            catch (error) {
                next(error);
            }
        });
    }
    static deletePost(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                yield config_1.prisma.post.delete({
                    where: { id: id },
                });
                res.status(200).json({ message: 'Post was deleted!' });
            }
            catch (error) {
                next(error);
            }
        });
    }
}
exports.default = Post;
