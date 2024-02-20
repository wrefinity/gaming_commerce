"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GeneralUtils = void 0;
const otp_generator_1 = __importDefault(require("otp-generator"));
const nodemailer_1 = __importDefault(require("nodemailer"));
class GeneralUtils {
    generateOtp() {
        const otp = otp_generator_1.default.generate(6, {
            upperCaseAlphabets: false,
            specialChars: false,
            digits: true,
            lowerCaseAlphabets: false
        });
        return otp;
    }
    async sendEmail(email, subject, text) {
        try {
            const transporter = nodemailer_1.default.createTransport({
                service: "Gmail",
                secure: true,
                auth: {
                    user: process.env.USER_EMAIL,
                    pass: process.env.APP_PASSWORD,
                },
            });
            const sentMailResponse = await transporter.sendMail({
                from: process.env.SENDER,
                to: email,
                subject: subject,
                text: text,
            });
            console.log("email sent sucessfully", sentMailResponse);
            return true;
        }
        catch (error) {
            console.log("email not sent");
            console.log(error);
            return false;
        }
    }
}
exports.GeneralUtils = GeneralUtils;
//# sourceMappingURL=general.js.map