"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
class JwtAuth {
    secret_key = process.env.JWT_SECRET;
    // jwt token verifications
    verifyJWT = (token) => {
        return jsonwebtoken_1.default.verify(token, this.secret_key);
    };
    // create jwt token
    createJWT = (payload) => {
        console.log(payload);
        console.log(this.secret_key);
        return jsonwebtoken_1.default.sign(payload, this.secret_key, {
            expiresIn: '1d',
        });
    };
}
exports.default = JwtAuth;
//# sourceMappingURL=jswt.js.map