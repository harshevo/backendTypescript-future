import mongoose, { Document, Types, Schema, Model, model } from "mongoose";
import { authentication } from "../helpers";

export interface IAuth {
  password?: string;
  salt?: string;
  sessionToken?: string;
}

export interface IUser extends Document {
  username?: string;
  emai?: string;
  authentication?: IAuth;
}

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  authentication: {
    password: { type: String, required: true, select: false },
    salt: { type: String, select: false },
    sessionToken: { type: String, select: false },
  },
});

export const User: Model<IUser> = mongoose.model<IUser>("User", userSchema);
