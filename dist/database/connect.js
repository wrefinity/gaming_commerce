"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const MONGO_URI = process.env.MONGO_DB_CONNECTION_STRING;
const connectDB = () => {
    mongoose_1.default.Promise = Promise;
    mongoose_1.default.connect(MONGO_URI);
    mongoose_1.default.set("strictQuery", false);
    mongoose_1.default.connection.on('error', (error) => console.log(error));
};
exports.default = connectDB;
//# sourceMappingURL=connect.js.map