import { Request, Response, NextFunction } from "express";
import AuthenticatedRequest from "../utils/extended";
import CustomError from "../utils/customError";
import JwtAuth from "./jswt";
import { IUser, getUserById } from "../models/users";

//  authorization : access token
class AuthenticateUser {
    private jwtAuth: JwtAuth = new JwtAuth();

    public deserialToken = async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {

        let token = null;
        if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
            token = req.headers.authorization.split(' ')[1];
        } else if (req.cookies) {
            token = req.cookies.access_token;
        }

        if (!token) {
            return res.status(401).json({ message: "Auth Token required" });
        }

        const decoded = this.jwtAuth.verifyJWT(token) as { _id: string, role: string };

        if (!decoded)
            return res.status(401).json({ message: "Invalid token or user doesn't exist" });


        // Check if user exist
        const user = await getUserById(decoded._id);
        if (!user)
            return res.status(401).json({ message: "User with that token no longer exists" });
        req.user = user._id;
        next()
    }

    public checkUserAuth = (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
        try {
            const user:IUser = req.user;
            if (!user)
                return next(new CustomError("Authentication required", 403));
            next();
        } catch (err) {
            next(err);
        }
    }

    public restictedTo = (...alloweddRoles: string[]) => (req: Request, res: Response, next: NextFunction) => {
        const user = req.user;
        if (!alloweddRoles.includes(user.roles))
            return next(new CustomError("User not permitted", 403));
        next();
    }
}

export default new AuthenticateUser()