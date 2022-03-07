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
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllUsers = void 0;
const config_1 = require("config/config");
const getAllUsers = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const usersInDb = yield config_1.prisma.user.findMany({
            select: { id: true, email: true, name: true, posts: true, role: true, createdAt: true },
        });
        const result = usersInDb.filter((item) => { var _a; return (item === null || item === void 0 ? void 0 : item.id) !== ((_a = req.user) === null || _a === void 0 ? void 0 : _a.id); });
        return res.status(200).json({ users: result });
    }
    catch (error) {
        next(error);
    }
});
exports.getAllUsers = getAllUsers;
