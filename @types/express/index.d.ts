import * as express from 'express';
import {IUser} from "../../src/models/users";

declare global {
    namespace Express {
        export interface Request {
            user?: IUser
        }
    }
}