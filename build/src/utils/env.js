"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getEnvVariables = getEnvVariables;
function getEnvVariables(key) {
    const variable = process.env[key];
    if (!variable) {
        throw new Error(`environment variable ${key} not found`);
    }
    return variable;
}
