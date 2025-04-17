
Object.defineProperty(exports, "__esModule", { value: true });

const {
  Decimal,
  objectEnumValues,
  makeStrictEnum,
  Public,
  getRuntime,
  skip
} = require('./runtime/index-browser.js')


const Prisma = {}

exports.Prisma = Prisma
exports.$Enums = {}

/**
 * Prisma Client JS version: 6.6.0
 * Query Engine version: f676762280b54cd07c770017ed3711ddde35f37a
 */
Prisma.prismaVersion = {
  client: "6.6.0",
  engine: "f676762280b54cd07c770017ed3711ddde35f37a"
}

Prisma.PrismaClientKnownRequestError = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`PrismaClientKnownRequestError is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)};
Prisma.PrismaClientUnknownRequestError = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`PrismaClientUnknownRequestError is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.PrismaClientRustPanicError = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`PrismaClientRustPanicError is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.PrismaClientInitializationError = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`PrismaClientInitializationError is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.PrismaClientValidationError = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`PrismaClientValidationError is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.Decimal = Decimal

/**
 * Re-export of sql-template-tag
 */
Prisma.sql = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`sqltag is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.empty = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`empty is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.join = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`join is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.raw = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`raw is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.validator = Public.validator

/**
* Extensions
*/
Prisma.getExtensionContext = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`Extensions.getExtensionContext is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.defineExtension = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`Extensions.defineExtension is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}

/**
 * Shorthand utilities for JSON filtering
 */
Prisma.DbNull = objectEnumValues.instances.DbNull
Prisma.JsonNull = objectEnumValues.instances.JsonNull
Prisma.AnyNull = objectEnumValues.instances.AnyNull

Prisma.NullTypes = {
  DbNull: objectEnumValues.classes.DbNull,
  JsonNull: objectEnumValues.classes.JsonNull,
  AnyNull: objectEnumValues.classes.AnyNull
}



/**
 * Enums
 */

exports.Prisma.TransactionIsolationLevel = makeStrictEnum({
  ReadUncommitted: 'ReadUncommitted',
  ReadCommitted: 'ReadCommitted',
  RepeatableRead: 'RepeatableRead',
  Serializable: 'Serializable'
});

exports.Prisma.UserScalarFieldEnum = {
  id: 'id',
  username: 'username',
  password: 'password',
  email: 'email',
  mobileNumber: 'mobileNumber',
  state: 'state',
  country: 'country',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt',
  role: 'role',
  name: 'name',
  emailVerified: 'emailVerified',
  image: 'image'
};

exports.Prisma.MessageScalarFieldEnum = {
  id: 'id',
  text: 'text',
  senderId: 'senderId',
  receiverId: 'receiverId',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.OfferedTourScalarFieldEnum = {
  id: 'id',
  minimumPeople: 'minimumPeople',
  price: 'price',
  facilities: 'facilities',
  agentId: 'agentId',
  startDate: 'startDate',
  endDate: 'endDate'
};

exports.Prisma.PlaceScalarFieldEnum = {
  id: 'id',
  name: 'name',
  location: 'location',
  photos: 'photos',
  rating: 'rating'
};

exports.Prisma.ReviewScalarFieldEnum = {
  id: 'id',
  star: 'star',
  text: 'text',
  photos: 'photos',
  placeId: 'placeId',
  agentId: 'agentId',
  offeredTourId: 'offeredTourId'
};

exports.Prisma.SearchHistoryScalarFieldEnum = {
  id: 'id',
  search: 'search',
  userId: 'userId'
};

exports.Prisma.BookingScalarFieldEnum = {
  id: 'id',
  customerId: 'customerId',
  tourId: 'tourId',
  noOfPeople: 'noOfPeople',
  status: 'status',
  totalPrice: 'totalPrice',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.PersonScalarFieldEnum = {
  id: 'id',
  name: 'name',
  age: 'age',
  proof: 'proof',
  bookingId: 'bookingId'
};

exports.Prisma.PaymentScalarFieldEnum = {
  id: 'id',
  method: 'method',
  status: 'status',
  bookingId: 'bookingId',
  amount: 'amount',
  transactionId: 'transactionId',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.ItineraryScalarFieldEnum = {
  id: 'id',
  day: 'day',
  startTime: 'startTime',
  endTime: 'endTime',
  placeId: 'placeId',
  tourId: 'tourId',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.ActivityScalarFieldEnum = {
  id: 'id',
  title: 'title',
  itineraryId: 'itineraryId'
};

exports.Prisma.NotificationScalarFieldEnum = {
  id: 'id',
  text: 'text',
  type: 'type',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt',
  userId: 'userId'
};

exports.Prisma.WishListScalarFieldEnum = {
  id: 'id',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt',
  userId: 'userId'
};

exports.Prisma.AccountScalarFieldEnum = {
  id: 'id',
  accountId: 'accountId',
  providerId: 'providerId',
  userId: 'userId',
  accessToken: 'accessToken',
  refreshToken: 'refreshToken',
  idToken: 'idToken',
  accessTokenExpiresAt: 'accessTokenExpiresAt',
  refreshTokenExpiresAt: 'refreshTokenExpiresAt',
  scope: 'scope',
  password: 'password',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.VerificationScalarFieldEnum = {
  id: 'id',
  identifier: 'identifier',
  value: 'value',
  expiresAt: 'expiresAt',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.SortOrder = {
  asc: 'asc',
  desc: 'desc'
};

exports.Prisma.QueryMode = {
  default: 'default',
  insensitive: 'insensitive'
};

exports.Prisma.NullsOrder = {
  first: 'first',
  last: 'last'
};
exports.UserRole = exports.$Enums.UserRole = {
  Customer: 'Customer',
  TravelAgent: 'TravelAgent'
};

exports.BookingStatus = exports.$Enums.BookingStatus = {
  Pending: 'Pending',
  Confirmed: 'Confirmed',
  Cancelled: 'Cancelled',
  Completed: 'Completed'
};

exports.PaymentStatus = exports.$Enums.PaymentStatus = {
  Success: 'Success',
  Pending: 'Pending',
  Failure: 'Failure',
  Refunded: 'Refunded'
};

exports.NotificationType = exports.$Enums.NotificationType = {
  Warning: 'Warning',
  Greeting: 'Greeting',
  Information: 'Information'
};

exports.Prisma.ModelName = {
  User: 'User',
  Message: 'Message',
  OfferedTour: 'OfferedTour',
  Place: 'Place',
  Review: 'Review',
  SearchHistory: 'SearchHistory',
  Booking: 'Booking',
  Person: 'Person',
  Payment: 'Payment',
  Itinerary: 'Itinerary',
  Activity: 'Activity',
  Notification: 'Notification',
  WishList: 'WishList',
  Account: 'Account',
  Verification: 'Verification'
};

/**
 * This is a stub Prisma Client that will error at runtime if called.
 */
class PrismaClient {
  constructor() {
    return new Proxy(this, {
      get(target, prop) {
        let message
        const runtime = getRuntime()
        if (runtime.isEdge) {
          message = `PrismaClient is not configured to run in ${runtime.prettyName}. In order to run Prisma Client on edge runtime, either:
- Use Prisma Accelerate: https://pris.ly/d/accelerate
- Use Driver Adapters: https://pris.ly/d/driver-adapters
`;
        } else {
          message = 'PrismaClient is unable to run in this browser environment, or has been bundled for the browser (running in `' + runtime.prettyName + '`).'
        }

        message += `
If this is unexpected, please open an issue: https://pris.ly/prisma-prisma-bug-report`

        throw new Error(message)
      }
    })
  }
}

exports.PrismaClient = PrismaClient

Object.assign(exports, Prisma)
