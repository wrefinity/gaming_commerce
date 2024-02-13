import express from "express"
const router = express.Router()
import AuthController from "../controller/auth"

router.post('/login', AuthController.loginUser);
router.post('/register', AuthController.userRegistration);
router.post('/reset_link', AuthController.sendResetPasswordToken);
router.post('/reset_password', AuthController.resetPassword);
router.post('/confirm/:userId/:token', AuthController.accountConfirmation);


export default router