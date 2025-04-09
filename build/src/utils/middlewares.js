"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.isSelf = exports.requireJwtAuth = exports.isAgent = void 0;
const passport_1 = __importDefault(require("passport"));
const isAgent = (req, res, next) => {
    try {
        const user = req.user;
        if (!user) {
            return res.status(401).json("user not found.");
        }
        if (user.role === "TravelAgent") {
            return next();
        }
        return res.status(403).json({ error: "Not a travel agent" });
    }
    catch (_a) {
        return res.status(500).json({ error: "server error" });
    }
};
exports.isAgent = isAgent;
exports.requireJwtAuth = passport_1.default.authenticate("jwt", {
    session: false,
});
const isSelf = (req, res, next) => {
    try {
        const user = req.user;
        if (!user) {
            return res.status(401).json("user not found");
        }
        if (user.id === BigInt(req.params.id)) {
            return next();
        }
        return res.status(403).json({ error: "Cannot view other's profile." });
    }
    catch (_a) {
        return res.status(500).json({ error: "server error" });
    }
};
exports.isSelf = isSelf;
