import { Request } from 'express';
import { IUser } from "../models/users"

export default interface AuthenticatedRequest extends Request {
    user?: IUser;
}
