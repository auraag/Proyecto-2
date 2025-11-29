import { UserModel, UserType } from "../user.model";

async function readUserAction(): Promise<UserType[]> {
  const results = await UserModel.find();

  return results;
}

export default readUserAction;
