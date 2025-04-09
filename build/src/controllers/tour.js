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
exports.getTour = exports.deleteTour = exports.updateTour = exports.createTour = exports.getAllTours = void 0;
const tours_1 = require("../actions/tours");
const client_1 = require("@prisma/client");
const typeconverter_1 = require("../utils/typeconverter");
const getAllTours = (_req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const allTours = yield (0, tours_1.getTours)();
        const allToursWithoutBigInt = allTours.map((tour) => (0, typeconverter_1.convertBigIntToString)(tour));
        res.status(200).json(allToursWithoutBigInt);
    }
    catch (err) {
        next(err);
    }
});
exports.getAllTours = getAllTours;
const createTour = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const user = req.user;
    const { minimumPeople, price, startDate, endDate } = req.body;
    try {
        const tour = yield (0, tours_1.storeTour)((0, typeconverter_1.userToPrismaTour)({
            minimumPeople,
            price: new client_1.Prisma.Decimal(price),
            agentId: user.id.toString(),
            startDate,
            endDate,
            itineraries: [],
        }));
        const toBeJsonTour = (0, typeconverter_1.PrismaToUserResponseTour)(tour);
        return res.json(toBeJsonTour);
    }
    catch (err) {
        next(err);
    }
});
exports.createTour = createTour;
const updateTour = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = req.body;
        const id = BigInt(req.params.id);
        const updateTour = yield (0, tours_1.updateTourAction)(data, id);
        res.json((0, typeconverter_1.convertBigIntToString)(updateTour));
    }
    catch (error) {
        next(error);
    }
});
exports.updateTour = updateTour;
const deleteTour = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = BigInt(req.params.id);
        yield (0, tours_1.deleteTourAction)(id);
        res.status(204).json("Tour deleted successfully.");
    }
    catch (error) {
        next(error);
    }
});
exports.deleteTour = deleteTour;
const getTour = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = BigInt(req.params.id);
        const tour = yield (0, tours_1.findTourAction)(id);
        if (tour) {
            res.json((0, typeconverter_1.convertBigIntToString)(tour));
        }
        else {
            res.status(404).json({ error: "tour not found" });
        }
    }
    catch (error) {
        next(error);
    }
});
exports.getTour = getTour;
