"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const customError_1 = __importDefault(require("../utils/customError"));
const jswt_1 = __importDefault(require("./jswt"));
const users_1 = require("../models/users");
//  authorization : access token
class AuthenticateUser {
    jwtAuth = new jswt_1.default();
    deserialToken = async (req, res, next) => {
        let token = null;
        if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
            token = req.headers.authorization.split(' ')[1];
        }
        else if (req.cookies) {
            token = req.cookies.access_token;
        }
        if (!token) {
            return res.status(401).json({ message: "Auth Token required" });
        }
        const decoded = this.jwtAuth.verifyJWT(token);
        if (!decoded)
            return res.status(401).json({ message: "Invalid token or user doesn't exist" });
        // Check if user exist
        const user = await (0, users_1.getUserById)(decoded._id);
        if (!user)
            return res.status(401).json({ message: "User with that token no longer exists" });
        req.user = user._id;
        next();
    };
    checkUserAuth = (req, res, next) => {
        try {
            const user = req.user;
            if (!user)
                return next(new customError_1.default("Authentication required", 403));
            next();
        }
        catch (err) {
            next(err);
        }
    };
    restictedTo = (...alloweddRoles) => (req, res, next) => {
        const user = req.user;
        if (!alloweddRoles.includes(user.roles))
            return next(new customError_1.default("User not permitted", 403));
        next();
    };
}
exports.default = new AuthenticateUser();
//# sourceMappingURL=routeAuth.js.map