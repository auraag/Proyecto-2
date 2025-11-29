import { Schema, model } from "mongoose";

export type UserType = {
  name: string;
  email: string;
  password: string;
  role: string;
  permissions: string[];
  isDeleted: boolean;
};

const UserSchema = new Schema<UserType>({
  name: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  role: { type: String, required: true },
  permissions: { type: [String], default: [] }, 
  isDeleted: { type: Boolean, default: false },
});

const UserModel = model<UserType>("User", UserSchema);

export { UserModel, UserSchema };
