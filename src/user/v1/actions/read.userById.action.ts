import { UserModel, UserType } from "../user.model";

async function readUserByIdAction(id: string): Promise<UserType | null> {
  const user = await UserModel.findById(id);
  return user;
}

export default readUserByIdAction;
