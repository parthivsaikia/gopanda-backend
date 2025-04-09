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
exports.findTourAction = exports.deleteTourAction = exports.updateTourAction = exports.storeTour = exports.getTours = void 0;
const prisma_client_1 = __importDefault(require("../../prisma/prisma-client"));
const getTours = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const allTours = yield prisma_client_1.default.offeredTour.findMany();
        return allTours;
    }
    catch (err) {
        const errorMessage = err instanceof Error ? err.message : "unknown error";
        throw new Error(errorMessage);
    }
});
exports.getTours = getTours;
const storeTour = (data) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const tour = yield prisma_client_1.default.offeredTour.create({
            data: data,
        });
        return tour;
    }
    catch (err) {
        const errorMessage = err instanceof Error
            ? `error creating new tour: ${err.message}`
            : `unknown error creating in new tour`;
        throw new Error(errorMessage);
    }
});
exports.storeTour = storeTour;
const updateTourAction = (data, id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const tour = yield prisma_client_1.default.offeredTour.update({
            where: {
                id: id,
            },
            data: data,
        });
        return tour;
    }
    catch (error) {
        const errorMessage = error instanceof Error
            ? `error updating tour: ${error.message}`
            : `unknown error in updating tour`;
        throw new Error(errorMessage);
    }
});
exports.updateTourAction = updateTourAction;
const deleteTourAction = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield prisma_client_1.default.offeredTour.delete({
            where: {
                id: id,
            },
        });
    }
    catch (error) {
        const errorMessage = error instanceof Error
            ? `error deleting tour: ${error.message}`
            : `unknown error in deleting tour`;
        throw new Error(errorMessage);
    }
});
exports.deleteTourAction = deleteTourAction;
const findTourAction = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const tour = yield prisma_client_1.default.offeredTour.findUnique({
            where: {
                id: id,
            },
        });
        return tour;
    }
    catch (error) {
        const errorMessage = error instanceof Error
            ? `error finding tour: ${error.message}`
            : `unknown error in finding tour`;
        throw new Error(errorMessage);
    }
});
exports.findTourAction = findTourAction;
