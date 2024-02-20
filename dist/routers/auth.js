"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const auth_1 = __importDefault(require("../controller/auth"));
router.post('/login', auth_1.default.loginUser);
router.post('/register', auth_1.default.userRegistration);
router.post('/reset_link', auth_1.default.sendResetPasswordToken);
router.post('/reset_password', auth_1.default.resetPassword);
router.post('/confirm/:userId/:token', auth_1.default.accountConfirmation);
exports.default = router;
//# sourceMappingURL=auth.js.map