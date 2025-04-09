"use strict";
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PrismaToUserResponseTour = exports.userToPrismaTour = void 0;
exports.convertBigIntToString = convertBigIntToString;
const client_1 = require("@prisma/client");
function convertBigIntToString(obj) {
    const result = {};
    for (const key in obj) {
        if (Object.prototype.hasOwnProperty.call(obj, key)) {
            const value = obj[key];
            result[key] =
                typeof value === "bigint"
                    ? value.toString()
                    : value;
        }
    }
    return result;
}
//UserInputTour to PrismaInputTour
const userToPrismaTour = (tourObject) => {
    return Object.assign({ minimumPeople: tourObject.minimumPeople, price: new client_1.Prisma.Decimal(tourObject.price), facilities: tourObject.facilities, agentId: BigInt(tourObject.agentId), startDate: new Date(tourObject.startDate), endDate: new Date(tourObject.endDate) }, (tourObject.itineraries && tourObject.itineraries.length > 0
        ? {
            itineraries: {
                create: tourObject.itineraries.map((itinerary) => (Object.assign({ day: itinerary.day, startTime: new Date(itinerary.startTime), endTime: new Date(itinerary.endTime) }, (itinerary.placeId
                    ? { placeId: BigInt(itinerary.placeId) }
                    : {})))),
            },
        }
        : {}));
};
exports.userToPrismaTour = userToPrismaTour;
const PrismaToUserResponseTour = (tourObject) => {
    const { itineraries } = tourObject, tourData = __rest(tourObject, ["itineraries"]);
    const responseTourObject = Object.assign({ minimumPeople: tourData.minimumPeople, price: Number(tourData.price), facilities: tourData.facilities, agentId: tourData.agentId.toString(), startDate: tourData.startDate, endDate: tourData.endDate }, (itineraries && (itineraries.length) > 0 ?
        {
            itineraries: itineraries.map(itinerary => {
                return {
                    id: itinerary.id.toString(),
                    day: itinerary.day,
                    tourId: itinerary.tourId.toString(),
                    startTime: new Date(itinerary.startTime),
                    endTime: new Date(itinerary.endTime),
                    placeId: itinerary.placeId ? itinerary.placeId.toString() : undefined,
                    createdAt: new Date(itinerary.createdAt),
                    updatedAt: new Date(itinerary.updatedAt)
                };
            })
        } :
        undefined));
    return responseTourObject;
};
exports.PrismaToUserResponseTour = PrismaToUserResponseTour;
