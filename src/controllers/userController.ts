import { User } from "../models/userModel";

export const getUsers = () => {
  return User.find();
};

export const getUserByEmail = (email: string) => {
  return User.findOne({ email });
};

export const getUserBySessionToken = (sessionToken: string) => {
  const user = User.findOne({
    "authentication.sessionToken": sessionToken,
  });

  return user;
};

export const getUserById = (id: string) => {
  return User.findById({ id });
};

export const createUser = (values: Record<string, any>) => {
  return new User(values).save().then((user) => user.toObject());
};

export const deleteUserById = (id: string) => {
  return User.findOneAndDelete({ _id: id });
};

export const updateUserById = (id: string, values: Record<string, any>) => {
  return User.findByIdAndUpdate(id, values);
};
