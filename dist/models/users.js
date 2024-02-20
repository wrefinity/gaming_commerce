"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createUser = exports.updateUsers = exports.getUserById = exports.getUserByUsername = exports.getUserByEmail = exports.getUsers = exports.userSchema = exports.UserStatus = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
// defining the user status
var UserStatus;
(function (UserStatus) {
    UserStatus["PENDING"] = "Pending";
    UserStatus["ACTIVE"] = "Active";
})(UserStatus || (exports.UserStatus = UserStatus = {}));
exports.userSchema = new mongoose_1.default.Schema({
    username: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    status: {
        type: String,
        enum: Object.values(UserStatus),
        default: UserStatus.PENDING,
    },
});
// extend matchPassword function unto user
exports.userSchema.methods.matchPassword = async function (enteredPassword) {
    return await bcryptjs_1.default.compare(enteredPassword, this.password);
};
exports.userSchema.set('toJSON', {
    transform: function (_, ret) {
        delete ret.password;
        return ret;
    }
});
const User = mongoose_1.default.model("User", exports.userSchema);
const getUsers = () => User.find({});
exports.getUsers = getUsers;
const getUserByEmail = (email) => User.findOne({ email });
exports.getUserByEmail = getUserByEmail;
const getUserByUsername = (username) => User.findOne({ username });
exports.getUserByUsername = getUserByUsername;
const getUserById = (id) => User.findById(id);
exports.getUserById = getUserById;
const updateUsers = async (id, values) => await User.findByIdAndUpdate(id, values, { new: true });
exports.updateUsers = updateUsers;
const createUser = (val) => new User(val).save().then(user => user.toObject());
exports.createUser = createUser;
exports.default = User;
//# sourceMappingURL=users.js.map