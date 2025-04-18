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
exports.getUser = exports.deleteUser = exports.getAllUsers = exports.createUser = void 0;
exports.editUser = editUser;
const bcrypt_1 = __importDefault(require("bcrypt"));
const users_1 = require("../actions/users");
const typeconverter_1 = require("../utils/typeconverter");
const createUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, name, password, email, mobileNumber, state, country, role, } = req.body;
    if (!username || !password || !email) {
        // Use return here as it's a client error, not unexpected
        res
            .status(400)
            .json({ message: "Username, email, and password are required." });
        return;
    }
    const saltRound = 10;
    const hashedPassword = yield bcrypt_1.default.hash(password, saltRound);
    try {
        const user = yield (0, users_1.storeUser)({
            username,
            name,
            password: hashedPassword,
            email,
            mobileNumber,
            state,
            country,
            role,
        });
        res.status(201).json(Object.assign(Object.assign({}, user), { id: Number(user.id) }));
    }
    catch (error) {
        next(error);
    }
});
exports.createUser = createUser;
const getAllUsers = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = yield (0, users_1.getUsers)();
        const jsonUsers = users.map((user) => (0, typeconverter_1.convertBigIntToString)(user));
        return res.status(200).json(jsonUsers);
    }
    catch (error) {
        next(error);
    }
});
exports.getAllUsers = getAllUsers;
function editUser(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const id = BigInt(req.params.id);
        const data = req.body;
        try {
            const editedUser = yield (0, users_1.changeUserData)(data, id);
            if (!editedUser) {
                res.status(404).json({ error: "user not found to edit." });
            }
            res.json((0, typeconverter_1.convertBigIntToString)(editedUser));
        }
        catch (err) {
            next(err);
        }
    });
}
const deleteUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const id = BigInt(req.params.id);
    try {
        yield (0, users_1.deleteUserAction)(id);
        res.status(204).json("User deleted successfully");
    }
    catch (error) {
        next(error);
    }
});
exports.deleteUser = deleteUser;
const getUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = BigInt(req.params.id);
        const user = yield (0, users_1.findUser)(id);
        if (user) {
            res.json((0, typeconverter_1.convertBigIntToString)(user));
        }
        else {
            res.status(404).json("user not found");
        }
    }
    catch (error) {
        next(error);
    }
});
exports.getUser = getUser;
