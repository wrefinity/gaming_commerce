"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// model importation
const users_1 = require("../models/users");
const token_1 = require("../models/token");
const general_1 = require("../utils/general");
const regValidations_1 = require("../validations/regValidations");
// import AuthenticatedRequest from "../utils/extended"
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jswt_1 = __importDefault(require("../middlewares/jswt"));
class AuthController extends jswt_1.default {
    salt;
    general;
    constructor() {
        super();
        this.salt = 10;
        this.general = new general_1.GeneralUtils();
    }
    loginUser = async (req, res) => {
        // Data Validation
        const { error } = (0, regValidations_1.userValidation)(req.body);
        if (error) {
            return res.status(400).json({
                status: false,
                message: error.details[0].message.toUpperCase()
            });
        }
        // Check if user exists
        const user = await (0, users_1.getUserByEmail)(req.body.email);
        if (!user) {
            return res.status(401).json({
                status: false,
                message: 'Incorrect credentials',
            });
        }
        else {
            const isPasswordValid = await bcryptjs_1.default.compare(req.body.password, user.password);
            if (!isPasswordValid) {
                // Passwords don't match, handle login error
                res.status(401).json({ message: 'Invalid username or password' });
            }
            if (user.status == users_1.UserStatus.ACTIVE) {
                const { password, ...otherDetails } = user.toObject();
                return res.status(200).json({
                    status: true,
                    flag: "login",
                    message: "Login successful",
                    user: otherDetails,
                    token: this.createJWT({ _id: user._id })
                });
            }
            else if (user.status == users_1.UserStatus.PENDING) {
                // Generate otp
                const token = this.general.generateOtp();
                // create the reset password token
                const createdToken = (0, token_1.createToken)({ token, user: user?._id });
                if (!createdToken)
                    return res.status(500).json({
                        error: true,
                        message: "reset token creation failed try again"
                    });
                // send the token to the user
                const sent = this.general.sendEmail(user?.email, 'GAMING STORE CONFIRMATION TOKEN', `Using the token : ${token} \n 
                    follow the link below to confirm your account: \n 
                    ${process.env.FRONTEND_LINK}${user?._id}`);
                if (!sent)
                    return res.status(500).json({
                        error: true,
                        message: "sending otp for account confirmation failed"
                    });
                // email sent below
                return res.status(200).json({
                    error: false,
                    flag: "email",
                    message: `Kindly check your email for account confirmation`
                });
            }
            else {
                return res.status(401).json({
                    status: false,
                    message: "Incorrect credentials"
                });
            }
        }
    };
    userRegistration = async (req, res) => {
        // Data Validation
        const { error } = (0, regValidations_1.userValidation)(req.body);
        if (error) {
            return res.status(400).json({
                error: true,
                message: error.details[0].message.toUpperCase(),
            });
        }
        // Check out user in the Database
        const userExist = await (0, users_1.getUserByEmail)(req.body.email);
        if (userExist && userExist.status == users_1.UserStatus.ACTIVE) {
            return res.status(400).json({
                error: true,
                message: "User Already Exist"
            });
        }
        // scenario where user account is created but not verified
        if (userExist && userExist.status == users_1.UserStatus.PENDING) {
            // TODO: create confirmation token to update user status 
            return res.status(400).json({
                error: true,
                message: "User Already Exist"
            });
        }
        const hashedPassword = await bcryptjs_1.default.hash(req.body.password, this.salt);
        // create new user
        const userCreated = await (0, users_1.createUser)({
            password: hashedPassword,
            email: req.body.email,
            username: req.body.username
        });
        // Generate otp
        const token = this.general.generateOtp();
        // create the reset password token
        const created_token = (0, token_1.createToken)({ token, user: userCreated?._id });
        if (!created_token)
            return res.status(500).json({
                error: true,
                message: "reset token creation failed try again"
            });
        // send the token to the user
        const sent = this.general.sendEmail(userCreated?.email, 'GAMING STORE CONFIRMATION TOKEN', `using the token : ${token} \n follow the link below to confirm your account: \n ${process.env.FRONTEND_LINK}${userCreated?._id}`);
        if (!sent)
            return res.status(500).json({
                error: true,
                message: "sending otp for password link failed"
            });
        // user creation actions go below
        if (userCreated)
            return res.status(200).json({
                error: false,
                message: `Kindly check your email for account confirmation `,
                data: userCreated
            });
    };
    sendResetPasswordToken = async (req, res) => {
        // destructure 
        const { email } = req.body;
        if (!email)
            return res.status(400).json({
                error: true,
                message: "email address required"
            });
        try {
            // check that the user is registered first
            const checkExistance = await (0, users_1.getUserByEmail)(email);
            if (!checkExistance)
                return res.status(400).json({
                    error: true,
                    message: "user does not exist"
                });
            const checkTokenExist = await (0, token_1.getTokenByUserId)(checkExistance._id);
            if (!checkTokenExist)
                return res.status(400).json({
                    error: true,
                    message: "token expired, retry the process again"
                });
            // initiate the email and OTP class  
            const token = this.general.generateOtp();
            // create the reset password token
            const created_token = (0, token_1.createToken)({ token, user_id: checkExistance?._id });
            if (!created_token)
                return res.status(500).json({
                    error: true,
                    message: "reset token creation failed try again"
                });
            // send the token to the user
            const sent = this.general.sendEmail(checkExistance?.email, 'GAMING STORE PASSWORD RESET TOKEN', `your password reset code is: \n ${token}`);
            if (!sent)
                return res.status(500).json({
                    error: true,
                    message: "sending otp for password link failed"
                });
            return res.status(200).json({
                error: false,
                message: `check your email address ${checkExistance?.email} for the reset code, note that the code expires in 5 minutes `
            });
        }
        catch (err) {
            console.log(err);
        }
    };
    resetPassword = async (req, res) => {
        // destructure the body parameters
        const { token, email, password } = req.body;
        // a check that the token, email, and password fields are not empty
        if (!token || !email || !password) {
            return res.status(400).json({
                error: true,
                message: "kindly supply all fields",
            });
        }
        try {
            // check that the user is registered first
            const checkMailExist = await (0, users_1.getUserByEmail)(email);
            if (!checkMailExist)
                return res.status(400).json({
                    error: true,
                    message: `user with the email address ${email} does not exist`
                });
            // check that the reset password token has not expired
            const checkTokenExist = await (0, token_1.getUserToken)(checkMailExist._id, token);
            if (!checkTokenExist)
                return res.status(400).json({
                    error: true,
                    message: "token expired, retry the process again"
                });
            //reset the password and delete the token
            const encrypted_password = await bcryptjs_1.default.hash(password, 10);
            const updated = (0, users_1.updateUsers)(checkMailExist._id, { password: encrypted_password });
            await (0, token_1.deleteUserToken)(checkTokenExist?._id);
            // check if the users password is updated or not 
            if (!updated)
                return res.status(400).json({ status: false, message: 'password reset failed try again' });
            return res.status(200).json({
                error: false,
                message: "password reset successfully"
            });
        }
        catch (err) {
            console.log(err);
        }
    };
    accountConfirmation = async (req, res) => {
        const { userId, token } = req.params;
        if (!userId || !token)
            return res.status(400).json({
                error: true,
                message: "supply the confirmation token"
            });
        // Check out user account have been activated
        const userExist = await (0, users_1.getUserById)(userId);
        if (userExist && userExist.status == users_1.UserStatus.ACTIVE) {
            return res.status(400).json({
                error: true,
                message: "User Account Have been Confirmed Already"
            });
        }
        // check that the reset password token has not expired
        const checkTokenExist = await (0, token_1.getUserToken)(userExist._id, token);
        if (!checkTokenExist)
            return res.status(400).json({
                error: true,
                message: "token expired, goto login and try login to get new setup token"
            });
        // activate user account
        const updated = await (0, users_1.updateUsers)(userId, { status: users_1.UserStatus.ACTIVE });
        if (!updated)
            return res.status(400).json({ status: false, message: 'account confirmation failed, try again' });
        //delete the token
        await (0, token_1.deleteUserToken)(checkTokenExist?._id);
        return res.status(200).json({
            error: false,
            message: "User Account Confirmed"
        });
    };
}
exports.default = new AuthController();
//# sourceMappingURL=auth.js.map