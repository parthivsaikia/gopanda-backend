"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const login_1 = require("../controllers/login");
const express_1 = require("express");
const loginRouter = (0, express_1.Router)();
loginRouter.post("/", (req, res, next) => {
    (0, login_1.loginUser)(req, res, next);
});
exports.default = loginRouter;
