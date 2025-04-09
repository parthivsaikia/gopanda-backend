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
const passport_1 = __importDefault(require("passport"));
const passport_local_1 = require("passport-local");
const passport_jwt_1 = require("passport-jwt");
const password_hash_1 = require("../utils/password-hash");
const prisma_client_1 = __importDefault(require("../../prisma/prisma-client"));
const environment_config_1 = require("./environment.config");
passport_1.default.use(new passport_local_1.Strategy((username, password, done) => {
    const verifyUser = () => __awaiter(void 0, void 0, void 0, function* () {
        console.log(`LocalStrategy: Attempting login for ${username}`);
        try {
            const user = yield prisma_client_1.default.user.findUnique({
                where: { username: username },
            });
            if (!user) {
                console.log(`LocalStrategy: User ${username} not found`);
                return done(null, false, { message: "Incorrect username." });
            }
            const isMatch = yield (0, password_hash_1.comparePassword)(password, user.password);
            if (!isMatch) {
                console.log(`LocalStrategy: Incorrect password for ${username}.`);
                return done(null, false, { message: "Incorrect password." });
            }
            console.log(`LocalStrategy: Login successfull for ${username}.`);
            return done(null, user);
        }
        catch (error) {
            console.error(`LocalStrategy: Error during authentication for ${username}`, error);
            return done(error);
        }
    });
    verifyUser().catch((err) => {
        console.error("Unhandled error in verifyUser: ", err);
        done(err);
    });
}));
const jwtOptions = {
    jwtFromRequest: passport_jwt_1.ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: environment_config_1.JWT_SECRET || "", // Ensure it's never undefined
};
passport_1.default.use(new passport_jwt_1.Strategy(jwtOptions, (jwt_payload, done) => {
    function verifyUser() {
        return __awaiter(this, void 0, void 0, function* () {
            console.log("JWT strategy: received payload: ", jwt_payload);
            try {
                const id = BigInt(jwt_payload.sub);
                if (!id) {
                    console.log("Jwt strategy: Payload missing user ID (sub)");
                    return done(null, false);
                }
                const user = yield prisma_client_1.default.user.findUnique({
                    where: { id: id },
                });
                if (user) {
                    console.log(`Jwt strategy: User ${id} found`);
                    return done(null, user);
                }
                else {
                    console.log(`Jwt strategy: User with username ${id} not found.`);
                    return done(null, false);
                }
            }
            catch (error) {
                console.error(`Jwt strategy: Error during token verification.`, error);
                return done(error instanceof Error ? error : new Error(String(error)), false);
            }
        });
    }
    verifyUser().catch((err) => {
        done(err instanceof Error ? err : new Error(String(err)));
    });
}));
exports.default = passport_1.default;
