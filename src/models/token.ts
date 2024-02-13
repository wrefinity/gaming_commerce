import mongoose, { Schema, Document, model } from "mongoose";

interface Token extends Document {
  user: Schema.Types.ObjectId;
  token: string;
  createdAt: Date;
}

const TokenSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  token: { type: String, required: true },
  createdAt: { type: Date, default: Date.now, expires: 3600 }
});

const TokenModel = model<Token>('Token', TokenSchema);

export default TokenModel;

export const createToken = (values: Record<string, any>) =>
  new TokenModel(values).save().then(token => token.toObject());
export const getTokenByUserId = async (user: string) => await TokenModel.find({user});

export const getUserToken = async (user: string, token: string) =>
  await TokenModel.findOne({ user, token });

export const deleteUserToken = async (id: object) =>
  await TokenModel.findOneAndDelete({ _id: id });
