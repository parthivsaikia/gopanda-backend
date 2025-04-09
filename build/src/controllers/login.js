"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginUser = void 0;
const passport_1 = __importDefault(require("passport"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const loginUser = (req, res, next) => {
    const authenticateMiddleware = passport_1.default.authenticate("local", { session: false }, (err, user, info) => {
        if (err) {
            console.log("login error: ", err);
            return next(err);
        }
        if (!user) {
            console.log("Login failed: ", info === null || info === void 0 ? void 0 : info.message);
            return res
                .status(401)
                .json({ message: (info === null || info === void 0 ? void 0 : info.message) || "Authentication failed." });
        }
        req.logIn(user, { session: false }, (loginErr) => {
            if (loginErr) {
                console.log("Error attaching user to request: ", loginErr);
                return res.status(500).json({ message: "Login error" });
            }
            const payload = {
                sub: user.id.toString(),
                username: user.username,
            };
            const token = jsonwebtoken_1.default.sign(payload, process.env.JWT_SECRET || "", {
                expiresIn: "1h",
            });
            console.log(`Login successfull for ${user.username}`);
            return res.json({
                message: "login successful",
                token: `Bearer ${token}`,
            });
        });
    });
    authenticateMiddleware(req, res, next);
};
exports.loginUser = loginUser;
