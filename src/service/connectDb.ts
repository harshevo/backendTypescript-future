import mongoose from "mongoose";

export async function connectDb(url: string) {
  return await mongoose.connect(url);
}
