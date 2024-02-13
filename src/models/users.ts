import mongoose, { Document } from "mongoose";
import bcrypt from "bcryptjs"

export interface IUser extends Document {
    username: string;
    email: string;
    password: string;
    status: string,
    roles?: string, 
    matchPassword(password: string): Promise<boolean>
}

// defining the user status
export enum UserStatus {
    PENDING = "Pending",
    ACTIVE = "Active"
}

export const userSchema = new mongoose.Schema<IUser>({
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
userSchema.methods.matchPassword = async function (enteredPassword: string) {
    return await bcrypt.compare(enteredPassword, this.password)
}

userSchema.set('toJSON', {
    transform: function (_, ret) {
        delete ret.password;
        return ret;
    }

});
const User = mongoose.model<IUser>("User", userSchema);

export const getUsers = () => User.find({});
export const getUserByEmail = (email: string) => User.findOne({ email });
export const getUserByUsername = (username: string) => User.findOne({ username });
export const getUserById = (id: string) => User.findById(id);
export const updateUsers = async(id:string, values: Record<string, any>) => await User.findByIdAndUpdate(id, values, { new: true })
export const createUser = (val: Record<string, any>) => new User(val).save().then(
    user => user.toObject()
)
export default User;
