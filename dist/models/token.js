"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteUserToken = exports.getUserToken = exports.getTokenByUserId = exports.createToken = void 0;
const mongoose_1 = require("mongoose");
const TokenSchema = new mongoose_1.Schema({
    user: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'User'
    },
    token: { type: String, required: true },
    createdAt: { type: Date, default: Date.now, expires: 3600 }
});
const TokenModel = (0, mongoose_1.model)('Token', TokenSchema);
exports.default = TokenModel;
const createToken = (values) => new TokenModel(values).save().then(token => token.toObject());
exports.createToken = createToken;
const getTokenByUserId = async (user) => await TokenModel.find({ user });
exports.getTokenByUserId = getTokenByUserId;
const getUserToken = async (user, token) => await TokenModel.findOne({ user, token });
exports.getUserToken = getUserToken;
const deleteUserToken = async (id) => await TokenModel.findOneAndDelete({ _id: id });
exports.deleteUserToken = deleteUserToken;
//# sourceMappingURL=token.js.map