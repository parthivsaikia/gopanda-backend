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
exports.deleteUserAction = exports.changeUserData = exports.getUsers = exports.storeUser = void 0;
exports.findUser = findUser;
const prisma_client_1 = __importDefault(require("../../prisma/prisma-client"));
const storeUser = (userData) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield prisma_client_1.default.user.create({
            data: userData,
            omit: {
                password: true,
            },
        });
        return user;
    }
    catch (error) {
        const errorMsg = error instanceof Error
            ? `Error in storing user to db: ${error.message}`
            : `unknown error`;
        throw new Error(errorMsg);
    }
});
exports.storeUser = storeUser;
const getUsers = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = yield prisma_client_1.default.user.findMany({
            select: {
                id: true,
                name: true,
                username: true,
                state: true,
                country: true,
                role: true,
            },
        });
        return users;
    }
    catch (error) {
        const errorMessage = error instanceof Error
            ? error.message
            : "Unknown error while retrieving users";
        throw new Error(`Error while retrieving users ${errorMessage}`);
    }
});
exports.getUsers = getUsers;
function findUser(id) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const user = yield prisma_client_1.default.user.findUnique({
                where: {
                    id: id,
                },
                omit: {
                    password: true,
                },
            });
            return user;
        }
        catch (error) {
            const errorMessage = error instanceof Error
                ? `error in finding user: ${error.message}`
                : `unknown error occured while finding user.`;
            throw new Error(errorMessage);
        }
    });
}
const changeUserData = (data, id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const updatedUser = yield prisma_client_1.default.user.update({
            where: {
                id: id,
            },
            data: data,
            omit: { password: true },
        });
        return updatedUser;
    }
    catch (error) {
        const errorMessage = error instanceof Error
            ? `error in changing user: ${error.message}`
            : `unknown error occured while changing user.`;
        throw new Error(errorMessage);
    }
});
exports.changeUserData = changeUserData;
const deleteUserAction = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield prisma_client_1.default.user.delete({
            where: {
                id: id,
            },
        });
    }
    catch (error) {
        const errorMessage = error instanceof Error
            ? `error in deleting user: ${error.message}`
            : `unknown error occured while deleting user.`;
        throw new Error(errorMessage);
    }
});
exports.deleteUserAction = deleteUserAction;
