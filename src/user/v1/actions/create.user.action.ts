import { UserModel, UserType } from "../user.model";

async function createUserAction(data: UserType): Promise<UserType> {
  const newUser = await UserModel.create(data);
  return newUser;
}

export default createUserAction;
