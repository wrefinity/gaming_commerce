import otpGenerator from "otp-generator";
import nodemailer from "nodemailer";


export class GeneralUtils{
    generateOtp(){
        const otp = otpGenerator.generate(6, {
            upperCaseAlphabets: false,
            specialChars: false,
            digits: true,
            lowerCaseAlphabets: false
          });
          return otp;
    }

    async sendEmail(email: string, subject: string, text: string){
        try {
            const transporter = nodemailer.createTransport({
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
          } catch (error) {
            console.log("email not sent");
            console.log(error);
            return false;
          }
    }
}