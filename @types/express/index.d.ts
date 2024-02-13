
import {userSchema} from "../../src/models/users";

declare global{
    namespace Express {
        interface Request {
            user?: userSchema
        }
    }
}